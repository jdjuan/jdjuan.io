export interface Insight {
  title: string;
  items: {
    question: string;
    answer?: () => JSX.Element;
    upcomingArticle?: boolean;
  }[];
}
