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
            {'html, body { height: 100%; margin: 0; padding: 0; }'}
            {'html { overflow-x: hidden; }'}
            {'body { overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior-y: auto; }'}
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 30px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'.featured{padding: 0 8px;margin-bottom: -2px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper img{ max-width: 25%;margin-bottom: 30px!important;}'}
            {'.nocturn-text-wrapper h3{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(171, 209, 227, 0.6);font-size: 35px;font-weight: bold!important;text-transform:uppercase!important;color: #660003!important;padding-bottom: 15px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper p{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(102, 0, 3, 0.6);font-weight: 400;text-decoration: none!important;color: #abd1e3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper a{ font-family: Helvetica!important;text-shadow: 1px 1px 1px rgba(102, 0, 3, 0.6);font-weight: 400;text-decoration: none!important;color: #abd1e3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper strong{font-weight: bold !important;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top: 30px;width: 90%;}.featured{padding: 0 4px;}.nocturn-text-wrapper h3{font-size: 25px;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
            {'::-webkit-scrollbar {width: 10px;!important}'}
            {'::-webkit-scrollbar-thumb {background: rgba(102, 0, 3, 0.8)!important;border-radius: 6px!important;}'}
            {'::-webkit-scrollbar-thumb:window-inactive {background: rgba(102, 0, 3, 0.4)!important;}'}
        </style>
        <title>Nocturn 06 - Sammy Lee</title>
      </Head>
      
         <div className="nocturn">
           <img src="/images/nocturn/nocturn-06/header.png" alt="Nocturn" width="100%" />
           <img src="/images/nocturn/nocturn-06/flyer.png" alt="Nocturn" width="100%" />

           <div className="nocturn-text-wrapper top">
             <h3>PROLOGUE</h3>
              <p><strong>Exterior.</strong> While Oxford Street bustles with the noise of cars, buses and people rushing home, Little Portland Street remains quiet – a calm ocean before the storm. You arrive at an unmarked entrance.</p>
              <h3>THRESHOLD</h3> 
              <p><strong>Interior.</strong> An outer gate swings open into an empty inner chamber and a face greets you. You step inward. A velvety darkness envelops your body. Low frequencies purr from multiple directions, rising through the floor, vibrating from behind a black curtain. Other faces hover, half-hidden. A silent question hangs in the air:</p> 
              <p>What adventure will unfold tonight?</p>
              <h3>STUDIO</h3> 
              <p>Your body registers first. Not quite arousal but close.</p>
              <h3>ENCOUNTER</h3>
              <p>[You enter the bathroom. A figure stands beside a cubicle. Or perhaps it is your own reflection.]</p>
              <p><strong>VOICE:</strong> Will you dissolve? Or will you hold your edges?</p>
              <p><strong>SELF:</strong> I seek an audience with Eros.</p>
              <p>A pause.</p>
              <p><strong>VOICE:</strong> No such separate entity. Enter the field. </p>
              <p><strong>SELF:</strong> A field of what?</p>
              <p><strong>VOICE:</strong> Relations. Sensations. Moods. Forces that move through you and those that exceed you. </p>
              <p>[A hand gestures outwards.]</p>
              <h3>ORIENTATION</h3>
              <p>[You return to the bar. The architecture trembles. Light and shadow articulate a matrix, visible only in your mind’s eye.]</p>
              <p><strong>To the West:</strong> a serpentine form coils in blackness.</p>
              <p><strong>To the East:</strong> wings cut through thin air, a golden unfurling.</p>
              <p><strong>To the North:</strong> crimson fires blaze above water – crackling, insistent, burning.</p>
              <p><strong>To the South:</strong> a hidden ocean beckons.</p> 
              <p>[Descent feels imminent.]</p>
              <h3>ENTANGLEMENT</h3>
              <p>[Deep, rhythmic music pulses across the space. Sensation precedes language. Time loosens. Lasers refract across skin. Sigils glow in the darklight.] </p>
              <p>Other bodies approach and retreat. </p>
              <p>Touching. Not Touching.</p> 
              <p>What binds dissolves. What dissolves binds.</p>
              <p><strong>Bianca Chu</strong></p>
            </div>

            <img className="featured" src="/images/nocturn/nocturn-06/featured.png" alt="Nocturn" width="100%" />

           <div className="row">
              <div className="column">
                <img src="/images/nocturn/nocturn-06/image01.png" />
                <img src="/images/nocturn/nocturn-06/image02.png" />
                <img src="/images/nocturn/nocturn-06/golden.gif" />
                <img src="/images/nocturn/nocturn-06/image03.png" />
                <img src="/images/nocturn/nocturn-06/image04.png" />
                <img src="/images/nocturn/nocturn-06/image05.png" />
                <img src="/images/nocturn/nocturn-06/image06.png" />
                <img src="/images/nocturn/nocturn-06/image07.png" />
              </div>
              <div className="column">
                <img src="/images/nocturn/nocturn-06/image08.png" />
                <img src="/images/nocturn/nocturn-06/image09.png" />
                <img src="/images/nocturn/nocturn-06/image10.png" />
                <img src="/images/nocturn/nocturn-06/image11.png" />
                <img src="/images/nocturn/nocturn-06/image12.png" />
                <img src="/images/nocturn/nocturn-06/image13.png" />
                <img src="/images/nocturn/nocturn-06/image14.png" />
                <img src="/images/nocturn/nocturn-06/image15.png" />
              </div>
           </div>
           
            <div className="nocturn-text-wrapper bottom"> 
              <p className="nocturn-text">Sammy Lee (b. Vancouver, Canada) is a London-based artist working across drawing, sculpture, moving image, and immersive media. Informed by her background in architecture, she approaches the future as a site of memory, weaving lived experience and ancestral lineage through affect, ritual, and embodied practice.</p>
              <p><a className="nocturn-text" href="https://sammyleestudio.com/" target="_blank">www.sammyleestudio.com</a></p>
              <p><a className="nocturn-text" href="https://linktr.ee/sammyleestudio" target="_blank">www.linktr.ee/sammyleestudio</a></p>
            </div>
           
         </div>   

         <style jsx global>{`
        
        body {
          background-color: #b94b18;
          overflow-x: hidden;
          position: relative;
          z-index: 0;
        }
        
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        
          background: linear-gradient(
            90deg,
            #b94b18 0%,
            #b94b18 38%,
            #c95522 43%,
            #d76e3d 47%,
            #ed8344 49%,
            #ff9a5c 50%,
            #ed8344 51%,
            #d76e3d 53%,
            #c95522 57%,
            #b94b18 62%,
            #b94b18 100%
          );
        
          animation: gradientMoveMobile 10s ease-in-out infinite;
          will-change: transform;
        }
        
        
        /* MOBILE (current behaviour) */
        @keyframes gradientMoveMobile {
          0%   { transform: translateX(-15%); }
          50%  { transform: translateX(15%); }
          100% { transform: translateX(-15%); }
        }
        
        
        /* DESKTOP – reduced movement */
        @media (min-width: 1024px) {
        
          body::before {
            animation: gradientMoveDesktop 12s ease-in-out infinite;
          }
        
          @keyframes gradientMoveDesktop {
            0%   { transform: translateX(-6%); }
            50%  { transform: translateX(6%); }
            100% { transform: translateX(-6%); }
          }
        
        }
        
        `}</style>
      
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
