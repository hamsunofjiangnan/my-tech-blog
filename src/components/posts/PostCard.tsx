import Link from 'next/link'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <Link href={`/post/?slug=${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {post.excerpt || post.content.substring(0, 150) + '...'}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <time dateTime={post.published_at || undefined}>{formattedDate}</time>
        <div className="flex gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
