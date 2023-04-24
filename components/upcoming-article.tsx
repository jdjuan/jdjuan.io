const UpcomingArticle = () => {
  return (
    <p className='mt-3 rounded-md bg-neutral-200 p-2 text-xs font-light text-neutral-600 shadow-md dark:bg-slate-800 dark:font-normal dark:text-slate-500 sm:text-sm'>
      There&apos;s an upcoming article on this topic. <br />
      Subscribe{" "}
      <a
        className='text-neutral-900 underline dark:text-slate-400'
        target={"_blank"}
        href='http://eepurl.com/hp0sUn'
        rel='noreferrer'
      >
        here
      </a>{" "}
      to get an update, or come back later.
    </p>
  );
};

export default UpcomingArticle;
