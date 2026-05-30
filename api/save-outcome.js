import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  try {
   const { outcome, recorded_by, notes, lead_name } = req.body || {}

    const { data, error } = await supabase
      .from('outcomes')
      .insert([
  {
    outcome: outcome || 'BOOKED',
    recorded_by: recorded_by || 'Andrew',
    notes: notes || 'First memory test',
    lead_name: lead_name || 'Unknown Lead'
  }
])
.select()

    if (error) throw error

    return res.status(200).json({
      success: true,
      data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}