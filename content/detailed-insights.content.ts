import BadDays from "../components/insights/bad-days";
import BadHabits from "../components/insights/bad-habits";
import BeingProductive from "../components/insights/being-productive";
import { Insight } from "../models/insights.interface";

export const detailedInsights: Insight[] = [
  {
    title: "Behavior",
    items: [
      { question: "How to deal with bad habits?", answer: BadHabits },
      { question: "How to be more productive?", answer: BeingProductive },
      { question: "How to cope with bad days?", answer: BadDays },
      { question: "How to go to sleep earlier?", upcomingArticle: true },
    ],
  },
  {
    title: "Communication",
    items: [
      { question: "How to get rid of bad habits?", answer: BadHabits },
      { question: "How to be more productive?", answer: BeingProductive },
      { question: "How to cope with bad days?", answer: BadDays },
      { question: "How to go to sleep earlier?", upcomingArticle: true },
    ],
  },
];
