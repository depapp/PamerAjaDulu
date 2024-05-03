import "@/styles/globals.css";
import firebase, { FirebaseContext } from "../firebase/index";
import useAuth from "../hooks/useAuth";
import Head from "next/head";
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const user = useAuth();

  return (
    <>
      <Head>
        <link href="/favicon.ico" type="image/png" />
      </Head>
      <Script src={`https://eu.umami.is/script.js`} data-website-id={process.env.UMAMI_WEBSITE_ID}/>
      <FirebaseContext.Provider
        value={{
          firebase,
          user,
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  );
}
