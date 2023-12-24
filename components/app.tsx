import React from "react";
import Image, { StaticImageData } from "next/image";

interface props {
  title: string;
  description: string;
  image: StaticImageData;
  url: string;
}

// Define the component with props
const App = ({ title, description, image, url }: props) => {
  return (
    <div className='max-w-lg rounded-bl-2xl rounded-br-2xl border-t-8 border-teal-800 bg-neutral-100 p-4 pt-2 dark:bg-slate-900 md:border-t-8 md:p-5 md:pt-3 md:shadow-md lg:p-6 lg:pt-4'>
      {/* APP */}
      <h2 className='mb-2 inline-block text-xl font-medium text-neutral-900 dark:text-slate-200 md:text-2xl'>
        {title}
      </h2>
      {/* DESCRIPTION */}
      <div className='whitespace-pre-line text-xs font-light text-neutral-900 dark:text-slate-400 sm:text-sm lg:text-base'>
        <span>{description}</span>
      </div>
      <div className='p-2 pt-8 hover:scale-105'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <Image src={image} alt='Screenshot of the app' priority className=' rounded-xl' />
        </a>
      </div>
    </div>
  );
};

export default App;
