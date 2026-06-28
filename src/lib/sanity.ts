import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'placeholder',
  dataset:   import.meta.env.VITE_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  readTime: number
  coverImage?: { asset: { url: string }; alt?: string }
  author?: string
}

export interface PostDetail extends Post {
  body: unknown // PortableText blocks
}

// ── Queries ───────────────────────────────────────────────────────────────────

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, category, readTime,
    "coverImage": coverImage { alt, asset->{ url } },
    author
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, category, readTime, body,
    "coverImage": coverImage { alt, asset->{ url } },
    author
  }
`
