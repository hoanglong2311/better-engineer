import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ 
  title: 'About Long Nguyen - Backend Software Engineer',
  description: 'Learn about Long Nguyen, a passionate backend software engineer specializing in scalable systems, Go programming, microservices architecture, and modern development practices.',
  keywords: [
    'Long Nguyen',
    'software engineer',
    'backend developer',
    'Go programmer',
    'system architect',
    'microservices expert',
    'DevOps engineer',
    'full-stack developer',
  ],
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
