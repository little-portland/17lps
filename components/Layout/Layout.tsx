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
}

const Layout: React.FC<IProps> = ({ main, eatItem, hireItem }) => {
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

      {isMobile && isLoaded && displayMobileButtons ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <MobileButtons />
        </motion.div>
      ) : null}

      <MainStyle>{main}</MainStyle>
      <Modal open={displayLineup} close={closeLineup}>
        <Image
          src={dancePic} 
          alt="Dance"
          // width={500} automatically provided
          // height={500} automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
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
          title: "sample menu",
        }}
        // phoneNr={`tel:+${testNr.replace(/\s/g, "")}`}
      >  
            {<div
        className="eat-note"
      >     
        <h1>The Tent</h1>
        <h2>[At the end of the Universe]</h2>

        {<div
        className="box-1 box"> 
        <h2>CHINESE NEW YEAR - MASTER WEEK</h2>
        <p>Join us between Wednesday 21st - 24th February for a week long MASTER kitchen takeover to celebrate the year of the dragon!</p>
        <br/>  
          <p>Chinese Set menu & welcome drink @ £90 per person <br/> 50% deposit per head to confirm.</p>
        <br/>  
        <br/>  
          <p>**Unfortunately as this is a special menu, we won’t be able to cater to any dietaries.</p>
        <br/>  
        <p className="links"><a href="https://www.little-portland.com/bookings" target="_blank">[BOOK]</a> <a href="https://www.little-portland.com/cny-menu" target="_blank">[CNY MENU]</a></p>
        </div>}

       {<div
        className="box-1 box"> 
        <p>Book your Valentine's day special with our French special set menu at £120 per person and welcome glass of champagne</p>
        <br/>  
          <p>We will require 50% deposit of the total set menu price per head to confirm. </p>
        <br/>  
        <br/>  
          <p>**Unfortunately, as this is a special set menu, we cannot cater to any dietary requirements</p>
        <br/>  
        </div>}

        {<div
        className="box-1 box"> 
        <h2>CHEF’S STUDIO @ 17 LITTLE PORTLAND STREET</h2>
        <h4>WEDNESDAYS - SATURDAYS</h4>
        <p>An intimate 12-person dining experience hosted by Chef John Javier in our invite-only club, hidden beneath The Tent. Renowned for his culinary mastery in Chinese cuisine, John has crafted an epic set menu.</p> 
        <br/>  
          <p>Wed-Thu: Minimum 8 guests per booking <br/>Fri-Sat: Minimum 3 guests per booking</p>
        <br/>  
        <p className="links"><a href="https://www.little-portland.com/bookings" target="_blank">[BOOK]</a> <a href="https://www.little-portland.com/chefs-menu" target="_blank">[CHINESE MENU]</a></p>
        </div>}

        {<div
        className="box-1 box"> 
        <h2>JAZZ AT THE END OF THE UNIVERSE</h2>
        <h4>EVERY WEDNESDAY</h4>
        <p>Step into a world of rhythm and taste with our Live Jazz and Dining Experience, every Wednesday at The Tent [at the End of the Universe]. Amidst a cosmic backdrop, guests are transported to a realm where smooth melodies and delectable cuisine collide.</p> 
        <br/>  
          <p>7PM / 9.30PM</p>
        <br/>  
        <p className="links"><a href="https://www.little-portland.com/bookings" target="_blank">[BOOK]</a> <a href="https://www.little-portland.com/menu" target="_blank">[MENU]</a></p>
        </div>}

        {<div
        className="box-3 box"> 
        <h2>DINNER & TUNES</h2>
        <h4>THURSDAYS - SATURDAYS</h4>
        <p>Join us every Thursday to Saturday, for dinner and tunes with Chef John Javier. Soundtracked by cutting-edge DJs, this is the vibiest dinner in town.</p>
        <br/>  
          <p>DINNER PARTY // 7PM <br/> HOUSE PARTY // 9:30PM</p>
        <br/>  
        <p className="links"><a href="https://www.little-portland.com/bookings" target="_blank">[BOOK]</a> <a href="https://www.little-portland.com/menu" target="_blank">[MENU]</a></p>
        </div>}
      </div>}
      </Modal>
      <Modal
        open={displayHire}
        close={closeHire}
        email={hireItem.eMail}
        phone={hireItem.phoneNumber}
      >
    {<div
        className="eat-note"
      >       
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
        <br/>
        <Image 
            src={"/images/hire-page-food.jpg"}
            blurDataURL={"/images/hire-page-food.jpg"}
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
