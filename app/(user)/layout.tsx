import Link from "next/link"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex select-none flex-col md:flex-row border border-husl-darker/50 rounded-md p-5 md:p-10 m-2 md:m-10 min-h-screen space-y-7 md:space-y-0 md:space-x-3">
        <div className="flex relative flex-col space-y-4 md:max-w-sm pr-10 after:bottom-1 after:-mb-4 after:md:mb-0 after:md:right-5 after:w-full after:md:w-px after:h-px after:md:h-full after:bg-husl-main after:absolute md:min-w-fit">
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about'>Greetings</Link>
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about/mission'>Mission Statement</Link>
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about/market'>Market Analysis</Link>
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about/marketing'>Marketing Mix</Link>
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about/finance'>Financial Plan</Link>
          <Link className="relative hover:bg-gray/30 rounded-md py-1 px-3 focus:bg-husl-main" href='/about/team'>Our Team</Link>
        </div>
        {children}
      </div>
  )
}