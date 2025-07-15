import React, { createContext, useContext, useState, useEffect } from 'react'

const BookmarkContext = createContext({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
})

export const useBookmark = () => {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider')
  }
  return context
}

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('news-bookmarks')
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('news-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (article) => {
    setBookmarks(prev => [...prev, article])
  }

  const removeBookmark = (articleId) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== articleId))
  }

  const isBookmarked = (articleId) => {
    return bookmarks.some(bookmark => bookmark.id === articleId)
  }

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}