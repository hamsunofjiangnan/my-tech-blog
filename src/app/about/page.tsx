export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            你好！欢迎来到我的技术博客。
          </p>

          <p>
            这是一个使用 Next.js 和 Supabase 构建的个人博客，主要分享我在技术学习和实践过程中的一些心得体会。
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">技术栈</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Next.js - React 框架</li>
            <li>Supabase - 后端即服务</li>
            <li>TypeScript - 类型安全</li>
            <li>Tailwind CSS - 样式设计</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">联系方式</h2>
          <p>
            如果你有任何问题或建议，欢迎通过博客评论与我交流。
          </p>
        </div>
      </div>
    </div>
  )
}
