import darkPhoto from "../public/me.jpg";
import lightPhoto from "../public/me3.png";
import Image, { StaticImageData } from "next/image";
import { useDarkMode } from "usehooks-ts";
import { useState, useEffect } from "react";
const Intro = () => {
  const { isDarkMode } = useDarkMode();
  const [photo, setPhoto] = useState<StaticImageData>(lightPhoto);
  useEffect(() => {
    setTimeout(() => {
      setPhoto(isDarkMode ? darkPhoto : lightPhoto);
    }, 200);
  }, [isDarkMode]);
  return (
    <>
      {/* INTRO */}
      <div className='mb-8 grid max-w-full grid-cols-12 items-center gap-4 sm:mb-4 md:mb-0 md:max-w-3xl lg:max-w-4xl lg:gap-5'>
        <Image
          src={photo}
          alt='Picture of the author'
          priority
          className='col-span-3 row-start-2 rounded-md border border-neutral-700 bg-neutral-100 dark:border dark:border-slate-200 sm:col-span-3 sm:row-span-2 md:col-span-2 lg:col-span-2'
        />
        <div className='col-span-full sm:col-span-4 md:col-span-10 lg:col-span-9'>
          <h1 className='font-headline text-4xl text-neutral-800 dark:text-slate-50 sm:text-5xl lg:text-6xl'>
            Juan Herrera
          </h1>
        </div>
        <div className='col-span-9 col-start-4 font-light sm:col-span-9 sm:col-start-4 md:col-start-3'>
          <p className='mb-1 text-neutral-900 dark:text-slate-300 lg:text-lg'>
            Google Developer Expert based in Austria and Colombia.
          </p>
          <p className='text-neutral-400 dark:text-slate-500 lg:text-base'>
            Currently building{" "}
            <a href='https://www.parlai.app/' target='_blank' rel='noopener noreferrer' className='underline'>
              Parlai
            </a>{" "}
            🚀
          </p>
        </div>
      </div>
      {/* END INTRO */}
    </>
  );
};

export default Intro;
