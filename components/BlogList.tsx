import React from "react";
import Image from "next/image";
import urlFor from "@/sanity/urlFor";
import Featured from "./Featured";

type ClientSideRouteProps = {
  route: string;
  children: React.ReactNode;
};

function ClientSideRoute({ route, children }: ClientSideRouteProps) {
  return (
    <a href={route} className="block">
      {children}
    </a>
  );
}

type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  return (
    <main className="h-screen z-0">
      <h1 className="uppercase select-none text-4xl md:text-5xl lg:text-7xl font-black pt-20 lg:pt-14 lg:-mx-[10px] mb-8 lg:mb-14 text-center">
        blog
      </h1>
      <Featured />
      <div className="p-8 box-border md:grid md:grid-cols-3 gap-10 w-full max-w-[1140px] mx-auto">
        {posts?.map((post) => (
          <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
            <div className="group flex md:block pb-7 items-center">
              <div className="w-[100px] h-[100px] md:h-[200px] md:w-auto overflow-hidden relative drop-shadow-xl group-hover:scale-105 transition-transform duration-300 ease-out">
                <Image
                  className="h-auto w-full min-w-full object-cover rounded-xl"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author?.name || post.title}
                  fill
                />
                <div className="hidden absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white2 px-3 pt-1 lg:flex group-hover:backdrop-blur-none group-hover:opacity-0 transition-opacity duration-400 justify-between">
                  <div>
                    <p className="font-bold line-clamp-1 capitalize">{post.title}</p>
                    <p className="text-sm font-light">
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 items-center">
                    {post.categories?.map((category) => (
                      <div
                        key={category._id || category.title}
                        className="bg-husl-main/80 text-white text-center px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2">
                <p className="line-clamp-1 md:line-clamp-none md:text-xl lg:text-2xl font-bold pl-4 md:pl-0 md:pb-1.5 md:pt-1.5 capitalize content-center max-w-xs md:max-w-none">
                  {post.title}
                </p>
              </div>
              <p className="font-thin hidden md:flex">
                <span className="group-hover:underline">Read More</span>
                <span className="-rotate-45 text-2xl font-bold">→</span>
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </main>
  );
}