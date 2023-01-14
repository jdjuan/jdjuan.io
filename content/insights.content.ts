import { Highlight } from "../models/highlights.interface";

export const insights: Highlight = {
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
      topics: ["✅ Properly apologizing", "✅ Public speaking", "✅ Writing your CV", "✅ Asking for mentorship"],
    },
    {
      title: "Relationships",
      topics: ["✅ Open relationships", "✅ Polyamory", "🟡 Living together"],
    },
  ],
};
