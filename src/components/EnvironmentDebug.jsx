import React from 'react'

const EnvironmentDebug = () => {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY
  
  return (
    <div className="fixed bottom-4 left-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm text-xs">
      <h3 className="font-bold mb-2">🔧 Environment Debug</h3>
      <div className="space-y-1">
        <div>API Key: {apiKey ? '✅ SET' : '❌ NOT SET'}</div>
        <div>Node Env: {import.meta.env.MODE}</div>
        <div>Import Meta: {import.meta.env ? 'Available' : 'Not Available'}</div>
        <div>Vite Mode: {import.meta.env.MODE}</div>
      </div>
    </div>
  )
}

export default EnvironmentDebug 