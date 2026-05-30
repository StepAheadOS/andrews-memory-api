export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    const response = await fetch(`${supabaseUrl}/rest/v1/outcomes`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        outcome: "Test Outcome",
        recorded_by: "Andrew",
        notes: "First direct REST memory test"
      })
    });

    const text = await response.text();

    return res.status(response.status).json({
      success: response.ok,
      status: response.status,
      response: text
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      cause: err.cause || null
    });
  }
}