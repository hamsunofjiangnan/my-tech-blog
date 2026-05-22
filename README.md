# 个人技术博客

基于 Next.js + Supabase + GitHub Pages 构建的个人博客系统。

## 功能特性

- 📄 文章展示与阅读
- 💬 评论系统（需审核）
- 👥 访客统计
- 📱 响应式设计
- 🚀 自动部署到 GitHub Pages

## 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **后端**: Supabase (PostgreSQL + 实时订阅)
- **部署**: GitHub Pages + GitHub Actions

## 快速开始

### 1. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 打开 SQL Editor，执行 `supabase-schema.sql` 中的 SQL 脚本
3. 获取项目 URL 和 Anon Key（Settings → API）

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 4. 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings → Secrets 中添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 在 Settings → Pages 中设置 Source 为 "GitHub Actions"
4. 推送代码到 main 分支，自动触发部署

## 项目结构

```
my-blog/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── lib/             # 工具函数和配置
│   └── hooks/           # 自定义 Hooks
├── supabase-schema.sql  # 数据库初始化脚本
└── .github/workflows/   # GitHub Actions 配置
```

## 数据库表结构

- **posts**: 文章表
- **comments**: 评论表（支持审核）
- **visitors**: 访客统计表

## 注意事项

- 评论需要管理员在 Supabase 中审核后才会显示
- 文章通过 Supabase Dashboard 或 SQL 直接管理
- 构建时如果没有配置环境变量，会显示空状态
