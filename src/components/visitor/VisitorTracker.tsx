'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface VisitorTrackerProps {
  pageUrl: string
}

export default function VisitorTracker({ pageUrl }: VisitorTrackerProps) {
  useEffect(() => {
    async function trackVisitor() {
      try {
        let sessionId = sessionStorage.getItem('visitor_session')
        if (!sessionId) {
          sessionId = crypto.randomUUID()
          sessionStorage.setItem('visitor_session', sessionId)
        }

        await supabase.from('visitors').insert({
          session_id: sessionId,
          page_url: pageUrl,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        })
      } catch (error) {
        console.error('Visitor tracking error:', error)
      }
    }
    trackVisitor()
  }, [pageUrl])

  return null
}
