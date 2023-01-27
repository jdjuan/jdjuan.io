import { highlights } from "../content/highlights.content";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import type { NextPageWithLayout } from "./_app";
import Link from "next/link";
import Updates from "../components/updates";
import Image from "next/image";
import profilePic from "../public/me.jpg";

export const Home: NextPageWithLayout = () => {
  return (
    <div className='grid gap-8 lg:gap-16'>
      {/* INTRO */}
      <div className='grid max-w-full grid-cols-12 items-center gap-4 md:max-w-3xl lg:max-w-4xl lg:gap-5'>
        <Image
          src={profilePic}
          alt='Picture of the author'
          className='col-span-3 rounded-md border-2 border-slate-200 sm:row-span-2 sm:border-4 md:col-span-2 lg:col-span-2'
        />
        <div className='col-span-9 md:col-span-10 lg:col-span-9'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl'>Juan Herrera</h1>
        </div>
        <div className='col-span-full text-slate-300 sm:col-span-9 sm:col-start-4 md:col-start-3'>
          <p className='mb-1 lg:text-lg'>Google Developer Expert in Angular and Web Technologies based in Austria.</p>
          <p className='text-slate-500 lg:text-base'>Currently building one app per month.</p>
        </div>
      </div>
      {/* END INTRO */}
      {/* HIGHLIGHTS */}
      <div className='grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5'>
        {highlights.map((highlight) => (
          <div className='rounded-lg bg-slate-700' key={highlight.title}>
            <div className='rounded-t-lg bg-slate-900 p-4 md:p-5'>
              <h2 className='mb-2 text-2xl md:text-3xl lg:text-4xl'>{highlight.title}</h2>
              <p className='text-sm text-slate-400'>{highlight.description}</p>
            </div>
            {/* HIGHLIGHTS GRID */}
            <div className='grid gap-4 p-4 md:gap-5 md:p-5'>
              {/* HIGHLIGHT BLOCK */}
              {highlight.items.map(({ title, link, isExternalLink, topics }) => (
                <Link passHref={isExternalLink} key={title} target={isExternalLink ? "_blank" : "_self"} href={link}>
                  <div className='bordder box-border grid max-w-xs grid-cols-12 items-center gap-3 rounded-lg border-2 border-transparent bg-slate-800 transition hover:scale-105 hover:border-slate-50 sm:gap-4'>
                    {/* HIGHLIGHT TITLE */}
                    <h3
                      className='col-span-full rounded-t-lg bg-slate-900 
                    px-3 py-1.5 text-lg text-slate-300 sm:px-4 sm:py-2 md:text-xl'
                    >
                      {title}
                    </h3>
                    {/* HIGHLIGHT ICON */}
                    <div className='col-span-3 pl-3 pb-3 sm:pl-4 sm:pb-4'>
                      <div className='aspect-square w-full rounded-md bg-slate-700 bg-clip-content'></div>
                    </div>
                    {/* HIGHLIGHT TOPICS */}
                    <div className='col-span-9 pr-4 pb-4'>
                      {topics.map((topic) => (
                        <p className='text-xs text-slate-400 sm:text-sm' key={topic}>
                          {topic}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* END HIGHLIGHTS */}
      <Updates></Updates>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Home;
