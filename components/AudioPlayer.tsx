'use client'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const handlePlay = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const currentAudio = e.currentTarget
    document.querySelectorAll('audio').forEach((audio) => {
      if (audio !== currentAudio) {
        audio.pause()
      }
    })
  }

  return (
    <audio
      controls
      preload="none"
      src={src}
      onPlay={handlePlay}
      className="w-full h-10 accent-amber-900"
    >
      A böngésző nem támogatja a beépített hanglejátszót.
    </audio>
  )
}