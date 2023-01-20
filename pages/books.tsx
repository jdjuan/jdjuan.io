import { ReactElement, useCallback, useEffect, useState } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { booksContent } from "../content/books.content";
import { Book } from "../models/book.interface";
import { NextPageWithLayout } from "./_app";

export const Books: NextPageWithLayout = () => {
  const [books, setBooks] = useState<Book[]>(booksContent);
  const [ratingOrderDirection, setRatingOrderDirection] = useState(true);
  const orderBooksByRating = () => {
    if (ratingOrderDirection) {
      setBooks([...books].sort((a, b) => (a.rating > b.rating ? -1 : 1)));
    } else {
      setBooks([...books].sort((b, a) => (a.rating > b.rating ? -1 : 1)));
    }
    setRatingOrderDirection(!ratingOrderDirection);
  };

  return (
    <>
      <Navbar></Navbar>
      {/* <p className='mb-4'>
        Order by{" "}
        <span className='cursor-pointer underline' onClick={orderBooksByRating}>
          rating
        </span>{" "}
        or <span className='cursor-pointer underline'>year read</span>
      </p> */}
      {books.map(({ author, comment, rating, title, yearRead }) => (
        <div key={title} className='place-contents-center mb-4 grid grid-cols-12 gap-3 rounded-lg bg-slate-900 p-3'>
          <div className='col-span-2'>
            <p className='inline-block rounded-md bg-slate-700 p-1 text-lg text-slate-100'>{rating}/5</p>
          </div>
          <div className='col-span-10'>
            <p title={title} className='-mt-1 truncate text-lg capitalize hover:whitespace-normal'>
              {title}
            </p>
            <p className='text-sm capitalize text-slate-400'>{author}</p>
            <p className='text-xs text-slate-600'>Read in {yearRead}</p>
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
    </>
  );
};

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Books;
