import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>life.</title>
        <link rel="icon" href="./binary-code.svg" />
      </Head>
      <main className="layout">{children}</main>
    </>
  );
}
