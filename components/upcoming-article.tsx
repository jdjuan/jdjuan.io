const UpcomingArticle = () => {
  return (
    <p className='mt-3 rounded-md bg-neutral-200 p-2 text-xs font-light text-neutral-600 dark:bg-slate-800 dark:font-normal dark:text-slate-500 sm:text-sm'>
      There&apos;s an upcoming article on this topic.{" "}
      <a className='text-neutral-900 underline dark:text-slate-400' href='mailto:david.juanherrera@gmail.com'>
        Introduce yourself
      </a>{" "}
      in an email get an update, or simply come back in a few weeks.
    </p>
  );
};

export default UpcomingArticle;
