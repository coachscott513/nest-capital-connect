import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import React from 'npm:react@18.3.1';
import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { LeadNotificationEmail } from './_templates/lead-notification.tsx';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
        message: formData.message || null,
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

    // Send email notification to Scott
    try {
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      
      const emailHtml = await renderAsync(
        React.createElement(LeadNotificationEmail, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type,
          location: formData.location,
          bedrooms: formData.bedrooms,
          price_range: formData.price_range,
        })
      );

      const emailResult = await resend.emails.send({
        from: 'Capital District Real Estate <onboarding@resend.dev>',
        to: ['coachscott513@gmail.com'],
        subject: `🎉 New ${formData.type} lead from ${formData.name}`,
        html: emailHtml,
      });

      if (emailResult.error) {
        console.error('Email sending error:', emailResult.error);
      } else {
        console.log('Email notification sent successfully:', emailResult.data);
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the whole request if email fails
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