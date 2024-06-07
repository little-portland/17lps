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
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'@media (max-width: 768px) { .nocturn{width: 90%;}}'}
        </style>
        <title>Nocturn - Gray Wielebinski</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn-web-page.png" alt="Nocturn" width="100%" height="100%" />
         </div>

      <div className="row">
          <div className="column">
            <img src="/images/nocturn-web-page.png" />
            <img src="/images/nocturn-web-page.png" />
            <img src="/images/nocturn-web-page.png" />
          </div>
       </div>
      
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
