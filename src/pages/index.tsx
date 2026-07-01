import { useEffect } from "react";
import Head from "@docusaurus/Head";

const TARGET = "https://website.najjarammar.workers.dev";

export default function Home() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
    </Head>
  );
}
