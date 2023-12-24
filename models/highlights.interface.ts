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
  icon?: JSX.Element;
  link: string;
  isExternalLink?: boolean;
}
