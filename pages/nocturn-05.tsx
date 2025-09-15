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
            {'body{background-color: #000000!important;overflow: auto!important;overflow-x: initial!important;background-image: url("/images/nocturn/nocturn-05/noise_bg.png");background-repeat: repeat;background-size: 50px 50px;}'}
            {'.nocturn{width: 60%;margin: 0 auto;}'}
            {'.nocturn-header{width: 50%;margin: 0 auto;}'}
            {'.nocturn-wider-section{width: 60%;margin: 0 auto;}'}
            {'.video-section{width: 80%;margin: 0 auto 30px auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.single .row{ justify-content: center; align-items: center;}'}
            {'.video-section .row{ justify-content: center; align-items: center;}'}
            {'.single .column{flex: 80%;max-width: 80%;padding: 0 4px;}'}
            {'.video-section .column{flex: 33%;max-width: 33%;padding: 0 4px;}'}
            {'.audio{ margin-top: 30px;}'}
            {'video{ width: 100%!important; max-width: 100%;!important}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 30px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'a:hover{ text-decoration: underline!important;}'}
            {'.caption{ font-size: 20px!important;margin: 20px auto 30px auto!important;text-align: center!important;max-width: 90%!important;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 20px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper small{ margin-left: 10px;font-size: 20px;}'}
            {'.nocturn-text-wrapper img{ max-width: 100%;margin-bottom: 40px!important;display: block;margin-left: auto;margin-right: auto;}'}
            {'.nocturn-text{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #ffffff!important;padding-bottom: 30px;line-height: 1.1;}'}
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
            {'@media (max-width: 768px) { .nocturn{margin-top:30px;width: 90%;}.spacing{ margin-top:15px!important;}.video-section .column{flex: 100%;max-width: 100%;padding: 0 4px;margin-bottom: 7px;}.caption{font-size: 15px!important;margin-top: 10px!important;}.audio .caption{margin-top: 30px!important;}.preloader{ margin:15px 0 -15px 0!important;}.nocturn-text-two{ padding-top: 10px;}.nocturn-wider-section{width: 90%;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.nocturn-text-wrapper small{ font-size: 12px!important;margin-left: 5px!important;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
        </style>

        <title>NOCTURN [05] feat. Richie Culver</title>
      </Head>
      
         <div className="nocturn nocturn-header">
           <img src="/images/nocturn/nocturn4-web-page-top.png" alt="Nocturn" width="100%" />
           <img className="flyer" src="/images/nocturn/17LPS_Flyer_Nocturn_04.jpg" /> 
           
           <div className="nocturn-text-wrapper top"> 
            <br/> 
              <p className="nocturn-text italic">For Nocturn [05] feat. Richie Culver, Little Portland Street is re-imagined as an architecture of disclosure – a space where rawness and repetition, doubt and distortion, are not only textures of experience but conditions of being.</p>

              <p className="nocturn-text italic">Working across sound, text, video and painting, Richie Culver’s practice bridges the emotional pressure zones of techno, noise and visual art. In this Nocturn, the club is not sanctuary or spectacle–but a confessional zone, where unfiltered emotional states, (un)satisfactory attempts at catharsis, and vulnerability are given space to surface, loop and unravel.</p>

              <p className="nocturn-text italic">Merging the artists’ studio as a site of solitary creative expression and the nightclub as locus of collective resonance and shared rhythms, Culver peels back the layers of his own experiences and lived worlds–from trap houses to Berlin raves to fashion and “high art” contexts–making visible an emergent, complex and unapologetic terrain of intimacy and unease.</p>

              <p className="nocturn-text italic">Excavating in the liminality between the public and the private, high and low, fear and love, confession and concealment, Culver conveys the unresolved, constantly transforming realm of the personal. Nothing may be resolved, but something held and heard–suspended–like the hypnotic tension before the beat finally drops.</p>

              <p className="nocturn-text nocturn-text-author italic">Bianca Chu</p>
               <br/> 
            </div>
           </div>

                <div className="nocturn-wider-section video-section">
                 <div className="row">
                    <div className="column">
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_01.mp4" type="video/mp4"/> 
                      </video>                    
                      </div>
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_02.mp4" type="video/mp4"/> 
                      </video>                    
                      </div>
                   </div>

                  <div className="row">
                    <div className="column">
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_03.mp4" type="video/mp4"/> 
                      </video>                    
                      </div>
                    <div className="column"> 
                        <video autoPlay loop muted playsInline className="video-background">
                        <source src="/images/nocturn/nocturn-05/video_04.mp4" type="video/mp4"/> 
                      </video>                    
                      </div>
                   </div>
                  <br/> 
                </div>
      
            <div className="nocturn">
                <div className="row">
                  <div className="column">
                    <img src="/images/nocturn/nocturn-05/img_01.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_02.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_03.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_04.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_05.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_06.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_07.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_08.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_09.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_10.png" />
                  </div>
                  <div className="column">
                    <img src="/images/nocturn/nocturn-05/img_11.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_12.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_13.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_14.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_15.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_16.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_17.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_18.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_19.jpg" />
                    <img src="/images/nocturn/nocturn-05/img_20.jpg" />
                  </div>
               </div>
              </div>
              
           <div className="nocturn nocturn-header">
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text">Richie Culver (born Hull, UK) is a multidisciplinary artist working in painting, music, performance and photography. He completed his MA in Painting at Royal College of Art in 2023. Culver has exhibited nationally and internationally and lives and works in London.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/richieculver/" target="_blank">@richieculver</a></p>
              <p><a className="nocturn-text" href="https://www.quiethusband.com/" target="_blank">www.quiethusband.com</a></p>
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
