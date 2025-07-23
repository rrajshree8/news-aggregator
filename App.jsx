import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { BookmarkProvider } from './contexts/BookmarkContext'
import { Toaster } from './components/ui/sonner'
import { toast } from './hooks/use-toast'
import Header from './components/Header'
import ArticleCard from './components/ArticleCard'
import ArticleModal from './components/ArticleModal'
import BookmarksList from './components/BookmarksList'
import PaginationControls from './components/PaginationControls'
import Footer from './components/Footer'
import EnvironmentCheck from './components/EnvironmentCheck'
import EnvironmentDebug from './components/EnvironmentDebug'
import newsService from './services/newsService'
import './App.css'

const ARTICLES_PER_PAGE = 20

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [articles, setArticles] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch articles when category, search query, or page changes
  useEffect(() => {
    fetchArticles()
  }, [selectedCategory, searchQuery, currentPage])

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let result
      
      if (searchQuery) {
        result = await newsService.searchNews(
          searchQuery,
          selectedCategory,
          currentPage,
          ARTICLES_PER_PAGE
        )
      } else {
        result = await newsService.getNews(
          selectedCategory,
          currentPage,
          ARTICLES_PER_PAGE
        )
      }
      
      if (result.status === 'ok') {
        setArticles(result.articles || [])
        setTotalResults(result.totalResults || 0)
      } else {
        setError(result.message || 'Failed to fetch articles')
        toast({
          title: "Error",
          description: result.message || 'Failed to fetch articles',
          variant: "destructive"
        })
      }
    } catch (err) {
      // Check if it's an API key error
      if (err.message && err.message.includes('NewsAPI key is not configured')) {
        setError('NewsAPI key is not configured. Please add VITE_NEWSAPI_KEY to your environment variables.')
        toast({
          title: "Configuration Error",
          description: 'NewsAPI key is not configured. Please check your environment variables.',
          variant: "destructive"
        })
      } else {
        setError('Failed to fetch articles. Please try again.')
        toast({
          title: "Error",
          description: 'Failed to fetch articles. Please try again.',
          variant: "destructive"
        })
      }
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setShowBookmarks(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
    setShowBookmarks(false)
  }

  const handleReadMore = (article) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleShowBookmarks = () => {
    setShowBookmarks(!showBookmarks)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE)

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-white via-red-50/40 to-rose-50/30 dark:from-zinc-900 dark:via-red-900/20 dark:to-rose-900/10 flex flex-col">
            <EnvironmentCheck />
            <EnvironmentDebug />
            <Header
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
              onShowBookmarks={handleShowBookmarks}
              showBookmarks={showBookmarks}
            />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={
                  <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
                    {showBookmarks ? (
                      <BookmarksList onReadMore={handleReadMore} />
                    ) : (
                      <>
                        {/* Hero Section */}
                        <div className="text-center py-6 md:py-8 mb-6 md:mb-8 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
                          <div className="relative">
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                              Stay Informed
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                              Get the latest news from around the world, powered by NewsAPI
                            </p>
                            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-muted-foreground">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span>Live Updates</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-muted-foreground">
                                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                                <span>Global Coverage</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Category Navigation */}
                        <div className="mb-8">
                          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
                            {[
                              { id: 'all', name: 'All', icon: '📰' },
                              { id: 'technology', name: 'Technology', icon: '💻' },
                              { id: 'business', name: 'Business', icon: '💼' },
                              { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
                              { id: 'health', name: 'Health', icon: '🏥' },
                              { id: 'science', name: 'Science', icon: '🧪' },
                              { id: 'sports', name: 'Sports', icon: '⚽' },
                            ].map((category) => (
                              <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-3 py-2 md:px-4 text-sm md:text-base rounded-lg transition-all duration-300 hover:scale-105 font-medium ${
                                  selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-red-50 dark:hover:bg-zinc-700 border border-red-200 dark:border-red-700'
                                }`}
                              >
                                <span className="mr-1 md:mr-2">{category.icon}</span>
                                <span className="hidden sm:inline">{category.name}</span>
                                <span className="sm:hidden">{category.name.length > 8 ? category.name.substring(0, 8) + '...' : category.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Search Results Info */}
                        {searchQuery && (
                          <div className="mb-6 text-center">
                            <p className="text-muted-foreground">
                              Found {totalResults} articles for "{searchQuery}"
                              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                            </p>
                          </div>
                        )}

                        {/* Category Filter Info */}
                        {selectedCategory !== 'all' && !searchQuery && (
                          <div className="mb-6 text-center">
                            <p className="text-muted-foreground">
                              Showing {totalResults} articles in {selectedCategory}
                            </p>
                          </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                          <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-muted-foreground">Loading articles...</p>
                          </div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                          <div className="text-center py-12">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h3 className="text-xl font-semibold mb-2">Error loading articles</h3>
                            <p className="text-muted-foreground mb-4">{error}</p>
                            {error.includes('NewsAPI key is not configured') ? (
                              <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                  To fix this issue:
                                </p>
                                <ol className="text-sm text-muted-foreground text-left max-w-md mx-auto space-y-2">
                                  <li>1. Get a free API key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">newsapi.org</a></li>
                                  <li>2. Add it to your Vercel environment variables as <code className="bg-muted px-1 rounded">VITE_NEWSAPI_KEY</code></li>
                                  <li>3. Redeploy your application</li>
                                </ol>
                              </div>
                            ) : (
                              <button
                                onClick={fetchArticles}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                              >
                                Try Again
                              </button>
                            )}
                          </div>
                        )}

                        {/* Articles Grid */}
                        {!loading && !error && articles.length > 0 && (
                          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
                            {articles.map((article, index) => (
                              <div
                                key={article.id}
                                className="animate-fade-in"
                                style={{
                                  animationDelay: `${index * 100}ms`,
                                  animationFillMode: 'both'
                                }}
                              >
                                <ArticleCard
                                  article={article}
                                  onReadMore={handleReadMore}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* No Articles State */}
                        {!loading && !error && articles.length === 0 && (
                          <div className="text-center py-12">
                            <div className="text-6xl mb-4">📰</div>
                            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                            <p className="text-muted-foreground">
                              Try adjusting your search or category filter
                            </p>
                          </div>
                        )}

                        {/* Pagination */}
                        {!loading && !error && totalPages > 1 && (
                          <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        )}
                      </>
                    )}
                  </div>
                } />
              </Routes>
            </main>

            <Footer />

            {/* Article Modal */}
            <ArticleModal
              article={selectedArticle}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            <Toaster />
          </div>
        </BrowserRouter>
      </BookmarkProvider>
    </ThemeProvider>
  )
}

export default App