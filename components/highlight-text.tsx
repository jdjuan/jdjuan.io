import { ReactNode } from "react";

type Props = { children?: ReactNode };
const HighlightText = ({ children }: Props) => {
  return <span className='font-medium text-neutral-800 dark:text-slate-200'>{children}</span>;
};

export default HighlightText;
