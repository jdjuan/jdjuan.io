import Head from "next/head";
import Image from "next/image";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import cx from "classnames";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-sarah-display",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sarah-body",
  weight: ["400", "500", "600", "700", "800"],
});

type Letter = {
  day: number;
  unlockAt: string;
  title: string;
  cardGlowClass: string;
  photoSrc: string;
  message: string[];
};

type CelebrationPiece = {
  id: number;
  kind: "petal" | "heart";
  x: string;
  y: string;
  delay: string;
  duration: string;
  size: number;
  color: string;
  rotateFrom: string;
  rotateTo: string;
};

type Celebration = {
  key: number;
  originX: number;
  originY: number;
};

const CALENDAR_TIMEZONE = "Europe/Vienna";
const OPENED_DOORS_STORAGE_KEY = "sarah-opened-doors-v1";
const DEBUG_UNLOCKED_ALL_STORAGE_KEY = "sarah-debug-unlocked-all-v1";
const MEETING_AT = new Date("2026-04-10T23:00:00+02:00");
const FIRST_OPEN_CELEBRATION_MS = 3_000;
const CELEBRATION_BURST_INTERVAL_MS = 260;
const CELEBRATION_BURST_LIFETIME_MS = 1_600;
const CELEBRATION_PIECES: CelebrationPiece[] = [
  {
    id: 1,
    kind: "petal",
    x: "-5.5rem",
    y: "-7rem",
    delay: "0ms",
    duration: "1200ms",
    size: 22,
    color: "#eaa0ac",
    rotateFrom: "-12deg",
    rotateTo: "-140deg",
  },
  {
    id: 2,
    kind: "petal",
    x: "-1.75rem",
    y: "-7.8rem",
    delay: "40ms",
    duration: "1320ms",
    size: 16,
    color: "#f4c3ca",
    rotateFrom: "10deg",
    rotateTo: "170deg",
  },
  {
    id: 3,
    kind: "heart",
    x: "1.8rem",
    y: "-8rem",
    delay: "80ms",
    duration: "1360ms",
    size: 18,
    color: "#db7888",
    rotateFrom: "-8deg",
    rotateTo: "24deg",
  },
  {
    id: 4,
    kind: "petal",
    x: "5.2rem",
    y: "-6.2rem",
    delay: "20ms",
    duration: "1260ms",
    size: 20,
    color: "#efb0b8",
    rotateFrom: "6deg",
    rotateTo: "142deg",
  },
  {
    id: 5,
    kind: "petal",
    x: "7rem",
    y: "-2rem",
    delay: "60ms",
    duration: "1180ms",
    size: 18,
    color: "#f0b8c3",
    rotateFrom: "-18deg",
    rotateTo: "112deg",
  },
  {
    id: 6,
    kind: "heart",
    x: "7.8rem",
    y: "2rem",
    delay: "120ms",
    duration: "1480ms",
    size: 16,
    color: "#d56779",
    rotateFrom: "0deg",
    rotateTo: "30deg",
  },
  {
    id: 7,
    kind: "petal",
    x: "5.8rem",
    y: "6.3rem",
    delay: "100ms",
    duration: "1380ms",
    size: 22,
    color: "#efb8bf",
    rotateFrom: "4deg",
    rotateTo: "164deg",
  },
  {
    id: 8,
    kind: "petal",
    x: "1.4rem",
    y: "7.8rem",
    delay: "140ms",
    duration: "1440ms",
    size: 18,
    color: "#f6cfd3",
    rotateFrom: "-12deg",
    rotateTo: "126deg",
  },
  {
    id: 9,
    kind: "heart",
    x: "-1.6rem",
    y: "7.1rem",
    delay: "90ms",
    duration: "1420ms",
    size: 18,
    color: "#c95668",
    rotateFrom: "-6deg",
    rotateTo: "-24deg",
  },
  {
    id: 10,
    kind: "petal",
    x: "-5.5rem",
    y: "6rem",
    delay: "130ms",
    duration: "1340ms",
    size: 20,
    color: "#ebb2b8",
    rotateFrom: "12deg",
    rotateTo: "-144deg",
  },
  {
    id: 11,
    kind: "petal",
    x: "-7.2rem",
    y: "1.2rem",
    delay: "160ms",
    duration: "1280ms",
    size: 17,
    color: "#f5c9cd",
    rotateFrom: "-10deg",
    rotateTo: "-116deg",
  },
  {
    id: 12,
    kind: "heart",
    x: "-7.4rem",
    y: "-2.6rem",
    delay: "110ms",
    duration: "1500ms",
    size: 15,
    color: "#da7484",
    rotateFrom: "3deg",
    rotateTo: "-28deg",
  },
];

