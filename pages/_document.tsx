import { Html, Head, Main, NextScript } from "next/document";
import cx from "classnames";
import { isDev } from "../utils/stage";

export default function Document() {
  return (
    <Html lang='en'>
      <Head></Head>
      <body className={cx("bg-slate-800", { "debug-screens": isDev })}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
