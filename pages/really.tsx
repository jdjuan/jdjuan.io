import Head from "next/head";
import { Newsreader } from "next/font/google";

const letterFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-really-letter",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const letterDate = "April 11, 2026";

const letterLines = [
  "Do you really want to do this?",
  "Are you sure Juan?",
  "You ended up here because a version of you is not happy about this",
  "But I get it, right now there's a part of you who want this",
  "Is it really what it wants?",
  "Remember the spotlight analogy? How it seems like something is all there is because our spotlight is pointing at at specific place and it seems like there's nothing else in the room?",
  "Maybe there's something else you are not addressing.",
  "Are you ok Juan?",
  "Is life in order right now?",
  "It is not, isn't it?",
  "Take a break",
  "Really. Do it.",
  "Pause.",
  "Go out, grab Dominos, do a workout, do a bike ride without apparent direction, or go for a really really fast fast run.",
  "A part of you is not happy but you don't need to do this.",
  "Really.",
  "You think I don't know better. And I probably don't.",
  "I'm probably naive of what you are going through right now.",
  "I have no idea how how much you need this.",
  "But I know one thing.",
  "Right now you're probably also not thinking straight.",
  "And you know that in order to think straight you need a break.",
  "Give yourself a break and see what happens after.",
  "You DO have control over what you want.",
  "More control than what your wants want you to believe.",
  "Try it.",
  "Show the world.",
  "Show everyone.",
  "Show yourself who you are.",
] as const;

const highlightedLines = new Set([
  "You ended up here because a version of you is not happy about this",
  "Maybe there's something else you are not addressing.",
  "It is not, isn't it?",
  "Go out, grab Dominos, do a workout, do a bike ride without apparent direction, or go for a really really fast fast run.",
  "Right now you're probably also not thinking straight.",
  "And you know that in order to think straight you need a break.",
  "More control than what your wants want you to believe.",
]);

export default function ReallyPage() {
  return (
    <>
      <Head>
        <title>Really | Juan Herrera</title>
        <meta name='description' content='A minimal letter that asks you to slow down for a second and take a break.' />
      </Head>

      <main
        className={`${letterFont.variable} min-h-screen px-5 py-8 text-[#221c18] sm:px-8 sm:py-12`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(33, 17, 8, 0.1), rgba(33, 17, 8, 0.34)), radial-gradient(circle at center, rgba(240, 187, 117, 0.12), transparent 44%), url('/really-wood.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontFamily: "var(--font-really-letter)",
        }}
      >
        <div className='mx-auto flex min-h-screen max-w-6xl items-center justify-center'>
          <div className='relative w-full max-w-[760px]'>
            <article
              className='relative rotate-[-0.2deg] overflow-hidden border border-[#d6c5b3] bg-[#fbf5eb] px-7 py-8 shadow-[0_30px_80px_rgba(24,12,4,0.28)] sm:px-14 sm:py-14'
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 18%, rgba(120,92,66,0.08) 0, rgba(120,92,66,0.08) 1px, transparent 1.4px), radial-gradient(circle at 78% 30%, rgba(120,92,66,0.06) 0, rgba(120,92,66,0.06) 1px, transparent 1.4px), radial-gradient(circle at 32% 72%, rgba(120,92,66,0.06) 0, rgba(120,92,66,0.06) 1px, transparent 1.5px), linear-gradient(180deg, rgba(255,255,255,0.8), rgba(244,236,224,0.98))",
                backgroundSize: "140px 140px, 180px 180px, 160px 160px, 100% 100%",
              }}
            >
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.56),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(143,108,75,0.08),transparent_26%)] opacity-80' />

              <div className='relative'>
                <div className='pb-5'>
                  <p className='text-[1.05rem] leading-none text-[#7a6250] italic sm:text-[1.14rem]'>{letterDate}</p>
                </div>

                <div className='mt-3'>
                  {letterLines.map((line) => {
                    const isHighlighted = highlightedLines.has(line);

                    return (
                      <p
                        className={`mb-3 text-[1.1rem] leading-[1.42] text-[#37281f] sm:text-[1.26rem] sm:leading-[1.38] ${
                          isHighlighted ? "font-semibold text-[#2a1d15]" : ""
                        }`}
                        key={line}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
