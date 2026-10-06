'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-stone-200">
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors"
        >
          &larr; Előző
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-wider font-semibold text-stone-300 cursor-not-allowed">
          &larr; Előző
        </span>
      )}

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded-sm text-sm transition-colors ${
              currentPage === pageNum
                ? 'bg-amber-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors"
        >
          Következő &rarr;
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-wider font-semibold text-stone-300 cursor-not-allowed">
          Következő &rarr;
        </span>
      )}
    </div>
  )
}