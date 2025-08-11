import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  phoneNumber: string;
  message: string;
  type: 'activation' | 'deactivation' | 'plan_purchase' | 'expiry_alert';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { phoneNumber, message, type }: SMSRequest = await req.json();

    console.log(`Sending SMS to ${phoneNumber}: ${message}`);

    // Log the SMS in the notifications table
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        phone_number: phoneNumber,
        message: message,
        type: type,
        status: 'sent',
        sent_at: new Date().toISOString()
      });

    if (notificationError) {
      console.error('Error logging notification:', notificationError);
    }

    // In a real implementation, you would integrate with an SMS service like:
    // - Twilio
    // - Africa's Talking
    // - MessageBird
    // For now, we'll simulate sending SMS
    
    console.log('SMS sent successfully (simulated)');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS sent successfully',
        phoneNumber,
        type 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-sms function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);