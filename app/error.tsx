'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if you have one
    console.error(error)
  }, [error])

  return (
    <div className="bg-[#fcfbf9] text-stone-900 min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="font-serif text-3xl mb-4 text-stone-900">
          Valami hiba történt
        </h2>
        <p className="text-stone-600 mb-8">
          Sajnos nem sikerült betölteni a kért tartalmat. Kérjük, próbálja meg újra később, vagy térjen vissza a főoldalra.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm uppercase tracking-wider font-semibold transition-colors"
          >
            Újrapróbálkozás
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-white text-sm uppercase tracking-wider font-semibold transition-colors"
          >
            Főoldal
          </Link>
        </div>
      </div>
    </div>
  )
}