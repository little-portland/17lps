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
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 25%;max-width: 25%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'@media (max-width: 768px) { .nocturn{width: 90%;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>
        <title>Nocturn - Zoë Marden</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn-web-page.png" alt="Nocturn" width="100%" height="100%" />

           <div className="row">
              <div className="column">
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
              </div>
              <div className="column">
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
              </div>
              <div className="column">
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
              </div>
              <div className="column">
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
                <img src="/images/17LPS_sample_menu.jpg" />
              </div>
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
