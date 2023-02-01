import { ReactElement, useEffect, useState } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import { fullTimeline } from "../content/timeline.content";
import cx from "classnames";
import { YearTimeline } from "../models/timeline-event.interface";
import { prevent } from "../utils/ui";

export const age = new Date().getFullYear() - 1993;

const Timeline = () => {
  const [selectedYearTimeline, setSelectedYearTimeline] = useState<YearTimeline | undefined>();
  const select = (yearTimeline: YearTimeline) => {
    const selection = yearTimeline.year === selectedYearTimeline?.year ? undefined : yearTimeline;
    setSelectedYearTimeline(selection);
  };

  useEffect(() => {
    const randomEvent = fullTimeline[Math.floor(Math.random() * fullTimeline.length)];
    setSelectedYearTimeline(randomEvent);
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <h1 className='mb-6 font-headline text-4xl md:mb-10'>Timeline</h1>
      <div className='text-neutral-800 dark:text-slate-300'>Each square is a year of my life:</div>
      <br />
      {/* YEAR BOXES */}
      <div className='grid max-w-sm gap-8 sm:max-w-full sm:grid-cols-2'>
        <div className='grid max-h-fit grid-cols-6 gap-3 self-start sm:grid-cols-5 sm:gap-4 lg:grid-cols-6'>
          {new Array(age).fill(true).map((_, index) => {
            const yearTimeline = fullTimeline.find(({ year }) => year === index);
            const withouEvents = !yearTimeline?.highlights.length;
            const withEvents = !withouEvents;
            const notSelectedWithouEvents = withouEvents && selectedYearTimeline?.year !== index;
            const notSelectedWithEvents = withEvents && selectedYearTimeline?.year !== index;
            const selected = selectedYearTimeline?.year === index;
            return (
              // YEAR BOX
              <div
                onClick={(e) => withEvents && prevent(select, yearTimeline)(e)}
                className={cx(
                  "flex aspect-square flex-col items-center justify-center rounded-md bg-neutral-100 text-base last:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 last:dark:bg-slate-800 sm:text-lg lg:text-xl ",
                  {
                    "cursor-pointer": withEvents,
                    "text-neutral-200 dark:text-slate-700": notSelectedWithouEvents,
                    "border-0 text-neutral-700 hover:border-2 hover:border-neutral-700 hover:dark:border-slate-200":
                      notSelectedWithEvents,
                    "scale-110 border-2 border-neutral-900 text-neutral-900 transition dark:border-slate-50 dark:text-slate-50":
                      selected,
                  }
                )}
                key={index}
              >
                <span>{index + 1}</span>
                {/* LITTLE DOTS */}
                <div className='flex'>
                  {yearTimeline?.highlights.map((_, indexEvent) => (
                    <span
                      key={indexEvent}
                      className={cx(
                        "mr-0.5 aspect-square w-1 rounded-full bg-neutral-300 transition-colors last:mr-0 dark:bg-slate-700 lg:mt-1",
                        {
                          "bg-neutral-900 dark:bg-slate-100": selectedYearTimeline?.year === index,
                        }
                      )}
                    ></span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* HIGHLIGHTS */}
        {selectedYearTimeline !== undefined && (
          <div className='self-start rounded-md bg-neutral-100 p-5 pt-4 dark:bg-slate-900 md:p-7 md:pt-6'>
            <div className='mb-3 text-lg font-medium sm:mb-4 sm:text-xl lg:mb-5 lg:text-2xl'>
              When I was {selectedYearTimeline?.year + 1 || 0}
            </div>
            {selectedYearTimeline?.highlights.map((highlight, index) => (
              <div
                key={index}
                className='mb-4 rounded-md bg-neutral-50 p-3 text-xs last:mb-0 dark:bg-slate-800 md:text-sm lg:text-base'
              >
                <highlight.text></highlight.text>
                {highlight.subtext && (
                  <div className='mt-2 text-xs font-light text-neutral-600 dark:text-slate-400 lg:text-sm'>
                    {highlight.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

Timeline.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Timeline;
