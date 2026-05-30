import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  try {
    const { data, error } = await supabase
      .from('outcomes')
      .select('*')
      .order('recorded_at', { ascending: false })

    if (error) throw error

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}