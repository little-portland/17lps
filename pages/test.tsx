import Head from "next/head";
import dynamic from "next/dynamic";

const TestPageClient = dynamic(() => import("./TestPageClient"), {
  ssr: false,
});

export default function TestPage() {
  return (
    <>
      <Head>
        <style>{`
          html,
          body {
            background: #f3f3f3 !important;
            background-color: #f3f3f3 !important;
          }

          #__next {
            background: #f3f3f3 !important;
            background-color: #f3f3f3 !important;
          }
        `}</style>
      </Head>

      <TestPageClient />
    </>
  );
}