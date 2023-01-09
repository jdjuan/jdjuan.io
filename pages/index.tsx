import Head from "next/head";
import cx from "classnames";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Juan Herrera</title>
      </Head>
      <main
        className={`${inter.className} max-w-4xl bg-slate-900 p-10 text-slate-300 sm:m-10 md:m-10 md:p-10 md:pr-6 lg:mx-auto lg:p-20 lg:pr-10`}
      >
        {/* FIRST SCREEN */}
        {/* max-sm:landscape:gap-8 */}
        <div className='grid items-center gap-10 sm:grid-cols-2 sm:gap-14 md:gap-y-8 lg:gap-2 portrait:gap-16 landscape:gap-14'>
          {/* ABOUT */}
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
          {/* SQUARES */}
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
        </div>
      </main>
    </>
  );
}
