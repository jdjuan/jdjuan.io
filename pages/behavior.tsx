import Link from "next/link";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { behavior } from "../content/behavior.content";
import type { NextPageWithLayout } from "./_app";

export const Behavior: NextPageWithLayout = () => {
  return (
    <>
      <div className='mb-10 text-sm underline'>
        <Link href='/'>Back to home</Link>
      </div>
      <h1 className='mb-4 text-4xl'>{behavior.title}</h1>
      {behavior.items.map((item) => (
        <div key={item.question}>
          <h2 className='mb-2 text-xl'>{item.question}</h2>
          <p className='text-justify text-slate-400' style={{ hyphens: "auto" }}>
            {item.answer}
          </p>
          <br />
          <br />
        </div>
      ))}
    </>
  );
};

Behavior.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Behavior;
