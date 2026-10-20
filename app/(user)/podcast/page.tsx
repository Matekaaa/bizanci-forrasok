import { Suspense } from 'react'
import { client } from '@/sanity/sanity.client'
import urlFor from '@/sanity/urlFor'
import { PostLimitSelect } from '@/components/PostLimitSelect'
import { Pagination } from '@/components/Pagination'
import { AudioPlayer } from '@/components/AudioPlayer'
import { VideoPlayer } from '@/components/VideoPlayer'

export const revalidate = 2592000

export const metadata = {
  title: 'Hangtár és Videótár | Bizánci Forrás Kulturális Egyesület',
  description: 'Az elhangzott Bizánci Forrás rádióadások és videóközvetítések archívuma.',
  referrer: 'strict-origin-when-cross-origin',
}

const PROXY_BASE = 'https://audio-proxy.szendrey-mate.workers.dev'

function formatAudioUrl(url: string) {
  if (url.startsWith('https://hangtar.mariaradio.hu/')) {
    return url.replace('https://hangtar.mariaradio.hu', PROXY_BASE)
  }
  return url
}

const ARCHIVE_QUERY = `
  {
    "episodes": *[
      _type == "post" && 
      defined(slug.current) && 
      ("podcast" in categories[]->slug.current || defined(audioUrl) || defined(videoUrl))
    ] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      publishedAt,
      audioUrl,
      videoUrl,
      mainImage
    },
    "total": count(*[
      _type == "post" && 
      defined(slug.current) && 
      ("podcast" in categories[]->slug.current || defined(audioUrl) || defined(videoUrl))
    ])
  }
`

interface Episode {
  _id: string
  title: string
  publishedAt?: string
  audioUrl?: string
  videoUrl?: string
  mainImage?: any
}

interface PageData {
  episodes: Episode[]
  total: number
}

interface PageProps {
  searchParams: Promise<{ limit?: string; page?: string }>
}

export default async function ArchivePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams

  const parsedLimit = Number(resolvedParams?.limit)
  const validLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 6
  const limit = Math.min(validLimit, 48)

  const parsedPage = Number(resolvedParams?.page)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const start = (page - 1) * limit
  const end = page * limit

  const { episodes, total }: PageData = await client.fetch(ARCHIVE_QUERY, { start, end })
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Fejléc */}
        <div className="text-center max-w-2xl mx-auto mb-12 pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Médiaarchívum
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Hangtár és Videótár
          </h1>

          <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
            Az elhangzott magyar Ortodoxiáról szóló podcastek és közvetítések gyűjteménye.
          </p>
        </div>

        {/* Elemek száma választó */}
        <div className="flex justify-end mb-8">
          <Suspense fallback={null}>
            <PostLimitSelect defaultLimit={6} options={[4, 6, 8, 10]} />
          </Suspense>
        </div>

        {/* Üres állapot */}
        {episodes.length === 0 ? (
          <div className="text-center py-20 bg-stone-100/50 border border-stone-200 rounded-sm">
            <p className="font-serif text-stone-600 italic">
              Jelenleg nincsenek feltöltött adások az archívumban.
            </p>
          </div>
        ) : (
          <>
            {/* 2 oszlopos rács elrendezés nagyobb kártyákkal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {episodes.map((episode) => {
                const formattedDate = episode.publishedAt
                  ? new Date(episode.publishedAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : null

                const imageUrl = episode.mainImage
                  ? urlFor(episode.mainImage).width(900).height(560).url()
                  : null

                if (episode.videoUrl) {
                  return (
                    <VideoPlayer
                      key={episode._id}
                      title={episode.title}
                      date={formattedDate}
                      imageUrl={imageUrl}
                      videoUrl={episode.videoUrl}
                    />
                  )
                }

                return (
                  <AudioPlayer
                    key={episode._id}
                    title={episode.title}
                    date={formattedDate}
                    imageUrl={imageUrl}
                    directUrl={episode.audioUrl}
                    src={episode.audioUrl ? formatAudioUrl(episode.audioUrl) : ''}
                  />
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