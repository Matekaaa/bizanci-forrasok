'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface AudioPlayerProps {
  src: string
  title: string
  date?: string | null
  imageUrl?: string | null
  directUrl?: string
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({
  src,
  title,
  date,
  imageUrl,
  directUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== audioRef.current) {
          el.pause()
        }
      })
      audioRef.current.play()
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative aspect-[16/10] min-h-[240px] w-full rounded-md overflow-hidden bg-stone-900 shadow-sm flex flex-col justify-between select-none group border border-stone-800">
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

      {/* Native audio element */}
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false)
            setCurrentTime(0)
          }}
        />
      )}

      {/* Top row: Title and date */}
      <div className="relative z-10 p-5 flex items-start justify-between gap-3">
        <div className="min-w-0 pr-2">
          <h2 className="font-serif text-lg md:text-xl font-normal text-white leading-snug line-clamp-2 drop-shadow-sm">
            {title}
          </h2>
          {date && (
            <p className="text-xs uppercase tracking-wider text-stone-300 font-sans mt-1 drop-shadow-sm">
              {date}
            </p>
          )}
        </div>

        {directUrl && (
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Megnyitás külön lapon"
            className="shrink-0 p-2 rounded-full bg-black/40 hover:bg-black/60 text-stone-300 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Center: Play / Pause toggle */}
      <div className="relative z-10 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlay}
          disabled={!src}
          aria-label={isPlaying ? 'Szüneteltetés' : 'Lejátszás'}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom: Timers & edge-to-edge scrubber */}
      <div className="relative z-10 w-full pb-5 px-4 flex flex-col gap-1">
        <div className="flex justify-between items-center px-4 pb-1 text-[11px] font-mono text-stone-300 select-none drop-shadow-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="relative w-full h-3 flex items-end">
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/25 group-hover:h-2 transition-all" />
          <div
            className="absolute left-0 bottom-0 h-1.5 bg-amber-600 group-hover:h-2 transition-all pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute bottom-0 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none mb-[-2px]"
            style={{
              left: `${progressPercent}%`,
              opacity: duration > 0 ? 1 : 0,
            }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            step="1"
            value={currentTime}
            onChange={handleSeek}
            disabled={!duration}
            aria-label="Hang sáv"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
          />
        </div>
      </div>
    </div>
  )
}