import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Product = {
  file: string;
  title: string;
  description: string;
  tag: string;
  slug: string;
};

type ExperienceStep = "intro" | "swiping" | "review" | "name" | "submitted";
type SwipeDirection = "left" | "right";
type SwipeRecord = { index: number; direction: SwipeDirection };
type MarketplaceStorage = {
  version: 1;
  currentIndex: number;
  sessionStartIndex: number;
  pickedSlugs: string[];
  passedCount: number;
  swipeHistory: SwipeRecord[];
  step: ExperienceStep;
  offerAmount: number;
  name: string;
};

const headlineFont = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"] });
const bodyFont = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });

const SWIPE_THRESHOLD = 115;
const SWIPE_EXIT_MS = 380;
const CARD_ENTER_MS = 480;
const OFFER_MIN = 0;
const OFFER_MAX = 80;
const PRELOAD_AHEAD_COUNT = 6;
const MARKETPLACE_STORAGE_KEY = "marketplace-state-v1";

const BASE_PRODUCTS: Omit<Product, "slug">[] = [
  {
    file: "10m meter.jpg",
    title: "10m Tape Measure",
    description: "A retractable tape measure with a wrist strap.",
    tag: "DIY",
  },
  {
    file: "air filter.jpg",
    title: "Levoit Air Purifier",
    description: "A compact Levoit air purifier for small rooms.",
    tag: "Home",
  },
  {
    file: "automatic night light.jpg",
    title: "Plug-In Automatic Night Light",
    description: "A plug-in night light for dark hallways.",
    tag: "Home",
  },
  {
    file: "bag.jpg",
    title: "Compact Sling Bag",
    description: "A compact sling bag for daily essentials.",
    tag: "Everyday Carry",
  },
  {
    file: "batteries and measurer.jpg",
    title: "Battery Bundle + Tester",
    description: "Mixed batteries with a handheld battery tester.",
    tag: "Electronics",
  },
  {
    file: "binoculars.jpg",
    title: "10x50 Binoculars with Case",
    description: "10x50 binoculars with a protective carry case.",
    tag: "Outdoor",
  },
  {
    file: "bluetooth photo take.jpg",
    title: "Bluetooth Camera Remote",
    description: "A Bluetooth shutter remote for phone photos.",
    tag: "Phone Accessory",
  },
  {
    file: "colombian usb adapter.jpg",
    title: "US Plug USB Charger",
    description: "A wall charger with US prongs and USB output.",
    tag: "Travel",
  },
  {
    file: "faucet extensor.jpg",
    title: "Faucet Extender",
    description: "A faucet extender for easier sink rinsing.",
    tag: "Home",
  },
  {
    file: "key extensor.jpg",
    title: "Retractable Key Reels (2 pcs)",
    description: "Two retractable key reels with clips.",
    tag: "Everyday Carry",
  },
  {
    file: "london convertor.jpg",
    title: "UK Travel Adapter",
    description: "A UK travel adapter with universal input.",
    tag: "Travel",
  },
  {
    file: "luggage.jpg",
    title: "Hard-Shell Carry-On Luggage",
    description: "A hard-shell carry-on suitcase with spinner wheels.",
    tag: "Travel",
  },
  {
    file: "presentation clicker.jpg",
    title: "Logitech Presentation Clicker",
    description: "A wireless clicker for slide presentations.",
    tag: "Office",
  },
  {
    file: "scissors.jpg",
    title: "Compact Utility Scissors",
    description: "Small utility scissors for light cutting.",
    tag: "Office",
  },
  {
    file: "staple extra.jpg",
    title: "Staple Pins Refill Box",
    description: "A refill box of staple pins.",
    tag: "Office",
  },
  {
    file: "wax for hair.jpg",
    title: "Hair Styling Wax",
    description: "Fiber hair wax for textured styling.",
    tag: "Personal Care",
  },
];

const slugifyProduct = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const PRODUCTS: Product[] = BASE_PRODUCTS.map((product, index, allProducts) => {
  const baseSlug = slugifyProduct(product.file || product.title);
  const isDuplicate =
    allProducts.slice(0, index).filter((previousProduct) => slugifyProduct(previousProduct.file) === baseSlug).length >
    0;

  return {
    ...product,
    slug: isDuplicate ? `${baseSlug}-${index + 1}` : baseSlug,
  };
});

const buildImagePath = (fileName: string) => `/marketplace/${encodeURIComponent(fileName)}`;
const buildProductUrl = (slug: string) => `/marketplace?item=${encodeURIComponent(slug)}`;

