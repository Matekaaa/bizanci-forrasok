import { Suspense } from 'react'
import Image from 'next/image'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'
import { PostLimitSelect } from '@/components/PostLimitSelect'
import { Pagination } from '@/components/Pagination'
import { AudioPlayer } from '@/components/AudioPlayer'

export const revalidate = 2592000

export const metadata = {
  title: 'Hangtár | Bizánci Forrás Kulturális Egyesület',
  description: 'Az elhangzott Bizánci Forrás rádióadások archívuma.',
  referrer: 'no-referrer',
}

const PROXY_BASE = 'https://audio-proxy.szendrey-mate.workers.dev/'

function formatAudioUrl(url: string) {
  if (url.startsWith('https://hangtar.mariaradio.hu/')) {
    return url.replace('https://hangtar.mariaradio.hu', PROXY_BASE)
  }
  return url
}

const PODCAST_QUERY = `
  {
    "episodes": *[_type == "post" && defined(slug.current) && "podcast" in categories[]->slug.current] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      publishedAt,
      audioUrl,
      mainImage,
      "authorName": author->name
    },
    "total": count(*[_type == "post" && defined(slug.current) && "podcast" in categories[]->slug.current])
  }
`

interface Episode {
  _id: string
  title: string
  publishedAt?: string
  audioUrl?: string
  mainImage?: any
  authorName?: string
}

interface PageData {
  episodes: Episode[]
  total: number
}

interface PageProps {
  searchParams: Promise<{ limit?: string; page?: string }>
}

export default async function HangtarPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams

  const parsedLimit = Number(resolvedParams?.limit)
  const validLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 6
  const limit = Math.min(validLimit, 48)

  const parsedPage = Number(resolvedParams?.page)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const start = (page - 1) * limit
  const end = page * limit

  const { episodes, total }: PageData = await client.fetch(PODCAST_QUERY, { start, end })
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Fejléc */}
        <div className="text-center max-w-2xl mx-auto mb-12 pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Hangtár
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Hangtár
          </h1>

          <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
            A Mária Rádióban elhangzó Bizánci Forrás adások visszahallgatható gyűjteménye.
          </p>
        </div>

        {/* Elemek száma választó */}
        <div className="flex justify-end mb-8">
          <Suspense fallback={null}>
            <PostLimitSelect defaultLimit={6} options={[3, 6, 9]} />
          </Suspense>
        </div>

        {/* Üres lista állapot */}
        {episodes.length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-stone-200 rounded-sm">
            <p className="font-serif text-stone-600 italic">
              Jelenleg nincsenek feltöltött adások a hangtárban.
            </p>
          </div>
        ) : (
          <>
            {/* 3 oszlopos rács elrendezés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {episodes.map((episode) => {
                const formattedDate = episode.publishedAt
                  ? new Date(episode.publishedAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : null

                return (
                  <article
                    key={episode._id}
                    className="flex flex-col justify-between border border-stone-200 p-6 bg-white rounded-sm shadow-sm hover:border-stone-400 transition-colors"
                  >
                    <div>
                      {/* Négyzetes borítókép */}
                      {episode.mainImage ? (
                        <div className="block mb-5 overflow-hidden rounded-sm relative aspect-square w-full bg-stone-100 shadow-sm">
                          <Image
                            src={urlFor(episode.mainImage).width(600).height(600).url()}
                            alt={episode.title}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-5 aspect-square w-full bg-stone-100 border border-stone-200 rounded-sm flex items-center justify-center text-stone-400">
                          <span className="font-serif italic text-sm">Nincs borítókép</span>
                        </div>
                      )}

                      {/* Dátum és előadó */}
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 mb-2">
                        {formattedDate && <span>{formattedDate}</span>}
                        {episode.authorName && (
                          <span className="font-medium text-amber-900">
                            {episode.authorName}
                          </span>
                        )}
                      </div>

                      {/* Cím */}
                      <h2 className="font-serif text-xl font-normal text-stone-900 leading-snug mb-4">
                        {episode.title}
                      </h2>
                    </div>

                    {/* Hanglejátszó az aljára igazítva */}
                    <div className="pt-4 border-t border-stone-100 mt-4 flex flex-col gap-2">
                      {episode.audioUrl ? (
                        <>
                          <AudioPlayer src={formatAudioUrl(episode.audioUrl)} />
                          <div className="text-right">
                            <a
                              href={episode.audioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-stone-500 hover:text-amber-900 transition-colors"
                            >
                              Megnyitás háttérben &rarr;
                            </a>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-stone-400 italic text-center py-2">
                          Nincs hozzárendelt hangfájl.
                        </p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Lapozó */}
            <div className="mt-12">
              <Suspense fallback={null}>
                <Pagination totalPages={totalPages} />
              </Suspense>
            </div>
          </>
        )}

      </div>
    </div>
  )
}