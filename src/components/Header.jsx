import React, { useState } from 'react'
import { Search, Moon, Sun, Bookmark, Menu, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Header = ({ onSearch, onCategoryChange, selectedCategory, onShowBookmarks, showBookmarks }) => {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Categories moved to main content area

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 backdrop-blur-xl border-b border-red-200 dark:border-red-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/news.png" alt="News" className="w-10 h-10" />
            <div className="text-3xl font-black bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
              NewsHub
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* Removed category navigation - will be moved to main content */}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search - Hidden on mobile, shown in mobile menu */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-48 md:w-64 bg-white dark:bg-zinc-800 backdrop-blur-sm border-red-200 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300 rounded-xl"
              />
            </form>

            {/* Bookmarks */}
            <Button
              variant={showBookmarks ? 'default' : 'ghost'}
              size="sm"
              onClick={onShowBookmarks}
              className="transition-all duration-200 hover:scale-105"
            >
              <Bookmark className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="transition-all duration-200 hover:scale-105"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="space-y-4 mt-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full bg-white dark:bg-zinc-800 backdrop-blur-sm border-red-200 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300 rounded-xl"
                />
              </form>
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant={showBookmarks ? 'default' : 'ghost'}
                  size="sm"
                  onClick={onShowBookmarks}
                  className="flex-1 mr-2"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarks
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark' : 'Light'}
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header