import Head from "next/head";
import { Projects } from "../components/Projects";

export default function projects() {
  return (
    <>
      <Projects />
      <Head>
        <title>Projects • Manav Arora</title>
        <meta
          property="og:title"
          content="Projects • Manav Arora"
          key="title"
        />
      </Head>
    </>
  );
}
