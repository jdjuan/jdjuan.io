export interface QuestionSheet {
  title: string;
  items: {
    question: string;
    answer?: () => JSX.Element;
    list?: string[];
    upcomingArticle?: boolean;
  }[];
}
