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
            {'html{overflow: auto!important;overflow-x: hidden!important;}'}
            {'body{background-color: #abd1e3!important;overflow: auto!important;overflow-x: initial!important;}'}
            {'.nocturn{width: 60%;margin: 0 auto;}'}
            {'.nocturn-wider-section{width: 60%;margin: 0 auto;}'}
            {'.video-section{width: 80%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.single .row{ justify-content: center; align-items: center;}'}
            {'.single .column{flex: 80%;max-width: 80%;padding: 0 4px;}'}
            {'.video-section .column{flex: 33%;max-width: 33%;padding: 0 4px;}'}
            {'video{ width: 100%!important; max-width: 100%;!important}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 30px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'.caption{ font-size: 20px!important;margin: 20px auto 30px auto!important;text-align: center!important;max-width: 90%!important;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 20px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper small{ margin-left: 10px;font-size: 20px;}'}
            {'.nocturn-text-wrapper img{ max-width: 100%;margin-bottom: 40px!important;display: block;margin-left: auto;margin-right: auto;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #121be3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'.nocturn-text-two{ padding-top: 20px;}'}
            {'.nocturn-text-author{ padding-top: 20px;}'}
            {'.question{ color: #000000!important;font-style:italic;}'}
            {'.italic{ font-style:italic!important;}'}
            {'.loading{ font-size: 50px;text-align: center;}'}
            {'.flyer{ max-width: 100%!important;}'}
            {'.preloader{ margin:30px 0 10px 0!important;}'}
            {'.spacing{ margin-top:30px!important;}'}
            {'.live{ border-top: 5px solid #000;padding-top: 20px;border-bottom: 5px solid #000;margin-bottom: 40px;text-align: center;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.video-section .column{flex: 90%;max-width: 90%;padding: 0 4px;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
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
               <br/> 
            </div>
           </div>

                <div className="nocturn-wider-section">
                   <div className="row">
                    <div className="column">
                       <img src="/images/nocturn/nocturn-04/nocturn04_26.png" />
                    </div>
                    <div className="column">
                       <img src="/images/nocturn/nocturn-04/nocturn04_27.png" />
                    </div>
                 </div>
                </div>

              <div className="nocturn">
               <div className="nocturn-text-wrapper top"> 
                     <p className="nocturn-text italic caption">'MODUPE' film shoot BTS Photography by Puer Deorum </p>
                </div>
               </div>

               <div className="nocturn-wider-section single">
                   <div className="row">
                    <div className="column">
                       <img src="/images/nocturn/nocturn-04/nocturn04_28.png" />
                    </div>
                 </div>
                </div>

              <div className="nocturn">
               <div className="nocturn-text-wrapper top"> 
                    <p className="nocturn-text italic caption">Evan Ifekoya, ‘~ Resonant Frequencies’, 2022, exhibition view, Migros Museum, Zurich; Courtesy: the artist; Photograph: Stefan Altenburger </p>
                </div>
               </div>

                <div className="nocturn-wider-section video-section">
                 <div className="row">
                    <div className="column">
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-04/stillness.mp4" type="video/mp4"/> 
                      </video>                    
                      </div>
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-04/drum.mp4" type="video/mp4"/>
                      </video>                    
                      </div>
                      <div className="column">
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-04/pour.mp4" type="video/mp4"/>
                      </video>                    
                      </div>
                   </div>
                  <br/> 
                </div>

              <div className="nocturn-wider-section single">
                   <div className="row">
                    <div className="column">
                      <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio03.mp3"></audio>
                    </div>
                 </div>
                </div>

              <div className="nocturn">
               <div className="nocturn-text-wrapper top"> 
                    <p className="nocturn-text italic caption">Evan Ifekoya, Divine Calabash Invocation, Site-Specific Sonic for Little Portland Street</p>
                </div>
               </div>
      
            <div className="nocturn">
                <div className="row">
                  <div className="column">
                    <img src="/images/nocturn/nocturn-04/nocturn04_01.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_02.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_03.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_04.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_05.png" />
                    <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio01.mp3"></audio>
                    <img src="/images/nocturn/nocturn-04/nocturn04_06.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_07.png" />
                    <a href="https://vimeo.com/1075724730/72ff34a944?share=copy" target="_blank">
                        <img src="/images/nocturn/nocturn-04/nocturn04_video_01.png" />
                    </a>
                    <img src="/images/nocturn/nocturn-04/nocturn04_08.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_09.png" />
                    <a href="https://vimeo.com/1075726393/1d8bd9d43a?share=copy" target="_blank">
                        <img src="/images/nocturn/nocturn-04/nocturn04_video_02.png" />
                    </a>
                    <img src="/images/nocturn/nocturn-04/nocturn04_17.png" />
                  </div>
                  <div className="column">
                    <img src="/images/nocturn/nocturn-04/nocturn04_11.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_12.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_13.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_14.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_15.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_16.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_10.png" />
                    <a href="https://vimeo.com/1075730885/a55afb5ca2?share=copy" target="_blank">
                        <img src="/images/nocturn/nocturn-04/nocturn04_video_03.png" />
                    </a>
                    <img src="/images/nocturn/nocturn-04/nocturn04_18.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_19.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_20.png" />
                    <img src="/images/nocturn/nocturn-04/nocturn04_23.png" />
                  </div>
               </div>
              <br/> 
              </div>
      
                 <div className="nocturn-wider-section">
                   <div className="row">
                    <div className="column">
                      <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio02.mp3"></audio>
                      <p className="nocturn-text italic caption">Evan Ifekoya, Omi O, Site-Specific Sonic for the Tent at Little Portland Street</p>
                    </div>
                    <div className="column">
                      <audio controls src="/images/nocturn/nocturn-04/nocturn04_audio04.mp3"></audio>
                      <p className="nocturn-text italic caption">Alcyoni (Bianca Chu), The Veil/Jaya Yemoja Invocation, Site-Specific Sonic for the Tent at Little Portland Street </p>
                    </div>
                 </div>
                </div>
              
           <div className="nocturn">
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text">Evan Ifekoya is a Spirit led artist and dream architect exploring ancestry, belief and belonging through practices of self-archiving and blackness in abundance. Through their art, they hope to foster a deeper sense of connection and awareness, creating spaces where liberation and refuge are not just ideals but lived experiences. They have presented exhibitions, moving image and performances across UK, Europe and Internationally, most recently: ‘Stranieri Ovunque –Foreigners Everywhere’ 60th Venice Biennial, ‘The Ocean in the Forest’ Wanås Konst Sculpture Park Sweden, ‘Traces of Ecstasy’ ICA VCU Richmond Virginia and Lagos Biennial (2024), ARoS Denmark and Guest Artist Space Lagos (2023), ‘~Resonant Frequencies’, Migros Museum, Zurich (2022). Upcoming exhibitions and presentations in 2025 include ‘Feel The Sound’ at Barbican and ‘MODUPE’, a new experimental documentary film supported by BFI Docs Society. They established the collectively run and QTIBPOC (queer, trans*, intersex, black and people of colour) led Black Obsidian Sound System (B.O.S.S.) in 2018. They were awarded the Paul Hamlyn bursary in 2021, the Kleinwort Hambros Emerging Artists Prize in 2019 and the Arts Foundation Award for Live Art sponsored by the Yoma Sasberg Estate in 2017.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/evan_ife/" target="_blank">@evan_ife</a></p>
              <p><a className="nocturn-text" href="https://evanifekoya.substack.com/" target="_blank">www.evanifekoya.com</a></p>
              <br/> 
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
