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
            {'.nocturn{width: 50%;margin: 0 auto;}'}
            {'.row{ display: flex;flex-wrap: wrap;padding: 0 4px;}'}
            {'.column{flex: 50%;max-width: 50%;padding: 0 4px;}'}
            {'.column img{ margin-top: 8px;vertical-align: middle;width: 100%;}'}
            {'.column a{ cursor:pointer!important;}'}
            {'.top{ font-size: 30px;}'}
            {'.bottom{ font-size: 25px;}'}
            {'.featured{padding: 0 4px;}'}
            {'audio{ margin-top: 8px!important;width:100%!important;}'}
            {'.nocturn-text-wrapper{ margin-top: 30px!important;padding: 0 30px;}'}
            {'.nocturn-text-wrapper img{ max-width: 25%;margin-bottom: 30px!important;}'}
            {'.nocturn-text-wrapper h3{ font-family: Helvetica!important;font-size: 35px;font-weight: bold!important;font-style: italic;text-transform:uppercase!important;color: #ac07c6!important;padding-bottom: 15px;line-height: 1.1;}'}
            {'.nocturn-text-wrapper p{ font-family: Helvetica!important;font-weight: bold!important;text-decoration: none!important;color: #121be3!important;padding-bottom: 30px;line-height: 1.1;}'}
            {'.nocturn-text{ padding-bottom: 20px;}'}
            {'@media (max-width: 768px) { .nocturn{margin-top: 30px;width: 90%;}.nocturn-text-wrapper h3{font-size: 25px;}.nocturn-text-wrapper{padding: 0 15px;}.top p{ font-size: 20px;}.bottom p{ font-size: 15px;}.row{padding: 0!important;}.column{ flex: 50%;max-width: 50%;}}'}
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
              <p><strong>Interior.</strong> An outer gate swings open into an empty inner chamber and a face greets you. You step inward. A velvety darkness envelops your body. Low frequencies purr from multiple directions, rising through the floor, vibrating from behind a black curtain. Other faces hover, half-hidden. A silent question hangs in the air: 
              What adventure will unfold tonight?</p>
              <h3>STUDIO</h3> 
              <p>Your body registers first. Not quite arousal but close.</p>
              <h3>ENCOUNTER</h3>
              <p>[You enter the bathroom. A figure stands beside a cubicle. Or perhaps it is your own reflection.]</p>
              <p>VOICE: Will you dissolve? Or will you hold your edges?</p>
              <p>SELF: I seek an audience with Eros.</p>
              <p>A pause.</p>
              <p>VOICE: No such separate entity. Enter the field. </p>
              <p>SELF: A field of what?</p>
              <p>VOICE: Relations. Sensations. Moods. Forces that move through you and those that exceed you. </p>
              <p>[A hand gestures outwards.]</p>
              <h3>ORIENTATION</h3>
              <p>[You return to the bar. The architecture trembles. Light and shadow articulate a matrix, visible only in your mind’s eye.]</p>
              <p>To the West: a serpentine form coils in blackness.</p>
              <p>To the East: wings cut through thin air, a golden unfurling.</p>
              <p>To the North: crimson fires blaze above water – crackling, insistent, burning.</p>
              <p>To the South: a hidden ocean beckons.</p> 
              <p>[Descent feels imminent.]</p>
              <h3>ENTANGLEMENT</h3>
              <p>[Deep, rhythmic music pulses across the space. Sensation precedes language. Time loosens. Lasers refract across skin. Sigils glow in the darklight.] </p>
              <p>Other bodies approach and retreat. </p>
              <p>Touching. Not Touching.</p> 
              <p>What binds dissolves. What dissolves binds.</p>
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
              <p className="nocturn-text">Her solo exhibitions and projects include Cornucopia, Stephanie Kim Gallery, New York, USA (2024); Mirror I: The Sea, with Sarah Shin, SWAY, Barry, UK (2022); Aviary,Tate St Ives Commission, UK (2021). Selected group exhibitions include: Ground Seoul, South Korea (2024); UNESCO Centre for Documentary Heritage, Cheongju, South Korea (2023); Jeju International Peace Centre, South Korea (2023); Madberry Farmhouse, Seoul, South Korea (2023); Science Gallery London, UK (2023); Myungwon Museum, Seoul, South Korea (2022); MUTEK Montreal, Canada (2021).</p>
              <p className="nocturn-text">She is co-director of Standard Deviation, a multidisciplinary collective exploring the coincidence of geometric, psychic, and inhabited spaces. They recently designed The World For World, an exhibition presenting the maps of Ursula K Le Guin at the Architectural Association. She studied Sculpture at the Royal College of Art and holds an AA Diploma (ARB/RIBA Part I&II) from the Architectural Association in London. She previously co-founded and directed Universal Assembly Unit, staging immersive installations at institutions and festivals including the Barbican Centre, Southbank Centre, London Design Festival, Roundhouse, and Nuit Blanche Paris.</p>
              <p><a className="nocturn-text" href="https://www.instagram.com/sammy_seungmin_lee/" target="_blank">@sammy_seungmin_lee</a></p>
              <p><a className="nocturn-text" href="https://sammyleestudio.com/" target="_blank">www.sammyleestudio.com</a></p>
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
