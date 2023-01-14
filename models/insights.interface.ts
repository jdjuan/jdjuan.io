export interface Insight {
  title: string;
  items: {
    question: string;
    answer: string;
    link: string;
    linkText: string;
    upcomingArticle?: boolean;
  }[];
}
