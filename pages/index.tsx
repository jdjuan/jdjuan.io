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
          <div className='max-w-sm rounded-lg bg-neutral-100 shadow-sm dark:bg-slate-700' key={highlight.title}>
            <div className='rounded-t-lg bg-teal-900 p-3 px-4 text-neutral-50 dark:bg-slate-900 md:p-5'>
              <h2 className='mb-0.5 font-headline text-2xl sm:mb-2 md:text-3xl lg:text-4xl'>{highlight.title}</h2>
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
          </div>
        ))}
      </div>
      <Updates></Updates>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Home;
