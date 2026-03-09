import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Demo request received:", requestData);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Step 1: Save to local database
    const { data: savedRequest, error: dbError } = await supabase
      .from("demo_requests")
      .insert({
        name: requestData.name,
        phone: requestData.phone,
        email: requestData.email,
        company: requestData.company,
        industry: requestData.industry,
        best_time_to_contact: requestData.bestTimeToContact,
        problem_description: requestData.problemDescription,
        referred_by: requestData.referredBy || null,
        webhook_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database save error:", dbError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save demo request" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Demo request saved to database:", savedRequest.id);

    // Step 2: Forward to external webhook
    const webhookUrl = "https://aizgpxaqvtvvqarzjmze.supabase.co/functions/v1/webhook-receiver/wh_a87b57ff8582c314b16829b97b93016c95aa0eff8bef89ac";
    
    let webhookSuccess = false;
    let webhookResponse: any = null;

    try {
      const webhookResult = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: requestData.name,
          phone: requestData.phone,
          email: requestData.email,
          company: requestData.company,
          industry: requestData.industry,
          bestTimeToContact: requestData.bestTimeToContact,
          problemDescription: requestData.problemDescription,
          referredBy: requestData.referredBy || null,
        }),
      });

      webhookResponse = await webhookResult.json();
      webhookSuccess = webhookResult.ok;
      
      console.log("Webhook response:", { success: webhookSuccess, response: webhookResponse });
    } catch (webhookError: any) {
      console.error("Webhook forwarding error:", webhookError);
      webhookResponse = { error: webhookError.message };
    }

    // Step 3: Update database with webhook status
    await supabase
      .from("demo_requests")
      .update({
        webhook_sent: webhookSuccess,
        webhook_sent_at: webhookSuccess ? new Date().toISOString() : null,
        webhook_response: webhookResponse,
      })
      .eq("id", savedRequest.id);

    console.log("Database updated with webhook status");

    // Return success to user (even if webhook failed, we saved their request)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Demo request submitted successfully",
        requestId: savedRequest.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-demo-request function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to process demo request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
