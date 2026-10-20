'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  date?: string | null
  imageUrl?: string | null
}

function resolveVideoSource(url: string): { type: 'iframe' | 'native'; src: string } {
  if (!url) return { type: 'iframe', src: '' }

  // 1. Direct video files (.mp4, .webm, etc.)
  if (/\.(mp4|webm|m4v)(\?.*)?$/i.test(url)) {
    return { type: 'native', src: url }
  }

  // 2. YouTube URLs (watch, shorts, youtu.be, live, embed)
  const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/
  const match = url.match(ytRegex)
  if (match && match[1]) {
    const videoId = match[1]
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`,
    }
  }

  // 3. Mediaklikk or generic iframe embeds
  return { type: 'iframe', src: url }
}

export function VideoPlayer({
  videoUrl,
  title,
  date,
  imageUrl,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const media = resolveVideoSource(videoUrl)

  const handleStart = () => {
    // Pause any playing audio elements on the page before starting video
    document.querySelectorAll('audio').forEach((el) => el.pause())
    setIsPlaying(true)
  }

  return (
    <div className="relative aspect-[16/10] min-h-[240px] w-full rounded-md overflow-hidden bg-stone-900 shadow-sm flex flex-col justify-between select-none group border border-stone-800">
      {isPlaying ? (
        <div className="relative w-full h-full bg-black">
          {/* Close button to return to card thumbnail */}
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            aria-label="Videó bezárása"
            title="Vissza a borítóhoz"
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-stone-200 hover:text-white transition-colors backdrop-blur-md border border-white/10 shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {media.type === 'native' ? (
            <video
              src={media.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={media.src}
              title={title}
              className="w-full h-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <>
          {/* Blurred background image */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover blur-[1.5px] scale-105 pointer-events-none transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-900" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* Top row: Badge, title, and date */}
          <div className="relative z-10 p-5 flex items-start justify-between gap-3">
            <div className="min-w-0 pr-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-2 bg-amber-950/70 border border-amber-500/30 rounded text-[10px] tracking-wider uppercase font-semibold text-amber-200 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Videó
              </div>
              <h2 className="font-serif text-lg md:text-xl font-normal text-white leading-snug line-clamp-2 drop-shadow-sm">
                {title}
              </h2>
              {date && (
                <p className="text-xs uppercase tracking-wider text-stone-300 font-sans mt-1 drop-shadow-sm">
                  {date}
                </p>
              )}
            </div>
          </div>

          {/* Center: Play button */}
          <div className="relative z-10 flex items-center justify-center">
            <button
              type="button"
              onClick={handleStart}
              aria-label="Videó lejátszása"
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg"
            >
              <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Bottom spacer to align card proportions */}
          <div className="relative z-10 w-full h-10" />
        </>
      )}
    </div>
  )
}