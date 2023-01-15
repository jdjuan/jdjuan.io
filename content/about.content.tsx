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
        { text: "Improv Theather" },
        { text: "Bachata" },
        { text: "Salsa" },
        { text: "Running" },
        { text: "Karaoke" },
        { text: "Playing Guitar" },
        { text: "Spikeball" },
        { text: "Rocket League" },
        { text: "FPS's" },
      ],
    },
    {
      question: "What do I dislike?",
      list: [
        { text: "Unpunctuality" },
        { text: "Fallacies" },
        { text: "Babies" },
        { text: "+30°" },
        { text: "Coffee" },
        { text: "Beer" },
        { text: "Exoterism" },
      ],
    },
    {
      question: "You had a vasectomy?",
      answer: () => (
        <>
          Yes. To avoid an <HighlightText>unintended pregnancy</HighlightText> and so that my partner can stop taking
          the pill.
          <br />
          <br />
          Vasectomy doesn&apos;t mean no children, it means no children with my DNA on them,{" "}
          <HighlightText>I can still adopt</HighlightText>. Plus I don&apos;t think my DNA is so especial, and even if
          it were, most geniuses kid&apos;s are average.
        </>
      ),
    },
    {
      question: "Do you have a diary?",
      answer: () => (
        <>
          Yes. I answer these questions every day: <br />
          <br />
          1. What is making me anxious and what would a kind friend say about it?
          <br />
          <br />
          2. What am I grateful for and what am I proud of?
          <br />
          <br />
          3. What was the best thing that happened today and what do I look forward to tomorrow?
        </>
      ),
    },
    {
      question: "What tools do you use?",
      list: [
        { text: "Todoist", link: "https://todoist.com/" },
        {
          text: "Inclined Bed Risers",
          link: "https://www.wikihow.com/images/thumb/2/24/Relieve-Acid-Reflux-with-a-Raised-Bed-Step-2-Version-2.jpg/v4-460px-Relieve-Acid-Reflux-with-a-Raised-Bed-Step-2-Version-2.jpg",
        },
        { text: "Bowflex", link: "https://global.bowflex.com/en/1090i/8000865.html?cgidmaster=accessories#start=4" },
        { text: "Moonlander", link: "https://www.zsa.io/moonlander/" },
        { text: "Standing desk", link: "" },
        { text: "Alarmy", link: "" },
        { text: "One+ Phone", link: "" },
        { text: "El Gato light", link: "" },
        { text: "HeadSpace", link: "" },
        { text: "Kindle", link: "" },
        { text: "App Blockers", link: "" },
        { text: "Toilet squat stool", link: "" },
        { text: "Kneeling chair", link: "" },
        { text: "LastPass", link: "" },
        { text: "Tandem", link: "" },
        { text: "Thesaurus", link: "" },
      ],
    },
  ],
};
