export default async function handler(req, res) {
  return res.status(200).json({
    url: process.env.SUPABASE_URL,
    secret_exists: !!process.env.SUPABASE_SECRET_KEY
  })
}