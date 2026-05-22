'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PostCard from '@/components/posts/PostCard'
import type { Post } from '@/lib/types'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(6)

      if (!error && data) {
        setPosts(data)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到我的技术博客
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          分享技术心得，记录成长历程
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/posts"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            浏览文章
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            关于我
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            查看全部 →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">加载中...</div>
        ) : posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            暂无文章，敬请期待！
          </div>
        )}
      </section>
    </div>
  )
}
