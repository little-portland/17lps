import React from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>

      <CenterContainer>
        {menuImage && (
          <Image
            src={"/images/sample-menu-new.png"}
            alt={menuImage.title}
            className={"image"}
            width={1500}  
            height={1012}
            style={{ width: "100%", height: "auto" }}
            blurDataURL={"/images/sample-menu-new.png"} //automatically provided
            placeholder="blur" // Optional blur-up while loading
          />

        )}
      </CenterContainer>
    </>
  );
};

export default Menu;

export async function getStaticProps() {
  const menuData = await useFetchContent(`
    {
        menuCollection{
            items {
              menuImage {
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

  const menuImage = menuData.menuCollection.items[0].menuImage;

  return {
    props: {
      menuImage,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
