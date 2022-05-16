import React from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const SundayMenu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <title>Sunday Menu</title>
      </Head>

      <CenterContainer>
        {menuImage && (
          <Image
            src={menuImage.url}
            alt={menuImage.title}
            className={"image"}
            width={menuImage.width} //automatically provided
            height={menuImage.height} //automatically provided
            blurDataURL={"/images/Eat.jpeg"} //automatically provided
            placeholder="blur" // Optional blur-up while loading
          />
        )}
      </CenterContainer>
    </>
  );
};
export default SundayMenu;

export async function getStaticProps() {
  const sundaymenuData = await useFetchContent(`
    {
      sundayMenuCollection {
        items {
          sundayMenuImage {
            title
            description
            url
            width
            height
          }
        }
      }
    }
  `);

  const menuImage =
    sundaymenuData.sundayMenuCollection.items[0].sundayMenuImage;

  return {
    props: {
      menuImage,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
