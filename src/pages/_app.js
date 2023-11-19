import "../styles/custom-styles.css";
import "../styles/dracula.css";
import "../styles/prose-styles.css";

import * as React from "react";
import { Nav } from "../components/Nav";
import Chatbot from "../components/Chatbot";
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Chatbot />

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QP9R4B7G1K"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QP9R4B7G1K');
        `}
      </Script>
    </>
  );
}

