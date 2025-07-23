import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <img src="/news.png" alt="News" className="w-20 h-20" />
              <div className="text-2xl font-black bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                NewsHub
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Your trusted source for the latest news from around the world. 
              Stay informed with our comprehensive coverage across all categories.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by NewsHub Team</span>
          </p>
          <p className="mt-2">
            © 2025 NewsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer