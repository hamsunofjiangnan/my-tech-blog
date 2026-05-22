'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface CommentFormProps {
  postId: string
  onCommentSubmitted?: () => void
}

export default function CommentForm({ postId, onCommentSubmitted }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authorName.trim() || !content.trim()) {
      setMessage('请填写昵称和评论内容')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      author_name: authorName.trim(),
      content: content.trim(),
      approved: false,
    })

    setLoading(false)

    if (error) {
      setMessage('提交失败，请稍后重试')
      console.error('Comment error:', error)
    } else {
      setMessage('评论已提交，等待审核后显示')
      setAuthorName('')
      setContent('')
      onCommentSubmitted?.()
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">发表评论</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
            昵称 *
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入昵称"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            评论内容 *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="请输入评论内容"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '提交中...' : '提交评论'}
        </button>
        {message && (
          <p className={`text-sm ${message.includes('失败') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
