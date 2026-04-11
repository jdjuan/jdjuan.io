import Head from "next/head";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-gift-display",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-gift-body",
  weight: ["400", "500", "600", "700", "800"],
});

export default function GiftPage() {
  return (
    <>
      <Head>
        <title>Gift Guide | Juan Herrera</title>
        <meta
          name='description'
          content='A simple, direct guide to what Juan would actually appreciate as a gift.'
        />
      </Head>

      <main
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-[#f6efe6] px-6 py-12 text-[#1f1a16] sm:px-8 sm:py-16`}
        style={{
          fontFamily: "var(--font-gift-body)",
          backgroundImage:
            "radial-gradient(circle at top, rgba(255,255,255,0.72), transparent 32%), linear-gradient(135deg, rgba(255,247,239,0.95), rgba(243,234,223,0.95))",
        }}
      >
        <div className='mx-auto max-w-2xl'>
          <h1
            className='text-5xl leading-none text-[#2a221d] sm:text-6xl'
            style={{ fontFamily: "var(--font-gift-display)" }}
          >
            Gift guide
          </h1>

          <p className='mt-6 text-base leading-7 text-[#4e4338] sm:text-lg'>
            Most of the time I do not need anything. If I need something, I usually buy it myself.
          </p>

          <section className='mt-10 rounded-[2rem] border border-[#d8c7b2] bg-white/60 p-6 shadow-[0_18px_50px_rgba(26,20,15,0.06)]'>
            <h2
              className='text-3xl leading-none text-[#2a221d]'
              style={{ fontFamily: "var(--font-gift-display)" }}
            >
              Good ideas
            </h2>
            <ul className='mt-5 space-y-3 text-sm leading-6 text-[#4e4338] sm:text-[15px]'>
              <li>Savory food. Bread, Chinese rice, burgers. Not sweets.</li>
              <li>A personal letter.</li>
              <li>Fun temporary experiences. Escape rooms, VR escape rooms, paintball, singing classes, playful things I have not tried.</li>
              <li>A video game voucher.</li>
            </ul>
          </section>

          <section className='mt-6 rounded-[2rem] border border-[#d8c7b2] bg-white/50 p-6 shadow-[0_18px_50px_rgba(26,20,15,0.05)]'>
            <h2
              className='text-3xl leading-none text-[#2a221d]'
              style={{ fontFamily: "var(--font-gift-display)" }}
            >
              Bad ideas
            </h2>
            <ul className='mt-5 space-y-3 text-sm leading-6 text-[#4e4338] sm:text-[15px]'>
              <li>Random practical objects or generic Amazon gifts.</li>
              <li>Clothes, decoration, bags, wallets.</li>
              <li>Boring or skill-heavy workshops like clay, coffee, or photography.</li>
            </ul>
          </section>

          <p className='mt-8 text-sm leading-7 text-[#4e4338] sm:text-[15px]'>
            If you are unsure, food, a letter, or nothing is better than clutter.
          </p>
        </div>
      </main>
    </>
  );
}
