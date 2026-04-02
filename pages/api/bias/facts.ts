import type { NextApiRequest, NextApiResponse } from "next";

type SearchItem = {
  title?: string;
  link?: string;
  snippet?: string;
  displayLink?: string;
};

type BraveWebResult = {
  title?: string;
  url?: string;
  description?: string;
  extra_snippets?: string[];
};

type BraveSearchResponse = {
  web?: {
    results?: BraveWebResult[];
  };
  error?: {
    message?: string;
    detail?: string;
  };
};

type SearchResult = {
  query: string;
  items: SearchItem[];
};

type Fact = {
  text: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDomain: string;
};

type BiasFactResponse = {
  likedPerson: string;
  dislikedPerson: string;
  likedPersonCriticalFacts: Fact[];
  dislikedPersonPositiveFacts: Fact[];
  generatedAt: string;
  note: string;
};

type BiasFactRequest = {
  likedPerson?: string;
  dislikedPerson?: string;
};

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const FACT_COUNT = 3;
const RESULTS_PER_QUERY = 5;
const BRAVE_WEB_SEARCH_URL = "https://api.search.brave.com/res/v1/web/search";
const QUERY_LANGUAGE = "en";
const QUERY_UI_LANGUAGE = "en-US";
const QUERY_COUNTRY = "US";

const isValidPersonName = (value: string) =>
  value.length >= MIN_NAME_LENGTH &&
  value.length <= MAX_NAME_LENGTH &&
  /^[a-zA-ZÀ-ÖØ-öø-ÿ.'\-\s]+$/.test(value);

const normalizeSnippet = (snippet: string) => snippet.replace(/\s+/g, " ").replace(/\.\.\./g, " ").trim();

const normalizeDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
};

const pickFactsFromSearchResults = (searchResults: SearchResult[]): Fact[] => {
  const uniqueFacts: Fact[] = [];
  const seenLinks = new Set<string>();
  const seenTexts = new Set<string>();

  for (const result of searchResults) {
    for (const item of result.items) {
      if (!item.link || !item.snippet || !item.title) {
        continue;
      }

      const text = normalizeSnippet(item.snippet);
      if (text.length < 45) {
        continue;
      }

      const linkKey = item.link.toLowerCase();
      const textKey = text.toLowerCase();
      if (seenLinks.has(linkKey) || seenTexts.has(textKey)) {
        continue;
      }

      seenLinks.add(linkKey);
      seenTexts.add(textKey);

      uniqueFacts.push({
        text,
        sourceTitle: item.title,
        sourceUrl: item.link,
        sourceDomain: item.displayLink || normalizeDomain(item.link),
      });

      if (uniqueFacts.length === FACT_COUNT) {
        return uniqueFacts;
      }
    }
  }

  return uniqueFacts;
};

const mapBraveWebResultsToSearchItems = (results: BraveWebResult[]): SearchItem[] => {
  const mappedItems: SearchItem[] = [];

  for (const result of results) {
    if (!result.title || !result.url) {
      continue;
    }

    if (result.description) {
      mappedItems.push({
        title: result.title,
        link: result.url,
        snippet: result.description,
        displayLink: normalizeDomain(result.url),
      });
    }

    for (const extraSnippet of result.extra_snippets || []) {
      mappedItems.push({
        title: result.title,
        link: result.url,
        snippet: extraSnippet,
        displayLink: normalizeDomain(result.url),
      });
    }
  }

  return mappedItems;
};

const fetchBraveResults = async (query: string, apiKey: string): Promise<SearchResult> => {
  const params = new URLSearchParams({
    q: query,
    count: String(RESULTS_PER_QUERY),
    search_lang: QUERY_LANGUAGE,
    ui_lang: QUERY_UI_LANGUAGE,
    country: QUERY_COUNTRY,
    safesearch: "moderate",
    extra_snippets: "true",
  });

  const response = await fetch(`${BRAVE_WEB_SEARCH_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
  });

  const payload = (await response.json()) as BraveSearchResponse;

  if (!response.ok) {
    const message = payload.error?.detail?.trim() || payload.error?.message?.trim();
    throw new Error(message || `Brave search failed for "${query}" with status ${response.status}.`);
  }

  const mappedItems = mapBraveWebResultsToSearchItems(payload.web?.results || []);

  return {
    query,
    items: mappedItems,
  };
};

const querySetsForPerson = (person: string, mode: "positive" | "critical"): string[] => {
  if (mode === "positive") {
    return [
      `${person} major achievements`,
      `${person} awards and recognition`,
      `${person} charity work or philanthropy`,
      `${person} positive impact`,
    ];
  }

  return [
    `${person} controversy`,
    `${person} criticism`,
    `${person} legal issues`,
    `${person} allegations`,
  ];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Brave search is not configured. Add BRAVE_API_KEY to your .env.local file first.",
    });
  }

  const payload = req.body as BiasFactRequest;
  const likedPerson = payload.likedPerson?.trim() || "";
  const dislikedPerson = payload.dislikedPerson?.trim() || "";

  if (!isValidPersonName(likedPerson) || !isValidPersonName(dislikedPerson)) {
    return res.status(400).json({
      error: "Please enter valid names (letters, spaces, apostrophes, dots, and hyphens).",
    });
  }

  try {
    const positiveQueries = querySetsForPerson(dislikedPerson, "positive");
    const criticalQueries = querySetsForPerson(likedPerson, "critical");

    const [positiveResults, criticalResults] = await Promise.all([
      Promise.all(positiveQueries.map((query) => fetchBraveResults(query, apiKey))),
      Promise.all(criticalQueries.map((query) => fetchBraveResults(query, apiKey))),
    ]);

    const dislikedPersonPositiveFacts = pickFactsFromSearchResults(positiveResults);
    const likedPersonCriticalFacts = pickFactsFromSearchResults(criticalResults);

    const responsePayload: BiasFactResponse = {
      likedPerson,
      dislikedPerson,
      likedPersonCriticalFacts,
      dislikedPersonPositiveFacts,
      generatedAt: new Date().toISOString(),
      note: "These items are extracted from public search snippets and can be incomplete or disputed. Open sources to verify context.",
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: `Failed to fetch facts: ${message}` });
  }
}
