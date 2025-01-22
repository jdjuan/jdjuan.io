import { YearTimeline, HighlighType } from "../models/timeline-event.interface";

export const fullTimeline: YearTimeline[] = [
  {
    year: 0,
    highlights: [
      {
        text: () => <>I was born In Colombia</>,
        subtext: "In the year of 1993.",
        type: [HighlighType.Lucky],
      },
    ],
  },
  {
    year: 4,
    highlights: [
      {
        text: () => <>Used a computer for the first time</>,
        subtext: "It profoundly influenced my interest for software.",
        type: [HighlighType.Lucky],
      },
    ],
  },
  {
    year: 6,
    highlights: [
      {
        text: () => <>Connected to the internet</>,
        subtext: "This was a privilege in Colombia, and in some places, it still is.",
        type: [HighlighType.Lucky],
      },
    ],
  },
  {
    year: 7,
    highlights: [
      {
        text: () => (
          <>
            Had my{" "}
            <a
              href='https://drive.google.com/open?id=0B2LpSSLNjcc7SzFXYzh1QW5UcUU'
              target='_blank'
              className='underline'
              rel='noopener noreferrer'
            >
              first cat
            </a>
          </>
        ),
        subtext: "She lived for 16 years, I still miss her sometimes.",
      },
    ],
  },
  {
    year: 8,
    highlights: [
      {
        text: () => <>Learned how to play guitar</>,
        subtext: "This has given countless hours of joy.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 9,
    highlights: [
      {
        text: () => <>Learned how to play chess</>,
        subtext: "Just wanted to join my father and brother who played often. It took me years to beat them.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 11,
    highlights: [
      {
        text: () => <>Earned a gold medal at a chess tournament</>,
        subtext: "I continued playing chess professionally for 2 years before I quit.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 12,
    highlights: [
      {
        text: () => <>Made my first computer program in C++</>,
        subtext: "My brother helped me. He also taught me how to create videogames. I was hooked.",
      },
    ],
  },
  {
    year: 13,
    highlights: [
      {
        text: () => <>Joined the International Park of Creativity</>,
        subtext: "A science group aimed at using children's creativity to solve science's latest problems.",
        type: [HighlighType.Lucky],
      },
      {
        text: () => <>Met a hacker who taught me how to code</>,
        subtext: "We met every Saturday. He was just a passionate developer finding a curious pupil.",
        type: [HighlighType.Lucky],
      },
    ],
  },
  {
    year: 15,
    highlights: [
      {
        text: () => <>Joined a science competition in MIT</>,
        subtext: "We didn't win the competition (iGEM) but it was an honor.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Got drunk for the first time</>,
        subtext: "It was on purpose in a controlled and safe environment. Haha, it was an experiment.",
      },
      {
        text: () => <>Started my bachelor&apos;s degree</>,
        subtext: "It was a close call over Psychology, Philosophy, and Computer Science.",
      },
      {
        text: () => <>Performed my biggest prank</>,
        subtext: "Can't say what it was.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 16,
    highlights: [
      {
        text: () => (
          <>
            I appeared on{" "}
            <a href='https://vimeo.com/28748182' target='_blank' className='underline' rel='noopener noreferrer'>
              MTV
            </a>
          </>
        ),
        subtext: "It was something to be proud of back in the time.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Made my first business selling cookies at Uni</>,
        subtext: "I sold 200 cookies a day and had 2 affiliates.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 17,
    highlights: [
      {
        text: () => <>Enrolled in University Choir</>,
        subtext: "I continued singing in choirs for the next 10 years.",
      },
      {
        text: () => <>Learned how to ride a bike</>,
        subtext: "For some reason I didn't learn before.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Had my first job as a translator</>,
        subtext: "I translated soap operas, manuals, and legal docs.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
    ],
  },
  {
    year: 18,
    highlights: [
      {
        text: () => <>Was featured in movie theathers in Colombia</>,
        subtext: "It was mini documentary about the International Park of Creativity.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => (
          <>
            Convinced 8 people to start a{" "}
            <a
              href='https://www.youtube.com/watch?v=g6rtOCRSkn8&t=26s'
              className='underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              startup
            </a>{" "}
          </>
        ),
        subtext: "One year of work and we never launched. It was a productivity app.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
    ],
  },
  {
    year: 19,
    highlights: [
      {
        text: () => <>Worked as fullstack developer for a Taxi startup</>,
        subtext: "I introduced them to GitHub.",
        type: [HighlighType.Professional],
      },
      {
        text: () => <>Earned the first place at a Game Jam</>,
        subtext: "My team and I coded a JavaScript game using the canvas.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
      {
        text: () => <>Worked for University at the design department</>,
        subtext: "Being surrounded by designers taught me a lot.",
        type: [HighlighType.Professional],
      },
    ],
  },
  {
    year: 21,
    highlights: [
      {
        text: () => <>Launched The Compliment Project</>,
        subtext: "It was inspired by my father's passing.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
      {
        text: () => <>Launched The RAK Project</>,
        subtext: "It challenged people to perform random acts of kindness.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
      {
        text: () => <>Played songs in the streets</>,
        subtext: "A friend and I played guitar and sang songs for fun. We were invited to play at a bar.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Worked as mobile developer</>,
        subtext: "It was a difficult place.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
    ],
  },
  {
    year: 22,
    highlights: [
      {
        text: () => <>Co-founded Kindd</>,
        subtext: "We challenged people to do randon acts of kindness and share them on social media.",
        type: [HighlighType.Professional, HighlighType.Achievement],
      },
      {
        text: () => <>Worked as a fullstack developer</>,
        subtext: "I was building governmental software to support unemployed people.",
        type: [HighlighType.Professional],
      },
      {
        text: () => <>Moved to Medellin</>,
        subtext: "I got a job as a Frontend Developer.",
        type: [HighlighType.Professional],
      },
      {
        text: () => <>Started learning Angular</>,
        subtext: "It pivoted my professional career hugely.",
        type: [HighlighType.Lucky, HighlighType.Professional],
      },
    ],
  },
  {
    year: 23,
    highlights: [
      {
        text: () => <>Launched Shared Lunch</>,
        subtext: "It encouraged people to have lunch together. It was released only inside my company.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => (
          <>
            Founded{" "}
            <a
              href='https://www.meetup.com/angular-medellin/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              Angular Medellin
            </a>
          </>
        ),
        subtext: "We reached about 3K members and 100 regular attendees.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
      {
        text: () => (
          <>
            Founded{" "}
            <a
              href='https://www.youtube.com/watch?v=pLMgfU_uNPo'
              className='underline'
              rel='noopener noreferrer'
              target={"_blank"}
            >
              NgColombia
            </a>
          </>
        ),
        subtext: "The first Angular conference in Latin America. It was heavily supported by Yuxi Global.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
    ],
  },
  {
    year: 24,
    highlights: [
      {
        text: () => <>Became a Google Developer Expert in Angular</>,
        subtext: "It pushed my professional career a lot.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
      {
        text: () => <>Sang in a Opera</>,
        subtext: "We performed Otello by Vivaldi.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Co-founded She Codes Angular</>,
        subtext: "It encouraged women to join the IT field.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
    ],
  },
  {
    year: 25,
    highlights: [
      {
        text: () => <>Moved to Graz, Austria</>,
        subtext: "It was difficult, but worth it.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Run my first 5K race</>,
        subtext: "Under 25 minutes. Yes, I'm bragging.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => (
          <>
            Lunched and built{" "}
            <a href='http://pada.jdjuan.io' className='underline' target='_blank' rel='noopener noreferrer'>
              P.A.D.A.
            </a>
          </>
        ),
        subtext: "I did it because I don't enjoy meetings.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
    ],
  },
  {
    year: 26,
    highlights: [
      {
        text: () => (
          <>
            Launched{" "}
            <a href='http://derdiedas.jdjuan.io' className='underline' target='_blank' rel='noopener noreferrer'>
              Der Die Das
            </a>
          </>
        ),
        subtext: "I did it to help me learn german.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
      {
        text: () => <>Started livestreaming</>,
        subtext: "Until I realized how demanding it is.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 27,
    highlights: [
      {
        text: () => (
          <>
            Co-founded{" "}
            <a
              href='https://www.youtube.com/watch?v=oFL9mT2qML8'
              className='underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              HeadScroll
            </a>
          </>
        ),
        subtext: "App that helped people play instruments without interruptions.",
        type: [HighlighType.Achievement, HighlighType.Professional],
      },
      {
        text: () => <>Got into Polyamory</>,
        subtext: "And wrote about it.",
        type: [],
      },
      {
        text: () => <>Run the Grazathlon</>,
        subtext: "An obstacle race I promised myself never to run again.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 28,
    highlights: [
      {
        text: () => <>Run my first quarter marathon</>,
        subtext: "Pace was 4'40\". Yes, I'm bragging again.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Threw a sex-positivity party</>,
        subtext: "Well, I'm proud of it.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Joined an improv theater group</>,
        subtext: "Realized is something I enjoy a lot.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 29,
    highlights: [
      {
        text: () => <>Made money online for the first time</>,
        subtext: "I co-founded TandemGPT and we reached 50€ MRR.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Achieved my fastest 10K run so far</>,
        subtext: "Pace was 4'18\". I was 99 out 1300!",
        type: [HighlighType.Achievement],
      },
      {
        text: () => (
          <>
            Co-founded{" "}
            <a href='https://www.parlai.app/' className='underline' target='_blank' rel='noopener noreferrer'>
              Parlai
            </a>
          </>
        ),
        subtext: "The project I'm most proud of.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Spent Christmas secluded</>,
        subtext: "I went to a cabin in the mountains and reflected on my life.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  {
    year: 30,
    highlights: [
      {
        text: () => <>Started a minimalist lifestyle</>,
        subtext: "Sold all my belongings and now only own 2 suitcases.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Started my sabbatical year</>,
        subtext: "I moved to Colombia to spend time with my mom.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Constituted Parlai as a company</>,
        subtext: "Nina and I are working on it full time.",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Did my first standup comedy set</>,
        subtext: "I told the story about the time I did a replica of my..",
        type: [HighlighType.Achievement],
      },
      {
        text: () => <>Run my first improv show</>,
        subtext:
          "I paired with Lynce to recreate Middleditch & Schwartz's show. It was my best creative performance ever. People loved it very much.",
        type: [HighlighType.Achievement],
      },
    ],
  },
  // {
  //   year: 30,
  //   highlights: [],
  // },
];
