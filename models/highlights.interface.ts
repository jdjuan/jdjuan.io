export interface Highlight {
  title: string;
  description: string;
  items: HighlighBlock[];
}

export interface HighlighBlock {
  title: string;
  topics: string[];
  link: string;
  isExternalLink?: boolean;
}
