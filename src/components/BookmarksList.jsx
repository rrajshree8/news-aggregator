import React from 'react'
import { BookmarkX, Calendar, User, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useBookmark } from '../contexts/BookmarkContext'

const BookmarksList = ({ onReadMore }) => {
  const { bookmarks, removeBookmark } = useBookmark()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
          <BookmarkX className="w-full h-full" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No bookmarks yet
        </h3>
        <p className="text-muted-foreground">
          Start bookmarking articles to read them later
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bookmarked Articles</h2>
        <span className="text-sm text-muted-foreground">
          {bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((article) => (
          <Card key={article.id} className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-muted/50 relative">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none'
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
                    onClick={() => removeBookmark(article.id)}
                    className="absolute top-3 right-3 bg-red-500/20 hover:bg-red-500/40 text-white backdrop-blur-sm"
                  >
                    <BookmarkX className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
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
                  className="text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105"
                >
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BookmarksList