const LETTERS: Letter[] = [
  {
    day: 1,
    unlockAt: "2026-04-02T00:00:00+02:00",
    title: "Empieza",
    cardGlowClass: "from-[#f4ccd1]/70 via-[#fff4f2]/18 to-transparent",
    photoSrc: "/sarah/dia%201.jpg",
    message: [
      "Bievenida mi amor, éste es un pequeño regalo para que cada puerta te recuerde algo muy simple: \n\nLa ilusión que me hace verte. Espero que te guste y te llene de emoción cada día. Te amo mucho! \n\nVuelve mañana!",
    ],
  },
  {
    day: 2,
    unlockAt: "2026-04-03T00:00:00+02:00",
    title: "Pienso en ti",
    cardGlowClass: "from-[#f1d2c5]/70 via-[#fff6f1]/18 to-transparent",
    photoSrc: "/sarah/dia%202.jpg",
    message: [
      "Amorcito, quiero recordate que has estado en mi mente todos los días desde el día que te conocí. Haces mi vida mucho más dulce. En serio, soy demasiado feliz a tu lado! Te amo\n\nGracias por todo tu amor! 🥹",
    ],
  },
  {
    day: 3,
    unlockAt: "2026-04-04T00:00:00+02:00",
    title: "Tu mirada",
    cardGlowClass: "from-[#f6d7da]/70 via-[#fff4f2]/18 to-transparent",
    photoSrc: "/sarah/dia%203.jpg",
    message: [
      "Me encanta lo que tus ojos bellos me dicen cuando me miras sonriente y enamorada. Gracias porque ésta es una de las sensaciones más bellas que me provocas. \n\nQuiero además recordarte que tienes los ojos más bellos, las cejas más divinas, y las pestañas más hermosas. Me encanta verte y que me veas. No cambiaría tu mirada por nada en el mundo, en serio, por nada 🥹\n\n Te amo mucho mi corazón bonito hermoso 😍",
    ],
  },
  {
    day: 4,
    unlockAt: "2026-04-05T00:00:00+02:00",
    title: "Eres amor",
    cardGlowClass: "from-[#efd0d4]/70 via-[#fff5f4]/18 to-transparent",
    photoSrc: "/sarah/dia%204.jpg",
    message: [
      "Amorcito, hay algo que me encanta de ti y ese amor que irradias, que emana de ti tan naturalmente, no sólo hacia mi sino hacia todos y todo.\n\nTienes una bondad innata que se nota en todo lo que haces por los demás. Estoy seguro que en tu vida vas a ayudar a miles de personas. \n\nGracias por ser un ser humano tan espectacular 😍",
    ],
  },
  {
    day: 5,
    unlockAt: "2026-04-06T00:00:00+02:00",
    title: "Apapayarte",
    cardGlowClass: "from-[#f4d8cf]/70 via-[#fff6f1]/18 to-transparent",
    photoSrc: "/sarah/dia%205.jpg",
    message: [
      "Ya me hace mucha ilusión construir un hogar contigo mi amor, y pasar mucho tiempo a tu lado construyendo nuestros sueños. Qué emoción!\n\nPero sabes lo que más quiero, apapayarte todos los días! Llenarte de abrazos certeros llenos de energía y amor, sentir tu piel, tu cuerpo, y tu ser. \n\nNo te puedes rehusar! ❤️ ok ok?\n\nCierra los ojos por unos segundos, y siente como te tomo la carita y te la lleno de besos.",
    ],
  },
  {
    day: 6,
    unlockAt: "2026-04-07T00:00:00+02:00",
    title: "Mi parte favorita",
    cardGlowClass: "from-[#f5d4d8]/70 via-[#fff5f2]/18 to-transparent",
    photoSrc: "/sarah/dia%206.jpg",
    message: [
      "Sabes cuál es mi parte favorita de ti? Tus nalgas! haha sí, me encantan y las voy a agarrar siempre con mucho amor, ternura y deseo.\n\nPero también tengo otra parte favorita, tus labios hermosos y suaves que me besan.\n\nEspera! También me encantan tus ojos, y también me encantan tus manos! \n\nAy no! Amorcito, me temo que todo de ti es mi parte favorita 💛",
    ],
  },
  {
    day: 7,
    unlockAt: "2026-04-08T00:00:00+02:00",
    title: "Ya no falta nada",
    cardGlowClass: "from-[#f3d1cb]/70 via-[#fff6f1]/18 to-transparent",
    photoSrc: "/sarah/dia%207.jpg",
    message: [
      "Te deseo un viaje muy bonito mi amor, estaré muy pendiente hoy de ti, ok ok?\n\nPuedes estar segura que ahora mismo me estoy llenando de mucho emoción de verte.\n\nVoy a darte un beso gigante como si fuera el primero, voy a darte un abrazo eterno como si no nos hubiéramos visto en años, y voy a quedarme mirándote como si ya te conociera de una vida pasada y por fin nos reencontramos. \n\nTe espero! ❤️",
    ],
  },
  {
    day: 8,
    unlockAt: "2026-04-09T00:00:00+02:00",
    title: "Por fin",
    cardGlowClass: "from-[#f6d4d9]/70 via-[#fff5f4]/18 to-transparent",
    photoSrc: "/sarah/dia%208.jpg",
    message: [
      "Amor de mi vida, por fin estás aquí. Quiero que sostengas mi mano, y me mires a los ojos por unos segundos.\n\nEl día que nos conocimos no teníamos ni idea de lo que nos esperaba. De los feliz que seríamos.\n\nHoy quiero recordarnos que éste es solo el principio de nuestra relación. Que no tenemos ni idea del amor infinito que nos espera, de las aventuras que viviremos, y de los sueños que cumpliremos.\n\nTambién nos esperan desafíos, algunas tormentas, y momentos difíciles, pero estoy feliz de vivirlo todo a tu lado.\n\nUn día, cuando me despida de este mundo, estaré muy feliz de haber compartido mi vida contigo.\n\nGracias por ser mi compañera de vida ❤️",
    ],
  },
];

const fullDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  timeZone: CALENDAR_TIMEZONE,
});

const shortDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  timeZone: CALENDAR_TIMEZONE,
});

function formatCountdown(target: Date, now: Date | null) {
  if (!now) {
    return { days: "--", hours: "--", minutes: "--", seconds: "--", distance: null };
  }

  const distance = Math.max(target.getTime() - now.getTime(), 0);
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);
  const minutes = Math.floor((distance % 3_600_000) / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1_000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    distance,
  };
}

function isLetterUnlocked(letter: Letter, now: Date | null) {
  if (!now) {
    return false;
  }

  return now.getTime() >= new Date(letter.unlockAt).getTime();
}

function CountdownTile({ label, value }: { label: string; value: string }) {
  return (
    <div className='relative overflow-hidden rounded-[1.25rem] border border-[#ead8d7] bg-white/82 px-4 py-4 text-left shadow-[0_10px_30px_rgba(188,123,131,0.08)] backdrop-blur-xl'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_60%)]' />
      <p className='relative text-[0.68rem] uppercase tracking-[0.38em] text-[#b18a8f]'>{label}</p>
      <p
        className='relative mt-2 text-4xl leading-none font-semibold text-[#7f3240] sm:text-5xl'
        style={{ fontFamily: "var(--font-sarah-body)" }}
      >
        {value}
      </p>
    </div>
  );
}

function subscribeToHostname() {
  return () => {};
}

