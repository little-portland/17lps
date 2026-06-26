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
    "@type": ["NightClub", "EventVenue", "Restaurant"],
    name: "Little Portland",
    alternateName: [
      "17 Little Portland Street",
      "The Tent at the End of the Universe",
    ],
    url: "https://www.little-portland.com/",
    logo: "https://www.little-portland.com/favicon.ico",
    image: "https://www.little-portland.com/og-image.jpg",
    description:
      "Little Portland is a multi-concept venue at 17 Little Portland Street, London, featuring immersive dining, private events and late-night club experiences.",
    telephone: "+442038487430",
    address: {
      "@type": "PostalAddress",
      streetAddress: "17 Little Portland Street",
      addressLocality: "London",
      postalCode: "W1W 8BP",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5176,
      longitude: -0.1406,
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=17+Little+Portland+Street+London+W1W+8BP",
    sameAs: ["https://www.instagram.com/thetentattheendoftheuniverse/"],
    servesCuisine: "Contemporary",
    priceRange: "$$$",
  };

  return (
    <>
      <Head>
        <title>17 Little Portland Street, London</title>

        <meta
          name="description"
          content="Little Portland is a multi-concept venue at 17 Little Portland Street, London. Discover immersive dining, private events and late-night club experiences."
        />

        <meta
          name="keywords"
          content="Little Portland, 17 Little Portland Street, London, private events, immersive dining, club, The Tent at the End of the Universe"
        />

        <link rel="canonical" href="https://www.little-portland.com/" />

        <meta
          property="og:title"
          content="17 Little Portland Street, London"
        />
        <meta
          property="og:description"
          content="A multi-concept venue at 17 Little Portland Street, London. Immersive dining, private events and late-night club experiences."
        />
        <meta property="og:url" content="https://www.little-portland.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.little-portland.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="17 Little Portland Street, London"
        />
        <meta
          name="twitter:description"
          content="A multi-concept venue at 17 Little Portland Street, London. Immersive dining, private events and late-night club experiences."
        />
        <meta
          name="twitter:image"
          content="https://www.little-portland.com/og-image.jpg"
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
            <h1
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              17 Little Portland Street, London
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
