import Link from 'next/link'

const BASE_PATH = '/my-tech-blog'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © {currentYear} 技术博客. All rights reserved.
          </div>
          <nav className="flex items-center gap-6 text-sm">
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
      </div>
    </footer>
  )
}
