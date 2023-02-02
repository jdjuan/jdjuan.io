export interface Highlight {
  title: string;
  description: string;
  items: HighlightBlock[];
}

export interface HighlightBlock {
  title: string;
  topics: string[];
  icon?: JSX.Element;
  link: string;
  isExternalLink?: boolean;
}
