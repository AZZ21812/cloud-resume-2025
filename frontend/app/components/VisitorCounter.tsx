'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_COUNTER_API || 'https://3fednny2psoslmrcesjkexjtsy0yauae.lambda-url.us-east-1.on.aws/'

      if (!apiUrl) {
        setError('Counter API URL not configured')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch visitor count')
        }

        const data = await response.json()
        setCount(data.count)
        setError(null)
      } catch (err) {
        console.error('Error fetching visitor count:', err)
        setError('Unable to load count')
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
        <Eye className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
        <Eye className="w-4 h-4" />
        <span className="text-sm">{error}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full shadow-sm">
      <Eye className="w-4 h-4" />
      <span className="text-sm font-medium">
        {count?.toLocaleString()} {count === 1 ? 'visitor' : 'visitors'}
      </span>
    </div>
  )
}
