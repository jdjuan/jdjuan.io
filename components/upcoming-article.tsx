const UpcomingArticle = () => {
  return (
    <p className='rounded-sm p-2 text-xs dark:bg-slate-800 dark:text-slate-500 sm:text-sm'>
      There&apos;s an upcoming article on this topic.{" "}
      <a className='underline dark:text-slate-400' href='mailto:david.juanherrera@gmail.com'>
        Introduce yourself
      </a>{" "}
      in an email get an update, or simply come back in a few weeks.
    </p>
  );
};

export default UpcomingArticle;
