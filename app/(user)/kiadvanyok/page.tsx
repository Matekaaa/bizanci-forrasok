import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'

export const revalidate = 60

export const metadata = {
  title: 'Kiadványok | Bizánci Forrás Kulturális Egyesület',
  description: 'Könyvek, liturgikus fordítások és kiadványok.',
}

const KIADVANYOK_QUERY = `
  *[_type == "post" && defined(slug.current) && "kiadvanyok" in categories[]->slug.current] | order(publishedAt desc) {
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

export default async function KiadvanyokPage() {
  const posts: Post[] = await client.fetch(KIADVANYOK_QUERY)

  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16 pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Könyvek & Folyóiratok
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Kiadványaink
          </h1>

          <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
            Az egyesület által gondozott teológiai munkák, liturgikus könyvek és tanulmánykötetek.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-stone-200 rounded-sm">
            <p className="font-serif text-stone-600 italic">
              Jelenleg nincsenek közzétett kiadványok.
            </p>
          </div>
        ) : (
          /* 3 hasábos könyvrács álló borítókkal */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {posts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col justify-between border border-stone-200 p-6 bg-white rounded-sm shadow-sm group hover:border-stone-400 transition-colors"
              >
                <div>
                  {post.mainImage && (
                    <Link
                      href={`/kiadvanyok/${post.slug.current}`}
                      className="block mb-6 overflow-hidden rounded-sm relative aspect-[3/4] w-full max-w-[260px] mx-auto bg-stone-100 shadow-md group-hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={urlFor(post.mainImage).width(600).height(800).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  {post.authorName && (
                    <p className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-2 text-center">
                      {post.authorName}
                    </p>
                  )}

                  <h2 className="font-serif text-xl font-normal text-stone-900 group-hover:text-amber-900 transition-colors mb-4 text-center leading-snug">
                    <Link href={`/kiadvanyok/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                </div>

                <div className="pt-4 border-t border-stone-100 text-center">
                  <Link
                    href={`/kiadvanyok/${post.slug.current}`}
                    className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors"
                  >
                    Részletek & Rendelés &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}