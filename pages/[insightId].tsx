import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import { detailedInsights } from "../content/detailed-insights.content";
import { NextPageWithLayout } from "./_app";

export const Insights: NextPageWithLayout = () => {
  const router = useRouter();
  const { insightId } = router.query;
  console.log(insightId);

  const insight = detailedInsights.find(({ title }) => title.toLowerCase() === insightId);
  return (
    <>
      <div className='mb-10 text-sm underline'>
        <Link href='/'>Back to home</Link>
      </div>
      {insight && (
        <>
          {/* MAIN TITLE */}
          <h1 className='mb-6 text-4xl'>{insight.title}</h1>
          <div className='mb-16'>
            {/* ITEM */}
            {insight.items.map((item) => (
              <div className='mb-6 rounded-md bg-slate-900 p-4' key={item.question}>
                {/* QUESTION */}
                <h2 className='mb-2 text-xl'>{item.question}</h2>
                {/* ANSWER */}
                {item.answer && (
                  <p className='whitespace-pre-line text-xs text-slate-500'>
                    <item.answer></item.answer>
                  </p>
                )}
                {/* UPCOMING ARTICLE */}
                {item.upcomingArticle && (
                  <p className='text-xs text-slate-600'>
                    There&apos;s an upcoming article on this.{" "}
                    <a className='text-slate-500 underline' href='mailto:david.juanherrera@gmail.com'>
                      Introduce yourself
                    </a>{" "}
                    in an email to be notified, or simply come back in a few weeks.
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

Insights.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Insights;