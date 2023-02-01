import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { booksContent } from "../content/books.content";
import { NextPageWithLayout } from "./_app";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

export const Books: NextPageWithLayout = () => {
  const isTitleShort = (title: string) => title.length < 30;
  return (
    <>
      <Navbar></Navbar>
      <h1 className='mb-6 font-headline text-4xl md:mb-10'>Books Reviews</h1>
      <div className='grid gap-4 md:gap-5 lg:grid-cols-2 lg:gap-6'>
        {/* BOOK BLOCKS */}
        {booksContent.map(({ author, comment, rating, title, yearRead, isbn, imgUrl, link }) => (
          // BLOCK
          <Link
            href={link}
            key={title}
            target='_blank'
            className='border-transparent relative box-border flex max-w-sm cursor-pointer rounded-xl 
            border-2 border-slate-50 bg-neutral-100 p-4 hover:border-neutral-600 dark:border-slate-800 dark:bg-slate-900 hover:dark:border-slate-50 sm:max-w-lg sm:p-5 lg:max-w-full'
          >
            {/* RATING */}
            <div className='absolute -top-3 -left-3 w-12'>
              <p className='flex aspect-square items-center justify-center rounded-lg border-2 border-neutral-900 bg-slate-50 text-base font-medium text-neutral-900 dark:border-slate-100 dark:bg-slate-800 dark:text-slate-50  '>
                {rating}/5
              </p>
            </div>
            {/* BOOK COVER */}
            <Image
              src={imgUrl ?? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
              alt='Picture of the author'
              width='100'
              height='0'
              className='mr-4 h-32 w-20 max-w-xs rounded-md dark:border-slate-100 sm:mr-5'
            />
            {/* CONTENT */}
            <div>
              {/* META DATA */}
              <div className='mb-4 font-light'>
                <p
                  className={cx("-mt-1 w-fit font-headline text-lg capitalize dark:text-slate-100 sm:text-2xl", {
                    "mb-7": !isTitleShort(title) && !!comment,
                  })}
                >
                  {title}
                </p>
                {(isTitleShort(title) || !comment) && (
                  <>
                    <p className='text-sm capitalize dark:text-slate-400 sm:text-base'>{author}</p>
                    <p className='text-xs capitalize dark:text-slate-600 sm:text-sm'>Read in {yearRead}</p>
                  </>
                )}
              </div>
              {/* COMMENT */}
              {!!comment && (
                <p className='rounded-md bg-neutral-50 p-2 text-xs dark:bg-slate-800 sm:text-sm'>
                  <span className='font-medium'>Note:</span>{" "}
                  <span className='font-light dark:text-slate-300'>{comment}</span>
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Books;
