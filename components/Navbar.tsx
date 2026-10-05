"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Főoldal' },
  { href: '/kiadvanyok', label: 'Kiadványok' },
  { href: '/hirek', label: 'Hírek & Események' },
  { href: '/gondolatok', label: 'Gondolatok' },
  { href: '/#tamogatas', label: 'Támogatás (1%)' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fcfbf9]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logó + Pecsét kép (nagy képernyőn) */}
        <Link 
          href="/" 
          onClick={() => setOpen(false)}
          className="flex items-center gap-3.5 group select-none"
        >
          {/* Csak lg (1024px+) mérettől látható pecsét */}
          <div className="hidden lg:block relative shrink-0">
            <Image
              src="/logo.jpg" // Ellenőrizd a public mappába mentett fájl nevét és kiterjesztését!
              alt="Bizánci Forrás IC XC NIKA pecsét"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border border-amber-900/20 transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
              Bizánci Forrás
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
              Magyar Ortodox Egyesület
            </span>
          </div>
        </Link>

        {/* Asztali navigáció */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-tight font-medium transition-colors ${
                link.href.includes('tamogatas')
                  ? 'text-amber-900 hover:text-amber-700 font-semibold border-b border-amber-900/40 pb-0.5'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Közösségi média & Email ikonok (Desktop) */}
        <div className="hidden lg:flex items-center space-x-5 text-stone-500">
          <a
            href="https://www.facebook.com/moe1949"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
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

        {/* Mobil hamburger ikon */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-stone-800 hover:text-stone-950 focus:outline-none"
          aria-label="Menü nyitása/zárása"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-stone-800 rounded transition-all duration-300 origin-left ${open ? 'rotate-45 translate-x-0.5' : ''}`} />
            <span className={`h-0.5 w-full bg-stone-800 rounded transition-all duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-full bg-stone-800 rounded transition-all duration-300 origin-left ${open ? '-rotate-45 translate-x-0.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Lenyíló mobil panel */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden border-b border-stone-200 bg-[#fcfbf9] ${open ? 'max-h-96 opacity-100 py-6 px-8' : 'max-h-0 opacity-0 py-0 px-8'}`}>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-serif tracking-wider text-stone-800 hover:text-amber-900 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}