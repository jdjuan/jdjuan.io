import { QuestionSheet } from "../models/insights.interface";
import Navbar from "./navbar";
import UpcomingArticle from "./upcoming-article";
type Props = { questionSheet: QuestionSheet };

const QuestionSheet = ({ questionSheet }: Props) => {
  return (
    <>
      <Navbar></Navbar>
      {questionSheet && (
        <>
          {/* MAIN TITLE */}
          <h1 className='mb-6 text-4xl md:mb-10'>{questionSheet.title}</h1>
          {/* QUESTIONS */}
          <div className='grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6'>
            {questionSheet.items.map((item) => (
              <div className='max-w-lg rounded-md bg-slate-900 p-4 md:p-5 md:pt-4 lg:p-6 lg:pt-5' key={item.question}>
                {/* QUESTION */}
                <h2 className='mb-2 text-xl font-medium md:text-2xl'>{item.question}</h2>
                {/* ANSWER */}
                {item.answer && (
                  <div className='whitespace-pre-line text-xs font-light text-slate-400 sm:text-sm lg:text-base'>
                    <item.answer></item.answer>
                  </div>
                )}
                {item.list && (
                  <div className='mt-4 text-xs text-slate-400'>
                    {item.list.map(({ text, link }) => (
                      <a href={link} key={text} target='_blank' rel='noreferrer'>
                        <div className='mb-2 mr-2 inline-block rounded-md bg-slate-800 p-2'>{text}</div>
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
