import axios from 'axios'

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2'

class NewsService {
  constructor() {
    this.api = axios.create({
      baseURL: NEWSAPI_BASE_URL,
      timeout: 10000,
      headers: {
        'X-Api-Key': NEWSAPI_KEY,
      },
    })
  }

  async getNews(category = 'all', page = 1, pageSize = 20) {
    try {
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