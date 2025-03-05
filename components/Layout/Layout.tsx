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
        className="box-1 box schedule-box"> 
        <h3>Open Thursdays to Saturdays</h3>
        <h4>Nightly Schedule</h4>
        <div className="schedule-container"> 
          <p className="details"><span>Chef's Studio</span>20:00</p>
          <p className="details"><span>Override Dinner</span>21:00</p>
          <p className="details"><span>Club Opens</span>22:00</p>
        </div>
        </div>}

        {<div
        className="box-1 box override-boxx"> 
        <Image 
            src={"/images/override_eat_page.png"}
            blurDataURL={"/images/override_eat_page.png"}
        />
        <h2>MORE THAN A MEAL. STEP INTO THE VOID.</h2>
        <p className="override-intro">Override is our series of guest chef takeovers where culinary artists develop innovative menus, setting the stage for a sensorial experience as dinner seamlessly transitions into after-dark mode.</p> 
        <h4>Override [03] feat. Zen Ong</h4>
        <h3>Launching 06 June 2025. Menu available through June.</h3>
          <br/>  
          <p className="info">£65pp</p>
          <p className="info">Set Menu Dinner</p>
          <p className="info">Club Access Included</p>
        <br/>  
        <p>Zen Ong is the creator of INDA and AWAN, and the former head of YZY Food. He launched the INDA dinner series in 2019 and AWAN, an acclaimed vegan ice creamery, in 2021, where Steve Lacy premiered his album Gemini Rights. In 2023, he and our Executive Chef, John Javier, cooked for Ye in Florence during the Vultures sessions. Now, Zen brings MEJA to The Tent, an Indonesian shared tasting menu focused on communal dining.</p> 
        <br/>  
        <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-06&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a href="https://www.little-portland.com/override" target="_blank">[EXPLORE ZEN]</a> <a href="https://www.little-portland.com/override-flyer" target="_blank">[DISCOVER OVERRIDE]</a></p>
        </div>}

        {<div
        className="box-3 box chef-studio"> 
        <h2>CHEF’S STUDIO</h2>
        <p>An intimate 12-seater dining experience in our invite-only club hidden beneath the Tent (at the End of the Universe). This is how those in the know kick off their night.</p> 
        <br/>  
          <p>£65pp</p>
          <p>Override Menu</p>
          <p>6-12 pax</p>
        <br/> 
        <p className="links"><a target="_blank" href="https://www.sevenrooms.com/reservations/littleportland?default_date=2025-03-06&default_time=21:00&default_party_size=5">[BOOK]</a> <a href="https://www.little-portland.com/override-menu" target="_blank">[MENU]</a> <a href="https://www.little-portland.com/override" target="_blank">[EXPLORE ZEN]</a></p>
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
         <h1>Private Hire</h1>
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
