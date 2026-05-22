'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Comment } from '@/lib/types'

interface CommentListProps {
  postId: string
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('approved', true)
        .eq('parent_id', null)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setComments(data)
      }
      setLoading(false)
    }
    fetchComments()
  }, [postId])

  if (loading) {
    return <div className="text-gray-500">加载评论...</div>
  }

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 py-4">
        暂无评论，期待你的发言！
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-900">
        评论 ({comments.length})
      </h3>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-900">{comment.author_name}</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleDateString('zh-CN')}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
