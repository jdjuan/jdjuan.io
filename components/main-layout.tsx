import { Inter } from "@next/font/google";
import { ReactNode } from "react";
import Head from "next/head";
import Footer from "./footer";
const inter = Inter({ subsets: ["latin"] });
type Props = { children?: ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Juan Herrera</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${inter.className} p-6 text-sm text-slate-50 sm:p-12 md:p-16 lg:mx-auto xl:max-w-7xl`}>
        {children}
        <Footer></Footer>
      </main>
    </>
  );
}
