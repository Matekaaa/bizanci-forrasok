import { cache } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'

export const revalidate = 2592000

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    mainImage,
    body,
    "author": author->{
      name
    }
  }
`

interface Props {
  params: Promise<{ slug: string }>
}

const getPost = cache(async (slug: string) => {
  return await client.fetch(POST_QUERY, { slug })
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined
  const defaultDesc = 'Beszámolók, események és aktuális hírek az egyesület életéből.'

  return {
    title: `${post.title} | Hírek & Események | Bizánci Forrás`,
    description: defaultDesc,
    openGraph: {
      title: `${post.title} | Hírek & Események | Bizánci Forrás`,
      description: defaultDesc,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  }
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8 overflow-hidden rounded-sm border border-stone-200 bg-stone-50">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || 'Hír illusztráció'}
            width={900}
            height={600}
            className="w-full h-auto object-cover"
          />
          {value.alt && (
            <figcaption className="p-2 text-center text-xs text-stone-500 font-serif italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-800 marker:text-amber-900">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-stone-800 marker:text-amber-900">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-1 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="pl-1 leading-relaxed">{children}</li>,
  },
  block: {
    normal: ({ children }: any) => <p className="mb-5 leading-relaxed">{children}</p>,
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-amber-800 pl-6 my-8 italic text-stone-700 bg-stone-100/50 py-3 rounded-r">
        {children}
      </blockquote>
    ),
  },
}

export default async function HirDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

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
        
        <div className="mb-10">
          <Link
            href="/hirek"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-900 transition-colors inline-flex items-center gap-2"
          >
            &larr; Vissza a hírekhez
          </Link>
        </div>

        <header className="mb-12 text-center border-b border-stone-200 pb-10">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-wider text-stone-500 mb-4">
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && post.author?.name && <span>•</span>}
            {post.author?.name && (
              <span className="font-semibold text-amber-900">
                {post.author.name}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 leading-tight mb-6">
            {post.title}
          </h1>
        </header>

        {post.mainImage && (
          <div className="mb-12 overflow-hidden rounded-sm relative aspect-[16/9] w-full border border-stone-200 shadow-sm">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.mainImage.alt || post.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="font-serif text-stone-800 text-lg leading-relaxed">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="italic text-stone-400 text-base">Nincs elérhető leírás.</p>
          )}
        </div>

      </div>
    </article>
  )
}