import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'

export const revalidate = 2592000

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  mainImage?: any
  body?: any
  authorName?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug && "teologia" in categories[]->slug.current][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    "authorName": author->name
  }
`

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(`
    *[_type == "post" && defined(slug.current) && "teologia" in categories[]->slug.current] {
      "slug": slug.current
    }
  `)

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post: Post | null = await client.fetch(POST_QUERY, { slug })

  if (!post) {
    return {
      title: 'Írás nem található | Bizánci Forrás',
    }
  }

  return {
    title: `${post.title} | Bizánci Forrás Kulturális Egyesület`,
    description: post.authorName
      ? `${post.authorName} teológiai írása az ortodox tanítás köréből.`
      : 'Ortodox teológiai tanulmány.',
  }
}

export default async function TeologiaPostPage({ params }: PageProps) {
  const { slug } = await params
  const post: Post | null = await client.fetch(POST_QUERY, { slug })

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="mb-8">
          <Link
            href="/teologia"
            className="text-xs uppercase tracking-wider font-semibold text-stone-500 hover:text-amber-900 transition-colors inline-flex items-center gap-1"
          >
            &larr; Vissza a teológiai írásokhoz
          </Link>
        </div>

        <header className="mb-10 pb-8 border-b border-stone-200">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-stone-500 mb-4">
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && post.authorName && <span>•</span>}
            {post.authorName && (
              <span className="font-medium text-amber-900">
                {post.authorName}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        {post.mainImage && (
          <div className="mb-12 overflow-hidden rounded-sm relative aspect-[16/9] bg-stone-100 border border-stone-200">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.mainImage.alt || post.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="font-serif text-stone-800 text-lg leading-relaxed space-y-6 prose prose-stone prose-amber max-w-none">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="italic text-stone-500">Az írás szövege hamarosan elérhető.</p>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
          <Link
            href="/teologia"
            className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors"
          >
            &larr; Vissza a gyűjteményhez
          </Link>
        </div>

      </div>
    </article>
  )
}