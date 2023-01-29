import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { booksContent } from "../content/books.content";
import { NextPageWithLayout } from "./_app";
import cx from "classnames";

export const Books: NextPageWithLayout = () => {
  const isLongTitle = (title: string) => title.length > 24;
  const isReallyLongTitle = (title: string) => title.length > 49;
  return (
    <>
      <Navbar></Navbar>
      <h1 className='mb-6 text-4xl md:mb-10'>Books Reviews</h1>
      <div className='grid gap-4 sm:grid-cols-2 md:max-w-3xl md:gap-5 lg:max-w-full lg:gap-8'>
        {booksContent.map(({ author, comment, rating, title, yearRead }) => (
          <div
            key={title}
            className='place-contents-center group grid max-w-sm grid-cols-12 gap-2 rounded-lg bg-slate-900 p-3 sm:gap-2 sm:p-5 md:gap-4 lg:max-w-full'
          >
            <div className='col-span-2'>
              <p className='flex aspect-square w-11/12 items-center justify-center rounded-md bg-slate-700 text-lg text-slate-100 sm:w-full lg:text-xl xl:text-2xl'>
                {rating}/5
              </p>
            </div>
            <div className='col-span-10'>
              <p
                title={title}
                className={cx("-mt-1 truncate text-lg capitalize ", {
                  "group-hover:whitespace-normal": isLongTitle(title),
                  "group-hover:text-base": isReallyLongTitle(title),
                })}
              >
                {title}
              </p>
              <p className={cx("text-sm capitalize text-slate-400", { "group-hover:hidden": isLongTitle(title) })}>
                {author}
              </p>
              <p className={cx("text-xs capitalize text-slate-600", { "group-hover:hidden": isLongTitle(title) })}>
                Read in {yearRead}
              </p>
            </div>
            {!!comment && (
              <div className='col-span-full rounded-sm bg-slate-800 p-2'>
                <p className='text-xs '>
                  <span className='font-semibold'>Note:</span> <span className='text-slate-300'>{comment}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Books;
