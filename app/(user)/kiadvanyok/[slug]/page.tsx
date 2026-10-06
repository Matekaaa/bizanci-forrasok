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
  const defaultDesc = 'Könyvek, liturgikus fordítások és kiadványok.'

  return {
    title: `${post.title} | Kiadványok | Bizánci Forrás`,
    description: defaultDesc,
    openGraph: {
      title: `${post.title} | Kiadványok | Bizánci Forrás`,
      description: defaultDesc,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  }
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8 overflow-hidden rounded-sm border border-stone-200 bg-stone-50">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || 'Kiadvány illusztráció'}
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
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl font-medium text-stone-900 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl font-medium text-stone-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-amber-800 pl-6 my-6 italic text-stone-700 bg-stone-100/50 py-2">
        {children}
      </blockquote>
    ),
  },
}

export default async function KiadvanyDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-10">
          <Link
            href="/kiadvanyok"
            className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-900 transition-colors inline-flex items-center gap-2"
          >
            &larr; Vissza a kiadványokhoz
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="md:col-span-5">
            {post.mainImage && (
              <div className="overflow-hidden rounded-sm relative aspect-[3/4] w-full border border-stone-200 shadow-lg bg-stone-100 mb-8">
                <Image
                  src={urlFor(post.mainImage).width(750).height(1000).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-6 bg-white border border-stone-200 rounded-sm space-y-3">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Kiadvány igénylése
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kiadványainkat postai úton vagy személyesen juttatjuk el. Rendelési szándékát jelezze kapcsolatfelvételi oldalunkon keresztül.
              </p>
              <Link
                href="/kapcsolat"
                className="inline-block w-full text-center py-2.5 px-4 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors mt-2"
              >
                Kapcsolatfelvétel &rarr;
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            {post.author?.name && (
              <span className="text-xs uppercase tracking-wider text-amber-900 font-semibold block mb-2">
                {post.author.name}
              </span>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight mb-8">
              {post.title}
            </h1>

            <div className="font-serif text-stone-800 text-base md:text-lg leading-relaxed">
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="italic text-stone-400 text-base">Nincs elérhető leírás erről a kiadványról.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </article>
  )
}