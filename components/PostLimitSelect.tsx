// components/PostLimitSelect.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface PostLimitSelectProps {
  defaultLimit?: number
  options?: number[]
}

export function PostLimitSelect({
  defaultLimit = 10,
  options = [6, 10, 20, 50],
}: PostLimitSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLimit = searchParams.get('limit') || String(defaultLimit)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', e.target.value)
    params.set('page', '1') // Reset to page 1 on limit change

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2 text-xs font-serif text-stone-600">
      <label htmlFor="post-limit" className="uppercase tracking-wider">
        Megjelenítés:
      </label>
      <select
        id="post-limit"
        value={currentLimit}
        onChange={handleChange}
        className="bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 text-xs focus:outline-none focus:border-amber-800 transition-colors cursor-pointer"
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num} db
          </option>
        ))}
      </select>
    </div>
  )
}