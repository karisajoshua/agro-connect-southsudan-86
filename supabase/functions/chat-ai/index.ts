import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful agricultural assistant for South Sudan Agro Marketplace. 

ORGANIZATION INFO:
- Name: South Sudan Agro Marketplace
- Initiative of: Quantum Consult with partner support
- Mission: Connect farmers, cooperatives, and agri-businesses directly to markets, buyers, donors, and service providers
- Contact: info@ssdagromarketplace.org, +211 922 423 065
- Location: Juba Business Center, Airport Road, Juba, South Sudan

SERVICES:
- Market Access & Price Information
- Agricultural Directory (cooperatives, suppliers, transport)
- Real-time Market Prices
- Weather Forecasts (5-day regional)
- Farming Tips & Techniques
- Cooperative Registration
- Publications & Resources
- Disease/Pest Alerts

CURRENT MARKET PRICES (per 100kg):

MAGWI (Eastern Equatoria):
- Maize: 100,000 SSP
- Sorghum: 100,000 SSP
- Groundnuts (shelled): 90,000 SSP

AWEIL (Northern Bahr el Ghazal):
- Maize: 600,000 - 750,000 SSP
- Sorghum: 630,000 SSP
- Groundnuts (shelled): 360,000 - 420,000 SSP
- Beans: 450,000 - 600,000 SSP
- Simsim: 180,000 - 800,000 SSP
- Cassava: 200,000 - 300,000 SSP

YAMBIO (Western Equatoria):
- Cassava: 200,000 SSP
- Rice: 300,000 SSP

YEI (Central Equatoria):
- Cassava: 250,000 SSP
- Groundnuts (shelled): 400,000 SSP
- Simsim: 700,000 SSP

AVAILABLE COOPERATIVES:
We have cooperatives in Magwi, Aweil, Yambio, and Yei regions offering various agricultural products and services.

Keep responses helpful, concise, and focused on agricultural topics. If users need specific assistance beyond general information, guide them to contact the organization directly.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service quota exceeded. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
