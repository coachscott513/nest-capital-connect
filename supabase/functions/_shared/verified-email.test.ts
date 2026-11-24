import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as policy from './verified-email';

// Execute each actual deployed entrypoint with only hosted-auth, mail transport,
// environment, and serve replaced. No real accounts or emails are used here.
function loadHandler(functionName: string, options: { verified?: boolean; invalid?: boolean; deliveryFails?: boolean } = {}) {
  const emails: Array<{ to: string[]; subject: string; html: string }> = [];
  const getUser = vi.fn(async () => ({
    data: { user: options.invalid ? null : { email: 'account@example.com', email_confirmed_at: options.verified === false ? null : '2026-11-24T12:00:00Z' } },
    error: options.invalid ? new Error('Invalid token') : null,
  }));
  let handler: ((req: Request) => Promise<Response>) | undefined;
  const source = readFileSync(resolve(`supabase/functions/${functionName}/index.ts`), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  runInNewContext(compiled, {
    exports: {}, Request, Response, SyntaxError, console: { error: vi.fn() },
    Deno: { env: { get: () => 'test-only-value' } },
    require: (name: string) => {
      if (name.endsWith('/http/server.ts')) return { serve: (fn: typeof handler) => { handler = fn; } };
      if (name.includes('supabase-js')) return { createClient: () => ({ auth: { getUser } }) };
      if (name === '../_shared/verified-email.ts') return policy;
      throw new Error(`Unexpected import: ${name}`);
    },
    fetch: async (_url: string, init: RequestInit) => {
      emails.push(JSON.parse(String(init.body)));
      return new Response('{}', { status: options.deliveryFails ? 500 : 200 });
    },
  });
  if (!handler) throw new Error('Handler was not registered');
  return { handler, emails, getUser };
}

const cases = [
  { name: 'send-journey-email', body: { firstName: 'Test', journeyType: 'investor' }, subject: 'Your Investor Toolkit is Ready' },
  { name: 'send-market-report', body: { name: 'Test', market: 'Delmar' }, subject: 'Your Delmar Market Report' },
];

describe.each(cases)('$name verified self-email', ({ name, body, subject }) => {
  function request(payload: unknown = body, token?: string) {
    return new Request('https://app.example/email', {
      method: 'POST', headers: token ? { authorization: `Bearer ${token}` } : {}, body: JSON.stringify(payload),
    });
  }

  it('rejects signed-out requests without sending or querying auth', async () => {
    const { handler, emails, getUser } = loadHandler(name);
    expect((await handler(request())).status).toBe(401);
    expect(emails).toEqual([]);
    expect(getUser).not.toHaveBeenCalled();
  });

  it('rejects invalid or expired sessions without sending', async () => {
    const { handler, emails, getUser } = loadHandler(name, { invalid: true });
    expect((await handler(request(body, 'expired-token'))).status).toBe(401);
    expect(getUser).toHaveBeenCalledWith('expired-token');
    expect(emails).toEqual([]);
  });

  it('rejects accounts without confirmed email without sending', async () => {
    const { handler, emails } = loadHandler(name, { verified: false });
    expect((await handler(request(body, 'valid-token'))).status).toBe(403);
    expect(emails).toEqual([]);
  });

  it('sends only to hosted-auth email with fixed resource content', async () => {
    const { handler, emails } = loadHandler(name);
    const forged = { ...body, email: 'victim@example.com', subject: 'forged-subject', leadMagnet: 'forged-resource', reportUrl: 'https://attacker.example/phishing' };
    expect((await handler(request(forged, 'valid-token'))).status).toBe(200);
    expect(emails).toHaveLength(2);
    expect(emails[0].to).toEqual(['account@example.com']);
    expect(emails[0].subject).toBe(subject);
    expect(emails[1].to).toEqual(['team@capitaldistrictnest.com']);
    expect(JSON.stringify(emails)).not.toMatch(/victim@example|forged-subject|forged-resource|attacker.example/);
    if (name === 'send-market-report') expect(emails[0].html).toContain('https://www.narrpr.com/reports-v2/6817b29a-44d8-4221-a604-05c717acee81/pdf');
  });

  it('rejects unknown resources without sending', async () => {
    const { handler, emails } = loadHandler(name);
    expect((await handler(request({ ...body, market: 'Unknown', journeyType: '__proto__' }, 'valid-token'))).status).toBe(400);
    expect(emails).toEqual([]);
  });

  it('does not report success or notify the team on failed delivery', async () => {
    const { handler, emails } = loadHandler(name, { deliveryFails: true });
    expect((await handler(request(body, 'valid-token'))).status).toBe(500);
    expect(emails).toHaveLength(1);
  });

  it('rejects oversized names without sending', async () => {
    const { handler, emails } = loadHandler(name);
    expect((await handler(request({ ...body, name: 'a'.repeat(101), firstName: 'a'.repeat(101) }, 'valid-token'))).status).toBe(400);
    expect(emails).toEqual([]);
  });
});