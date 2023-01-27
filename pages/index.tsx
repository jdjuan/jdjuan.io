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
    <>
      {/* INTRO */}
      <div className='mb-16 grid max-w-full grid-cols-12 gap-4 md:max-w-3xl lg:mb-28 lg:max-w-4xl lg:gap-6'>
        <Image
          src={profilePic}
          alt='Picture of the author'
          className='col-span-3 rounded-md border-2 border-slate-200 sm:border-4 md:col-span-2 lg:col-span-2 lg:mt-2'
        />
        <div className='col-span-9 md:col-span-10 lg:col-span-9'>
          <h1 className='mb-4 text-4xl sm:text-5xl lg:text-6xl'>Juan Herrera</h1>
          <div className=' text-slate-300'>
            <p className='mb-2 lg:text-lg'>Google Developer Expert in Angular and Web Technologies based in Austria.</p>
            <p className='lg:text-base'>
              <span className='rounded-md bg-slate-100 px-1 font-semibold text-slate-900 sm:p-1 sm:py-0.5'>
                Currently:
              </span>{" "}
              Building a different app every month (during 2023).
            </p>
          </div>
        </div>
      </div>
      {/* END INTRO */}
      {/* HIGHLIGHTS */}
      {highlights.map((highlight) => (
        <div className='mb-16' key={highlight.title}>
          <h2 className='mb-2 text-4xl'>{highlight.title}</h2>
          <p className='text-sm text-slate-400'>{highlight.description}</p>
          {/* HIGHLIGHTS GRID */}
          <div className='my-5 grid gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3'>
            {/* HIGHLIGHT BLOCK */}
            {highlight.items.map(({ title, link, isExternalLink, topics }) => (
              <Link passHref={isExternalLink} key={title} target={isExternalLink ? "_blank" : "_self"} href={link}>
                {/* HIGHLIGHT TITLE */}
                <h3 className='mb-2 text-xl text-slate-300'>{title}</h3>
                <div className='grid max-w-xs grid-cols-12 items-center gap-4 rounded-lg bg-slate-900 p-4 hover:bg-black'>
                  {/* HIGHLIGHT ICON */}
                  <div className='col-span-4'>
                    <div className='aspect-square w-full rounded-md bg-slate-700 bg-clip-content'></div>
                  </div>
                  {/* HIGHLIGHT TOPICS */}
                  <div className='col-span-8'>
                    {topics.map((topic) => (
                      <p className='text-slate-400' key={topic}>
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
      {/* END HIGHLIGHTS */}
      <Updates></Updates>

      {/* END PRODUCTS */}
      {/* <div className='grid items-center gap-10 sm:grid-cols-2 sm:gap-14 md:gap-y-8 lg:gap-2 portrait:gap-16 landscape:gap-14'>
          <div className=''>
            <h1 className='mb-8 text-3xl'>Juan Herrera</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam. Interdum et. Lorem
              ipsum dolor sit amet
              <br />
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-5 md:gap-7 lg:gap-8 xl:gap-12 max-md:landscape:gap-5'>
            {["Behavior", "Communication", "Relationships", "Software Development"].map((value, index) => (
              <div
                key={value}
                className={cx(
                  "flex aspect-square w-full max-w-[8rem] items-center justify-center bg-slate-700 text-center",
                  { "justify-self-end": index % 2 === 0 }
                )}
              >
                {value}
              </div>
            ))}
          </div>
        </div> */}
      {/* </main> */}
    </>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Home;
