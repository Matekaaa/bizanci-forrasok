import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'

export const revalidate = 60

export const metadata = {
  title: 'Gondolatok | Bizánci Forrás Kulturális Egyesület',
  description: 'Teológiai esszék, patrisztikus elmélkedések és szellemi írások.',
}

const GONDOLATOK_QUERY = `
  *[_type == "post" && defined(slug.current) && "gondolatok" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "authorName": author->name
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

export default async function GondolatokPage() {
  const posts: Post[] = await client.fetch(GONDOLATOK_QUERY)

  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Fejléc */}
        <div className="text-center max-w-2xl mx-auto mb-16 pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Esszék & Elmélkedések
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Gondolatok
          </h1>

          <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
            Rövid írások a bizánci lelkiségről, az egyházatyák útmutatásairól és az imádságos életről.
          </p>
        </div>

        {/* Nincs még poszt állapot */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-stone-200 rounded-sm">
            <p className="font-serif text-stone-600 italic">
              Jelenleg nincsenek közzétett írások ebben a rovatban.
            </p>
            <p className="text-xs text-stone-400 mt-2">
              (A Sanity-ben hozz létre egy posztot, amely a „gondolatok” kategóriára hivatkozik.)
            </p>
          </div>
        ) : (
          /* Posztok listája */
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
                <article
                  key={post._id}
                  className="flex flex-col justify-between border-b border-stone-200 pb-10 group"
                >
                  <div>
                    {post.mainImage && (
                      <Link
                        href={`/gondolatok/${post.slug.current}`}
                        className="block mb-6 overflow-hidden rounded-sm relative aspect-[16/9] bg-stone-100"
                      >
                        <Image
                          src={urlFor(post.mainImage).width(800).height(450).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
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
                      <Link href={`/gondolatok/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h2>
                  </div>

                  <Link
                    href={`/gondolatok/${post.slug.current}`}
                    className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors pt-2"
                  >
                    Tovább az írásra &rarr;
                  </Link>
                </article>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}