import Head from 'next/head';
import Bookmarks  from '../components/Bookmarks'

export default function bookmarks() {
  return (
    <>
      <Head>
        <title>Bookmarks • Manav Arora</title>
        <meta property="og:title" content="Bookmarks • Manav Arora" key="title" />
      </Head>
      
      <Bookmarks />
    </>
  )
}
