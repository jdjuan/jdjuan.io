import type { NextApiRequest, NextApiResponse } from "next";

type WikidataSearchEntry = {
  id: string;
  label?: string;
  description?: string;
};

type WikidataSearchResponse = {
  search?: WikidataSearchEntry[];
};

type Suggestion = {
  id: string;
  name: string;
  description: string;
};

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 8;
const PERSON_HINTS = [
  "actor",
  "actress",
  "singer",
  "musician",
  "rapper",
  "politician",
  "president",
  "prime minister",
  "footballer",
  "basketball",
  "athlete",
  "writer",
  "journalist",
  "comedian",
  "director",
  "human",
];

const isLikelyPerson = (description?: string) => {
  if (!description) {
    return false;
  }

  const normalizedDescription = description.toLowerCase();
  return PERSON_HINTS.some((hint) => normalizedDescription.includes(hint));
};

const buildSuggestions = (entries: WikidataSearchEntry[]): Suggestion[] => {
  const mapped = entries
    .filter((entry) => Boolean(entry.label))
    .map((entry) => ({
      id: entry.id,
      name: entry.label!.trim(),
      description: entry.description?.trim() || "Public figure",
    }));

  const likelyPeople = mapped.filter((entry) => isLikelyPerson(entry.description));
  const fallback = likelyPeople.length >= 4 ? likelyPeople : mapped;

  return fallback
    .filter(
      (entry, index, allEntries) =>
        index === allEntries.findIndex((candidate) => candidate.name.toLowerCase() === entry.name.toLowerCase())
    )
    .slice(0, MAX_SUGGESTIONS);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (query.length < MIN_QUERY_LENGTH) {
    return res.status(200).json({ suggestions: [] });
  }

  const searchUrl =
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&limit=${MAX_SUGGESTIONS}` +
    `&type=item&search=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Wikidata request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as WikidataSearchResponse;
    const suggestions = buildSuggestions(payload.search || []);
    return res.status(200).json({ suggestions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: `Failed to fetch suggestions: ${message}` });
  }
}