export default function SarahCountdownPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const openSoundContextRef = useRef<AudioContext | null>(null);
  const celebrationKeyRef = useRef(0);
  const openingTimeoutRef = useRef<number | null>(null);
  const celebrationIntervalRef = useRef<number | null>(null);
  const celebrationCleanupTimeoutsRef = useRef<number[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [activeLetterDay, setActiveLetterDay] = useState<number | null>(null);
  const [pendingOpenDay, setPendingOpenDay] = useState<number | null>(null);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [debugUnlockedAll, setDebugUnlockedAll] = useState(false);
  const hostname = useSyncExternalStore(
    subscribeToHostname,
    () => window.location.hostname,
    () => "",
  );
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";

  const updateNow = useEffectEvent(() => {
    setNow(new Date());
  });

  const getOpenSoundContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
      return null;
    }

    if (!openSoundContextRef.current) {
      openSoundContextRef.current = new window.AudioContext();
    }

    return openSoundContextRef.current;
  }, []);

  const resumeOpenSoundContext = useCallback((): AudioContext | null => {
    const soundContext = getOpenSoundContext();

    if (soundContext && soundContext.state === "suspended") {
      void soundContext.resume().catch(() => {});
    }

    return soundContext;
  }, [getOpenSoundContext]);

  const ensureBackgroundSongPlaying = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.45;

    if (!audio.paused && !audio.ended) {
      return;
    }

    try {
      await audio.play();
    } catch {}
  }, []);

  const playOpenLetterSound = useCallback(() => {
    const soundContext = resumeOpenSoundContext();

    if (!soundContext) {
      return;
    }

    const sequence = [
      { frequency: 659.25, startOffset: 0, duration: 0.12, gain: 0.024 },
      { frequency: 783.99, startOffset: 0.14, duration: 0.11, gain: 0.024 },
      { frequency: 987.77, startOffset: 0.28, duration: 0.11, gain: 0.026 },
      { frequency: 1318.51, startOffset: 0.42, duration: 0.12, gain: 0.029 },
      { frequency: 987.77, startOffset: 0.56, duration: 0.11, gain: 0.026 },
      { frequency: 1174.66, startOffset: 0.7, duration: 0.11, gain: 0.026 },
      { frequency: 1567.98, startOffset: 0.84, duration: 0.12, gain: 0.03 },
      { frequency: 1318.51, startOffset: 0.98, duration: 0.11, gain: 0.028 },
      { frequency: 987.77, startOffset: 1.12, duration: 0.11, gain: 0.026 },
      { frequency: 783.99, startOffset: 1.26, duration: 0.11, gain: 0.024 },
      { frequency: 987.77, startOffset: 1.4, duration: 0.11, gain: 0.026 },
      { frequency: 1318.51, startOffset: 1.54, duration: 0.12, gain: 0.03 },
      { frequency: 1567.98, startOffset: 1.68, duration: 0.12, gain: 0.032 },
      { frequency: 1975.53, startOffset: 1.82, duration: 0.18, gain: 0.034 },
      { frequency: 1567.98, startOffset: 2.05, duration: 0.11, gain: 0.028 },
      { frequency: 1318.51, startOffset: 2.18, duration: 0.11, gain: 0.026 },
      { frequency: 1174.66, startOffset: 2.31, duration: 0.11, gain: 0.025 },
      { frequency: 1318.51, startOffset: 2.44, duration: 0.12, gain: 0.027 },
      { frequency: 1567.98, startOffset: 2.58, duration: 0.12, gain: 0.029 },
      { frequency: 1975.53, startOffset: 2.72, duration: 0.28, gain: 0.032 },
    ];
    const soundStartTime = soundContext.currentTime + 0.01;

    for (const note of sequence) {
      const oscillator = soundContext.createOscillator();
      const gainNode = soundContext.createGain();
      const noteStartTime = soundStartTime + note.startOffset;
      const noteEndTime = noteStartTime + note.duration;

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(note.frequency, noteStartTime);
      oscillator.connect(gainNode);
      gainNode.connect(soundContext.destination);

      gainNode.gain.setValueAtTime(0.0001, noteStartTime);
      gainNode.gain.exponentialRampToValueAtTime(note.gain, noteStartTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEndTime);

      oscillator.start(noteStartTime);
      oscillator.stop(noteEndTime + 0.015);
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    }
  }, [resumeOpenSoundContext]);

  const markDoorAsOpened = (day: number) => {
    setOpenedDays((currentOpenedDays) => {
      if (currentOpenedDays.includes(day)) {
        return currentOpenedDays;
      }

      const nextOpenedDays = [...currentOpenedDays, day].sort((left, right) => left - right);

      try {
        window.localStorage.setItem(OPENED_DOORS_STORAGE_KEY, JSON.stringify(nextOpenedDays));
      } catch {}

      return nextOpenedDays;
    });
  };

  const clearCelebrationTimers = () => {
    if (celebrationIntervalRef.current !== null) {
      window.clearInterval(celebrationIntervalRef.current);
      celebrationIntervalRef.current = null;
    }

    for (const timeoutId of celebrationCleanupTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }

    celebrationCleanupTimeoutsRef.current = [];
  };

  const emitCelebrationBurst = (originX: number, originY: number) => {
    celebrationKeyRef.current += 1;
    const burstKey = celebrationKeyRef.current;

    setCelebrations((currentCelebrations) => [...currentCelebrations, { key: burstKey, originX, originY }]);

    const cleanupTimeoutId = window.setTimeout(() => {
      setCelebrations((currentCelebrations) =>
        currentCelebrations.filter((currentCelebration) => currentCelebration.key !== burstKey),
      );
      celebrationCleanupTimeoutsRef.current = celebrationCleanupTimeoutsRef.current.filter(
        (currentTimeoutId) => currentTimeoutId !== cleanupTimeoutId,
      );
    }, CELEBRATION_BURST_LIFETIME_MS);

    celebrationCleanupTimeoutsRef.current.push(cleanupTimeoutId);
  };

  const resetDoorsForTesting = () => {
    if (openingTimeoutRef.current !== null) {
      window.clearTimeout(openingTimeoutRef.current);
      openingTimeoutRef.current = null;
    }

    clearCelebrationTimers();

    setOpenedDays([]);
    setActiveLetterDay(null);
    setPendingOpenDay(null);
    setCelebrations([]);
    setDebugUnlockedAll(false);

    try {
      window.localStorage.removeItem(OPENED_DOORS_STORAGE_KEY);
      window.localStorage.removeItem(DEBUG_UNLOCKED_ALL_STORAGE_KEY);
    } catch {}
  };

  const unlockAllDoorsForTesting = () => {
    if (openingTimeoutRef.current !== null) {
      window.clearTimeout(openingTimeoutRef.current);
      openingTimeoutRef.current = null;
    }

    clearCelebrationTimers();

    setActiveLetterDay(null);
    setPendingOpenDay(null);
    setCelebrations([]);
    setDebugUnlockedAll(true);

    try {
      window.localStorage.setItem(DEBUG_UNLOCKED_ALL_STORAGE_KEY, "true");
    } catch {}
  };

  useEffect(() => {
    updateNow();
    const interval = window.setInterval(() => {
      updateNow();
    }, 1_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [resumeOpenSoundContext]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      resumeOpenSoundContext();
      void ensureBackgroundSongPlaying();
    };

    void ensureBackgroundSongPlaying();

    document.addEventListener("pointerdown", handleFirstInteraction, { once: true, passive: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [ensureBackgroundSongPlaying, resumeOpenSoundContext]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedOpenedDoors = window.localStorage.getItem(OPENED_DOORS_STORAGE_KEY);

        if (!storedOpenedDoors) {
          return;
        }

        const parsedOpenedDoors = JSON.parse(storedOpenedDoors);

        if (!Array.isArray(parsedOpenedDoors)) {
          return;
        }

        setOpenedDays(
          parsedOpenedDoors.filter((day): day is number => Number.isInteger(day) && day >= 1 && day <= LETTERS.length),
        );
      } catch {}
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedDebugUnlockedAll = window.localStorage.getItem(DEBUG_UNLOCKED_ALL_STORAGE_KEY);
        setDebugUnlockedAll(storedDebugUnlockedAll === "true");
      } catch {}
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (openingTimeoutRef.current !== null) {
        window.clearTimeout(openingTimeoutRef.current);
      }

      clearCelebrationTimers();
    };
  }, []);

  const countdown = formatCountdown(MEETING_AT, now);
  const openedDoorsSet = new Set(openedDays);
  const activeLetter = LETTERS.find((letter) => letter.day === activeLetterDay) ?? null;
  const isInteractionLocked = pendingOpenDay !== null || activeLetter !== null;

  useEffect(() => {
    if (!isInteractionLocked) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlTouchAction = document.documentElement.style.touchAction;
    const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeLetter) {
        setActiveLetterDay(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.touchAction = previousHtmlTouchAction;
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeLetter, isInteractionLocked, pendingOpenDay]);

  return (
    <>
      <Head>
        <title>Para Sarah | 8 Días</title>
        <meta
          name='description'
          content='Ocho pequeñas puertas para Sarah, con puertas que se abren día a día hasta nuestro encuentro.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='noindex,nofollow' />
      </Head>

      <div
        className={`${displayFont.variable} ${bodyFont.variable} relative min-h-screen overflow-hidden bg-[#fbf4ee] text-[#6f2a37]`}
        style={{ fontFamily: "var(--font-sarah-body)" }}
      >
        <audio
          ref={audioRef}
          src='/song.mp3'
          autoPlay
          preload='auto'
          playsInline
          className='hidden'
          aria-hidden='true'
        />

        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe3e1_0%,#fdf1eb_45%,#fbf4ee_100%)]' />
          <div className='absolute left-[-10%] top-[-12%] h-[28rem] w-[28rem] rounded-full bg-[#efbec5]/28 blur-3xl animate-[float_18s_ease-in-out_infinite]' />
          <div className='absolute right-[-8%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#f8d8db]/30 blur-3xl animate-[float_23s_ease-in-out_infinite]' />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent_18%,rgba(255,255,255,0.35)_88%,rgba(255,255,255,0.6))]' />
        </div>

        <main className='relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14'>
          <section className='reveal-up grid gap-8 lg:grid-cols-[1fr_21rem] lg:items-start'>
            <div className='max-w-3xl'>
              <h1
                className='max-w-4xl text-5xl leading-[0.95] font-semibold text-[#7f2f3d] sm:text-6xl lg:text-7xl'
                style={{ fontFamily: "var(--font-sarah-display)" }}
              >
                Ocho puertas hasta abrazarte.
              </h1>
              <p className='mt-5 max-w-lg text-base leading-8 text-[#8f6670] sm:text-lg'>Cada dia una puerta nueva</p>
            </div>

            <div className='rounded-[1.8rem] border border-[#ead7d7] bg-white/76 p-5 shadow-[0_18px_50px_rgba(188,123,131,0.08)] backdrop-blur-xl'>
              <p className='text-[0.68rem] uppercase tracking-[0.38em] text-[#b18a8f]'>Cuenta Regresiva</p>
              <p
                className='mt-3 text-4xl leading-none font-semibold text-[#7f2f3d] sm:text-5xl'
                style={{ fontFamily: "var(--font-sarah-display)" }}
              >
                {countdown.distance === null ? "..." : countdown.distance > 0 ? "Faltan" : "Hoy"}
              </p>
              <div className='mt-5 grid grid-cols-2 gap-3'>
                <CountdownTile label='Días' value={countdown.days} />
                <CountdownTile label='Horas' value={countdown.hours} />
                <CountdownTile label='Min' value={countdown.minutes} />
                <CountdownTile label='Seg' value={countdown.seconds} />
              </div>
              {isLocalhost ? (
                <div className='mt-4 flex flex-wrap gap-2'>
                  <button
                    type='button'
                    onClick={resetDoorsForTesting}
                    className='inline-flex rounded-full border border-[#ebcfd3] bg-[#fff8f7] px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#b16070] hover:bg-white'
                  >
                    Reset de prueba
                  </button>
                  <button
                    type='button'
                    onClick={unlockAllDoorsForTesting}
                    className='inline-flex rounded-full border border-[#e6c7cc] bg-[#fff3f2] px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#aa5867] hover:bg-white'
                  >
                    Desbloquear todas
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <section className='space-y-4'>
            <div className='reveal-up animation-delay-300'>
              <p className='text-[0.7rem] uppercase tracking-[0.38em] text-[#b18a8f]'>Puertas</p>
            </div>

            <div className='grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4'>
              {LETTERS.map((letter, index) => {
                const unlocked = debugUnlockedAll || isLetterUnlocked(letter, now);
                const hasBeenOpened = openedDoorsSet.has(letter.day);
                const canOpenNow = unlocked && !hasBeenOpened;
                const isOpeningNow = pendingOpenDay === letter.day;
                const doorState = hasBeenOpened ? "opened" : !unlocked ? "closed" : "openable";

                return (
                  <button
                    key={letter.day}
                    type='button'
                    disabled={(!unlocked && !hasBeenOpened) || pendingOpenDay !== null}
                    onClick={(event) => {
                      resumeOpenSoundContext();
                      void ensureBackgroundSongPlaying();

                      if (hasBeenOpened) {
                        setActiveLetterDay(letter.day);
                        return;
                      }

                      if (!canOpenNow || pendingOpenDay !== null) {
                        return;
                      }

                      const buttonBounds = event.currentTarget.getBoundingClientRect();
                      const originX = buttonBounds.left + buttonBounds.width / 2;
                      const originY = buttonBounds.top + Math.min(buttonBounds.height * 0.38, 190);

                      playOpenLetterSound();
                      emitCelebrationBurst(originX, originY);
                      celebrationIntervalRef.current = window.setInterval(() => {
                        emitCelebrationBurst(originX, originY);
                      }, CELEBRATION_BURST_INTERVAL_MS);

                      setPendingOpenDay(letter.day);
                      openingTimeoutRef.current = window.setTimeout(() => {
                        clearCelebrationTimers();
                        setCelebrations([]);
                        markDoorAsOpened(letter.day);
                        setPendingOpenDay((currentPendingOpenDay) =>
                          currentPendingOpenDay === letter.day ? null : currentPendingOpenDay,
                        );
                        setActiveLetterDay(letter.day);
                        openingTimeoutRef.current = null;
                      }, FIRST_OPEN_CELEBRATION_MS);
                    }}
                    className={cx(
                      "reveal-up group relative appearance-none text-left outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                      canOpenNow && !isOpeningNow && "cursor-pointer hover:-translate-y-1",
                      !unlocked && !hasBeenOpened && "cursor-not-allowed opacity-[0.86]",
                      pendingOpenDay !== null && !hasBeenOpened && "cursor-wait",
                      hasBeenOpened && "cursor-pointer hover:-translate-y-1",
                    )}
                    style={{ animationDelay: `${420 + index * 90}ms`, WebkitTapHighlightColor: "transparent" }}
                    aria-label={
                      hasBeenOpened
                        ? `Día ${letter.day} abierto: ${letter.title}`
                        : unlocked
                          ? `Abrir día ${letter.day}: ${letter.title}`
                          : `El día ${letter.day} se abre el ${fullDateFormatter.format(new Date(letter.unlockAt))}`
                    }
                  >
                    <div className='relative mx-auto w-full max-w-[20rem] sm:max-w-none'>
                      <div
                        className={cx(
                          "rounded-[1.8rem] border p-2.5 backdrop-blur-xl transition-all duration-500 sm:rounded-[2rem] sm:p-3",
                          doorState === "closed" &&
                            "border-[#dfdbd8] bg-[#f1ece8]/96 shadow-[0_14px_34px_rgba(132,122,118,0.08)]",
                          doorState === "openable" &&
                            "border-[#e7c6cc] bg-white/92 shadow-[0_20px_50px_rgba(188,123,131,0.12)]",
                          doorState === "opened" &&
                            "border-[#e3c0c8] bg-white/95 shadow-[0_24px_60px_rgba(188,123,131,0.14)]",
                        )}
                      >
                        <div
                          className={cx(
                            "relative aspect-[5/6] rounded-[1.3rem] border p-2.5 sm:aspect-[4/5] sm:rounded-[1.45rem] sm:p-3",
                            doorState === "closed" && "border-[#ddd7d2] bg-[#ebe6e1]",
                            doorState !== "closed" && "border-[#eddede] bg-[#fcf6f2]",
                          )}
                        >
                          {doorState === "opened" ? (
                            <div className='sarah-letter-sheet absolute inset-2.5 rounded-[1rem] border border-[#e8d1cf] bg-[linear-gradient(180deg,#fffdfa,#f9eeea)] p-4 text-left sm:inset-3 sm:p-4'>
                              <div className='relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 text-center'>
                                <div className='rounded-full border border-[#efd8da] bg-white/82 px-4 py-1 text-[0.62rem] uppercase tracking-[0.34em] text-[#c0848f] shadow-[0_10px_24px_rgba(188,123,131,0.08)]'>
                                  Carta abierta
                                </div>
                                <div
                                  className='inline-flex items-center justify-center rounded-full border border-[#e8c9cf] bg-[linear-gradient(180deg,#fffdfb,#fff2f1)] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#ae5c6d] shadow-[0_14px_28px_rgba(190,126,136,0.12)]'
                                  aria-hidden='true'
                                >
                                  Abrir carta
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <div
                            className={cx(
                              "sarah-letter-sheet absolute top-2.5 right-2.5 bottom-2.5 rounded-[0.95rem] border bg-[linear-gradient(180deg,#fffdfa,#f9eeea)] transition-all duration-700 sm:top-3 sm:right-3 sm:bottom-3 sm:rounded-[1rem]",
                              doorState === "closed" && "border-[#efe2de] opacity-0 scale-[0.98]",
                              doorState === "openable" &&
                                "left-[26%] border-[#ebd4cf] opacity-100 scale-100 shadow-[0_16px_34px_rgba(192,128,136,0.12)]",
                              doorState === "opened" && "opacity-0 pointer-events-none",
                            )}
                          >
                            {doorState === "openable" ? (
                              <>
                                <div className='absolute left-4 right-6 top-5 h-px bg-[#eddcda]' />
                                <div className='absolute left-4 right-10 top-10 h-px bg-[#f1e3df]' />
                                <div className='absolute top-[3.45rem] left-4 right-8 h-px bg-[#f1e3df]' />
                                <div className='absolute top-[4.9rem] left-4 h-2.5 w-2.5 rounded-full bg-[#efc2c8]' />
                                <div className='sarah-open-now-chip absolute right-4 top-5 rounded-full border px-3 py-1 text-center text-[0.62rem] uppercase tracking-[0.28em]'>
                                  {isOpeningNow ? "Abriendo..." : "Abrir ahora"}
                                </div>
                                <div className='absolute right-4 bottom-4 text-[1.7rem] leading-none text-[#d79ba5]'>
                                  ♡
                                </div>
                              </>
                            ) : null}
                          </div>
                          <div
                            className={cx(
                              "absolute inset-3 rounded-[1rem] bg-gradient-to-br opacity-100",
                              doorState === "closed"
                                ? "from-[#ebe3de]/70 via-[#ece7e3]/30 to-[#ddd8d3]/55"
                                : letter.cardGlowClass,
                            )}
                          />
                          {doorState === "closed" ? (
                            <>
                              <div className='absolute inset-3 rounded-[1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(208,203,200,0.14)_42%,rgba(151,145,141,0.18))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),inset_0_-18px_24px_rgba(93,84,79,0.08)]' />
                              <div className='absolute inset-x-6 top-1/2 h-[0.8rem] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,rgba(206,200,196,0.95),rgba(160,153,148,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_2px_8px_rgba(95,87,82,0.08)]' />
                            </>
                          ) : null}
                          <div
                            className={cx(
                              "sarah-door-leaf absolute top-2.5 left-2.5 bottom-2.5 rounded-[0.95rem] transition-all duration-700 ease-out sm:top-3 sm:left-3 sm:bottom-3 sm:rounded-[1rem]",
                              doorState === "closed" &&
                                "right-2.5 opacity-[0.96] saturate-[0.42] brightness-[0.82] contrast-[0.88] sm:right-3",
                              doorState === "openable" &&
                                "right-[20%] [transform:perspective(1100px)_rotateY(-21deg)] shadow-[-18px_18px_34px_rgba(125,77,88,0.16)]",
                              canOpenNow &&
                                "group-hover:right-[24%] group-hover:[transform:perspective(1100px)_rotateY(-30deg)] group-hover:shadow-[-22px_22px_40px_rgba(125,77,88,0.22)]",
                              doorState === "opened" && "opacity-0 pointer-events-none",
                            )}
                            style={{ transformOrigin: "left center" }}
                          >
                            {doorState === "openable" ? (
                              <div className='sarah-door-edge absolute -right-[0.42rem] top-[0.7rem] bottom-[0.7rem] w-[0.7rem] rounded-r-[0.55rem]' />
                            ) : null}

                            <div className='absolute left-[0.45rem] top-[1.1rem] flex flex-col gap-[1.2rem]'>
                              <span
                                className={cx(
                                  "sarah-door-hinge h-5 w-[0.36rem] rounded-full",
                                  doorState === "closed" && "opacity-55 saturate-[0.5] brightness-[0.9]",
                                )}
                              />
                              <span
                                className={cx(
                                  "sarah-door-hinge h-5 w-[0.36rem] rounded-full",
                                  doorState === "closed" && "opacity-55 saturate-[0.5] brightness-[0.9]",
                                )}
                              />
                              <span
                                className={cx(
                                  "sarah-door-hinge h-5 w-[0.36rem] rounded-full",
                                  doorState === "closed" && "opacity-55 saturate-[0.5] brightness-[0.9]",
                                )}
                              />
                            </div>

                            <div
                              className={cx(
                                "absolute inset-[0.6rem] rounded-[0.82rem] border border-[#f3d7dc]/45 shadow-[inset_0_0_0_1px_rgba(255,247,245,0.1)]",
                                doorState === "closed" &&
                                  "border-[#d7cec6]/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
                              )}
                            />
                            <div
                              className={cx(
                                "sarah-door-panel absolute inset-x-4 top-4 bottom-[55%] rounded-[0.82rem]",
                                doorState === "closed" && "opacity-78",
                              )}
                            />
                            <div
                              className={cx(
                                "sarah-door-panel absolute inset-x-4 top-[53%] bottom-4 rounded-[0.82rem]",
                                doorState === "closed" && "opacity-78",
                              )}
                            />
                            <div
                              className={cx(
                                "sarah-door-knob-plate absolute right-4 top-1/2 h-8 w-4 -translate-y-1/2 rounded-full",
                                doorState === "closed" && "opacity-55 saturate-[0.45] brightness-[0.95]",
                              )}
                            />
                            <div
                              className={cx(
                                "sarah-door-knob absolute right-[0.8rem] top-1/2 h-[0.92rem] w-[0.92rem] -translate-y-1/2 rounded-full",
                                doorState === "closed" && "opacity-60 saturate-[0.45] brightness-[0.95]",
                                doorState !== "closed" && "ring-2 ring-white/45",
                              )}
                            />
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <span
                                className='sarah-door-number text-[4.7rem] leading-none font-semibold text-[#fffaf5] sm:text-[6.3rem]'
                                style={{ fontFamily: "var(--font-sarah-display)" }}
                              >
                                {letter.day}
                              </span>
                            </div>
                          </div>
                          {doorState === "openable" ? (
                            <div className='sarah-openable-halo absolute inset-[0.5rem] rounded-[1rem] sm:inset-[0.6rem]' />
                          ) : null}
                        </div>
                        <div className='mt-3 px-2 text-center'>
                          <h3
                            className='text-[2rem] leading-none font-semibold text-[#7f2f3d]'
                            style={{ fontFamily: "var(--font-sarah-display)" }}
                          >
                            {letter.title}
                          </h3>
                          <div className='mt-1.5 text-sm text-[#9d737a]'>
                            {shortDateFormatter.format(new Date(letter.unlockAt))}
                          </div>
                          <div
                            className={cx(
                              "mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.32em]",
                              doorState === "closed" && "border-[#ead7d7] bg-white/50 text-[#b89aa0]",
                              doorState === "openable" &&
                                "border-[#efcfd4] bg-[#fff8f7] text-[#b96978] shadow-[0_8px_18px_rgba(194,127,136,0.12)] animate-[pulse_2.2s_ease-in-out_infinite]",
                              doorState === "opened" && "border-[#e7c6cc] bg-[#fff5f4] text-[#ad6472]",
                            )}
                          >
                            {doorState === "closed"
                              ? "Cerrada"
                              : doorState === "openable"
                                ? isOpeningNow
                                  ? "Abriendo..."
                                  : "Abrir"
                                : "Abierta"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>

        {celebrations.length > 0 ? (
          <div className='pointer-events-none fixed inset-0 z-[60] overflow-hidden' aria-hidden='true'>
            {celebrations.map((celebration) => (
              <div
                key={celebration.key}
                className='absolute'
                style={{ left: celebration.originX, top: celebration.originY } as CSSProperties}
              >
                <span className='sarah-celebration-glow sarah-celebration-glow-primary' />
                <span className='sarah-celebration-glow sarah-celebration-glow-secondary' />
                <span className='sarah-celebration-ring' />

                {CELEBRATION_PIECES.map((piece) => (
                  <span
                    key={`${celebration.key}-${piece.id}`}
                    className={cx(
                      "sarah-celebration-piece",
                      piece.kind === "heart" ? "sarah-celebration-heart" : "sarah-celebration-petal",
                    )}
                    style={
                      {
                        "--burst-x": piece.x,
                        "--burst-y": piece.y,
                        "--burst-delay": piece.delay,
                        "--burst-duration": piece.duration,
                        "--burst-rotate-from": piece.rotateFrom,
                        "--burst-rotate-to": piece.rotateTo,
                        "--burst-color": piece.color,
                        width: piece.size,
                        height: piece.kind === "heart" ? "auto" : Math.round(piece.size * 0.74),
                        fontSize: piece.kind === "heart" ? piece.size : undefined,
                      } as CSSProperties
                    }
                  >
                    {piece.kind === "heart" ? "♡" : null}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : null}

        {activeLetter ? (
          <div
            className='fixed inset-0 z-[55] flex items-center justify-center bg-[#6c3140]/28 px-4 py-6 backdrop-blur-md sm:px-6'
            onClick={() => {
              setActiveLetterDay(null);
            }}
          >
            <div
              className='relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-[#ead4d5] bg-[linear-gradient(180deg,#fffdfb,#fff4f1)] shadow-[0_28px_80px_rgba(123,67,79,0.22)]'
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <button
                type='button'
                onClick={() => {
                  setActiveLetterDay(null);
                }}
                className='absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ecd4d7] bg-white/90 text-xl leading-none text-[#a95b6b] shadow-[0_10px_24px_rgba(188,123,131,0.12)] backdrop-blur focus:outline-none'
                aria-label='Cerrar carta'
              >
                ×
              </button>

              <div className='relative aspect-[4/3] w-full overflow-hidden border-b border-[#edd9d9] bg-[#f7e9e7] sm:aspect-[16/10]'>
                <Image
                  src={activeLetter.photoSrc}
                  alt={`Foto del día ${activeLetter.day}`}
                  fill
                  sizes='(max-width: 768px) 100vw, 56rem'
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,249,0.06),rgba(93,39,52,0.2))]' />
                <div className='absolute left-5 bottom-5 right-16 sm:left-8 sm:bottom-7'>
                  <p className='text-[0.68rem] uppercase tracking-[0.38em] text-white/82'>Carta {activeLetter.day}</p>
                  <h2
                    className='mt-2 text-4xl leading-none font-semibold text-white drop-shadow-[0_6px_20px_rgba(74,33,43,0.22)] sm:text-5xl'
                    style={{ fontFamily: "var(--font-sarah-display)" }}
                  >
                    {activeLetter.title}
                  </h2>
                </div>
              </div>

              <div className='flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7'>
                <div className='mb-5 inline-flex rounded-full border border-[#edd6d9] bg-white/84 px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[#b0707c] shadow-[0_10px_24px_rgba(188,123,131,0.08)]'>
                  {shortDateFormatter.format(new Date(activeLetter.unlockAt))}
                </div>

                <div
                  className='space-y-5 text-[1.02rem] leading-[1.9] text-[#88525d] sm:text-[1.08rem] sm:leading-[2]'
                  style={{ fontFamily: "var(--font-sarah-body)" }}
                >
                  {activeLetter.message.map((paragraph) => (
                    <p key={paragraph} className='whitespace-pre-line'>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
