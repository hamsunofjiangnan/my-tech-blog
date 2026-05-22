'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CommentForm from '@/components/comments/CommentForm'
import CommentList from '@/components/comments/CommentList'
import VisitorTracker from '@/components/visitor/VisitorTracker'
import type { Post } from '@/lib/types'

function PostContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      // Use requestAnimationFrame to avoid synchronous setState in effect
      requestAnimationFrame(() => setLoading(false))
      return
    }

    let cancelled = false

    async function fetchPost() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (!cancelled) {
        if (data) {
          setPost(data)
          supabase.rpc('increment_view_count', { post_slug: slug })
        }
        setLoading(false)
      }
    }

    fetchPost()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-gray-500">加载中...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-gray-500">文章不存在</div>
      </div>
    )
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <time dateTime={post.published_at || undefined}>{formattedDate}</time>
            <span>阅读 {post.view_count} 次</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <CommentList postId={post.id} />
      <CommentForm postId={post.id} />

      <VisitorTracker pageUrl={`/post/?slug=${post.slug}`} />
    </div>
  )
}

export default function PostPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">加载中...</div>}>
      <PostContent />
    </Suspense>
  )
}
