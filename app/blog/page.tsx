import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog - Software Engineering Articles & Tutorials',
  description:
    'Read in-depth articles about backend development, system architecture, Go programming, microservices, and software engineering best practices. Stay updated with the latest tech trends and practical tutorials.',
  keywords: [
    'software engineering blog',
    'backend development articles',
    'programming tutorials',
    'system architecture',
    'Go programming guides',
    'microservices patterns',
    'technical blog posts',
    'software development insights',
  ],
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
