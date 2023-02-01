import Link from "next/link";

const Navbar = () => {
  return (
    <div className='mb-4 text-sm text-slate-700 underline dark:text-slate-50'>
      <Link href='/' scroll={false}>
        Back to home
      </Link>
    </div>
  );
};

export default Navbar;
