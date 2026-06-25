import dynamic from "next/dynamic";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import { useLoaded } from "../store/context";

// Components
import Layout from "@components/Layout";

// Hooks
import useFetchContent from "@utils/useFetchContent";

const Animation = dynamic(() => import("@components/Animation"), {
  ssr: false,
});

export default function Index({ eatItem, hireItem }) {
  const { isLoaded, setLoaded } = useLoaded();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: "Little Portland",
    alternateName: "17 Little Portland Street",
    url: "https://www.little-portland.com/",
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Little Portland Street",
      addressLocality: "London",
      postalCode: "W1W 8BP",
      addressCountry: "GB",
    },
    description:
      "Little Portland is a multi-concept venue at 17 Little Portland Street, Soho, London, featuring immersive dining, private events and late-night club experiences.",
    sameAs: ["https://www.instagram.com/thetentattheendoftheuniverse/"],
  };

  return (
    <>
      <Head>
        <title>Little Portland | 17 Little Portland Street | Soho London</title>

        <meta
          name="description"
          content="Little Portland is a multi-concept venue at 17 Little Portland Street, Soho, London. Discover immersive dining, private events and late-night club experiences."
        />

        <meta
          name="keywords"
          content="Little Portland, 17 Little Portland Street, Soho, London, private events, immersive dining, club, The Tent at the End of the Universe"
        />

        <link rel="canonical" href="https://www.little-portland.com/" />

        <meta property="og:title" content="Little Portland | 17 Little Portland Street" />
        <meta
          property="og:description"
          content="A multi-concept venue at 17 Little Portland Street, Soho, London. Immersive dining, private events and late-night club experiences."
        />
        <meta property="og:url" content="https://www.little-portland.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Little Portland | 17 Little Portland Street"
        />
        <meta
          name="twitter:description"
          content="A multi-concept venue at 17 Little Portland Street, Soho, London. Immersive dining, private events and late-night club experiences."
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <Layout
        main={
          <>
            <h1 className="sr-only">
              Little Portland - 17 Little Portland Street, Soho, London
            </h1>

            <AnimatePresence exitBeforeEnter>
              <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
            </AnimatePresence>
          </>
        }
        eatItem={eatItem}
        hireItem={hireItem}
      />
    </>
  );
}

export async function getStaticProps() {
  const imageData = await useFetchContent(`
    {
      eatImageCollection {
        items {
          title
          image {
            title
            description
            url
            width
            height
          }
          eMail
          phoneNumber
        }
      }

      hireImageCollection {
        items {
          title
          image {
            title
            description
            url
            width
            height
          }
          eMail
          phoneNumber
        }
      }
    }
  `);

  const eatItem = imageData.eatImageCollection.items[0];
  const hireItem = imageData.hireImageCollection.items[0];

  return {
    props: {
      eatItem,
      hireItem,
    },
    revalidate: 30,
  };
}
