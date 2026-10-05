import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f7f5f0] border-t border-stone-200 text-stone-700 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* 1. Oszlop: Arculat & Hitvallás */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-xl tracking-tight text-stone-900 block font-medium">
                Bizánci Forrás
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                Magyar Ortodox Egyesület
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif italic">
                Célunk a magyar nyelvű orthodoxia megőrzése, a meglevő magyar nyelvű orthodox irodalom, kultúra és liturgikus zene ápolása.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-stone-500">
                <a
                    href=" https://facebook.com/moe1949"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oldalunk"
                    className="hover:text-stone-900 transition-colors"
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                </a>
                <a
                    href="mailto:info@bizanciforras.hu"
                    aria-label="Email"
                    className="hover:text-stone-900 transition-colors"
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
                    </svg>
                </a>
            </div>
          </div>

          {/* 2. Oszlop: Gyorshivatkozások */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-4">
              Navigáció
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li>
                <Link href="/kiadvanyok" className="hover:text-stone-950 transition-colors">
                  Kiadványok & Könyvek
                </Link>
              </li>
              <li>
                <Link href="/hirek" className="hover:text-stone-950 transition-colors">
                  Hírek & Események
                </Link>
              </li>
              <li>
                <Link href="/gondolatok" className="hover:text-stone-950 transition-colors">
                  Gondolatok
                </Link>
              </li>
              <li>
                <Link href="/kapcsolat" className="hover:text-stone-950 transition-colors">
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Oszlop: Támogatási & Közhasznúsági adatok (Kiemelt fontosságú) */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-4">
              Támogatás & 1%
            </h4>
            <div className="bg-stone-200/50 p-3.5 rounded border border-stone-200 text-xs space-y-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Adószám (SZJA 1%)</span>
                <span className="font-mono font-medium text-stone-900 select-all">18265908-1-43</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Bankszámlaszám</span>
                <span className="font-mono text-[11px] text-stone-800 select-all block">IBAN: HU18 1171 2004 2248 1638 0000 0000 HUF</span>
                <span className="font-mono text-[11px] text-stone-800 select-all block">IBAN: HU19 1176 3127 3127 9882 0000 0000 EUR</span>
              </div>
              <p className="text-[11px] text-amber-900 font-serif italic pt-1">
                Köszönjük, ha céljainkat adója 1%-ával támogatja!
              </p>
            </div>
          </div>

          {/* 4. Oszlop: Kapcsolati információk */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-4">
              Kapcsolat
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <p>
                <span className="font-medium text-stone-800">Email:</span>{' '}
                <a href="mailto:info@bizanciforras.hu" className="hover:underline">
                  info@bizanciforras.hu
                </a>
              </p>
              <p>
                <span className="font-medium text-stone-800">Telefon:</span>{' '}
                <a href="tel:+3612345678" className="hover:underline">
                  +36 70 425 9991
                </a>
              </p>
              <p>
                <span className="font-medium text-stone-800">Székhely:</span>{' '}
                Budapest, Magyarország
              </p>
              <p className="text-[11px] text-stone-500 pt-2 leading-relaxed">
                Kérdéseivel, kiadványrendeléssel vagy csatlakozási szándékával keressen minket bizalommal.
              </p>
            </div>
          </div>

        </div>

        {/* Alsó sáv: Szerzői jogok és jogi linkek */}
        <div className="mt-14 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>
            &copy; {currentYear} Bizánci Forrás Kulturális Egyesület. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  )
}