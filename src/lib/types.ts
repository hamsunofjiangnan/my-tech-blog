export interface Post {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string | null
  cover_image: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  view_count: number
  tags: string[]
}

export interface Comment {
  id: string
  post_id: string
  parent_id: string | null
  author_name: string
  author_email: string | null
  content: string
  approved: boolean
  created_at: string
  children?: Comment[]
}

export interface Visitor {
  id: string
  session_id: string
  page_url: string
  user_agent: string | null
  referrer: string | null
  visited_at: string
}
