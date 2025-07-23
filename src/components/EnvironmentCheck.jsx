import React from 'react'

const EnvironmentCheck = () => {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY
  
  if (!apiKey) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <h3 className="font-bold mb-2">⚠️ Environment Issue</h3>
        <p className="text-sm mb-2">VITE_NEWSAPI_KEY is not set</p>
        <p className="text-xs opacity-75">
          Add your NewsAPI key to Vercel environment variables
        </p>
      </div>
    )
  }
  
  return null
}

export default EnvironmentCheck 