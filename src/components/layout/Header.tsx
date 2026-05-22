import Link from 'next/link'

const BASE_PATH = '/my-tech-blog'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={BASE_PATH + '/'} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          技术博客
        </Link>
        <nav className="flex items-center gap-6">
          <Link href={BASE_PATH + '/'} className="text-gray-600 hover:text-blue-600 transition-colors">
            首页
          </Link>
          <Link href={BASE_PATH + '/posts'} className="text-gray-600 hover:text-blue-600 transition-colors">
            文章
          </Link>
          <Link href={BASE_PATH + '/about'} className="text-gray-600 hover:text-blue-600 transition-colors">
            关于
          </Link>
        </nav>
      </div>
    </header>
  )
}      
