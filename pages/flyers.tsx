import React from "react";
import Head from "next/head";

//hooks
import useFetchContent from "@utils/useFetchContent";

import twentyn9ne from "../public/images/April_29th.jpg";
import thirty from "../public/images/April_30th.jpg";

//Components
import FlyerGrid from "@components/FlyerGrid/index";

const flyerTests = [
  { url: twentyn9ne, date: "29.04.22", day: "Friday" },
  { url: thirty, date: "30.04.22", day: "Saturday" },
];

const Flyers = ({ newestFlyers }) => {
  return (
    <>
      <Head>
        <title>Flyers</title>
      </Head>
      <FlyerGrid flyers={newestFlyers} />
    </>
  );
};

export default Flyers;

export async function getStaticProps() {
  const flyerData = await useFetchContent(`
    {
      flyerCollection(order: date_ASC) {
        items {
          date
          image {
            title
            description
            url
            width
            height
          }
          onWebsite
        }
      }
    }
  `);

  const newestFlyers = flyerData.flyerCollection.items;

  return {
    props: {
      newestFlyers,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
