import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { booksContent } from "../content/books.content";
import { NextPageWithLayout } from "./_app";
import cx from "classnames";
import Image from "next/image";

export const Books: NextPageWithLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <h1 className='mb-6 text-4xl md:mb-10'>Books Reviews</h1>
      <div className='grid gap-8 sm:gap-6 md:gap-5 lg:grid-cols-2 lg:gap-6'>
        {booksContent.map(({ author, comment, rating, title, yearRead, isbn, imgUrl }) => (
          <div
            key={title}
            className='relative flex max-w-sm rounded-lg bg-slate-900 p-4 sm:max-w-full sm:p-5 lg:max-w-full'
          >
            <div className='absolute -top-3 -left-3 w-12'>
              <p className='flex aspect-square items-center justify-center rounded-full border-2 border-slate-100 bg-slate-800 text-base font-semibold text-slate-50 lg:text-lg'>
                {rating}/5
              </p>
            </div>
            <Image
              src={imgUrl ?? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
              alt='Picture of the author'
              width='100'
              height='0'
              className='mr-4 max-w-xs rounded-md border-slate-100 sm:mr-5'
            />
            <div>
              <div className='mb-4 flex sm:mb-4'>
                <div className=''>
                  <p className={cx("-mt-1 w-fit text-lg capitalize text-slate-100 sm:text-2xl")}>{title}</p>
                  <p className={cx("text-sm capitalize text-slate-400 sm:text-base")}>{author}</p>
                  <p className={cx("text-xs capitalize text-slate-600 sm:text-sm")}>Read in {yearRead}</p>
                </div>
              </div>
              {!!comment && (
                <div className='rounded-md bg-slate-800 p-2'>
                  <p className='text-xs sm:text-sm'>
                    <span className='font-semibold'>Note:</span> <span className='text-slate-300'>{comment}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Books;
