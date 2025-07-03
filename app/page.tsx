import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({
  title: 'Better Engineer - Technical Blog & Software Development Insights',
  description:
    'Explore backend software engineering, system architecture, Go programming, microservices, and modern development practices. Learn from real-world experience in building scalable systems.',
  keywords: [
    'software engineering',
    'backend development',
    'system architecture',
    'Go programming',
    'microservices',
    'database design',
    'API development',
    'scalable systems',
    'DevOps',
    'cloud computing',
    'programming tutorials',
    'tech blog',
  ],
})

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
