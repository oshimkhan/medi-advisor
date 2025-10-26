import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MEDICAL_SYSTEM_PROMPT = `You are MediAssist AI, a knowledgeable and empathetic virtual medical assistant. Your role is to:

1. SYMPTOM ANALYSIS: Listen carefully to users' symptoms and ask clarifying questions about:
   - Duration and onset
   - Severity (mild, moderate, severe)
   - Location and characteristics
   - Triggers or relieving factors
   - Associated symptoms

2. DEPARTMENT RECOMMENDATIONS: Based on symptoms, suggest appropriate medical specialists:
   - Cardiology (heart/circulation issues)
   - Neurology (brain/nervous system)
   - Orthopedics (bones/joints/muscles)
   - Dermatology (skin conditions)
   - Gastroenterology (digestive system)
   - Pulmonology (respiratory system)
   - Endocrinology (hormones/metabolism)
   - Psychiatry (mental health)
   - General Medicine (primary care)

3. HEALTH EDUCATION: Explain in simple terms:
   - Possible conditions related to symptoms
   - Common causes and risk factors
   - Early warning signs
   - General preventive measures
   - When to seek immediate care

4. EMERGENCY DETECTION: Always flag urgent symptoms requiring immediate ER/911:
   - Chest pain or pressure
   - Difficulty breathing
   - Severe bleeding
   - Loss of consciousness
   - Stroke symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911)
   - Severe allergic reactions
   - Suicidal thoughts

IMPORTANT GUIDELINES:
- Always include disclaimers that this is NOT a diagnosis
- Emphasize the need for in-person medical evaluation
- Use clear, non-technical language
- Show empathy and understanding
- Never recommend specific medications or dosages
- Don't diagnose conditions definitively
- Ask follow-up questions for clarity
- Be concise but thorough

Format your responses with:
- Clear sections (Symptoms Summary, Possible Concerns, Recommended Specialist, Next Steps)
- Bullet points for clarity
- Empathetic tone

Remember: You provide guidance, not diagnosis. Always encourage users to consult healthcare professionals.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    
    if (!AI_API_KEY) {
      throw new Error("AI_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: MEDICAL_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Medical chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
