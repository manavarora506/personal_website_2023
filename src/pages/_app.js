// import "../styles/custom-styles.css";
// import "../styles/dracula.css";
// import "../styles/prose-styles.css";

// import * as React from "react";
// import { Nav } from "../components/Nav";
// import Chatbot from "../components/Chatbot";

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Nav />
//       <Component {...pageProps} />
//       <Chatbot />
//     </>
//   );
// }

import "../styles/custom-styles.css";
import "../styles/dracula.css";
import "../styles/prose-styles.css";

import * as React from "react";
import { Nav } from "../components/Nav";
import Chatbot from "../components/Chatbot";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="site-wrapper" style={{ overflowX: 'hidden', position: 'relative' }}>
        <Nav />
        <Component {...pageProps} />
      </div>
      <Chatbot />
    </>
  );
}
