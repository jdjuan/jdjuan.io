import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Updates from "../components/updates";
import Intro from "../components/intro";
import HighlightBlockComponent from "../components/highlight-block";
import type { NextPageWithLayout } from "./_app";
import { highlights } from "../content/highlights.content";

export const Home: NextPageWithLayout = () => {
  return (
    <div className='grid gap-8 sm:gap-12 lg:gap-16'>
      <Intro></Intro>
      {/* HIGHLIGHTS */}
      <div className='grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-5'>
        {highlights.map((highlight) => (
          <div className='max-w-sm rounded-lg bg-neutral-100 dark:bg-slate-700 md:shadow-sm' key={highlight.title}>
            <div className='rounded-t-lg bg-teal-900 p-3 px-4 text-neutral-50 dark:bg-slate-900 md:p-5'>
              <h2 className='mb-0.5 font-headline text-3xl sm:mb-2 md:text-3xl lg:text-4xl'>{highlight.title}</h2>
              <p className='text-sm font-light text-neutral-50 dark:text-slate-400'>{highlight.description}</p>
            </div>
            {/* HIGHLIGHTS GRID */}
            <div className='grid gap-4 p-4 md:gap-5 md:p-5'>
              {/* HIGHLIGHT BLOCK */}
              {highlight.items.map((highlighBlock) => (
                <HighlightBlockComponent
                  key={highlighBlock.title}
                  highlightBlock={highlighBlock}
                ></HighlightBlockComponent>
              ))}
            </div>
            <a
              className='flex justify-center items-center pb-6 text-neutral-50 dark:text-slate-300 hover:underline'
              href={highlight.footerUrl}
              target={highlight.isFooterUrlExternal ? "_blank" : "_self"}
            >
              {highlight.footer}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-5 ml-0.5 mb-0.5 mr-4 icon-external-window'
              >
                <path
                  className='fill-teal-800 dark:fill-teal-400'
                  d='M12 8a1 1 0 0 1-1 1H5v10h10v-6a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h6a1 1 0 0 1 1 1z'
                />
                <path
                  className='fill-teal-800 dark:fill-teal-400'
                  d='M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41z'
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
      <Updates></Updates>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Home;
