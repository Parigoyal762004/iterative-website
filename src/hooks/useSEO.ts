import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  path: string
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

export function useSEO({ title, description, path }: SEOProps) {
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
  }, [title, description, path])
}
