import { useEffect } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface SEOProps {
  title: string
  description: string
  path: string
  faqs?: FAQItem[]
}

function setMeta(nameOrProp: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${nameOrProp}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(nameOrProp, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const FAQ_SCRIPT_ID = 'faq-structured-data'

export function useSEO({ title, description, path, faqs }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Akro Ventures`
    const url = `https://akroventures.com${path}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // FAQPage structured data — lets AI answer engines (Google AI Overview,
    // ChatGPT, Perplexity) extract and cite these Q&A pairs directly.
    document.getElementById(FAQ_SCRIPT_ID)?.remove()
    if (faqs && faqs.length > 0) {
      const script = document.createElement('script')
      script.id = FAQ_SCRIPT_ID
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      })
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(FAQ_SCRIPT_ID)?.remove()
    }
  }, [title, description, path, faqs])
}
