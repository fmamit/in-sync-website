import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DemoRequestData {
  name: string;
  phone: string;
  bestTimeToContact: string;
  email: string;
  company: string;
  industry: string;
  problemDescription: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: DemoRequestData = await req.json();
    
    console.log("Demo request received:", { 
      email: requestData.email, 
      company: requestData.company 
    });

    // Send email to delight@in-sync.co.in using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InSync Demo Requests <onboarding@in-sync.co.in>",
        to: ["delight@in-sync.co.in"],
        subject: `New Demo Request from ${requestData.name} - ${requestData.company}`,
        html: `
          <h2>New Demo Request Received</h2>
          
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${requestData.name}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Phone:</strong> ${requestData.phone}</p>
          <p><strong>Best Time to Contact:</strong> ${requestData.bestTimeToContact}</p>
          
          <h3>Company Details</h3>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Industry:</strong> ${requestData.industry}</p>
          
          <h3>Problem Description</h3>
          <p>${requestData.problemDescription.replace(/\n/g, '<br>')}</p>
          
          <hr>
          <p><small>This demo request was submitted on ${new Date().toLocaleString()}</small></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Email sending failed: ${errorData.message || emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Demo request submitted successfully" 
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
    console.error("Error in demo-request function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to submit demo request" 
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