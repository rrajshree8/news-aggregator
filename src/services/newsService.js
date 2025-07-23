import axios from 'axios'

// Use the API route instead of direct NewsAPI calls
const API_BASE_URL = '/api/news'

class NewsService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    })
  }

  async getNews(category = 'all', page = 1, pageSize = 20) {
    try {
      const params = {
        page,
        pageSize,
      }
      if (category !== 'all') {
        params.category = category
      }
      const response = await this.api.get('', { params })
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
      }
      if (category !== 'all') {
        params.category = category
      }
      const response = await this.api.get('', { params })
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