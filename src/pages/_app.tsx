import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <h1>Global head</h1>
    <Component {...pageProps} />
    </>;
}
