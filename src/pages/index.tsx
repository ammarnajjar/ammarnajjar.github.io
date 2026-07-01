import { useEffect } from "react";
import Head from "@docusaurus/Head";

const TARGET = "https://ammar-najjar.com";

export default function Home() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      </Head>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: "1rem" }}>
        <p>Redirecting to <a href={TARGET}>{TARGET}</a>…</p>
        <a href={TARGET} style={{ padding: "0.75rem 1.5rem", background: "#003366", color: "#fff", borderRadius: "6px", textDecoration: "none", fontSize: "1rem" }}>
          Click here if not redirected
        </a>
      </div>
    </>
  );
}
