import { useRouter } from "next/router";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import QuestionSheet from "../components/question-sheet";
import { insights } from "../content/insights.content";
import { NextPageWithLayout } from "./_app";

export const Insights: NextPageWithLayout = () => {
  const router = useRouter();
  const { insightId } = router.query;
  const insight = insights.find(({ title }) => title.toLowerCase() === insightId);
  return <>{insight && <QuestionSheet questionSheet={insight}></QuestionSheet>}</>;
};

Insights.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Insights;