const MarketplacePage: NextPage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStartIndex, setSessionStartIndex] = useState(0);
  const [pickedProducts, setPickedProducts] = useState<Product[]>([]);
  const [passedCount, setPassedCount] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>([]);
  const [step, setStep] = useState<ExperienceStep>("intro");
  const [offerAmount, setOfferAmount] = useState(0);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLeaving, setIsLeaving] = useState<SwipeDirection | null>(null);
  const [isCardEntering, setIsCardEntering] = useState(false);
  const [hasSwipeInteraction, setHasSwipeInteraction] = useState(false);
  const [activePickedProduct, setActivePickedProduct] = useState<Product | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const hasInitializedFromQueryRef = useRef(false);
  const hasCheckedStorageRef = useRef(false);
  const hasRestoredFromStorageRef = useRef(false);
  const preloadedImagePathsRef = useRef<Set<string>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentProduct = PRODUCTS[currentIndex];
  const nextProduct = PRODUCTS[currentIndex + 1];
  const currentQueryItem = typeof router.query.item === "string" ? router.query.item : router.query.item?.[0];
  const sessionTotalProducts = Math.max(PRODUCTS.length - sessionStartIndex, 0);
  const decidedCount = Math.min(Math.max(currentIndex - sessionStartIndex, 0), sessionTotalProducts);
  const progress =
    step === "swiping"
      ? sessionTotalProducts === 0
        ? 100
        : (decidedCount / sessionTotalProducts) * 100
      : step === "intro"
        ? 0
        : 100;
  const safeOfferAmount = Math.min(OFFER_MAX, Math.max(OFFER_MIN, offerAmount));
  const showSwipeDemo =
    step === "swiping" && currentIndex === sessionStartIndex && !hasSwipeInteraction && !dragOrigin && !isLeaving;
  const productBySlug = useMemo(() => new Map(PRODUCTS.map((product) => [product.slug, product])), []);

  const preloadImagePath = useCallback((imagePath: string) => {
    if (typeof window === "undefined" || preloadedImagePathsRef.current.has(imagePath)) {
      return;
    }

    preloadedImagePathsRef.current.add(imagePath);
    const preloader = new window.Image();
    preloader.decoding = "async";
    preloader.src = imagePath;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !router.isReady || hasCheckedStorageRef.current) {
      return;
    }

    hasCheckedStorageRef.current = true;
    const rawStorageState = window.localStorage.getItem(MARKETPLACE_STORAGE_KEY);

    if (!rawStorageState) {
      return;
    }

    try {
      const parsedState = JSON.parse(rawStorageState) as Partial<MarketplaceStorage>;
      if (!parsedState || parsedState.version !== 1) {
        return;
      }

      const parsedCurrentIndex =
        typeof parsedState.currentIndex === "number" && Number.isInteger(parsedState.currentIndex)
          ? Math.min(Math.max(parsedState.currentIndex, 0), PRODUCTS.length)
          : 0;

      const parsedSessionStartIndex =
        typeof parsedState.sessionStartIndex === "number" && Number.isInteger(parsedState.sessionStartIndex)
          ? Math.min(Math.max(parsedState.sessionStartIndex, 0), parsedCurrentIndex)
          : 0;

      const parsedStep: ExperienceStep =
        parsedState.step === "intro" ||
        parsedState.step === "swiping" ||
        parsedState.step === "review" ||
        parsedState.step === "name" ||
        parsedState.step === "submitted"
          ? parsedState.step
          : "intro";

      const parsedSwipeHistory = Array.isArray(parsedState.swipeHistory)
        ? parsedState.swipeHistory.filter(
            (swipe): swipe is SwipeRecord =>
              Boolean(swipe) &&
              (swipe.direction === "left" || swipe.direction === "right") &&
              Number.isInteger(swipe.index) &&
              swipe.index >= 0 &&
              swipe.index < PRODUCTS.length,
          )
        : [];

      const parsedPickedProducts = Array.isArray(parsedState.pickedSlugs)
        ? parsedState.pickedSlugs
            .map((slug) => (typeof slug === "string" ? productBySlug.get(slug) : null))
            .filter((product): product is Product => Boolean(product))
        : [];

      const parsedPassedCount =
        typeof parsedState.passedCount === "number" && Number.isFinite(parsedState.passedCount)
          ? Math.max(0, Math.floor(parsedState.passedCount))
          : 0;

      const parsedOfferAmount =
        typeof parsedState.offerAmount === "number" && Number.isFinite(parsedState.offerAmount)
          ? Math.min(OFFER_MAX, Math.max(OFFER_MIN, Math.floor(parsedState.offerAmount)))
          : 0;

      const parsedName = typeof parsedState.name === "string" ? parsedState.name : "";
      const storageCurrentProduct = PRODUCTS[parsedCurrentIndex];

      if (currentQueryItem && (!storageCurrentProduct || storageCurrentProduct.slug !== currentQueryItem)) {
        return;
      }

      const normalizedStep: ExperienceStep =
        parsedStep === "swiping" && parsedCurrentIndex >= PRODUCTS.length
          ? "review"
          : parsedStep === "name" && parsedPickedProducts.length === 0
            ? "review"
            : parsedStep === "submitted" && parsedPickedProducts.length === 0
              ? "review"
              : parsedStep;

      setCurrentIndex(parsedCurrentIndex);
      setSessionStartIndex(parsedSessionStartIndex);
      setPickedProducts(parsedPickedProducts);
      setPassedCount(parsedPassedCount);
      setSwipeHistory(parsedSwipeHistory);
      setStep(normalizedStep);
      setOfferAmount(parsedOfferAmount);
      setName(parsedName);
      setHasSwipeInteraction(parsedSwipeHistory.length > 0);
      hasRestoredFromStorageRef.current = true;
    } catch {
      window.localStorage.removeItem(MARKETPLACE_STORAGE_KEY);
    }
  }, [currentQueryItem, productBySlug, router.isReady]);

  useEffect(() => {
    if (!router.isReady || hasInitializedFromQueryRef.current || !hasCheckedStorageRef.current) {
      return;
    }

    hasInitializedFromQueryRef.current = true;

    if (hasRestoredFromStorageRef.current) {
      return;
    }

    if (!currentQueryItem) {
      return;
    }

    const sharedProductIndex = PRODUCTS.findIndex((product) => product.slug === currentQueryItem);
    if (sharedProductIndex === -1) {
      return;
    }

    setSessionStartIndex(sharedProductIndex);
    setCurrentIndex(sharedProductIndex);
    setStep("swiping");
  }, [currentQueryItem, router.isReady]);

  useEffect(() => {
    if (typeof window === "undefined" || !router.isReady || !hasCheckedStorageRef.current) {
      return;
    }

    const storageSnapshot: MarketplaceStorage = {
      version: 1,
      currentIndex,
      sessionStartIndex,
      pickedSlugs: pickedProducts.map((product) => product.slug),
      passedCount,
      swipeHistory,
      step,
      offerAmount: safeOfferAmount,
      name,
    };

    window.localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(storageSnapshot));
  }, [
    currentIndex,
    sessionStartIndex,
    pickedProducts,
    passedCount,
    swipeHistory,
    step,
    safeOfferAmount,
    name,
    router.isReady,
  ]);

  useEffect(() => {
    if (!router.isReady || step !== "swiping" || !currentProduct) {
      return;
    }

    if (currentQueryItem === currentProduct.slug) {
      return;
    }

    void router.replace(buildProductUrl(currentProduct.slug), undefined, { shallow: true, scroll: false });
  }, [currentProduct, currentQueryItem, router, step]);

  useEffect(() => {
    const preloadFromIndex = step === "swiping" ? currentIndex + 1 : sessionStartIndex;
    if (preloadFromIndex >= PRODUCTS.length) {
      return;
    }

    const productsToPreload = PRODUCTS.slice(preloadFromIndex, preloadFromIndex + PRELOAD_AHEAD_COUNT);
    productsToPreload.forEach((product) => preloadImagePath(buildImagePath(product.file)));
  }, [currentIndex, preloadImagePath, sessionStartIndex, step]);

  useEffect(() => {
    if (step === "swiping" && currentIndex >= PRODUCTS.length) {
      setStep("review");
    }
  }, [currentIndex, step]);

  useEffect(() => {
    if (step === "name" && pickedProducts.length === 0) {
      setStep("review");
    }
  }, [pickedProducts.length, step]);

  useEffect(() => {
    if (!activePickedProduct) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePickedProduct(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePickedProduct]);

  useEffect(() => {
    if (step !== "swiping" || !currentProduct) {
      return;
    }

    setIsCardEntering(true);
    const timer = window.setTimeout(() => {
      setIsCardEntering(false);
    }, CARD_ENTER_MS);

    return () => window.clearTimeout(timer);
  }, [currentProduct, step]);

  useEffect(() => {
    if (pickedProducts.length === 0) {
      setOfferAmount(0);
      return;
    }

    const suggestedOffer = pickedProducts.length * 12;
    setOfferAmount((previous) => {
      if (previous === 0) {
        return Math.min(suggestedOffer, OFFER_MAX);
      }

      return Math.min(Math.max(previous, OFFER_MIN), OFFER_MAX);
    });
  }, [pickedProducts.length]);

  const playSound = useCallback((sound: "left" | "right" | "submit") => {
    if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
      return;
    }

    const context = audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;

    if (context.state === "suspended") {
      void context.resume();
    }

    const startTime = context.currentTime;

    if (sound === "left") {
      const firstOscillator = context.createOscillator();
      const firstGain = context.createGain();
      firstOscillator.connect(firstGain);
      firstGain.connect(context.destination);

      firstOscillator.type = "sine";
      firstOscillator.frequency.setValueAtTime(460, startTime);
      firstOscillator.frequency.exponentialRampToValueAtTime(330, startTime + 0.08);

      firstGain.gain.setValueAtTime(0.0001, startTime);
      firstGain.gain.exponentialRampToValueAtTime(0.16, startTime + 0.018);
      firstGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.1);

      firstOscillator.start(startTime);
      firstOscillator.stop(startTime + 0.1);

      const secondOscillator = context.createOscillator();
      const secondGain = context.createGain();
      secondOscillator.connect(secondGain);
      secondGain.connect(context.destination);

      const secondStart = startTime + 0.065;
      secondOscillator.type = "triangle";
      secondOscillator.frequency.setValueAtTime(300, secondStart);
      secondOscillator.frequency.exponentialRampToValueAtTime(230, secondStart + 0.11);

      secondGain.gain.setValueAtTime(0.0001, secondStart);
      secondGain.gain.exponentialRampToValueAtTime(0.14, secondStart + 0.02);
      secondGain.gain.exponentialRampToValueAtTime(0.0001, secondStart + 0.12);

      secondOscillator.start(secondStart);
      secondOscillator.stop(secondStart + 0.12);
      return;
    }

    if (sound === "right") {
      const firstOscillator = context.createOscillator();
      const firstGain = context.createGain();
      firstOscillator.connect(firstGain);
      firstGain.connect(context.destination);

      firstOscillator.type = "triangle";
      firstOscillator.frequency.setValueAtTime(500, startTime);
      firstOscillator.frequency.exponentialRampToValueAtTime(760, startTime + 0.12);

      firstGain.gain.setValueAtTime(0.0001, startTime);
      firstGain.gain.exponentialRampToValueAtTime(0.17, startTime + 0.02);
      firstGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.14);

      firstOscillator.start(startTime);
      firstOscillator.stop(startTime + 0.14);

      const secondStart = startTime + 0.08;
      const secondOscillator = context.createOscillator();
      const secondGain = context.createGain();
      secondOscillator.connect(secondGain);
      secondGain.connect(context.destination);

      secondOscillator.type = "sine";
      secondOscillator.frequency.setValueAtTime(760, secondStart);
      secondOscillator.frequency.exponentialRampToValueAtTime(1180, secondStart + 0.16);

      secondGain.gain.setValueAtTime(0.0001, secondStart);
      secondGain.gain.exponentialRampToValueAtTime(0.15, secondStart + 0.02);
      secondGain.gain.exponentialRampToValueAtTime(0.0001, secondStart + 0.18);

      secondOscillator.start(secondStart);
      secondOscillator.stop(secondStart + 0.18);
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);

    const startFrequency = 740;
    const endFrequency = 980;
    const duration = 0.18;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(startFrequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }, []);

  const commitSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!currentProduct || isLeaving || step !== "swiping") {
        return;
      }

      setHasSwipeInteraction(true);
      setIsLeaving(direction);
      playSound(direction);

      window.setTimeout(() => {
        if (direction === "right") {
          setPickedProducts((previous) => [...previous, currentProduct]);
        } else {
          setPassedCount((previous) => previous + 1);
        }

        setSwipeHistory((previous) => [...previous, { index: currentIndex, direction }]);
        setCurrentIndex((previous) => previous + 1);
        setDragOffset({ x: 0, y: 0 });
        setDragOrigin(null);
        setIsLeaving(null);
      }, SWIPE_EXIT_MS);
    },
    [currentIndex, currentProduct, isLeaving, playSound, step],
  );

  useEffect(() => {
    if (step !== "swiping") {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        commitSwipe("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        commitSwipe("right");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commitSwipe, step]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setSessionStartIndex(0);
    setPickedProducts([]);
    setPassedCount(0);
    setSwipeHistory([]);
    setStep("intro");
    setOfferAmount(0);
    setName("");
    setSubmitError(null);
    setDragOffset({ x: 0, y: 0 });
    setDragOrigin(null);
    setIsLeaving(null);
    setIsCardEntering(false);
    setHasSwipeInteraction(false);
    setActivePickedProduct(null);
    hasRestoredFromStorageRef.current = false;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(MARKETPLACE_STORAGE_KEY);
    }
    void router.replace("/marketplace", undefined, { shallow: true, scroll: false });
  }, [router]);

  const handleGoBackSwipe = useCallback(() => {
    if (step !== "swiping" || isLeaving || dragOrigin || swipeHistory.length === 0) {
      return;
    }

    const previousSwipe = swipeHistory[swipeHistory.length - 1];
    const previousIndex = previousSwipe.index;
    const previousDirection = previousSwipe.direction;
    const previousProduct = PRODUCTS[previousIndex];

    if (!previousDirection || !previousProduct) {
      return;
    }

    if (previousDirection === "right") {
      setPickedProducts((previous) => {
        const removeIndex = previous.findIndex((item) => item.file === previousProduct.file);
        if (removeIndex === -1) {
          return previous;
        }

        const next = [...previous];
        next.splice(removeIndex, 1);
        return next;
      });
    } else {
      setPassedCount((previous) => Math.max(0, previous - 1));
    }

    setSwipeHistory((previous) => previous.slice(0, -1));
    setCurrentIndex(previousIndex);
    setDragOffset({ x: 0, y: 0 });
    setDragOrigin(null);
    setIsLeaving(null);
    setSubmitError(null);
  }, [dragOrigin, isLeaving, step, swipeHistory]);

  const removePickedProduct = useCallback((file: string) => {
    setPickedProducts((previous) => previous.filter((item) => item.file !== file));
    setActivePickedProduct(null);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (step !== "swiping" || isLeaving) {
      return;
    }

    setHasSwipeInteraction(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragOrigin({ x: event.clientX, y: event.clientY });
    setSubmitError(null);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragOrigin || step !== "swiping" || isLeaving) {
      return;
    }

    setDragOffset({
      x: event.clientX - dragOrigin.x,
      y: event.clientY - dragOrigin.y,
    });
  };

  const finishDrag = () => {
    if (!dragOrigin || step !== "swiping") {
      return;
    }

    setDragOrigin(null);

    if (dragOffset.x > SWIPE_THRESHOLD) {
      commitSwipe("right");
      return;
    }

    if (dragOffset.x < -SWIPE_THRESHOLD) {
      commitSwipe("left");
      return;
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const swipeIntent = Math.max(-1, Math.min(1, dragOffset.x / SWIPE_THRESHOLD));
  const pickOpacity = swipeIntent > 0 ? swipeIntent : 0;
  const passOpacity = swipeIntent < 0 ? Math.abs(swipeIntent) : 0;

  const cardTransform = useMemo(() => {
    if (isLeaving === "right") {
      return "translate3d(120%, -1%, 0) rotate(12deg) scale(0.95)";
    }

    if (isLeaving === "left") {
      return "translate3d(-120%, -1%, 0) rotate(-12deg) scale(0.95)";
    }

    if (dragOrigin) {
      return `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x / 15}deg)`;
    }

    return "translate3d(0, 0, 0) rotate(0deg)";
  }, [dragOffset.x, dragOffset.y, dragOrigin, isLeaving]);

  const submitOffer = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setSubmitError("Please add your name before submitting.");
      return;
    }

    if (pickedProducts.length === 0) {
      setSubmitError("Pick at least one product before sending an offer.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/marketplace-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          totalOffer: safeOfferAmount,
          selectedItems: pickedProducts.map((item) => ({
            title: item.title,
            description: item.description,
            file: item.file,
            tag: item.tag,
          })),
          selectedCount: pickedProducts.length,
          skippedCount: passedCount,
          totalProducts: sessionTotalProducts,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Failed to submit your offer.");
      }

      playSound("submit");
      setStep("submitted");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Marketplace | Juan Herrera</title>
        <meta
          name='description'
          content='Swipe through marketplace products, pick your favorites, and submit your offer.'
        />
      </Head>
      <main
        className={`${headlineFont.className} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_14%_12%,rgba(192,132,252,0.38),transparent_32%),radial-gradient(circle_at_88%_8%,rgba(244,114,182,0.28),transparent_34%),radial-gradient(circle_at_85%_88%,rgba(59,130,246,0.22),transparent_34%),linear-gradient(160deg,#581c87_0%,#6d28d9_30%,#a21caf_64%,#db2777_100%)] p-4 text-slate-900 sm:p-8`}
      >
        <div className='pointer-events-none absolute inset-0 bg-slate-950/10'></div>
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute -top-24 -left-20 h-72 w-72 animate-float rounded-full bg-violet-300/60 blur-3xl'></div>
          <div className='absolute top-[18%] -right-20 h-64 w-64 animate-float-slow rounded-full bg-fuchsia-300/52 blur-3xl'></div>
          <div className='absolute -bottom-24 left-1/3 h-72 w-72 animate-float rounded-full bg-blue-300/45 blur-3xl'></div>
        </div>

        <div className='relative mx-auto max-w-7xl'>
          {step === "intro" ? (
            <section className='rounded-[2rem] bg-slate-50 p-6 text-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.33)] sm:p-10'>
              <p className='inline-flex rounded-full bg-violet-100 px-4 py-1 text-xs font-bold tracking-[0.14em] uppercase text-violet-800'>
                Marketplace Picks
              </p>
              <h1 className='mt-4 max-w-3xl text-4xl leading-tight font-bold text-slate-950 sm:text-5xl'>
                Welcome to Juan&apos;s Marketplace
              </h1>
              <p className='mt-3 max-w-2xl text-base leading-relaxed text-slate-700'>
                You will see {PRODUCTS.length} items. Pick your favorites and make an offer.
              </p>

              <div className='mt-6 flex flex-wrap gap-2.5 text-xs font-semibold tracking-[0.05em] text-slate-700 sm:text-sm'>
                <p className='rounded-full bg-rose-100 px-3 py-1.5 text-rose-900'>Left = Pass</p>
                <p className='rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-900'>Right = Keep</p>
              </div>

              <button
                type='button'
                className='animate-cta mt-7 w-full rounded-2xl bg-[linear-gradient(98deg,#7c3aed_0%,#9333ea_35%,#c026d3_68%,#ec4899_100%)] px-7 py-4 text-lg font-bold text-white ring-4 ring-fuchsia-200/70 shadow-[0_20px_45px_rgba(124,58,237,0.45)] [text-shadow:0_1px_1px_rgba(0,0,0,0.35)] hover:scale-[1.02] sm:w-auto sm:px-10'
                onClick={() => setStep("swiping")}
              >
                Start
              </button>
            </section>
          ) : (
            <section className='space-y-6 lg:space-y-7'>
              <div className='rounded-[1.5rem] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-5 lg:p-6'>
                <div className='flex items-center justify-between text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-600 sm:text-xs'>
                  <span>
                    Progress {Math.min(decidedCount, sessionTotalProducts)}/{sessionTotalProducts}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className='mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100 lg:h-3'>
                  <div
                    className='progress-fill h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className='mt-3 flex items-center justify-between gap-3'>
                  <div className='flex items-center'>
                    {pickedProducts.length === 0 ? (
                      <p className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500'>
                        No picks yet
                      </p>
                    ) : (
                      <div className='flex items-center -space-x-2'>
                        {pickedProducts.slice(-7).map((item) => (
                          <button
                            key={item.file}
                            type='button'
                            onClick={() => setActivePickedProduct(item)}
                            className='rounded-full ring-2 ring-white shadow transition-transform hover:scale-105'
                            aria-label={`View ${item.title}`}
                          >
                            <Image
                              src={buildImagePath(item.file)}
                              alt={item.title}
                              width={36}
                              height={36}
                              unoptimized
                              className='h-8 w-8 rounded-full bg-white object-contain p-0.5 sm:h-9 sm:w-9'
                            />
                          </button>
                        ))}
                        {pickedProducts.length > 7 ? (
                          <span className='inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-[11px] font-black text-slate-900 ring-2 ring-white shadow sm:h-9 sm:min-w-9'>
                            +{pickedProducts.length - 7}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className='text-right text-[11px] leading-tight text-slate-600'>
                    <p className='font-bold text-slate-900'>{pickedProducts.length} picked</p>
                    <p>{passedCount} passed</p>
                  </div>
                </div>
              </div>

              {step === "swiping" && currentProduct ? (
                <div className='mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-6'>
                  <div className='space-y-4 lg:space-y-5'>
                    <article
                      key={currentProduct.file}
                      className='relative z-10 cursor-grab touch-none rounded-[2rem] bg-white p-4 text-slate-900 shadow-[0_26px_60px_rgba(15,23,42,0.24)] active:cursor-grabbing sm:p-5 lg:p-5'
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={finishDrag}
                      onPointerCancel={finishDrag}
                      style={{
                        transform: cardTransform,
                        transition:
                          dragOrigin && !isLeaving
                            ? "none"
                            : `transform ${SWIPE_EXIT_MS}ms cubic-bezier(0.18, 0.84, 0.28, 1), opacity ${SWIPE_EXIT_MS - 40}ms ease-out`,
                        opacity: isLeaving ? 0.12 : 1,
                      }}
                    >
                      <div className={isCardEntering ? "card-enter" : ""}>
                        <div className='relative overflow-hidden rounded-[1.5rem]'>
                          <div
                            className={`relative aspect-[4/3] w-full rounded-[1.5rem] bg-slate-100 sm:aspect-[16/11] lg:h-[380px] lg:aspect-auto xl:h-[420px] ${
                              showSwipeDemo ? "swipe-demo" : ""
                            }`}
                          >
                            <Image
                              className='rounded-[1.5rem] object-contain object-center'
                              src={buildImagePath(currentProduct.file)}
                              alt={currentProduct.title}
                              fill
                              sizes='(max-width: 640px) 90vw, (max-width: 1200px) 72vw, 920px'
                              priority={currentIndex === sessionStartIndex}
                              unoptimized
                              draggable={false}
                            />
                          </div>
                          {showSwipeDemo ? (
                            <div className='pointer-events-none absolute inset-x-0 bottom-3 flex justify-center'>
                              <span className='swipe-demo-pill'>Swipe card ← →</span>
                            </div>
                          ) : null}
                          <div
                            className='absolute top-4 left-4 rotate-[-12deg] rounded-lg bg-emerald-500 px-3 py-1 text-lg font-black text-white shadow'
                            style={{ opacity: pickOpacity }}
                          >
                            PICK
                          </div>
                          <div
                            className='absolute top-4 right-4 rotate-[12deg] rounded-lg bg-rose-500 px-3 py-1 text-lg font-black text-white shadow'
                            style={{ opacity: passOpacity }}
                          >
                            PASS
                          </div>
                        </div>

                        <div className='mt-4 space-y-2 lg:space-y-3'>
                          <p className='inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-cyan-800 sm:text-[11px]'>
                            {currentProduct.tag}
                          </p>
                          <h2 className='text-2xl leading-tight font-bold sm:text-3xl'>{currentProduct.title}</h2>
                          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
                            {currentProduct.description}
                          </p>
                          {nextProduct ? (
                            <p className='pt-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 sm:text-xs'>
                              Next: {nextProduct.title}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </article>

                    <div className='grid grid-cols-2 gap-3 lg:gap-4'>
                      <button
                        type='button'
                        className='rounded-2xl bg-rose-500 px-4 py-3 text-sm font-bold text-white shadow hover:bg-rose-400 sm:text-base'
                        onClick={() => commitSwipe("left")}
                      >
                        Swipe Left
                      </button>
                      <button
                        type='button'
                        className='rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow hover:bg-emerald-400 sm:text-base'
                        onClick={() => commitSwipe("right")}
                      >
                        Swipe Right
                      </button>
                    </div>
                    <div className='flex items-center justify-center lg:justify-start'>
                      <button
                        type='button'
                        className='inline-flex h-8 items-center gap-1 rounded-full border border-white/85 bg-white/92 px-3 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45'
                        onClick={handleGoBackSwipe}
                        disabled={swipeHistory.length === 0 || Boolean(isLeaving)}
                        aria-label='Rewind to previous product'
                      >
                        <span aria-hidden='true'>↺</span> Rewind
                      </button>
                    </div>
                  </div>

                  <aside className='hidden rounded-[1.5rem] bg-white/95 p-5 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.18)] lg:block'>
                    <p className='text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500'>Swipe tracker</p>
                    <h3 className='mt-2 text-2xl leading-tight font-bold'>Desktop view</h3>
                    <p className='mt-1.5 text-sm text-slate-600'>Use swipe gestures or the left and right buttons.</p>

                    <div className='mt-4 grid grid-cols-2 gap-3'>
                      <div className='rounded-xl bg-emerald-50 p-3'>
                        <p className='text-[10px] font-semibold tracking-[0.12em] uppercase text-emerald-700'>Picked</p>
                        <p className='mt-1 text-2xl font-black text-emerald-900'>{pickedProducts.length}</p>
                      </div>
                      <div className='rounded-xl bg-rose-50 p-3'>
                        <p className='text-[10px] font-semibold tracking-[0.12em] uppercase text-rose-700'>Passed</p>
                        <p className='mt-1 text-2xl font-black text-rose-900'>{passedCount}</p>
                      </div>
                      <div className='col-span-2 rounded-xl bg-violet-50 p-3'>
                        <p className='text-[10px] font-semibold tracking-[0.12em] uppercase text-violet-700'>
                          Remaining
                        </p>
                        <p className='mt-1 text-2xl font-black text-violet-900'>
                          {Math.max(PRODUCTS.length - currentIndex, 0)}
                        </p>
                      </div>
                    </div>

                    <div className='mt-5'>
                      <p className='text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500'>
                        Recent picks
                      </p>
                      {pickedProducts.length === 0 ? (
                        <p className='mt-2 text-sm text-slate-500'>No picks yet. Swipe right on items you want.</p>
                      ) : (
                        <div className='mt-3 grid grid-cols-3 gap-2'>
                          {pickedProducts.slice(-6).map((item) => (
                            <button
                              key={`desktop-pick-${item.file}`}
                              type='button'
                              onClick={() => setActivePickedProduct(item)}
                              className='overflow-hidden rounded-xl bg-slate-100 p-1 transition-transform hover:scale-[1.03]'
                              aria-label={`View ${item.title}`}
                            >
                              <Image
                                src={buildImagePath(item.file)}
                                alt={item.title}
                                width={84}
                                height={84}
                                unoptimized
                                className='aspect-square h-full w-full rounded-lg object-contain'
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
              ) : null}

              {step === "review" ? (
                <div className='mx-auto max-w-6xl space-y-6 rounded-3xl bg-white p-5 shadow-lg backdrop-blur-sm sm:p-7'>
                  <div className='space-y-2'>
                    <h2 className='text-3xl font-bold text-slate-900'>Your Picks</h2>
                    <p className='text-sm text-slate-700'>
                      You picked {pickedProducts.length} out of {sessionTotalProducts} products.
                    </p>
                  </div>

                  {pickedProducts.length === 0 ? (
                    <div className='rounded-2xl bg-rose-50 p-5'>
                      <p className='text-sm text-rose-700'>
                        No products were picked yet, so there is no offer to submit.
                      </p>

                      <button
                        type='button'
                        className='mt-4 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100'
                        onClick={restart}
                      >
                        Start Over
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-6'>
                        {pickedProducts.map((item) => (
                          <button
                            key={item.file}
                            type='button'
                            onClick={() => setActivePickedProduct(item)}
                            className='rounded-2xl bg-white p-2 text-slate-900 shadow transition-transform hover:scale-[1.02]'
                          >
                            <Image
                              className='aspect-square h-auto w-full rounded-xl bg-slate-50 object-contain object-center p-1'
                              src={buildImagePath(item.file)}
                              alt={item.title}
                              width={240}
                              height={240}
                              unoptimized
                            />
                            <p className='mt-1 line-clamp-2 text-left text-[11px] font-semibold text-slate-700'>
                              {item.title}
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className='rounded-2xl bg-white p-5 text-slate-900 shadow-lg'>
                        <div className='flex items-center justify-between gap-3'>
                          <p className='text-sm font-semibold tracking-wide uppercase'>
                            Total offer for selected items
                          </p>
                          <p className='rounded-full bg-cyan-100 px-4 py-1 text-xl font-black text-cyan-900'>
                            €{safeOfferAmount}
                          </p>
                        </div>
                        <input
                          type='range'
                          min={OFFER_MIN}
                          max={OFFER_MAX}
                          value={safeOfferAmount}
                          onChange={(event) => setOfferAmount(Number(event.target.value))}
                          className='mt-4 h-3 w-full cursor-pointer accent-cyan-500'
                        />
                        <p className='mt-2 text-xs text-slate-600'>
                          Slide to define the total amount you would pay for this selected bundle (from €0 to €80).
                        </p>
                      </div>

                      <button
                        type='button'
                        className='rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-violet-500'
                        onClick={() => setStep("name")}
                      >
                        Submit Offer
                      </button>
                    </>
                  )}
                </div>
              ) : null}

              {step === "name" ? (
                <form
                  onSubmit={submitOffer}
                  className='mx-auto max-w-3xl space-y-6 rounded-3xl bg-white p-6 shadow-lg backdrop-blur-sm sm:p-7'
                >
                  <div className='space-y-2'>
                    <h2 className='text-3xl font-bold text-slate-900'>Almost done</h2>
                    <p className='text-sm text-slate-700'>
                      Offer summary: {pickedProducts.length} products for €{safeOfferAmount}.
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='marketplace-name' className='text-sm font-bold text-slate-900'>
                      Your name
                    </label>
                    <input
                      id='marketplace-name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder='Type your name'
                      className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none'
                    />
                  </div>

                  {submitError ? (
                    <div className='rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700'>{submitError}</div>
                  ) : null}

                  <div className='flex flex-wrap gap-3'>
                    <button
                      type='button'
                      className='rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-300'
                      onClick={() => setStep("review")}
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      className='rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Offer"}
                    </button>
                  </div>
                </form>
              ) : null}

              {step === "submitted" ? (
                <div className='mx-auto max-w-3xl space-y-4 rounded-3xl bg-emerald-50 p-6 shadow-lg sm:p-8'>
                  <h2 className='text-3xl font-bold text-emerald-900'>Offer submitted</h2>
                  <p className='max-w-2xl text-sm text-emerald-800'>
                    Thanks {name.trim()}. Juan received your offer by email.
                  </p>
                  <Link
                    href='/'
                    className='inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100'
                  >
                    See Juan&apos;s personal website
                  </Link>
                </div>
              ) : null}
            </section>
          )}
        </div>

        {activePickedProduct ? (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
            <button
              type='button'
              className='absolute inset-0 bg-slate-950/45 backdrop-blur-sm'
              onClick={() => setActivePickedProduct(null)}
              aria-label='Close product preview'
            ></button>
            <div className='relative z-10 w-full max-w-lg rounded-[2rem] bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-5'>
              <div className='relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-slate-100'>
                <Image
                  src={buildImagePath(activePickedProduct.file)}
                  alt={activePickedProduct.title}
                  fill
                  sizes='(max-width: 640px) 90vw, 560px'
                  unoptimized
                  className='object-contain object-center'
                />
              </div>
              <div className='mt-4 space-y-2'>
                <p className='inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-cyan-800'>
                  {activePickedProduct.tag}
                </p>
                <h3 className='text-2xl font-bold text-slate-900'>{activePickedProduct.title}</h3>
                <p className='text-sm leading-relaxed text-slate-700'>{activePickedProduct.description}</p>
              </div>
              <div className='mt-5 grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  onClick={() => removePickedProduct(activePickedProduct.file)}
                  className='rounded-2xl bg-rose-500 px-4 py-3 text-sm font-bold text-white shadow hover:bg-rose-400'
                >
                  Remove
                </button>
                <button
                  type='button'
                  onClick={() => setActivePickedProduct(null)}
                  className='rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow hover:bg-emerald-400'
                >
                  Keep
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <style jsx global>{`
        button:not(:disabled) {
          cursor: pointer;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) scale(1.06);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(18px) scale(0.95);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        @keyframes cta-pop {
          0%,
          100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 22px 46px rgba(124, 58, 237, 0.46);
          }
          50% {
            transform: translateY(-2px) scale(1.015);
            box-shadow: 0 28px 58px rgba(236, 72, 153, 0.44);
          }
        }

        .animate-cta {
          animation: cta-pop 2.4s ease-in-out infinite;
        }

        @keyframes card-enter {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.975);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .card-enter {
          animation: card-enter 480ms cubic-bezier(0.2, 0.9, 0.25, 1) both;
          will-change: transform, opacity;
        }

        @keyframes progress-shift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 120% 50%;
          }
        }

        .progress-fill {
          background-size: 180% 100%;
          animation: progress-shift 2.6s linear infinite;
        }

        @keyframes swipe-demo {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          20% {
            transform: translateX(16px) rotate(1.2deg);
          }
          50% {
            transform: translateX(0) rotate(0deg);
          }
          75% {
            transform: translateX(-16px) rotate(-1.2deg);
          }
        }

        @keyframes swipe-demo-pill {
          0%,
          100% {
            opacity: 0.78;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-1px);
          }
        }

        .swipe-demo {
          animation: swipe-demo 4.2s cubic-bezier(0.33, 1, 0.68, 1) infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .swipe-demo-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.78);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 12px;
          animation: swipe-demo-pill 2.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MarketplacePage;
