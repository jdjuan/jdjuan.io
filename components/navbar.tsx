import Link from "next/link";

const Navbar = () => {
  return (
    <div className='mb-4 select-none text-sm underline'>
      <Link href='/' scroll={false}>
        Back to home
      </Link>
    </div>
  );
};

export default Navbar;
