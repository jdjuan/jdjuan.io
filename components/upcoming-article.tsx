const UpcomingArticle = () => {
  return (
    <p className='rounded-sm bg-slate-800 p-2 text-xs text-slate-500 sm:text-sm'>
      There&apos;s an upcoming article on this topic.{" "}
      <a className='text-slate-400 underline' href='mailto:david.juanherrera@gmail.com'>
        Introduce yourself
      </a>{" "}
      in an email get an update, or simply come back in a few weeks.
    </p>
  );
};

export default UpcomingArticle;
