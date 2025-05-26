import { Link } from "../models/link.interface";

const Footer = () => {
  const links: Link[] = [
    { text: "Blog", link: "https://medium.com/@jdjuan" },
    { text: "X", link: "https://twitter.com/jdjuan" },
    { text: "LinkedIn", link: "https://www.linkedin.com/in/jdjuan" },
  ];
  return (
    <div className='mt-10 -mb-10 pb-6 pt-2 text-xs text-neutral-500 dark:text-slate-600'>
      {links.map(({ text, link }) => (
        <a
          key={text}
          href={link}
          target='_blank'
          className='col-span-1 mr-2 dark:text-slate-500'
          rel='noopener noreferrer'
        >
          {text}{" "}
        </a>
      ))}
    </div>
  );
};

export default Footer;