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
        <style>
            {'body{background-color: #0a1870!important;}'}
        </style>
        <title>Nocturn - Gray Wielebinski</title>
      </Head>
      
      <CenterContainer>
          <Image
            src={"/images/nocturn-01.jpg"} 
            alt={menuImage.title}
            className={"image"}
            width={menuImage.width} //automatically provided
            height={menuImage.height} //automatically provided
            blurDataURL={"/images/nocturn-01.jpg"} //automatically provided
            placeholder="blur" // Optional blur-up while loading
          />
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
