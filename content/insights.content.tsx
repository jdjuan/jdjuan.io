import HighlightText from "../components/highlight-text";
import UpcomingArticle from "../components/upcoming-article";
import { QuestionSheet } from "../models/insights.interface";

export const insights: QuestionSheet[] = [
  {
    title: "Behavior",
    items: [
      {
        question: "How to deal with bad habits?",
        answer: () => (
          <>
            Habits boil down to <HighlightText>cues</HighlightText>. To get rid of a habit, you address the cues that
            trigger it. <br />
            <br /> Finding those cues takes <HighlightText>awareness</HighlightText>, but once you discovered them,
            circumventing them will be easy.
          </>
        ),
      },
      {
        question: "How to be more productive?",
        answer: () => (
          <>
            Allocate time for <HighlightText>leisure</HighlightText>, not just productivity.
            <br />
            <br />
            Use the <HighlightText>pomodoro technique</HighlightText> as a starting point but define the intervals on a
            case-by-case basis, don&apos;t just fall back to 25/5.
          </>
        ),
      },
      {
        question: "How to cope with bad days?",
        answer: () => (
          <>
            First, <HighlightText>address your body</HighlightText>. Give yourself a well deserved shower, walk, or
            meal.
            <br />
            <br /> Then <HighlightText>address your mind</HighlightText>. Make a list of your current problems followed
            by a compassionate answer a friend would give you. Commit to addressing what you can.
          </>
        ),
      },
      { question: "How to go to sleep earlier?", upcomingArticle: true },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        question: "How to apologize?",
        answer: () => (
          <>
            An apology is ultimately an opportunity to <HighlightText>acknowledge the victim</HighlightText>, to give
            them visibility and represent them.
            {/* Failing to do so, make them sound dull and fake. */}
            <br />
            <br />
            The best apologies feel like the victim is speaking through the perpetrator.{" "}
            <HighlightText>Focus on the victim</HighlightText>, not on you.
          </>
        ),
      },
      {
        question: "How to write my curriculum?",
        answer: () => (
          <>
            Focus on numbers and tools. The former is about the <HighlightText>impact</HighlightText> you can make. The
            latter is about your <HighlightText>technical fit</HighlightText>.
            <br />
            <br />
            In other words, assume your CV is gonna be read by the CTO, not HR.
          </>
        ),
      },
      {
        question: "How to do public speaking?",
        answer: () => (
          <>
            Speak to your audience like you talk to your friends. <HighlightText>Authenticity</HighlightText>{" "}
            mesmerizes.
          </>
        ),
      },

      {
        question: "Cómo aprender Inglés?",
        answer: () => (
          <>
            Hazlo parte de <HighlightText>tu vida</HighlightText> contidiana.
          </>
        ),
      },
      {
        question: "How to ask for mentorship?",
        answer: () => (
          <>
            Make your question as <HighlightText>easy to answer</HighlightText> as possible by skipping the small talk
            and sharing the most relevant details. <br />
            <br />
            <HighlightText>Highlight</HighlightText> your preliminary findings and your current hypothesis.
          </>
        ),
      },
    ],
  },
  {
    title: "Relationships",
    items: [
      {
        question: "What are open relationships?",
        answer: () => (
          <>
            Open relationships mean you can have sex with others just as long as you don&apos;t{" "}
            <HighlightText> develop romantic feelings</HighlightText> for them. <br />
            <br />
            The particulars around what is allowed or not is up to you and your partner. So you always have the{" "}
            <HighlightText>freedom</HighlightText> to shape your relationship as you see fit.
          </>
        ),
      },
      {
        question: "What is polyamory?",
        answer: () => (
          <>
            Polyamory means you can have sex with others <HighlightText>and</HighlightText> develop romantic feelings.{" "}
            <br />
            <br />
            With polyamory you both can have <HighlightText>more than one partner</HighlightText>, leading to structures
            called constellations, and just like in the sky, their arrangements can be uniquely different.
          </>
        ),
      },
      {
        question: "Why are relationships hard?",
        answer: () => (
          <>
            Because we constrict our needs to the relationship types that we know, instead of adjusting our
            relationships to fulfill our needs.
            <br />
            <br />
            Relationships are a continous phenomenon marketed as a discrete one, and such oversimplification
            doesn&apos;t match reality.
            <br />
            <br />
            <UpcomingArticle></UpcomingArticle>
          </>
        ),
      },
      // {
      //   question: "What is a weekly meeting?",
      //   upcomingArticle: true,
      // },
    ],
  },
];
