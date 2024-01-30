import React from "react";
import Head from "next/head";
import Image from "next/image";

//Change body color for this specific page
<style>
    {`body{background-color: #0a1870;}`}
</style>

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  
  return (
    <>
      <Head>
        <title>Nocturn - Gray Wielebinski</title>
      </Head>

      <CenterContainer>
          <h1 className="nocturn-header">
            NOCTURN <br />
            <span>
              an AFFECT: a MOOD: a STATE OF CONTACT
            </span>
          </h1>
        <h2>
        Nocturn [01] feat. Gray Wielebinski
        </h2>
        <h3>ONE MORE HOUR OF THE MILLENIUM [2024]</h3>
        {menuImage && (
          <Image
            src={"/images/gary-wielebinski.jpg"} 
            alt={menuImage.title}
            className={"image"}
            width={menuImage.width} //automatically provided
            height={menuImage.height} //automatically provided
            blurDataURL={"/images/gary-wielebinski.jpg"} //automatically provided
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
