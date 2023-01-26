import { Highlight } from "../models/highlights.interface";

export const highlights: Highlight[] = [
  {
    title: "Insights",
    description: "My latest insights under 1 minute:",
    items: [
      {
        title: "Behavior",
        link: "behavior",
        topics: [
          "✅ Dealing with bad habits",
          "✅ Increasing productivity",
          "✅ Coping with bad days",
          "🟡 Sleeping earlier",
        ],
      },
      {
        title: "Communication",
        link: "communication",
        topics: ["✅ Apologizing", "✅ Public speaking", "✅ Writing your curriculum", "✅ Asking for mentorship"],
      },
      {
        title: "Relationships",
        link: "relationships",
        topics: ["✅ Open relationships", "✅ Polyamory", "🟡 Relationship spectrum"],
      },
    ],
  },
  {
    title: "Products",
    description: "Three products I'm proud of:",
    items: [
      {
        title: "HeadScroll",
        link: "https://headscroll.io/",
        isExternalLink: true,
        topics: ["✅ Play music with ease", "✅ Co-founded in 2021", "✅ 10 user per day"],
      },
      {
        title: "Der Die Das",
        link: "http://derdiedas.jdjuan.io",
        isExternalLink: true,
        topics: ["✅ Learn German genders", "✅ Built in 2020", "✅ 278 users"],
      },
      {
        title: "P.A.D.A.",
        link: "http://pada.jdjuan.io",
        isExternalLink: true,
        topics: ["✅ Plan better meetings", "✅ Launched in 2019", "✅ Anybody?"],
      },
    ],
  },
  {
    title: "About",
    description: "A little more about me:",
    items: [
      {
        title: "Personal Questions",
        link: "about",
        topics: ["🟢 What am I good at?", "🟢 What do I struggle with?", "🟢 What are my beliefs?"],
      },
      {
        title: "Book Recommendations",
        link: "books",
        topics: ["🟢 Ratings", "🟢 Reviews"],
      },
      {
        title: "Timeline of events",
        link: "timeline",
        topics: ["🟢 Becoming a developer", "🟢 My first job", "🟢 Moving to Europe"],
      },
    ],
  },
];
