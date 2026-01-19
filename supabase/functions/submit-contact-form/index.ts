import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple rate limiting using in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute per IP

const checkRateLimit = (identifier: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
};

// Validation schema using basic TypeScript validation
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  type: string;
  location?: string;
  bedrooms?: string;
  price_range?: string;
}

// Validation helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]+$/;
  return phoneRegex.test(phone);
};

const sanitizeString = (str: string, maxLength: number): string => {
  return str.trim().substring(0, maxLength);
};

const validateContactFormData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  } else if (data.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  if (!data.type || typeof data.type !== 'string') {
    errors.push('Type is required');
  }

  // Optional fields validation
  if (data.phone && typeof data.phone === 'string') {
    if (!isValidPhone(data.phone)) {
      errors.push('Phone number contains invalid characters');
    } else if (data.phone.length > 20) {
      errors.push('Phone number must be less than 20 characters');
    }
  }

  if (data.message && typeof data.message === 'string' && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  if (data.location && typeof data.location === 'string' && data.location.length > 100) {
    errors.push('Location must be less than 100 characters');
  }

  return { valid: errors.length === 0, errors };
};

// Generate HTML email content
const generateEmailHtml = (formData: ContactFormData): string => {
  const rows = [
    { label: 'Name', value: formData.name },
    { label: 'Email', value: `<a href="mailto:${formData.email}">${formData.email}</a>` },
    formData.phone ? { label: 'Phone', value: `<a href="tel:${formData.phone}">${formData.phone}</a>` } : null,
    { label: 'Lead Type', value: formData.type },
    formData.location ? { label: 'Location', value: formData.location } : null,
    formData.bedrooms ? { label: 'Bedrooms', value: formData.bedrooms } : null,
    formData.price_range ? { label: 'Price Range', value: formData.price_range } : null,
    formData.message ? { label: 'Message', value: formData.message } : null,
  ].filter(Boolean);

  const rowsHtml = rows.map(row => `
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 30%;">${row!.label}:</td>
      <td style="padding: 8px 12px; color: #333;">${row!.value}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="background-color: #f6f9fc; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Ubuntu,sans-serif; padding: 20px;">
      <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px 20px 48px; border-radius: 8px;">
        <h1 style="color: #333; font-size: 24px; font-weight: bold; text-align: center; margin: 40px 0;">🎉 New Lead Received!</h1>
        
        <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 8px;">
          You have a new <strong>${formData.type}</strong> lead from your website:
        </p>

        <table style="width: 100%; border: solid 1px #dedede; border-radius: 5px; margin: 20px 0; border-collapse: collapse;">
          ${rowsHtml}
        </table>

        <div style="text-align: center; margin: 32px 0;">
          <a href="mailto:${formData.email}?subject=Re: Your ${formData.type} inquiry" 
             style="background-color: #2754C5; border-radius: 5px; color: #fff; font-size: 16px; font-weight: bold; text-decoration: none; display: inline-block; padding: 14px 28px;">
            Reply to Lead
          </a>
        </div>

        <p style="color: #8898aa; font-size: 12px; line-height: 16px; text-align: center; margin: 20px 0;">
          This lead was submitted through your Capital District Real Estate website.
        </p>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    const rateLimit = checkRateLimit(clientIp);
    
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimit.retryAfter 
      }), {
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.retryAfter || 60)
        },
      });
    }

    const rawData = await req.json();
    console.log('Received form submission');

    // Validate input data
    const validation = validateContactFormData(rawData);
    if (!validation.valid) {
      console.error('Validation failed:', validation.errors);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Validation failed: ' + validation.errors.join(', ')
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize and prepare data
    const formData: ContactFormData = {
      name: sanitizeString(rawData.name, 100),
      email: sanitizeString(rawData.email, 255),
      phone: rawData.phone ? sanitizeString(rawData.phone, 20) : undefined,
      message: rawData.message ? sanitizeString(rawData.message, 1000) : undefined,
      type: sanitizeString(rawData.type, 50),
      location: rawData.location ? sanitizeString(rawData.location, 100) : undefined,
      bedrooms: rawData.bedrooms ? sanitizeString(rawData.bedrooms, 20) : undefined,
      price_range: rawData.price_range ? sanitizeString(rawData.price_range, 50) : undefined,
    };

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || '',
        type: formData.type,
        location: formData.location || null,
        bedrooms: formData.bedrooms || null,
        price_range: formData.price_range || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to save form data' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Successfully saved lead with ID:', data.id);

    // Send email notification using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const emailHtml = generateEmailHtml(formData);
        
        // Send admin notification
        // NOTE: Using a Resend-managed sender while custom domain sending finishes propagating.
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Capital District Nest <onboarding@resend.dev>',
            reply_to: 'hello@capitaldistrictnest.com',
            to: ['scott@capitaldistrictnest.com'],
            subject: `🎉 New ${formData.type} lead from ${formData.name}`,
            html: emailHtml,
          }),
        });

        const adminSendResultText = await emailResponse.text();
        if (!emailResponse.ok) {
          console.error('Admin email sending error:', adminSendResultText);
        } else {
          console.log('Admin email notification sent successfully:', adminSendResultText);
        }

        // Send confirmation email to subscriber (for newsletter types)
        if (formData.type.includes('homes') || formData.type === 'newsletter') {
          const confirmationResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Capital District Nest <onboarding@resend.dev>',
              reply_to: 'hello@capitaldistrictnest.com',
              to: [formData.email],
              subject: `Welcome to Capital District Nest Market Updates!`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #1a1a1a;">You're In! 🏡</h1>
                  <p>Hi ${formData.name},</p>
                  <p>Thanks for subscribing to our market updates. You'll receive:</p>
                  <ul style="color: #444; line-height: 1.8;">
                    <li>New listings before they hit the major sites</li>
                    <li>Price drops and market insights</li>
                    <li>Investment opportunities and cash flow deals</li>
                  </ul>
                  <p>Have questions? Just reply to this email or text Scott at <strong>(518) 671-8048</strong>.</p>
                  <p style="margin-top: 24px;">Best,<br/>The Capital District Nest Team</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                  <p style="color: #888; font-size: 12px;">
                    <a href="https://capitaldistrictnest.com" style="color: #2563eb;">capitaldistrictnest.com</a>
                  </p>
                </div>
              `,
            }),
          });

          const subscriberSendResultText = await confirmationResponse.text();
          if (!confirmationResponse.ok) {
            console.error('Subscriber confirmation email error:', subscriberSendResultText);
          } else {
            console.log('Subscriber confirmation email sent successfully:', subscriberSendResultText);
          }
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't fail the whole request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted successfully',
      data: data
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);