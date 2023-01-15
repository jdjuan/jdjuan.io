export interface Highlight {
  title: string;
  description: string;
  items: { title: string; topics: string[]; link: string; isExternalLink?: boolean }[];
}
