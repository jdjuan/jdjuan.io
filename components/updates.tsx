const Updates = () => {
  return (
    <div className='mb-16 text-sm'>
      <h2 className='mb-4 font-headline text-4xl'>Updates</h2>
      <p className='text-base font-light dark:font-extralight dark:text-slate-300'>
        Once a month I share my latest insights over email. <br /> To receive them, subscribe{" "}
        <a className='underline dark:text-slate-200' target={"_blank"} href='http://eepurl.com/hp0sUn' rel='noreferrer'>
          here
        </a>
        .
      </p>
      {/* <p className='mt-2 font-light italic text-neutral-400 dark:font-extralight dark:text-slate-300'>
        I reply to all emails.
      </p> */}
    </div>
  );
};

export default Updates;
