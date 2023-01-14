import cx from "classnames";
import { insights } from "../content/insights.content";
import { products } from "../content/products.content";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import type { NextPageWithLayout } from "./_app";
import Link from "next/link";

export const Home: NextPageWithLayout = () => {
  const highlights = [insights, products];
  return (
    <>
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
          <p>{highlight.description}</p>
          {highlight.items.map(({ title, topics }) => (
            <div className='my-7' key={title}>
              <h3 className='mb-2 text-xl'>{title}</h3>
              <div className='grid grid-cols-12 items-center gap-4'>
                <div className='col-span-4'>
                  <Link href={title.toLowerCase()}>
                    <div className='aspect-square w-full rounded-md bg-slate-700 bg-clip-content'></div>
                  </Link>
                </div>
                <div className='col-span-8'>
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
      {/* NEWSLETTER */}
      <div className='mb-16 text-sm'>
        <h2 className='mb-4 text-4xl'>Updates</h2>
        <p>
          Once a month I share my latest insights over email. To receive them{" "}
          <a className='text-slate-50 underline' href='mailto:david.juanherrera@gmail.com'>
            introduce yourself
          </a>
          .
        </p>
        <br />
        <p>I reply to all emails</p>
      </div>

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
