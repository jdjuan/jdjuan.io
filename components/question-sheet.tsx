import { QuestionSheet } from "../models/insights.interface";
import Navbar from "./navbar";
import UpcomingArticle from "./upcoming-article";
type Props = { questionSheet: QuestionSheet };
import cx from "classnames";

const QuestionSheet = ({ questionSheet }: Props) => {
  return (
    <>
      <Navbar></Navbar>
      {questionSheet && (
        <>
          {/* MAIN TITLE */}
          <h1 className='mb-6 font-headline text-4xl md:mb-10'>{questionSheet.title}</h1>
          {/* QUESTIONS */}
          <div className='grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6'>
            {questionSheet.items.map((item) => (
              <div
                className='max-w-lg rounded-bl-2xl rounded-br-2xl border-t-8 border-teal-800 bg-neutral-100 p-4 pt-2 shadow-md dark:bg-slate-900 md:p-5 md:pt-3 lg:p-6 lg:pt-4'
                key={item.question}
              >
                {/* QUESTION */}
                <h2 className='mb-2 inline-block text-xl font-medium text-neutral-900 dark:text-slate-200 md:text-2xl'>
                  {item.question}
                </h2>
                {/* ANSWER */}
                {item.answer && (
                  <div className='whitespace-pre-line text-xs font-light text-neutral-900 dark:text-slate-400 sm:text-sm lg:text-base'>
                    <item.answer></item.answer>
                  </div>
                )}
                {/* LIST */}
                {item.list && (
                  <div className='mt-4 text-xs dark:text-slate-400'>
                    {item.list.map(({ text, link }) => (
                      <a href={link} key={text} target='_blank' rel='noreferrer'>
                        <div
                          className={cx(
                            "mb-2 mr-2 inline-block rounded-md border border-neutral-700 p-2 dark:border-slate-700 dark:bg-slate-800 ",
                            {
                              "hover:bg-teal-800 hover:text-neutral-50 hover:dark:border-slate-50": !!link,
                            }
                          )}
                        >
                          {text}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
                {item.upcomingArticle && <UpcomingArticle></UpcomingArticle>}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default QuestionSheet;
