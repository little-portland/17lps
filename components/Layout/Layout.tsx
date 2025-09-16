import { useState, useEffect } from "react";
import Image from "next/image";
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
        <div className="eat-note dance-popup">
          <div>
          <div className="cat-wrapper">
            <div className="cat-scroll">
              <h1 className="dance-title">THE CLUB</h1>
              <h2>Open Thursday to Saturday</h2>
              <h3 className="open-time">FROM 10PM</h3>
              <p>Access to the club is for <strong>Friends of the Club</strong> only.</p> 
              <p>To apply to become a <strong>Friend of the Club</strong>, <a href="mailto:friends@little-potland.com?subject=FOC%20Enquiry">email us</a>.</p>
              <p>Or you can access the club by <a href="https://www.little-portland.com/bookings" target="_blank">booking</a> a dinner table.</p>
               <img src="/images/dance-popup-img.jpg" />
                  <div className="category thu">
                    <h3>Thursday <span className="italic-word">is</span> <span className="group-item">Underground</span></h3>
                    <p><span className="group-item">Thursday Underground</span> kicks off the weekend, showcasing cutting-edge electronic artists at the forefront of the underground scene, bringing together a community deeply rooted in its culture.</p>
                  </div>
                  <div className="category fri">
                    <h3>Friday <span className="italic-word">is</span> <span className="group-item">Residents</span></h3>
                    <p><span className="group-item">Friday Residents</span> bridges Underground and Disco3000, shaping the weekend’s rhythm and flow. Focused on club residents, it brings a sense of familiarity and community. The heartbeat of the weekend.</p>
                  </div>
                  <div className="category sat">
                    <h3>Saturday <span className="italic-word">is</span> <span className="group-item">Disco3000</span></h3>
                    <p><span className="group-item">Disco3000</span> captures the evolving spirit of the disco era. Embracing a soundscape that truly resonates with the soul, it delivers a timeless and uplifting journey. A cosmic finale to the weekend.</p>
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
          target: "/override-menu",
          title: "override menu",
        }}
        className="eat-modal"
        // phoneNr={`tel:+${testNr.replace(/\s/g, "")}`}
      >  
            {<div
        className="eat-note"
      >     
        <h1>The Tent</h1>
        <h2 className="header-tag">[At the end of the Universe]</h2> 
        <h3 className="header-address">17 Little Portland Street</h3>
        
        {<div
        className="box-1 box schedule-box open"> 
        <h3>Open Thursdays to Saturdays</h3>
        </div>}
              
        {<div
        className="box-1 box schedule-box"> 
        <h4>Nightly Schedule</h4>
        <div className="schedule-container"> 
          <p className="details"><span>Chef's Studio</span><small>20:00</small></p>
          <p className="details"><span>Override Dinner</span><small>21:00</small></p>
          <p className="details"><span>Club Opens</span><small>22:00</small></p> 
        </div>
        </div>}

        {<div
        className="box-1 box override-boxx"> 
        <Image 
            src={"/images/override_eat_page.png"}
            blurDataURL={"/images/override_eat_page.png"}
        />
        <h2>MORE THAN A MEAL. STEP INTO THE VOID.</h2>
        <p className="override-intro">“Override” is our restaurant concept, with futurist menus setting the stage for a sensorial experience as dinner transitions seamlessly into our hypnotic after-dark scene.</p> 
          <ul>
            <li className="info">£65pp Set Dinner</li>
            <li className="info">Futurist Asian Menu</li>
            <li className="info">9pm Start</li>
            <li className="info">Club Access Included</li>
          </ul>
        <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-06&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a href="https://www.little-portland.com/override" target="_blank">[EXPLORE OVERRIDE]</a></p>
        </div>}

        {<div
        className="box-3 box chef-studio"> 
        <h2>CHEF’S STUDIO</h2>
        <p>Chef’s Studio is an intimate and futuristic space beneath The Tent – the table of choice for those in the know.</p> 
          <ul>
            <li className="info">£65pp Set Dinner</li>
            <li className="info">Futurist Asian Menu</li>
            <li className="info">6-12 PAX</li>
            <li className="info">8pm start</li>
          </ul>
          <p>Our guests can experience the Override menu in Chef’s Studio.</p> 
          <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=YYYY-MM-DD&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a href="https://www.little-portland.com/chefstudio" target="_blank">[EXPLORE CHEF'S STUDIO]</a></p>
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
        className="eat-note"
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
