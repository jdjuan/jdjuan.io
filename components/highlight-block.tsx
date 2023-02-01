import Link from "next/link";
import { HighlighBlock } from "../models/highlights.interface";
type Props = { highlighBlock: HighlighBlock };

const HighlightBlock = ({ highlighBlock }: Props) => {
  const { isExternalLink, title, link, topics } = highlighBlock;
  return (
    <div>
      <Link passHref={isExternalLink} target={isExternalLink ? "_blank" : "_self"} href={link}>
        <div className='bordder box-border grid max-w-xs grid-cols-12 items-center gap-3 rounded-lg border-2 border-neutral-100 bg-neutral-50 hover:border-neutral-900 dark:border-slate-700 dark:bg-slate-800 hover:dark:border-slate-50 sm:gap-4'>
          {/* HIGHLIGHT TITLE */}
          <h3 className='col-span-full rounded-t-md bg-neutral-800 px-3 py-1.5 text-lg font-extralight text-neutral-200 dark:bg-slate-900 dark:text-slate-300 sm:px-4 sm:py-2 md:text-xl'>
            {title}
          </h3>
          {/* HIGHLIGHT ICON */}
          <div className='col-span-3 pl-3 pb-3 sm:pl-4 sm:pb-4'>
            <div className='aspect-square w-full rounded-md bg-neutral-100 bg-clip-content dark:bg-slate-700'></div>
          </div>
          {/* HIGHLIGHT TOPICS */}
          <div className='col-span-9 pr-4 pb-4'>
            {topics.map((topic) => (
              <p
                className='text-xs font-light text-neutral-700 dark:font-extralight dark:text-slate-400 sm:text-sm'
                key={topic}
              >
                {topic}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HighlightBlock;
