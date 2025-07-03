import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  url?: string
  type?: 'website' | 'article'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  url,
  type = 'website',
  ...rest
}: PageSEOProps): Metadata {
  const pageTitle = title.includes(siteMetadata.title) ? title : `${title} | ${siteMetadata.title}`
  const pageDescription = description || siteMetadata.description
  const pageImage = image ? [image] : [siteMetadata.socialBanner]
  const pageUrl = url || './'

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || [
      'software engineering',
      'backend development',
      'programming',
      'technical blog',
    ],
    authors: [{ name: author || siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteMetadata.title,
      images: pageImage,
      locale: 'en_US',
      type: type,
      ...(type === 'article' &&
        publishedTime && {
          publishedTime,
          ...(modifiedTime && { modifiedTime }),
          authors: [author || siteMetadata.author],
          section: 'Technology',
          tags: keywords,
        }),
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      card: 'summary_large_image',
      images: pageImage,
      creator: '@longnguyenhoang',
      site: '@longnguyenhoang',
    },
    alternates: {
      canonical: pageUrl,
    },
    ...rest,
  }
}

// Enhanced metadata for blog posts
export function genBlogPostMetadata({
  title,
  description,
  tags,
  date,
  lastmod,
  images,
  slug,
  author,
}: {
  title: string
  description?: string
  tags?: string[]
  date: string
  lastmod?: string
  images?: string[]
  slug: string
  author?: string
}): Metadata {
  const url = `${siteMetadata.siteUrl}/blog/${slug}`

  return genPageMetadata({
    title,
    description,
    keywords: tags,
    author,
    publishedTime: date,
    modifiedTime: lastmod || date,
    url,
    type: 'article',
    image: images?.[0],
  })
}
