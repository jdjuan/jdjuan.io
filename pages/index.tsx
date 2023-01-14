import Head from "next/head";
import cx from "classnames";
import { Inter } from "@next/font/google";
import { insights } from "../content/insights";
import { products } from "../content/products";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const highlights = [insights, products];
  return (
    <>
      <Head>
        <title>Juan Herrera</title>
      </Head>
      <main
        className={`${inter.className} max-w-4xl p-8 pt-10 text-slate-200 sm:m-10 md:m-10 md:p-10 md:pr-6 lg:mx-auto lg:p-20 lg:pr-10`}
      >
        {/* INTRO */}
        <div className='mb-20'>
          <h1 className='mb-4 text-4xl'>Juan Herrera</h1>
          <div className=''>
            <p>Google Developer Expert in Angular and Web Technologies based in Austria.</p>
            <br />
            <p>Currently building a different app every month (during 2023).</p>
          </div>
        </div>
        {/* END INTRO */}
        {/* HIGHLIGHTS */}
        {highlights.map((highlight) => (
          <div className='mb-16' key={highlight.title}>
            <h2 className='mb-2 text-4xl'>{highlight.title}</h2>
            <p className='text-sm'>{highlight.description}</p>
            {highlight.items.map(({ title, topics }) => (
              <div className='my-7' key={title}>
                <h3 className='mb-2 text-xl'>{title}</h3>
                <div className='grid grid-cols-12 items-center gap-4'>
                  <div className='col-span-4'>
                    <div className='aspect-square w-full rounded-md bg-slate-700 bg-clip-content'></div>
                  </div>
                  <div className='col-span-8 text-sm'>
                    {topics.map((topic) => (
                      <p key={topic}>{topic}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* END HIGHLIGHTS */}

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
      </main>
    </>
  );
}
