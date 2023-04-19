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

//image local
import dancePic from "../../public/images/Dance.jpeg";
import eatPic from "../../public/images/Eat.jpeg";
import hirePic from "../../public/images/Hire.jpeg";

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
        <h3>What’s On</h3>
       {<div
        className="box-3"
      > 
        <h4>Sunday Funday // 23rd April</h4>
        <ul>
          <li>Coconut Flatbread with Za’atar</li>
          <li>Crudités</li>
          <li>Pickles</li>
          <li>Mushroom Shish</li>
          <li>Lamb Shish</li>
         </ul>
         <ul>
           <li>Tzatziki</li>
           <li>Muhammara</li>
           <li>Borani</li>
           <li>Taramasalata</li>
         </ul>         
          <ul>
            <li>Tomatoes, Whipped Feta, Zhoug</li>
            <li>Saganaki Cheese, Pomegranate Molasses, Pistachios</li>
            <li>Iberico Pork Secreto Schnitzel</li>
            <li>Black Cod ‘Sayadieh’</li>
            <li>A4 Wagyu Striploin, Bulgur, Walnuts, Oyster</li>
            <li>Prawn Manti, Brown Butter, Labneh, Kumquat</li>
            <li>700g UK Dairy Cow Rib, Ras El Hanout, Pink Fir Potatoes</li>
           </ul>
            
           <ul>
            <li>Sesame Ice Cream, Burnt Meringue, Grand Marnier</li>
            <li>Baklava, Sumac, Rum Cream</li>
        </ul>
        <p>+ Sashimi, Pickles, Salad and Miso Soup</p>
        <p className="links"><a href="https://www.little-portland.com/sunday-23-apr-menu" target="_blank">[Menu]</a><a href="https://www.little-portland.com/sunday-funday-flyer" target="_blank">[Flyer]</a></p>
        </div>}
      </div>}
      </Modal>
      <Modal
        open={displayHire}
        close={closeHire}
        email={hireItem.eMail}
        phone={hireItem.phoneNumber}
      >
        <Image
          src={hireItem ? hireItem.image.url : eatPic}
          alt={hireItem.image.description}
          width={hireItem ? hireItem.image.width : 300} //automatically provided
          height={hireItem ? hireItem.image.height : 800} //automatically provided
          blurDataURL={"/images/Hire.jpeg"} //automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
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
