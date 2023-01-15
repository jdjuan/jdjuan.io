import Link from "next/link";
import { QuestionSheet } from "../models/insights.interface";
type Props = { questionSheet: QuestionSheet };

const QuestionSheet = ({ questionSheet }: Props) => {
  return (
    <>
      <div className='mb-10 text-sm underline'>
        <Link href='/'>Back to home</Link>
      </div>
      {questionSheet && (
        <>
          {/* MAIN TITLE */}
          <h1 className='mb-6 text-4xl '>{questionSheet.title}</h1>
          <div className='mb-16'>
            {/* ITEM */}
            {questionSheet.items.map((item) => (
              <div className='mb-6 rounded-md bg-slate-900 p-4' key={item.question}>
                {/* QUESTION */}
                <h2 className='mb-2 text-xl'>{item.question}</h2>
                {/* ANSWER */}
                {item.answer && (
                  <div className='whitespace-pre-line text-xs text-slate-400'>
                    <item.answer></item.answer>
                  </div>
                )}
                {item.list && (
                  <div className='mt-3 text-xs text-slate-400'>
                    {item.list.map((element) => (
                      <div key={element} className='mb-2 mr-2 inline-block rounded-sm bg-slate-800 p-2'>
                        {element}
                      </div>
                    ))}
                  </div>
                )}
                {/* UPCOMING ARTICLE */}
                {item.upcomingArticle && (
                  <p className='text-xs text-slate-500 '>
                    There&apos;s an upcoming article on this.{" "}
                    <a className='text-slate-400 underline' href='mailto:david.juanherrera@gmail.com'>
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

export default QuestionSheet;
