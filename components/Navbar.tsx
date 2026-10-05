/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      id='header'
      className='text-white fixed w-full top-0 left-0 bg-black z-50 h-fit pb-2 lg:pb-3 before:absolute before:select-none before:-z-10 before:left-0 before:w-full before:h-full before:[box-shadow:0_20px_40px_#ff443320] before:transition-opacity before:ease-in-out before:duration-500 before:opacity-0'
    >
      <div className='md:px-10 lg:px-15 grid grid-cols-2 lg:grid-cols-3 gap-1 px-10'>
        <Link href='/'>
          <p className='text-xl font-black tracking-tight leading-6 text-left select-none mt-3 text-husl-main'>HUSL</p>
        </Link>

        <button
          type='button'
          aria-label='Toggle mobile menu'
          className={`lg:hidden flex w-6 h-7 flex-col justify-between absolute top-2.5 right-10 md:right-16 items-start ${open ? '' : 'hover:opacity-80'}`}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-3' : ''}`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${open ? 'opacity-0' : 'w-full'}`}
          />
          <span
            className={`h-1 bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-3 w-6' : 'w-4'}`}
          />
        </button>

        <div className='hidden lg:flex lg:items-center lg:justify-end lg:col-span-1 gap-3'>
          <Link href='/' className='hover:fill-husl-main cursor-pointer duration-200 transition-colors fill-white text-center group px-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='group-hover:w-3.5 group-hover:h-3.5 transition-all duration-200 ease-in'
              viewBox='0 0 48 48'
              width='12px'
              height='12px'
            >
              <path d='M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 32.380773 34.967178 39.306373 27 40.720703 L 27 29 L 30.625 29 C 31.129 29 31.555188 28.623047 31.617188 28.123047 L 31.992188 25.123047 C 32.028188 24.839047 31.938047 24.553891 31.748047 24.337891 C 31.559047 24.122891 31.287 24 31 24 L 27 24 L 27 20.5 C 27 19.397 27.897 18.5 29 18.5 L 31 18.5 C 31.552 18.5 32 18.053 32 17.5 L 32 14.125 C 32 13.607 31.604844 13.174906 31.089844 13.128906 C 31.030844 13.123906 29.619984 13 27.833984 13 C 23.426984 13 21 15.616187 21 20.367188 L 21 24 L 17 24 C 16.448 24 16 24.447 16 25 L 16 28 C 16 28.553 16.448 29 17 29 L 21 29 L 21 40.720703 C 13.032822 39.306373 7 32.380773 7 24 C 7 14.593391 14.593385 7 24 7 z' />
            </svg>
          </Link>

          <Link href='/' className='hover:fill-husl-main cursor-pointer duration-200 transition-colors fill-white text-center group px-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='group-hover:w-3.5 group-hover:h-3.5 transition-all duration-200 ease-in'
              viewBox='0 0 24 24'
              width='12px'
              height='12px'
            >
              <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z' />
            </svg>
          </Link>

          <Link href='/' className='hover:fill-husl-main cursor-pointer duration-200 transition-colors fill-white text-center group px-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='group-hover:w-3.5 group-hover:h-3.5 transition-all duration-200 ease-in'
              viewBox='0 0 24 24'
              width='12px'
              height='12px'
            >
              <path d='M21,5c0,0-3-1-9-1S3,5,3,5s-1,3-1,7s1,7,1,7s3,1,9,1s9-1,9-1s1-3,1-7S21,5,21,5z M10,15.464V8.536L16,12L10,15.464z' />
            </svg>
          </Link>
        </div>

        <div className={`lg:hidden ${open ? 'flex flex-col pt-5' : 'hidden'} gap-5 col-span-2`}>
          <Link href='/' className='hover:text-husl-main cursor-pointer duration-500 transition-colors text-white'>
            <p>Facebook</p>
          </Link>
          <Link href='/' className='hover:text-husl-main cursor-pointer duration-500 transition-colors text-white'>
            <p>Instagram</p>
          </Link>
          <Link href='/' className='hover:text-husl-main cursor-pointer duration-500 transition-colors text-white'>
            <p>Youtube</p>
          </Link>
        </div>
      </div>
    </header>
  )
}