// app/(user)/hirek/page.tsx
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'
import { PostLimitSelect } from '@/components/PostLimitSelect'
import { Pagination } from '@/components/Pagination'

export const revalidate = 2592000

export const metadata = {
  title: 'Hírek & Események | Bizánci Forrás Kulturális Egyesület',
  description: 'Beszámolók, események és aktuális hírek az egyesület életéből.',
}

const HIREK_QUERY = `
  {
    "posts": *[_type == "post" && defined(slug.current) && "hirek" in categories[]->slug.current] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "authorName": author->name
    },
    "total": count(*[_type == "post" && defined(slug.current) && "hirek" in categories[]->slug.current])
  }
`

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  mainImage?: any
  authorName?: string
}

interface PageData {
  posts: Post[]
  total: number
}

interface PageProps {
  searchParams: Promise<{ limit?: string; page?: string }>
}

export default async function HirekPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  
  const parsedLimit = Number(resolvedParams?.limit)
  const validLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10
  const limit = Math.min(validLimit, 50)
  
  const parsedPage = Number(resolvedParams?.page)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const start = (page - 1) * limit
  const end = page * limit

  const { posts, total }: PageData = await client.fetch(HIREK_QUERY, { start, end })
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12 pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Aktualitások
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Hírek & Események
          </h1>

          <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
            Közösségi és liturgikus alkalmak, konferenciák és egyesületi beszámolók.
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <Suspense fallback={null}>
            <PostLimitSelect defaultLimit={10} options={[6, 10, 20, 50]} />
          </Suspense>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-stone-200 rounded-sm">
            <p className="font-serif text-stone-600 italic">
              Jelenleg nincsenek közzétett hírek.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {posts.map((post) => {
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : null

                return (
                  <article key={post._id} className="flex flex-col justify-between border-b border-stone-200 pb-10 group">
                    <div>
                      {post.mainImage && (
                        <Link href={`/hirek/${post.slug.current}`} className="block mb-6 overflow-hidden rounded-sm relative aspect-[16/9] bg-stone-100">
                          <Image
                            src={urlFor(post.mainImage).width(800).height(450).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                      )}

                      <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-stone-500 mb-3">
                        {formattedDate && <span>{formattedDate}</span>}
                        {formattedDate && post.authorName && <span>•</span>}
                        {post.authorName && (
                          <span className="font-medium text-amber-900">
                            {post.authorName}
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl font-normal text-stone-900 group-hover:text-amber-900 transition-colors mb-3 leading-snug">
                        <Link href={`/hirek/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h2>
                    </div>

                    <Link href={`/hirek/${post.slug.current}`} className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors pt-2">
                      Tovább a hírre &rarr;
                    </Link>
                  </article>
                )
              })}
            </div>

            <Suspense fallback={null}>
              <Pagination totalPages={totalPages} />
            </Suspense>
          </>
        )}

      </div>
    </div>
  )
}