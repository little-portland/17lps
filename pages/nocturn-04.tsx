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
            {'html{overflow: auto!important;}'}
            {'body{background-color: #012ccf!important;overflow: auto!important;overflow-x: initial!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 35px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper img{ max-width: 25%;margin-bottom: 30px!important;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #0068ff!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top: 30px;width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>
        <title>Nocturn - Evan Ifekoya</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn2-web-page-top.png" alt="Nocturn" width="100%" />

           <div className="nocturn-text-wrapper top"> 
              <p className="nocturn-text">crave rave creatures of the deep this is our home slip slip 
slip into another skin within down under daddy ten 
thousand leagues below the surface descend into the 
hadal zone where life has come undone every breath 
sacred in this watery grave sing your death song and be 
born again shadow dancing the night sea journey turn the 
key touch tentacles far reaching seething teething a rip in 
the space time continuum the boundaries sizzle and melt 
felt another portal crack open the walls they will not hold 
this is a story not yet told
</p>
<p className="nocturn-text second">fold into my luscious skin swim meet the desires 
dormant within we creatures emerge red hot geyser slip 
slip slip leave your inhibitions on land we demand plunge 
soak me up like a sponge and survive dive no need to hide 
carve open your insides out shout time and space bend 
there is no end light travels not in the farthest trench of the 
den slip slip slip into the mud slip slip slip slip slip slip in
within
</p>
<p> 
  <img src="/images/nocturn/17LPS_Nocturne2_Whole_email_bianca-quote.png" />
  </p>
            </div>

           <div className="row">
              <div className="column">
                <img src="/images/nocturn/nocturn02_21.png" />
                <img src="/images/nocturn/nocturn02_01.png" />
                <img src="/images/nocturn/nocturn02_02.png" />
                <img src="/images/nocturn/nocturn02_03.png" />
                <img src="/images/nocturn/nocturn02_04.png" />
                <img src="/images/nocturn/nocturn02_05.png" />
                <img src="/images/nocturn/nocturn02_13.png" />
                <img src="/images/nocturn/nocturn02_06.png" />
                <img src="/images/nocturn/nocturn02_07.png" />
                <img src="/images/nocturn/nocturn02_08.png" />
                <a href="https://www.youtube.com/watch?v=BWKKJwBXir4" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_01.png" />
                </a>
                <img src="/images/nocturn/nocturn02_09.png" />
                <img src="/images/nocturn/nocturn02_41.png" />
                <img src="/images/nocturn/nocturn02_42.png" />
                <img src="/images/nocturn/nocturn02_10.png" />
                <img src="/images/nocturn/nocturn02_14.png" />
                <img src="/images/nocturn/nocturn02_11.png" />
                <a href="https://www.youtube.com/watch?v=KtFFmDGIsa4" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_04.png" />
                </a>
                <img src="/images/nocturn/nocturn02_12.gif" />
                <img src="/images/nocturn/nocturn02_15.png" />
                <img src="/images/nocturn/nocturn02_18.png" />
                <img src="/images/nocturn/nocturn02_19.png" />
                <img src="/images/nocturn/nocturn02_20.png" />
                <img src="/images/nocturn/nocturn02_43.png" />
                <img src="/images/nocturn/nocturn02_44.png" />
                <img src="/images/nocturn/nocturn02_45.png" />
                <a href="https://www.smithsonianmag.com/science-nature/creatures-of-the-deep-163679120/" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_03.png" />
                </a>
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn02_23.png" />
                <a href="https://medium.com/@rachellee9087/the-titan-submarine-disaster-what-really-happened-c40a1acde9aa" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_05.png" />
                </a>
                <img src="/images/nocturn/nocturn02_16.png" />
                <img src="/images/nocturn/nocturn02_24.png" />
                <img src="/images/nocturn/nocturn02_25.png" />
                <a href="https://www.youtube.com/watch?v=8oL6u9eujSU" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_06.png" />
                </a>
                <img src="/images/nocturn/nocturn02_26.png" />
                <img src="/images/nocturn/nocturn02_27.png" />
                <img src="/images/nocturn/nocturn02_17.png" />
                <img src="/images/nocturn/nocturn02_28.png" />
                <img src="/images/nocturn/nocturn02_29.png" />
                <a href="https://www.youtube.com/watch?v=fDwHwWuUuk4" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_07.png" />
                </a>
                 <img src="/images/nocturn/nocturn02_22.png" />
                <img src="/images/nocturn/nocturn02_30.png" />
                <img src="/images/nocturn/nocturn02_46.png" />
                <img src="/images/nocturn/nocturn02_31.png" />
                <a href="https://www.e-flux.com/journal/75/67125/tentacular-thinking-anthropocene-capitalocene-chthulucene/" target="_blank">
                  <img src="/images/nocturn/nocturn02_video_02.png" />
                </a>
                <img src="/images/nocturn/nocturn02_32.png" />
                <img src="/images/nocturn/nocturn02_33.png" />
                <audio controls src="/images/nocturn/nocturn02_34.mp3"></audio>
                <img src="/images/nocturn/nocturn02_36.png" />
                <img src="/images/nocturn/nocturn02_37.png" />
                <img src="/images/nocturn/nocturn02_38.png" />
                <img src="/images/nocturn/nocturn02_39.png" />
                <img src="/images/nocturn/nocturn02_40.png" />
                <img src="/images/nocturn/nocturn02_47.png" />
                <img src="/images/nocturn/nocturn02_48.png" />
              </div>
           </div>
           
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text">Zoë Marden is an artist, filmmaker, and writer living between her home town of Hong Kong and London. She graduated from the Royal College of Art’s Moving Image MA, Marden works with performance, video, text, sound, sculpture and installation to create alternate worlds and speculative futures. Her research-focused works are concerned with Post-human feminisms and where they overlap with the postcolonial. Her intimate performances play with the voice, activating soundscapes of desire and vulnerability. She is part of the CAMPerVAN collective, active since 2016, a nomadic queer performance platform that can be deployed anywhere in the world to bring performance art, film screening, panel discussion & workshop into the public realm.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/zoemarden/" target="_blank">@zoemarden</a></p>
              <p><a className="nocturn-text" href="https://www.zoemarden.com/" target="_blank">www.zoemarden.com</a></p>
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
