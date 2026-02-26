import type { ReactNode } from "react";

export interface QuestionSheet {
  title: string;
  items: {
    question: string;
    answer?: () => ReactNode;
    list?: { text: string; link?: string }[];
    link?: string;
    upcomingArticle?: boolean;
  }[];
}
