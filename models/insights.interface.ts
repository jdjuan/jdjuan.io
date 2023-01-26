export interface QuestionSheet {
  title: string;
  items: {
    question: string;
    answer?: () => JSX.Element;
    list?: { text: string; link?: string }[];
    link?: string;
    upcomingArticle?: boolean;
  }[];
}
