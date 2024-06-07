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
           <img src="/images/nocturn2-web-page-top.png" alt="Nocturn" width="100%" height="100%" />

           <div className="row">
              <div className="column">
                <img src="/images/nocturn/nocturn02_01.png" />
                <img src="/images/nocturn/nocturn02_02.png" />
                <img src="/images/nocturn/nocturn02_03.png" />
                <img src="/images/nocturn/nocturn02_04.png" />
                <img src="/images/nocturn/nocturn02_05.png" />
                <img src="/images/nocturn/nocturn02_13.png" />
                <img src="/images/nocturn/nocturn02_06.png" />
                <img src="/images/nocturn/nocturn02_07.png" />
                <img src="/images/nocturn/nocturn02_08.png" />
                <img src="/images/nocturn/nocturn02_09.png" />
                <img src="/images/nocturn/nocturn02_41.png" />
                <img src="/images/nocturn/nocturn02_42.png" />
                <a href="https://www.youtube.com/watch?v=BWKKJwBXir4" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_01.png" />
                </a>
                <a href="https://www.e-flux.com/journal/75/67125/tentacular-thinking-anthropocene-capitalocene-chthulucene/" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_02.png" />
                </a>
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn02_10.png" />
                <img src="/images/nocturn/nocturn02_14.png" />
                <img src="/images/nocturn/nocturn02_11.png" />
                <img src="/images/nocturn/nocturn02_12.gif" />
                <img src="/images/nocturn/nocturn02_15.png" />
                <img src="/images/nocturn/nocturn02_18.png" />
                <img src="/images/nocturn/nocturn02_19.png" />
                <img src="/images/nocturn/nocturn02_20.png" />
                <img src="/images/nocturn/nocturn02_21.png" />
                <img src="/images/nocturn/nocturn02_22.png" />
                <img src="/images/nocturn/nocturn02_43.png" />
                <img src="/images/nocturn/nocturn02_44.png" />
                <img src="/images/nocturn/nocturn02_video_03.png" />
                <img src="/images/nocturn/nocturn02_video_04.png" />
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn02_23.png" />
                <img src="/images/nocturn/nocturn02_16.png" />
                <img src="/images/nocturn/nocturn02_24.png" />
                <img src="/images/nocturn/nocturn02_25.png" />
                <img src="/images/nocturn/nocturn02_26.png" />
                <img src="/images/nocturn/nocturn02_27.png" />
                <img src="/images/nocturn/nocturn02_17.png" />
                <img src="/images/nocturn/nocturn02_28.png" />
                <img src="/images/nocturn/nocturn02_29.png" />
                <img src="/images/nocturn/nocturn02_30.png" />
                <img src="/images/nocturn/nocturn02_45.png" />
                <img src="/images/nocturn/nocturn02_46.png" />
                <img src="/images/nocturn/nocturn02_video_05.png" />
                <img src="/images/nocturn/nocturn02_video_06.png" />
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn02_31.png" />
                <img src="/images/nocturn/nocturn02_32.png" />
                <img src="/images/nocturn/nocturn02_33.png" />
                <img src="/images/nocturn/nocturn02_34.mp3" />
                <audio controls src="/images/nocturn/nocturn02_34.mp3"></audio>
                <img src="/images/nocturn/nocturn02_36.png" />
                <img src="/images/nocturn/nocturn02_37.png" />
                <img src="/images/nocturn/nocturn02_38.png" />
                <img src="/images/nocturn/nocturn02_39.png" />
                <img src="/images/nocturn/nocturn02_40.png" />
                <img src="/images/nocturn/nocturn02_47.png" />
                <img src="/images/nocturn/nocturn02_48.png" />
                <img src="/images/nocturn/nocturn02_video_07.png" />
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
