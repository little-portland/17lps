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
            {'body{background-color: #abd1e3!important;overflow: auto!important;overflow-x: initial!important;}'}
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.nocturn-wider-section{width: 80%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 35px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 20px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper small{ margin-left: 10px;font-size: 20px;}'}
            {'.nocturn-text-wrapper img{ max-width: 100%;margin-bottom: 40px!important;display: block;margin-left: auto;margin-right: auto;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #121be3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'.nocturn-text-two{ padding-top: 20px;}'}
            {'.nocturn-text-author{ padding-top: 20px;color:#9108c4!important;}'}
            {'.question{ color: #000000!important;font-style:italic;}'}
            {'.italic{ font-style:italic!important;}'}
            {'.loading{ font-size: 50px;text-align: center;}'}
            {'.flyer{ max-width: 100%!important;}'}
            {'.preloader{ margin:30px 0 10px 0!important;}'}
            {'.spacing{ margin-top:30px!important;}'}
            {'.live{ border-top: 5px solid #000;padding-top: 20px;border-bottom: 5px solid #000;margin-bottom: 40px;text-align: center;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>

        <title>NOCTURN [04]: The Sound is the Shrine - Evan Ifekoya</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn/nocturn4-web-page-top.png" alt="Nocturn" width="100%" />
           <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_04.jpg" /> 

           <div className="nocturn-text-wrapper top"> 
            <br/> 
              <p className="nocturn-text italic">In the beginning, there was the primordial ooze. Dark, dense and silent in its potentiality. Then, in a moment of spontaneous generation, the spark of awareness flickered and a sound reverberated out of the void.</p>

              <p className="nocturn-text italic">A rattle. A hiss. A U M… in the once impenetrable vacuum of silence.</p>

              <p className="nocturn-text italic">And out of the formless form, a Sentience called out into the Universe and it was heard by all and by no one.</p>

              <p className="nocturn-text italic">This sound, enshrined, echoing, rippling and vibrating across the tissue of space, set in motion an unfolding, the birthing and the ending of an Aeon.</p>

              <p className="nocturn-text italic">Billions of years later in the blink of an eye, a ray of light radiated outward and the sound was seen for the first time by its Source. The formless form undulated and expanded, dust, matter and its shadow shook and danced with one another upon the Altar of the Universe to a Cosmic Beat that resonated over all — and all resonated with it. </p>

              <p className="nocturn-text italic">As matter and energy swirled in vast oceans of nothingness, the Sentience, in forming itself out of the formlessness, what emerged was in dyadic harmony, and the Calabash of Creation contained all in their belly and the Music of the Spheres was the Universe. And as countless times before, the Universe was made and re-made again.</p>
              
              <p className="nocturn-text italic">“The Sound is the Shrine”</p>

              <p className="nocturn-text nocturn-text-author italic">Bianca Chu</p>
             
            </div>
                <div className="row">
                  <div className="column">
                    <img src="/images/nocturn/nocturn-04/nocturn04_01.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_02.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_03.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_04.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_05.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_06.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_07.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_08.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_09.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_10.png" />
                    <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio01.mp3"></audio>
                    <img src="/images/nocturn/nocturn-04/nocturn04_11.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_12.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_13.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_14.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_15.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_16.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_17.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_18.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_19.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_20.png" />
                    <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio02.mp3"></audio>
                  </div>
                  <div className="column">
                    <img src="/images/nocturn/nocturn-04/nocturn04_21.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_22.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_23.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_24.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_25.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_26.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_27.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_28.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_29.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_30.png" />
                    <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio03.mp3"></audio>
                    <img src="/images/nocturn/nocturn-04/nocturn04_31.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_32.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_33.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_34.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_35.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_36.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_37.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_38.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_39.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_40.png" />
                    <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio04.mp3"></audio>
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
