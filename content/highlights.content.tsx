import { Highlight } from "../models/highlights.interface";

export const highlights: Highlight[] = [
  {
    title: "Insights",
    description: "1-minute ideas",
    footer: "My Blog",
    footerUrl: "https://jdjuan.medium.com/",
    isFooterUrlExternal: true,
    items: [
      {
        title: "Behavior",
        link: "behavior",
        topics: ["Quitting bad habits", "Increasing productivity", "Coping with bad days"],
        icon: (
          <>
            <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
              <path
                className='fill-teal-400 dark:fill-teal-300'
                d='M18.7 8.12l-2.36 2.37A8 8 0 0 0 14 16.14V21a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4.86a12 12 0 0 1 3.51-8.48l2.37-2.37-1.59-1.58A1 1 0 0 1 15 2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1.7.7l-1.6-1.58z'
              />
              <path
                className='fill-teal-800 dark:fill-teal-700'
                d='M8.12 5.3l2.37 2.36A12 12 0 0 1 14 16.14V21a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4.86a8 8 0 0 0-2.34-5.65L5.29 8.12 3.71 9.71A1 1 0 0 1 2 9V3a1 1 0 0 1 1-1h6a1 1 0 0 1 .7 1.7L8.13 5.3z'
              />
            </svg>
          </>
        ),
      },
      {
        title: "Communication",
        link: "communication",
        topics: ["Apologizing", "Public speaking", "Writing your CV"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <path
              className='fill-teal-400 dark:fill-teal-300'
              d='M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
            />
            <path
              className='fill-teal-800 dark:fill-teal-700'
              d='M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z'
            />
          </svg>
        ),
      },
      {
        title: "Relationships",
        link: "relationships",
        topics: ["Open relationships", "Polyamory", "Relationship spectrum"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <circle cx='12' cy='12' r='10' className='fill-teal-300 dark:fill-teal-400' />
            <path
              className='fill-teal-800 dark:fill-teal-900'
              d='M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z'
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Apps",
    description: "Projects I'm proud of",
    footer: "Older Apps",
    footerUrl: "apps",
    isFooterUrlExternal: false,
    items: [
      {
        title: "Parlai",
        link: "https://parlai.app/",
        isExternalLink: true,
        topics: ["WhatsApp Language Bot", "Co-founded in 2023", "It's ongoing!"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <rect width='16' height='13' x='2' y='2' className='fill-teal-800 dark:fill-teal-700' rx='2' />
            <path
              className='fill-teal-400 dark:fill-teal-300'
              d='M6 16V8c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1.7.7L16.58 18H8a2 2 0 0 1-2-2z'
            />
          </svg>
          // <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
          //   <path
          //     className='fill-teal-400 dark:fill-teal-300'
          //     d='M22 17a1 1 0 0 1-2 0v-5a8 8 0 1 0-16 0v5a1 1 0 0 1-2 0v-5a10 10 0 1 1 20 0v5z'
          //   />
          //   <path
          //     className='fill-teal-800 dark:fill-teal-700'
          //     d='M7 12a2 2 0 0 1 2 2v6a2 2 0 1 1-4 0v-6c0-1.1.9-2 2-2zm10 0a2 2 0 0 1 2 2v6a2 2 0 1 1-4 0v-6c0-1.1.9-2 2-2z'
          //   />
          // </svg>
        ),
      },
      {
        title: "Tandem GPT",
        link: "https://www.tandem-gpt.com/",
        isExternalLink: true,
        topics: ["Practice languages with AI", "Launched in 2023", "+900 users"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <path
              className='fill-teal-400 dark:fill-teal-300'
              d='M10.41 10l1.3 1.3a1 1 0 0 1-1.42 1.4L9 11.42l-3.3 3.3a1 1 0 1 1-1.4-1.42L7.58 10l-1.3-1.3a1 1 0 0 1 1.42-1.4L9 8.58l.54-.54A5 5 0 0 0 10.98 5H3a1 1 0 1 1 0-2h5V2a1 1 0 1 1 2 0v1h5a1 1 0 0 1 0 2h-2.02a7 7 0 0 1-2.03 4.46l-.54.54z'
            />
            <path
              className='fill-teal-800 dark:fill-teal-700'
              d='M13.33 18l-1.4 3.38a1 1 0 0 1-1.85-.76l5-12a1 1 0 0 1 1.84 0l5 12a1 1 0 0 1-1.84.76L18.67 18h-5.34zm.84-2h3.66L16 11.6 14.17 16z'
            />
          </svg>
          // <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
          //   <path
          //     className='fill-teal-400 dark:fill-teal-300'
          //     d='M22 17a1 1 0 0 1-2 0v-5a8 8 0 1 0-16 0v5a1 1 0 0 1-2 0v-5a10 10 0 1 1 20 0v5z'
          //   />
          //   <path
          //     className='fill-teal-800 dark:fill-teal-700'
          //     d='M7 12a2 2 0 0 1 2 2v6a2 2 0 1 1-4 0v-6c0-1.1.9-2 2-2zm10 0a2 2 0 0 1 2 2v6a2 2 0 1 1-4 0v-6c0-1.1.9-2 2-2z'
          //   />
          // </svg>
        ),
      },
      {
        title: "Nine Questions",
        link: "https://nine-questions.jdjuan.io",
        isExternalLink: true,
        topics: ["Challenge your gut feeling", "Built in 2023", "+700 Users"],
        icon: (
          <svg height='100%' width='100%' viewBox='0 0 24 24'>
            <path
              className='fill-teal-500 dark:fill-teal-300'
              d='M5 8a7 7 0 1 1 10.62 6l-.64 3.2a1 1 0 0 1-.98.8h-4a1 1 0 0 1-.98-.8L8.38 14A7 7 0 0 1 5 8zm12 0a5 5 0 0 0-5-5 1 1 0 0 0 0 2 3 3 0 0 1 3 3 1 1 0 0 0 2 0z'
            />
            <path
              className='fill-teal-900 dark:fill-teal-700'
              d='M15 21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z'
            />
          </svg>
        ),
      },
      // {
      //   title: "Der Die Das",
      //   link: "http://derdiedas.jdjuan.io",
      //   isExternalLink: true,
      //   topics: ["German genders", "Built in 2020", "+500 users"],
      //   icon: (
      //     <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
      //       <path
      //         className='fill-teal-400 dark:fill-teal-300'
      //         d='M10.41 10l1.3 1.3a1 1 0 0 1-1.42 1.4L9 11.42l-3.3 3.3a1 1 0 1 1-1.4-1.42L7.58 10l-1.3-1.3a1 1 0 0 1 1.42-1.4L9 8.58l.54-.54A5 5 0 0 0 10.98 5H3a1 1 0 1 1 0-2h5V2a1 1 0 1 1 2 0v1h5a1 1 0 0 1 0 2h-2.02a7 7 0 0 1-2.03 4.46l-.54.54z'
      //       />
      //       <path
      //         className='fill-teal-800 dark:fill-teal-700'
      //         d='M13.33 18l-1.4 3.38a1 1 0 0 1-1.85-.76l5-12a1 1 0 0 1 1.84 0l5 12a1 1 0 0 1-1.84.76L18.67 18h-5.34zm.84-2h3.66L16 11.6 14.17 16z'
      //       />
      //     </svg>
      //   ),
      // },
    ],
  },
  {
    title: "About",
    description: "Personal stuff",
    footer: "Chronological Photos",
    footerUrl: "https://photos.app.goo.gl/iJ5ycW5C3iTaouXu7",
    isFooterUrlExternal: true,
    items: [
      {
        title: "Personal Questions",
        link: "about",
        topics: ["What am I good at?", "What am I bad at?", "What are my beliefs?"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <path className='fill-teal-400 dark:fill-teal-300' d='M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z' />
            <path
              className='fill-teal-800 dark:fill-teal-700'
              d='M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z'
            />
          </svg>
        ),
      },
      {
        title: "Book Reviews",
        link: "books",
        topics: ["Reviews", "Notes", "Year"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <path
              className='fill-teal-700 dark:fill-teal-600'
              d='M13.41 20.41a2 2 0 0 1-2.82 0l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2 5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82z'
            />
            <path
              className='fill-teal-400 dark:fill-teal-300'
              d='M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z'
            />
          </svg>
        ),
      },
      {
        title: "Timeline of events",
        link: "timeline",
        topics: ["Becoming a developer", "My first job", "Moving to Europe"],
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 24 24'>
            <path
              className='fill-teal-300 dark:fill-teal-400'
              d='M19 20h1a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h1c0-1.8.68-3.58 2.05-4.95L9 13.1v-2.2L7.05 8.95A6.98 6.98 0 0 1 5 4H4a1 1 0 1 1 0-2h16a1 1 0 0 1 0 2h-1c0 1.8-.68 3.58-2.05 4.95L15 10.9v2.2l1.95 1.95A6.98 6.98 0 0 1 19 20z'
            />
            <path
              className='fill-teal-700 dark:fill-teal-900'
              d='M17 20H7l2.83-2.83A4 4 0 0 0 11 14.34v-4.27L8.46 7.54a5 5 0 0 1-.95-1.33c.17-.06.33-.13.49-.21a4.47 4.47 0 0 1 4 0c1.26.63 2.74.63 4 0 .23-.11.46-.2.7-.28a5 5 0 0 1-1.16 1.82L13 10.07v4.27a4 4 0 0 0 1.17 2.83L17 20z'
            />
          </svg>
        ),
      },
    ],
  },
];
