import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { books } from "../content/books.content";
import { NextPageWithLayout } from "./_app";

export const Books: NextPageWithLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      {books.map(({ author, comment, rating, title, yearRead }) => (
        <div key={title} className='place-contents-center mb-4 grid grid-cols-12 rounded-lg bg-slate-900 p-3'>
          <p className='col-span-2 self-center pl-2 text-3xl'>{rating}</p>
          <div className='col-span-10'>
            <p title={title} className='truncate text-lg capitalize'>
              {title}
            </p>
            <p className='text-xs capitalize text-slate-400'>{author}</p>
            <p className='text-xs text-slate-600'>Ready in {yearRead}</p>
          </div>
          {/* <p className='col-span-full'>{comment}</p> */}
        </div>
      ))}
    </>
  );
};

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Books;
