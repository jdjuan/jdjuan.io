import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import QuestionSheet from "../components/question-sheet";
import { about } from "../content/about.content";
import { NextPageWithLayout } from "./_app";

export const About: NextPageWithLayout = () => {
  return <QuestionSheet questionSheet={about}></QuestionSheet>;
};

About.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default About;
