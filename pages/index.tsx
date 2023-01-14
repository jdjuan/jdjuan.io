import Head from "next/head";
import cx from "classnames";
import { Inter } from "@next/font/google";
import { insights } from "./_insights";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Juan Herrera</title>
      </Head>
      <main
        className={`${inter.className} max-w-4xl p-12 text-slate-300 sm:m-10 md:m-10 md:p-10 md:pr-6 lg:mx-auto lg:p-20 lg:pr-10`}
      >
        {/* INTRO */}
        <div className='mb-16'>
          <h1 className='mb-8 text-4xl'>Juan Herrera</h1>
          <div className=''>
            <p>Google Developer Expert in Angular and Web Technologies based in Austria.</p>
            <br />
            <p>Currently building a different app every month (during 2023).</p>
          </div>
        </div>
        {/* END INTRO */}
        {/* INSIGHTS˝ */}
        <div className='mb-16'>
          <h2 className='mb-2 text-3xl'>Insights</h2>
          <p className='text-sm'>The latest insights on the topics I&apos;m most passionate about, under 1 minute</p>
          {insights.map(({ title, topics }) => (
            <>
              <div className='my-8'>
                <h3 className='mb-2 text-xl'>{title}</h3>
                <div className='grid grid-cols-12 items-center'>
                  <div className='col-span-4'>
                    <div className='aspect-square w-10/12 rounded-md bg-slate-700 bg-clip-content'></div>
                  </div>
                  <div className='col-span-8 text-sm'>
                    {topics.map((topic) => (
                      <>
                        <p>{topic}</p>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
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
      </main>
    </>
  );
}
