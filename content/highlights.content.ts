import { Highlight } from "../models/highlights.interface";

export const highlights: Highlight[] = [
  {
    title: "Insights",
    description: "My latest insights under 1 minute:",
    items: [
      {
        title: "Behavior",
        topics: [
          "✅ Dealing with bad habits",
          "✅ Increasing productivity",
          "✅ Coping with bad days",
          "🟡 Sleeping earlier",
        ],
      },
      {
        title: "Communication",
        topics: ["✅ Apologizing", "✅ Public speaking", "✅ Writing your curriculum", "✅ Asking for mentorship"],
      },
      {
        title: "Relationships",
        topics: ["✅ Open relationships", "✅ Polyamory", "🟡 Living together"],
      },
    ],
  },
  {
    title: "Products",
    description: "Three products I'm proud of:",
    items: [
      {
        title: "HeadScroll",
        topics: ["✅ Play music with ease", "✅ Co-founded in 2021", "✅ 10 user per day"],
      },
      {
        title: "Der Die Das",
        topics: ["✅ Learn German genders", "✅ Built in 2020", "✅ 278 users"],
      },
      {
        title: "P.A.D.A.",
        topics: ["✅ Plan better meetings", "✅ Launched in 2019", "✅ Anybody?"],
      },
    ],
  },
];
