export class EmailAccessError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

interface AuthClient {
  auth: {
    getUser: (token: string) => Promise<{
      data: { user: { email?: string; email_confirmed_at?: string | null } | null };
      error: unknown;
    }>;
  };
}

// Always resolve the current user through hosted auth, never request data or JWT claims alone.
export async function verifiedEmail(req: Request, client: AuthClient): Promise<string> {
  const match = req.headers.get('authorization')?.match(/^Bearer\s+(\S+)$/i);
  if (!match) throw new EmailAccessError(401, 'Please sign in before requesting an email.');
  const { data, error } = await client.auth.getUser(match[1]);
  if (error || !data.user) throw new EmailAccessError(401, 'Please sign in again before requesting an email.');
  if (!data.user.email || !data.user.email_confirmed_at) {
    throw new EmailAccessError(403, 'Confirm your account email before requesting an email.');
  }
  return data.user.email;
}

export function requestName(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > 100) {
    throw new EmailAccessError(400, 'Please enter a name of 100 characters or fewer.');
  }
  return value.trim();
}

export const journeyResources = {
  investor: { subject: 'Your Investor Toolkit is Ready', leadMagnet: 'Cash Flow Analysis Spreadsheet + Capital District Investment Guide' },
  'first-time': { subject: 'Your First-Time Buyer Checklist is Ready', leadMagnet: 'Albany Area Grant Programs Guide + Pre-Approval Checklist' },
  land: { subject: 'Your Land Buyer Due Diligence Guide is Ready', leadMagnet: 'Land Evaluation Checklist + Zoning Quick Reference' },
  financing: { subject: 'Your Mortgage Options Guide is Ready', leadMagnet: 'Mortgage Comparison Chart + Down Payment Assistance Programs' },
} as const;

export function journeyResource(value: unknown) {
  if (typeof value !== 'string' || !Object.hasOwn(journeyResources, value)) {
    throw new EmailAccessError(400, 'Please select an available guide.');
  }
  const journeyType = value as keyof typeof journeyResources;
  return { journeyType, ...journeyResources[journeyType] };
}

export function marketResource(value: unknown) {
  if (value !== 'Delmar') throw new EmailAccessError(400, 'Please select an available market report.');
  return {
    market: 'Delmar',
    reportUrl: 'https://www.narrpr.com/reports-v2/6817b29a-44d8-4221-a604-05c717acee81/pdf',
  };
}