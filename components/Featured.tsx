import Image from "next/image";
import Link from "next/link";
import MainPost1 from 'public/MainPost.png'
import MainPost2 from 'public/MainPost2.jpg'

export default function Featured() {
  return (
    <div className="p-8 box-border md:grid grid-cols-2 gap-10 w-full max-w-[1140px] mx-auto">
      <Link href='/blog/main1'>
            <article className='group md:flex flex-col shrink-0 grow pb-7 items-center'>
              <div className="w-full h-[200px] md:h-[400px] overflow-hidden relative drop-shadow-xl group-hover:scale-105 transition-transform duration-300 ease-out">
                <Image className="h-full w-full object-cover rounded-xl"
                src={MainPost1}
                alt='Main Post Image'
                fill
                />
              </div>
              <div className="py-0.5 md:pt-7">
                <p className="text-xl md:text-2xl capitalize lg:text-4xl font-bold pb-1.5 text-center group-hover:underline">Make the right choice</p>
              </div>
            </article>
        </Link>
        <Link href='/blog/main2'>
            <article className='group md:flex flex-col shrink-0 grow pb-7 items-center'>
              <div className="w-full h-[200px] md:h-[400px] overflow-hidden relative drop-shadow-xl group-hover:scale-105 transition-transform duration-300 ease-out">
                <Image className="h-full w-full object-cover rounded-xl"
                src={MainPost2}
                alt='Main Post Image'
                fill
                />
              </div>
              <div className="py-0.5 md:pt-7">
                <p className="text-xl md:text-2xl capitalize lg:text-4xl font-bold pb-1.5 text-center group-hover:underline">Become the person you were meant to be</p>
              </div>
            </article>
        </Link>
    </div>
  )
}
