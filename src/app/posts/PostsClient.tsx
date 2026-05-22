'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import PostCard from '@/components/posts/PostCard'
import type { Post } from '@/lib/types'

export default function PostsClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (!error && data) {
        setPosts(data)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">所有文章</h1>

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
    </div>
  )
}
