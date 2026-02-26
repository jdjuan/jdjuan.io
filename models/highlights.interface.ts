import type { ReactNode } from "react";

export interface Highlight {
  title: string;
  description: string;
  footer: string;
  footerUrl: string;
  isFooterUrlExternal: boolean;
  items: HighlightBlock[];
}

export interface HighlightBlock {
  title: string;
  topics: string[];
  icon?: ReactNode;
  link: string;
  isExternalLink?: boolean;
}
