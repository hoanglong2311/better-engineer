import siteMetadata from '@/data/siteMetadata'

interface BlogPostStructuredDataProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
  image?: string
  tags?: string[]
}

interface WebsiteStructuredDataProps {
  url?: string
}

export function BlogPostStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url,
  image,
  tags,
}: BlogPostStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
      url: siteMetadata.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    ...(tags && {
      keywords: tags.join(', '),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ url }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: url || siteMetadata.siteUrl,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function PersonStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    ...(siteMetadata.email && { email: siteMetadata.email }),
    sameAs: [
      siteMetadata.github,
      siteMetadata.linkedin,
      siteMetadata.twitter,
    ].filter(Boolean),
    jobTitle: 'Software Engineer',
    description: 'Backend Software Engineer specializing in scalable systems and modern architecture',
    knowsAbout: [
      'Software Engineering',
      'Backend Development',
      'System Architecture',
      'Database Design',
      'API Development',
      'Go Programming',
      'Microservices',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    description: siteMetadata.description,
    founder: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    sameAs: [
      siteMetadata.github,
      siteMetadata.linkedin,
      siteMetadata.twitter,
    ].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 