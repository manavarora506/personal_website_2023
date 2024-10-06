import Head from "next/head";
import { Home } from "../components/Home";

export default function home() {
  return (
    <>
      <Home />
      <Head>
        <title>Manav Arora</title>
        <meta property="og:title" content="Manav Arora" key="title" />
        <link rel="icon" href="/static/img/favicon.ico" />
      </Head>
    </>
  );
}
