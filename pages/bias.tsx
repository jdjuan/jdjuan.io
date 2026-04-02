import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import type { NextPageWithLayout } from "./_app";

type Suggestion = {
  id: string;
  name: string;
  description: string;
};

type Fact = {
  text: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDomain: string;
};

type BiasFactsPayload = {
  likedPerson: string;
  dislikedPerson: string;
  likedPersonCriticalFacts: Fact[];
  dislikedPersonPositiveFacts: Fact[];
  generatedAt: string;
  note: string;
};

type InputKind = "liked" | "disliked";

const MIN_INPUT_LENGTH = 2;
const SUGGESTION_DEBOUNCE_MS = 300;
const FACT_DEBOUNCE_MS = 600;

const inputClassName =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none focus:border-teal-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50";

const BiasPage: NextPageWithLayout = () => {
  const [likedPerson, setLikedPerson] = useState("");
  const [dislikedPerson, setDislikedPerson] = useState("");
  const [likedSuggestions, setLikedSuggestions] = useState<Suggestion[]>([]);
  const [dislikedSuggestions, setDislikedSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState<InputKind | null>(null);
  const [isLoadingLikedSuggestions, setIsLoadingLikedSuggestions] = useState(false);
  const [isLoadingDislikedSuggestions, setIsLoadingDislikedSuggestions] = useState(false);
  const [isLoadingFacts, setIsLoadingFacts] = useState(false);
  const [factsError, setFactsError] = useState<string | null>(null);
  const [result, setResult] = useState<BiasFactsPayload | null>(null);
  const [lastGeneratedSignature, setLastGeneratedSignature] = useState("");

  const isLoadingSuggestions = isLoadingLikedSuggestions || isLoadingDislikedSuggestions;

  const normalizedLikedPerson = likedPerson.trim();
  const normalizedDislikedPerson = dislikedPerson.trim();
  const hasMinimumInputs =
    normalizedLikedPerson.length >= MIN_INPUT_LENGTH && normalizedDislikedPerson.length >= MIN_INPUT_LENGTH;

  const runSignature = useMemo(
    () => `${normalizedLikedPerson.toLowerCase()}::${normalizedDislikedPerson.toLowerCase()}`,
    [normalizedDislikedPerson, normalizedLikedPerson]
  );

  const fetchSuggestions = useCallback(async (query: string): Promise<Suggestion[]> => {
    const response = await fetch(`/api/bias/suggest?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { suggestions?: Suggestion[] };
    return payload.suggestions || [];
  }, []);

  useEffect(() => {
    if (normalizedLikedPerson.length < MIN_INPUT_LENGTH) {
      setLikedSuggestions([]);
      setIsLoadingLikedSuggestions(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsLoadingLikedSuggestions(true);
      const suggestions = await fetchSuggestions(normalizedLikedPerson);
      if (!cancelled) {
        setLikedSuggestions(suggestions);
        setIsLoadingLikedSuggestions(false);
      }
    }, SUGGESTION_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchSuggestions, normalizedLikedPerson]);

  useEffect(() => {
    if (normalizedDislikedPerson.length < MIN_INPUT_LENGTH) {
      setDislikedSuggestions([]);
      setIsLoadingDislikedSuggestions(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsLoadingDislikedSuggestions(true);
      const suggestions = await fetchSuggestions(normalizedDislikedPerson);
      if (!cancelled) {
        setDislikedSuggestions(suggestions);
        setIsLoadingDislikedSuggestions(false);
      }
    }, SUGGESTION_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchSuggestions, normalizedDislikedPerson]);

  const fetchFacts = useCallback(
    async (overrideSignature?: string) => {
      if (!hasMinimumInputs) {
        return;
      }

      const signatureToStore = overrideSignature || runSignature;
      setFactsError(null);
      setIsLoadingFacts(true);

      try {
        const response = await fetch("/api/bias/facts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likedPerson: normalizedLikedPerson,
            dislikedPerson: normalizedDislikedPerson,
          }),
        });

        const payload = (await response.json()) as BiasFactsPayload & { error?: string };
        if (!response.ok || payload.error) {
          throw new Error(payload.error || "Unable to fetch facts right now.");
        }

        setResult(payload);
        setLastGeneratedSignature(signatureToStore);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error.";
        setFactsError(message);
        setResult(null);
      } finally {
        setIsLoadingFacts(false);
      }
    },
    [hasMinimumInputs, normalizedDislikedPerson, normalizedLikedPerson, runSignature]
  );

  useEffect(() => {
    if (!hasMinimumInputs) {
      return;
    }

    if (runSignature === lastGeneratedSignature) {
      return;
    }

    const timer = setTimeout(() => {
      void fetchFacts(runSignature);
    }, FACT_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [fetchFacts, hasMinimumInputs, lastGeneratedSignature, runSignature]);

  const selectSuggestion = (kind: InputKind, suggestion: Suggestion) => {
    if (kind === "liked") {
      setLikedPerson(suggestion.name);
      setLikedSuggestions([]);
    } else {
      setDislikedPerson(suggestion.name);
      setDislikedSuggestions([]);
    }
    setActiveInput(null);
  };

  const activeSuggestions = activeInput === "liked" ? likedSuggestions : dislikedSuggestions;

  return (
    <div className='prose max-w-none'>
      <Navbar></Navbar>
      <h1 className='mb-2 font-headline text-4xl'>Bias Reflection</h1>
      <p className='mb-6 max-w-3xl text-neutral-600 dark:text-slate-300'>
        Enter one person you like and one person you dislike. The page will show positive sources about the person you
        dislike, and critical/controversial sources about the person you like.
      </p>

      <div className='mb-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/25 dark:text-yellow-100'>
        This is a reflection game, not a truth engine. Results come from web snippets and can be incomplete, disputed,
        or misleading. Always open the sources.
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='relative'>
          <label className='mb-2 block text-sm font-medium text-neutral-700 dark:text-slate-200'>Person you like</label>
          <input
            className={inputClassName}
            placeholder='Example: Keanu Reeves'
            value={likedPerson}
            onFocus={() => setActiveInput("liked")}
            onBlur={() => setTimeout(() => setActiveInput(null), 120)}
            onChange={(event) => setLikedPerson(event.target.value)}
          />
        </div>

        <div className='relative'>
          <label className='mb-2 block text-sm font-medium text-neutral-700 dark:text-slate-200'>
            Person you dislike
          </label>
          <input
            className={inputClassName}
            placeholder='Example: Kim Kardashian'
            value={dislikedPerson}
            onFocus={() => setActiveInput("disliked")}
            onBlur={() => setTimeout(() => setActiveInput(null), 120)}
            onChange={(event) => setDislikedPerson(event.target.value)}
          />
        </div>
      </div>

      {activeInput && activeSuggestions.length > 0 && (
        <ul className='my-2 max-h-64 list-none overflow-y-auto rounded-lg border border-neutral-200 bg-white p-0 dark:border-slate-600 dark:bg-slate-800'>
          {activeSuggestions.map((suggestion) => (
            <li key={`${activeInput}-${suggestion.id}`} className='m-0'>
              <button
                className='w-full cursor-pointer border-0 border-b border-neutral-100 bg-transparent px-4 py-3 text-left hover:bg-teal-50 dark:border-slate-700 dark:hover:bg-slate-700'
                onMouseDown={() => selectSuggestion(activeInput, suggestion)}
              >
                <div className='font-medium text-neutral-800 dark:text-slate-100'>{suggestion.name}</div>
                <div className='text-sm text-neutral-500 dark:text-slate-300'>{suggestion.description}</div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className='mb-8 mt-4 flex items-center gap-3'>
        <button
          onClick={() => void fetchFacts()}
          className='rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-neutral-300 dark:disabled:bg-slate-600'
          disabled={!hasMinimumInputs || isLoadingFacts}
        >
          {isLoadingFacts ? "Searching..." : "Run Bias Reflection"}
        </button>
        {isLoadingSuggestions && (
          <span className='text-sm text-neutral-500 dark:text-slate-300'>Loading suggestions...</span>
        )}
      </div>

      {factsError && (
        <div className='mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 dark:border-red-700 dark:bg-red-900/30 dark:text-red-100'>
          {factsError}
        </div>
      )}

      {result && (
        <div className='grid gap-5 md:grid-cols-2'>
          <section className='rounded-xl border border-teal-200 bg-teal-50 p-5 dark:border-teal-700 dark:bg-teal-900/20'>
            <h2 className='mb-2 font-headline text-2xl text-teal-900 dark:text-teal-200'>
              Positive about {result.dislikedPerson}
            </h2>
            <p className='mb-4 text-sm text-teal-800 dark:text-teal-300'>Try to challenge your first reaction.</p>
            <div className='grid gap-3'>
              {result.dislikedPersonPositiveFacts.map((fact, index) => (
                <article key={`${fact.sourceUrl}-${index}`} className='rounded-md bg-white p-4 shadow-sm dark:bg-slate-900'>
                  <p className='mb-2 text-sm text-neutral-700 dark:text-slate-100'>{fact.text}</p>
                  <a
                    href={fact.sourceUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-xs text-teal-700 underline dark:text-teal-300'
                  >
                    {fact.sourceTitle} ({fact.sourceDomain})
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className='rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-700 dark:bg-red-900/20'>
            <h2 className='mb-2 font-headline text-2xl text-red-900 dark:text-red-200'>
              Critical about {result.likedPerson}
            </h2>
            <p className='mb-4 text-sm text-red-800 dark:text-red-300'>These are reported controversies/criticisms.</p>
            <div className='grid gap-3'>
              {result.likedPersonCriticalFacts.map((fact, index) => (
                <article key={`${fact.sourceUrl}-${index}`} className='rounded-md bg-white p-4 shadow-sm dark:bg-slate-900'>
                  <p className='mb-2 text-sm text-neutral-700 dark:text-slate-100'>{fact.text}</p>
                  <a
                    href={fact.sourceUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-xs text-red-700 underline dark:text-red-300'
                  >
                    {fact.sourceTitle} ({fact.sourceDomain})
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {result && (
        <p className='mt-6 text-xs text-neutral-500 dark:text-slate-300'>
          {result.note} Last updated: {new Date(result.generatedAt).toLocaleString()}.
        </p>
      )}
    </div>
  );
};

BiasPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default BiasPage;
