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
      <div className='text-slate-300'>Each square is a year of my life:</div>
      <br />
      <div className='grid grid-cols-5 gap-4'>
        {new Array(age).fill(true).map((_, index) => {
          const yearTimeline = fullTimeline.find(({ year }) => year === index);
          const withouEvents = !yearTimeline?.highlights.length;
          const withEvents = !withouEvents;
          const notSelectedWithouEvents = withouEvents && selectedYearTimeline?.year !== index;
          const notSelectedWithEvents = withEvents && selectedYearTimeline?.year !== index;
          const selected = selectedYearTimeline?.year === index;
          return (
            <div
              onClick={(e) => withEvents && prevent(select, yearTimeline)(e)}
              className={cx(
                "flex aspect-square flex-col items-center justify-center rounded-md bg-slate-900 text-lg text-slate-300 last:bg-slate-800 ",
                {
                  "cursor-pointer": withEvents,
                  "text-slate-700": notSelectedWithouEvents,
                  "border-0 hover:border-2 hover:border-slate-200": notSelectedWithEvents,
                  "scale-110 border-2 border-slate-50 text-slate-50 transition": selected,
                }
              )}
              key={index}
            >
              <span className='select-none'>{index + 1}</span>
              <div>
                {!!yearTimeline?.highlights.length && (
                  <div className='flex'>
                    {yearTimeline?.highlights.map((_, indexEvent) => (
                      <span
                        key={indexEvent}
                        className={cx(
                          "mr-0.5 aspect-square w-1 rounded-full bg-slate-700 transition-colors last:mr-0 ",
                          {
                            "bg-slate-100": selectedYearTimeline?.year === index,
                          }
                        )}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedYearTimeline !== undefined && (
        <div className='mt-4 rounded-md bg-slate-900 p-5 pt-4'>
          <div className='mb-3 text-center text-lg'>
            {selectedYearTimeline?.year + 1 || 0} Year{selectedYearTimeline?.year === 0 ? "" : "s"} Old
          </div>
          <div>
            {selectedYearTimeline?.highlights.map((highlight, index) => (
              <div key={index} className='mb-4 rounded-md bg-slate-800 p-3 text-xs last:mb-0'>
                <highlight.text></highlight.text>
                {highlight.subtext && <div className='mt-2 text-xs text-slate-400'>{highlight.subtext}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

Timeline.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default Timeline;
