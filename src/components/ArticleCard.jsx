import React, { useState } from 'react'
import { Calendar, User, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useBookmark } from '../contexts/BookmarkContext'

const ArticleCard = ({ article, onReadMore }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmark()
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    <Card className="group h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 bg-white dark:bg-zinc-900 backdrop-blur-sm border-red-200/50 dark:border-red-800/50 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <div className="aspect-video bg-muted/50 relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse" />
            )}
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none'
                setImageLoaded(true)
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkToggle}
              className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              {isBookmarked(article.id) ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {article.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span className="truncate max-w-20">{article.author}</span>
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {article.source.name}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
                      <Button
              variant="ghost"
              size="sm"
              onClick={() => onReadMore(article)}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Read More
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ArticleCard