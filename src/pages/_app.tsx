import GlobalProviders from "@/components/globalProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProviders>
      <div className="bg-white dark:bg-gray-900 h-screen">
        <Component {...pageProps} />
      </div>
    </GlobalProviders>
  );
}
