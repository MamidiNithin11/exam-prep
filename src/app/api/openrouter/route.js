export async function POST(req) {
  const { model, messages, max_tokens } = await req.json()
  const API_KEY = process.env.OPENROUTER_API_KEY

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "OpenRouter API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "BTech Exam Portal",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model || "openai/gpt-oss-120b",
        messages,
        max_tokens: max_tokens || 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("OpenRouter error:", error)
      throw new Error(error.message || "Failed to generate response")
    }

    const completion = await response.json()
    return new Response(JSON.stringify(completion), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("API error:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
