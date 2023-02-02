import { Roboto, Inter } from "@next/font/google";
import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Footer from "./footer";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500"], variable: "--font-roboto" });
type Props = { children?: ReactNode };
import { useDarkMode } from "usehooks-ts";

export default function MainLayout({ children }: Props) {
  const { isDarkMode, toggle } = useDarkMode();
  const [darkModeEmoji, setDarkModeEmoji] = useState<string>();
  useEffect(() => {
    if (isDarkMode) {
      setTimeout(() => {
        setDarkModeEmoji("🌝");
      }, 200);
      document.documentElement.classList.add("dark");
    } else {
      setTimeout(() => {
        setDarkModeEmoji("🌚");
      }, 200);
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <Head>
        <title>Juan Herrera</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={`${inter.variable} ${roboto.variable} ${inter.className} relative select-none text-sm text-neutral-800 dark:text-slate-50`}
      >
        <div className='p-6 sm:p-12 md:p-16 lg:mx-auto lg:max-w-6xl'>
          <button
            onClick={toggle}
            className='absolute top-4 right-4 rounded-full p-0.5 px-1 text-3xl shadow-sm dark:bg-slate-700 '
          >
            {darkModeEmoji}
          </button>
          {children}
          <Footer></Footer>
        </div>
      </main>
    </>
  );
}
