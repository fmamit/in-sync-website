import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    // Extract webhook token from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const webhookToken = pathParts[pathParts.length - 1];
    
    console.log("Webhook request received for token:", webhookToken);

    // Validate webhook token
    const expectedToken = "wh_a87b57ff8582c314b16829b97b93016c95aa0eff8bef89ac";
    if (webhookToken !== expectedToken) {
      console.error("Invalid webhook token:", webhookToken);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid webhook token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse request body
    const requestData = await req.json();
    console.log("Demo request data:", requestData);

    // Here you can process the webhook data
    // For now, we'll just log it and return success
    // You can add additional processing like:
    // - Sending to external services
    // - Storing in database
    // - Sending notifications

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook received successfully",
        receivedAt: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in webhook-receiver function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process webhook" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
