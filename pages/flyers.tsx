import React from "react";
import Head from "next/head";

//hooks
import useFetchContent from "@utils/useFetchContent";

//Components
import FlyerGrid from "@components/FlyerGrid/index"; 

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
