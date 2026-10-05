import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-[#fcfbf9] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Hero / Címoldal */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-28 max-w-5xl mx-auto text-center border-b border-stone-200">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-amber-800/60" />
          <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
            Bizánci Forrás Magyar Ortodox Egyesület
          </p>
          <span className="h-px w-8 bg-amber-800/60" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15] mb-8">
          A keleti keresztény hagyomány, liturgia és lelkiség élő forrása.
        </h1>

        <p className="max-w-2xl mx-auto text-stone-600 text-base md:text-lg leading-relaxed font-serif italic mb-10">
          Célunk a magyar nyelvű orthodoxia megőrzése, a meglevő magyar nyelvű orthodox irodalom,  kultúra és liturgikus zene ápolása.
        </p>
      </section>

      {/* 2. Központi bibliai igevers (Jeremiás 6,16) */}
      <section className="bg-stone-100/70 py-16 px-6 border-b border-stone-200">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-xl sm:text-2xl text-stone-800 italic leading-relaxed mb-5">
            „Álljatok ki az utakra, és nézzetek szét, kérdezősködjetek az ősi ösvények után, melyik a jó út, és azon járjatok, akkor nyugalmat találtok lelketeknek!”
          </blockquote>
          <div className="h-px w-12 bg-amber-800/50 mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-stone-600 font-medium">
            Jeremiás 6,16
          </p>
        </div>
      </section>

      {/* 3. Küldetés: Visszatérés a forrásokhoz */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-amber-900 font-semibold block mb-2">
              Hivatásunk
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal leading-snug">
              Hűség az apostoli és atyai hagyományhoz
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-stone-600 text-sm md:text-base leading-relaxed">
            <p>
              A Bizánci Forrás célja, hogy eljuttassa a keleti egyház spirituális és teológiai kincseit a mai olvasókhoz.
            </p>
            <p>
              Munkánkkal a hiteles liturgikus életet, az imádságos elmélyülést és az egyházi rendet kívánjuk szolgálni gondosan szerkesztett kiadványainkon és közösségi programjainkon keresztül.
            </p>
          </div>
        </div>
      </section>

{/* 3 Pillér: Kiadványok, Hírek és események, Gondolatok */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* 1. Doboz: Kiadványok */}
          <div className="border-t border-stone-300 pt-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-900/80 mb-2 block font-medium">01</span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3">
                Kiadványok
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Liturgikus szövegek, imádságos könyvek, patrisztikus fordítások és teológiai tanulmánykötetek megjelentetése és terjesztése.
              </p>
            </div>
            <Link 
              href="/kiadvanyok" 
              className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors inline-flex items-center gap-1"
            >
              Kiadványaink listája &rarr;
            </Link>
          </div>

          {/* 2. Doboz: Hírek és események */}
          <div className="border-t border-stone-300 pt-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-900/80 mb-2 block font-medium">02</span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3">
                Hírek és események
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Beszámolók az egyesület életéről, közösségi és liturgikus alkalmak, előadások és kulturális programok időpontjai.
              </p>
            </div>
            <Link 
              href="/hirek" 
              className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors inline-flex items-center gap-1"
            >
              Hírek olvasása &rarr;
            </Link>
          </div>

          {/* 3. Doboz: Gondolatok */}
          <div className="border-t border-stone-300 pt-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-amber-900/80 mb-2 block font-medium">03</span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3">
                Gondolatok
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Rövid teológiai esszék, atyai idézetek magyarázatai és szellemi elmélkedések a keleti keresztény lelkiség mélységeiről.
              </p>
            </div>
            <Link 
              href="/gondolatok" 
              className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-amber-900 transition-colors inline-flex items-center gap-1"
            >
              Írások és esszék &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Támogatás / 1% felhívás */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center" id="tamogatas">
        <div className="border border-stone-200 bg-white p-8 md:p-14 rounded-sm shadow-sm">
          <span className="text-[11px] uppercase tracking-widest text-amber-900 font-semibold block mb-2">
            Közhasznú Egyesület
          </span>
          <h4 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4 font-normal">
            Támogassa munkánkat adója 1%-ával
          </h4>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Kiadványaink megjelenését és közhasznú tevékenységünket magánszemélyek támogatásai és az szja 1% felajánlások teszik lehetővé.
          </p>
          <div className="inline-block bg-stone-50 border border-stone-200 px-6 py-3 rounded mb-8 font-mono text-sm text-stone-800">
            <div>
              <span className="font-bold">Adószámunk: </span>
              <span className="font-mono text-[11px] text-stone-800 select-all block">18265908-1-43</span></div>
            <div>
              <span className="font-bold">Bankszámlaszámunk: </span>
              <span className="font-mono text-[11px] text-stone-800 select-all block">IBAN: HU18 1171 2004 2248 1638 0000 0000 HUF</span>
              <span className="font-mono text-[11px] text-stone-800 select-all block">IBAN: HU19 1176 3127 3127 9882 0000 0000 EUR</span>
            </div>
          </div>
              <p className="text-m text-amber-900 font-serif italic pt-1">
                Köszönjük, ha céljainkat adója 1%-ával támogatja!
              </p>
        </div>
      </section>

    </div>
  )
}