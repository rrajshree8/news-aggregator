import axios from 'axios'

// Safely access environment variable
const NEWSAPI_KEY = import.meta.env?.VITE_NEWSAPI_KEY || process.env.VITE_NEWSAPI_KEY
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2'

// Debug environment variables
console.log('Environment check:', {
  importMetaEnv: import.meta.env,
  processEnv: process.env,
  newsApiKey: NEWSAPI_KEY ? 'SET' : 'NOT SET',
  nodeEnv: process.env.NODE_ENV
})

// Check if API key is available
if (!NEWSAPI_KEY) {
  console.error('VITE_NEWSAPI_KEY environment variable is not set. Please add your NewsAPI key to your environment variables.')
}

class NewsService {
  constructor() {
    this.api = axios.create({
      baseURL: NEWSAPI_BASE_URL,
      timeout: 10000,
      headers: {
        'X-Api-Key': NEWSAPI_KEY || '',
      },
    })
  }

  async getNews(category = 'all', page = 1, pageSize = 20) {
    try {
      if (!NEWSAPI_KEY) {
        throw new Error('NewsAPI key is not configured. Please add VITE_NEWSAPI_KEY to your environment variables.')
      }
      
      const params = {
        page,
        pageSize,
        country: 'us',
      }
      if (category !== 'all') {
        params.category = category
      }
      const response = await this.api.get('/top-headlines', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  }

  async searchNews(query, category = 'all', page = 1, pageSize = 20) {
    try {
      if (!NEWSAPI_KEY) {
        throw new Error('NewsAPI key is not configured. Please add VITE_NEWSAPI_KEY to your environment variables.')
      }
      
      const params = {
        q: query,
        page,
        pageSize,
        country: 'us',
      }
      if (category !== 'all') {
        params.category = category
      }
      const response = await this.api.get('/top-headlines', { params })
      return response.data
    } catch (error) {
      console.error('Error searching news:', error)
      throw error
    }
  }

  async getCategories() {
    // NewsAPI does not provide a categories endpoint, so return static categories
    return [
      'all',
      'technology',
      'business',
      'entertainment',
      'health',
      'science',
      'sports',
    ]
  }

  async healthCheck() {
    // NewsAPI does not provide a health endpoint
    return { status: 'ok' }
  }
}

export default new NewsService()