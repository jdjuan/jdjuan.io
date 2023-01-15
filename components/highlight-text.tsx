import { ReactNode } from "react";

type Props = { children?: ReactNode };
const HighlightText = ({ children }: Props) => {
  return <span className='text-slate-100'>{children}</span>;
};

export default HighlightText;
