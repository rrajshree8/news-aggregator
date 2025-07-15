import React from 'react'
import { X, Calendar, User, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useBookmark } from '../contexts/BookmarkContext'

const ArticleModal = ({ article, isOpen, onClose }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmark()

  if (!isOpen || !article) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleBookmarkToggle = () => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      technology: 'bg-red-500/10 text-red-700 dark:text-red-400',
      business: 'bg-red-500/10 text-red-700 dark:text-red-400',
      entertainment: 'bg-red-500/10 text-red-700 dark:text-red-400',
      health: 'bg-red-500/10 text-red-700 dark:text-red-400',
      science: 'bg-red-500/10 text-red-700 dark:text-red-400',
      sports: 'bg-red-500/10 text-red-700 dark:text-red-400',
      general: 'bg-red-500/10 text-red-700 dark:text-red-400'
    }
    return colors[category] || colors.general
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <span className="text-sm font-medium text-muted-foreground">
                {article.source.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmarkToggle}
                className="transition-all duration-200 hover:scale-105"
              >
                {isBookmarked(article.id) ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="transition-all duration-200 hover:scale-105"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Article Image */}
          {article.urlToImage && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          {/* Article Title */}
          <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-b border-border/40 pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.author && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Description */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* External Link */}
          <div className="flex items-center justify-center pt-6 border-t border-border/40">
            <Button
              onClick={() => window.open(article.url, '_blank')}
              className="transition-all duration-200 hover:scale-105"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Read Full Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal