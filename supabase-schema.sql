-- ============================================
-- Supabase 博客数据库设置脚本
-- ============================================
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本
-- ============================================

-- 1. 创建文章表 (posts)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(1000),
  cover_image TEXT,
  author_id UUID,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}'
);

-- 2. 创建访客统计表 (visitors)
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  page_url TEXT NOT NULL,
  referrer TEXT,
  visited_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 创建评论表 (comments)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 启用 Row Level Security (RLS)
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Posts RLS 策略
-- ============================================

-- 公开读取已发布文章
CREATE POLICY "Public posts are viewable by everyone"
ON posts FOR SELECT
USING (published = true);

-- 允许插入文章（根据需要调整）
CREATE POLICY "Allow insert posts"
ON posts FOR INSERT
WITH CHECK (true);

-- 允许更新文章（根据需要调整）
CREATE POLICY "Allow update posts"
ON posts FOR UPDATE
USING (true);

-- ============================================
-- Visitors RLS 策略
-- ============================================

-- 允许任何人记录访客
CREATE POLICY "Anyone can track visitors"
ON visitors FOR INSERT
WITH CHECK (true);

-- ============================================
-- Comments RLS 策略
-- ============================================

-- 公开读取已审核评论
CREATE POLICY "Approved comments are viewable"
ON comments FOR SELECT
USING (approved = true);

-- 允许提交评论（待审核）
CREATE POLICY "Anyone can submit comments"
ON comments FOR INSERT
WITH CHECK (true);

-- 允许更新评论（根据需要）
CREATE POLICY "Allow update comments"
ON comments FOR UPDATE
USING (true);

-- ============================================
-- 创建函数：增加浏览量
-- ============================================
CREATE OR REPLACE FUNCTION increment_view_count(post_slug VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 创建索引优化查询性能
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_visitors_session_id ON visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON visitors(visited_at DESC);

-- ============================================
-- 插入示例数据
-- ============================================
INSERT INTO posts (slug, title, content, excerpt, published, published_at, tags) VALUES
(
  'welcome-to-my-blog',
  '欢迎来到我的技术博客',
  '这是一篇关于如何搭建个人技术博客的教程文章。我们将使用 Next.js 和 Supabase 来构建一个现代化的博客系统，支持文章发布、评论互动和访客统计功能。',
  '本文介绍如何使用 Next.js 和 Supabase 搭建个人技术博客',
  true,
  NOW(),
  ARRAY['Next.js', 'Supabase', '教程']
),
(
  'understanding-supabase',
  '深入理解 Supabase 数据库设计',
  'Supabase 是一个开源的 Firebase 替代品，提供了 PostgreSQL 数据库、实时订阅、身份认证等功能。本文将深入讲解如何在 Supabase 中设计数据库表结构和安全策略。',
  '深入理解 Supabase 数据库设计和最佳实践',
  true,
  NOW() - INTERVAL '1 day',
  ARRAY['Supabase', 'PostgreSQL', '数据库']
),
(
  'nextjs-static-export',
  'Next.js 静态导出完全指南',
  '当你需要将 Next.js 应用部署到不支持服务端渲染的平台（如 GitHub Pages）时，静态导出是一个很好的选择。本文详细介绍如何配置 Next.js 实现静态导出。',
  'Next.js 静态导出配置和部署指南',
  true,
  NOW() - INTERVAL '3 days',
  ARRAY['Next.js', 'GitHub Pages', '部署']
);
