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
      <main className={`${inter.className} mx-auto max-w-6xl text-slate-300`}>
        {/* FIRST SCREEN */}
        <div className='grid gap-10 p-10 sm:grid-cols-2 md:gap-20 md:gap-y-8 md:p-20'>
          {/* ABOUT */}
          <h1 className='text-3xl sm:col-span-2'>Juan Herrera</h1>
          <div className=''>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam. Interdum et. Lorem
              ipsum dolor sit amet
              <br />
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Maecenas tempor nisi diam.
            </p>
          </div>
          {/* SQUARES */}
          <div className='grid grid-cols-2 gap-8 sm:gap-10 max-md:landscape:gap-5'>
            {["Behavior", "Communication", "Relationships", "Software Development"].map((value, index) => (
              // <div key={index} className='aspect-square min-w-[6rem] max-w-[20rem] bg-slate-500'>
              <div
                key={index}
                className={cx("flex aspect-square w-full max-w-[10rem] items-center justify-center bg-slate-500", {
                  "justify-self-end": index % 2 === 0,
                })}
              >
                {value}
              </div>
            ))}
            {/* <div className='bg-slate-500'></div>
            <div className='bg-slate-500'></div>
            <div className='bg-slate-500'></div>
            <div className='bg-slate-500'></div> */}
          </div>
        </div>
      </main>
    </>
  );
}
