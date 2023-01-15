import HighlightText from "../components/highlight-text";
import { QuestionSheet } from "../models/insights.interface";

export const about: QuestionSheet = {
  title: "F.A.Q.",
  items: [
    {
      question: "What am I good at?",
      answer: () => (
        <>
          I&apos;m good at <HighlightText>recognizing patterns</HighlightText>. I can identify cues to improve my
          behavior, but I can also synthesize knowledge to communicate it more effectively. <br />
          <br /> Recognizing patterns also applies to decision-making, allowing me to be{" "}
          <HighlightText>practical</HighlightText> but also very <HighlightText>optimistic</HighlightText> in life.
        </>
      ),
    },
    {
      question: "What do I struggle with?",
      answer: () => (
        <>
          I seek the <HighlightText>validation</HighlightText> of friends and strangers more than I wished. It makes{" "}
          <HighlightText>anxious</HighlightText> at social settings like clubs or concerts. <br />
          <br />
          On top of that, <HighlightText>I cannot enjoy an activity I cannot be really good at</HighlightText>. You
          might say everybody is like that, but my friends have no problem losing against me over and over (haha).
        </>
      ),
    },
    {
      question: "What are my beliefs?",
      answer: () => (
        <>
          I believe that our <HighlightText>dreams and desires have a price</HighlightText>, not necessarily monetary,
          and that refusing to pay for them is what holds us back the most.
          <br />
          <br />I also believe we constantly <HighlightText>escape reality</HighlightText> through our vices because we
          don&apos;t know a better way to deal with the anxiety that we have{" "}
          <HighlightText>failed to address and integrate</HighlightText> into our lives.
        </>
      ),
    },
    {
      question: "What do I like?",
      list: [
        "Improv Theather",
        "Bachata",
        "Salsa",
        "Running",
        "Karaoke",
        "Playing Guitar",
        "Spikeball",
        "Rocket League",
        "FPS's",
      ],
    },
  ],
};
