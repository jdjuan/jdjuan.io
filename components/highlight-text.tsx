import { ReactNode } from "react";

type Props = { children?: ReactNode };
const HighlightText = ({ children }: Props) => {
  return <span className='dark:text-slate-200'>{children}</span>;
};

export default HighlightText;
