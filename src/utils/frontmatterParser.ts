import { marked } from 'marked'

export interface ParsedPost {
    title: string
    date: string
    description: string
    content: string
}

export function parseFrontmatter(content: string): ParsedPost | null {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) return null

  const frontmatterText = match[1]
  const markdown = match[2]

  const metadata: Record<string, string> = {}
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim()
    }
  })

  if (!metadata.title || !metadata.date || !metadata.description) return null

  const htmlContent = typeof marked.parse === 'function'
    ? marked.parse(markdown) as string
    : marked(markdown) as string 

  return {
    title: metadata.title,
    date: metadata.date,
    description: metadata.description,
    content: htmlContent
  }
}