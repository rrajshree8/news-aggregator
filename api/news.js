export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { category = 'all', page = 1, pageSize = 20, q } = req.query
    const apiKey = process.env.VITE_NEWSAPI_KEY

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'NewsAPI key not configured. Please add VITE_NEWSAPI_KEY to your Vercel environment variables.' 
      })
    }

    const params = new URLSearchParams({
      page,
      pageSize,
      country: 'us',
    })

    if (category !== 'all') {
      params.append('category', category)
    }

    if (q) {
      params.append('q', q)
    }

    const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json(errorData)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
} 