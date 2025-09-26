import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import HoverImageLink from "@components/HoverImageLink"; // adjust path if your structure differs
import { motion } from "framer-motion";

//Components
import Canvas from "@components/Canvas";
import Modal from "@components/UX/Modal";
import MobileButtons from "@components/UX/MobileButtons";

//Hooks
import { useUI } from "@components/UX/context";
import { useLoaded } from "../../store/context";
import useDeviceDetect from "@utils/useDeviceDetect";
import Button from "@components/UX/Button";

//image local
import dancePic from "../../public/images/Dance.jpeg";
import eatPic from "../../public/images/Eat.jpeg";
import hirePic from "../../public/images/hire-page-collage.jpg";

//styles
import { MainStyle } from "./styles";
import { compileString } from "sass";

interface eatDataType {
  image: {
    url: string;
    width: number;
    height: number;
    description: string;
  };
  eMail: string;
  phoneNumber: string;
}

interface IProps {
  main: React.ReactNode;
  eatItem: eatDataType;
  hireItem: eatDataType;
  hideNav?: boolean; // Additional prop to hide nav on testing page
}

const Layout: React.FC<IProps> = ({ main, eatItem, hireItem, hideNav = false }) => {
  //UI Handlers
  const {
    displayLineup,
    closeLineup,
    openLineup,
    openMenu,
    closeMenu,
    displayMenu,
    openHire,
    closeHire,
    displayHire,
    displayMobileButtons,
  } = useUI();
  const { canvasState, setCanvasState, isLoaded } = useLoaded();
  //Check Device
  const { isMobile } = useDeviceDetect();

  // const [data, setData] = useState<imageDataType>();

  return (
    <>
     <Head>
        <link rel="preload" as="image" href="/images/dance-popup-img.jpg" />
        <link rel="preload" as="image" href="/images/explore_concept.png" />
        <link rel="preload" as="image" href="/images/explore_concept_hover.png" />
        <link rel="preload" as="image" href="/images/17LPS_Override_scheduleV4.png" />
        <link rel="preload" as="image" href="/images/floorplan_eat_popup.png" />
        <link rel="preload" as="image" href="/images/The_Tent_transition_eat_popup.png" />
    </Head>
    <style>
     {`.eat-section { font-family: Helvetica, Space Mono, sans-serif!important;}`}
    </style>
      
      {canvasState && !isLoaded && <Canvas removeSelf={setCanvasState} />}

    {!hideNav && isMobile && isLoaded && displayMobileButtons ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <MobileButtons />
      </motion.div>
    ) : null}

      <MainStyle>{main}</MainStyle>
      <Modal open={displayLineup} close={closeLineup} className="dance-modal">
        <div className="eat-note dance-popup eat-section">
          <div>
          <div className="cat-wrapper">
            <div className="cat-scroll">
              <h1 className="dance-title">THE CLUB</h1>
              <h2>Open Thursday to Saturday</h2>
              <h3 className="open-time">FROM 10PM</h3>
              <p>Access to the club is for <strong>Friends of the Club</strong> only.</p> 
              <p>To apply to become a <strong>Friend of the Club</strong>, <a href="mailto:friends@little-portland.com?subject=FOC%20Enquiry">email us</a>.</p>
              <p>Or you can access the club by <a href="https://www.little-portland.com/bookings" target="_blank">booking</a> a dinner table.</p>
               <img src="/images/dance-popup-img.jpg" />
                  <div className="category thu">
                    <h3>Thursday <span className="italic-word">is</span> <span className="group-item">Underground</span></h3>
                    <p>Positioned as the weekly opener, <span className="group-item">Thursday Underground</span> sets the tone for the
entire weekend. A platform for cutting-edge electronic sound that, at its most
profound, transcends the boundaries of conventional music, <span className="group-item">Thursday Underground</span> is an ode to artists at the forefront of the underground electronic
movement; a movement followed by a community deeply rooted in its culture.</p>
<p>Each night has a metaphorical colour. Thursday is green.</p>
                  </div>
                  <div className="category fri">
                    <h3>Friday <span className="italic-word">is</span> <span className="group-item">Residents</span></h3>
                    <p><span className="group-item">Friday Residents</span> stands as a bridge between two worlds. While influenced by both
Thursday Underground and Saturday Disco3000, it projects its own vibe and
crowd into each. With a focus on club residents in its programming, it maintains a
sense of familiarity and community, making <span className="group-item">Friday Residents</span> the vibrant
heartbeat of the weekend.</p>
<p>Each night has a metaphorical colour. Friday is red.</p>
                  </div>
                  <div className="category sat">
                    <h3>Saturday <span className="italic-word">is</span> <span className="group-item">Disco3000</span></h3>
                    <p><span className="group-item">Disco3000</span> seeks to capture the spirit of the disco era for the space age. Guided
by artists who’ve journeyed across the sonic spectrum time and again, it
embraces a soundscape that truly resonates with the soul: diverse, timeless, and
filled with uplifting and euphoric elements. These are the sounds of the musically
enlightened. <span className="group-item">Disco3000</span> is how we draw the weekend to a close; a cosmic finale.</p>
<p>Each night has a metaphorical colour. Saturday is blue.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={displayMenu}
        close={closeMenu}
        email={eatItem.eMail}
        phone={eatItem.phoneNumber}
        link={{
          target: "/bookings",
          title: "reservations",
        }}
        link2={{
          target: "/menu",
          title: "menu",
        }}
        className="eat-modal"
        // phoneNr={`tel:+${testNr.replace(/\s/g, "")}`}
      >  
            {<div
        className="eat-note eat-section"
      >     
        <h1>DINING AT</h1>
        <h3 className="header-address">17 Little Portland Street</h3>
        <h2 className="header-tag">MORE THAN A MEAL. STEP INTO THE VOID.</h2> <br/>
              
        {<div
        className="box-1 box schedule-box open"> 
        <h3>Open Thursdays to Saturdays</h3>
        </div>}
              
        {<div
        className="box-1 box schedule-box"> 
        <h4>Nightly Schedule</h4>
        <div className="schedule-container"> 
          <p className="details"><span>Chef's Studio</span><small>20:00</small></p>
          <p className="details"><span>Dinner in The Tent</span><small>20:30</small></p>
          <p className="details"><span>Club Opens</span><small>22:00</small></p> 
        </div>
        </div>}

        {<div
        className="box"> 
              <Image 
                src={"/images/The_Tent_transition_eat_popup.png"}
                blurDataURL={"/images/The_Tent_transition_eat_popup.png"}
              /><br/>
        </div>}           


        {<div
        className="box"> 
            <a href="https://www.little-portland.com/food" target="_blank">
             <HoverImageLink
                    href="https://www.little-portland.com/food"
                    img="/images/explore_concept_hover.png"
                    hoverImg="/images/explore_concept.png"
                    aspect="1000 / 80"
                    ariaLabel="Dinner"
                    target="_blank"
                  />  
            </a><br/>
        </div>}

        {<div
        className="box"> 
              <Image 
                src={"/images/floorplan_eat_popup.png"}
                blurDataURL={"/images/floorplan_eat_popup.png"}
              /><br/>
        </div>}

        {<div
        className="box-1 box override-boxx"> 
        <Image 
            src={"/images/thetent/the_tent_page_logo.png"}
            blurDataURL={"/images/thetent/the_tent_page_logo.png"}
        />
        <p>In a floating tent, lost in space, futurist menus set the stage for a sensorial experience as dinner seamlessly transitions into our hypnotic after-dark mode - a cosmic journey.</p> 
          <ul>
            <li className="info">£65pp Set Dinner</li>
            <li className="info">Futurist Menu</li>
            <li className="info">8:30pm Start</li>
            <li className="info">Club Access Included</li>
          </ul>
        <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-06&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a className="explore-link" href="https://www.little-portland.com/thetent" target="_blank">[EXPLORE THE TENT]</a></p>
        </div>}

        {<div
        className="box-3 box chef-studio"> 
        <Image 
            src={"/images/cs_logo_eat_pop_up.png"}
            blurDataURL={"/images/cs_logo_eat_pop_up.png"}
        />
        <p>Chef’s Studio is an intimate and futuristic space beneath The Tent – the table of choice for those in the know.</p> 
          <ul>
            <li className="info">£65pp Set Dinner</li>
            <li className="info">Futurist Menu</li>
            <li className="info">6-12 PAX</li>
            <li className="info">8pm start</li>
          </ul>
          <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a className="explore-link" href="https://www.little-portland.com/chefstudio" target="_blank">[EXPLORE CHEF'S STUDIO]</a></p>
        </div>}

      </div>}
      </Modal>
      <Modal
        open={displayHire}
        close={closeHire}
        email={hireItem.eMail}
        className="hire-modal"
        // phone={hireItem.phoneNumber}
      >
    {<div
        className="eat-note eat-section"
      >       
         <h1>Private Hire</h1>
        <br/>
        <Image 
            src={"/images/hire-page-venue.jpg"}
            blurDataURL={"/images/hire-page-venue.jpg"}
        />
        <br/> 
        <Image 
            src={"/images/hire-page-chef-tent.jpg"}
            blurDataURL={"/images/hire-page-chef-tent.jpg"}
        />
        <br/>  
        <Image 
            src={"/images/hire-page-studio.jpg"}
            blurDataURL={"/images/hire-page-studio.jpg"}
        />
        <br/>
        <Image 
            src={"/images/hire-page-chef-studio.jpg"}
            blurDataURL={"/images/hire-page-chef-studio.jpg"}
        />
      </div>}
      </Modal>
      {/* <div
        onClick={openLineup}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        CLick Me
      </div> */}
    </>
  );
};

export default Layout;
