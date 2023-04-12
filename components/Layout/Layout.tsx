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
        className="box-1"
      > 
        <h4>Eid Mubarak! // Friday 21st April</h4>
        <ul>
          <li>Crudites</li>
          <li>Coconut Flatbread with Za’atar</li>
          <li>Lamb Kofte or Mushroom Shish</li>
          <li>Saganaki Cheese, Pomegranate Molasses, Honey</li>
         </ul>
                
         <h6>Choice of 1 dip (per person)</h6>
                
         <ul>
           <li>Tzatziki</li>
           <li>Muhammara</li>
           <li>Taramasalata</li>
           <li>Borani</li>
         </ul>     
        
         <h6>Choice of 1 main (per 2 people) </h6>
                
         <ul>
           <li>Masgouf, Pickled Onions, Monk’s Beard and Zhoug <b>or</b></li>
           <li>Lamb Belly Shawarma Baked in Tomato Sauce, Brown Butter and Labneh <b>or</b></li>
           <li>Pumpkin, Walnut and Pearl Cous Cous Tagine</li>
         </ul> 
         <h6>All served with Fattoush and Rice Pilaf</h6>
          <ul>
           <li>Ricotta Ice Cream, Filo Pastry, Honey and Pistachio</li>
         </ul> 
         <h6>£80pp</h6>
         <p>* This will be the only menu available for this evening. Our regular menu will not be available. As it is a specially curated menu, no changes can be made to the dishes and we will be unable to cater any dietary requirements. Dishes may change according to availability of produce.</p>
         <p className="links"><a href="https://www.little-portland.com/Thu-21-apr-menu" target="_blank">[Menu]</a></p>
        </div>}
       {<div
        className="box-1"
      > 
        <h4>Sunday Funday // 16th April</h4>
        <p>Complimentary Little Portland Mule, on Arrival</p>
        <hr/>
        <p>Happy Hour 4-5pm // buy a drink, get a house cocktail free</p>
        <hr/>
        <p>Book your table <a href="https://www.little-portland.com/bookings" target="_blank">here</a>.</p>
        <ul>
          <li>Fried Chicken £16</li>
          <li>Cheeseburger £12</li>
          <li>Mushroom Burger £12</li>
          <li>Mash and Gravy £10</li>
          <li>Jalapeño Poppers £8</li>
          <li>BBQ Pork Ribs £16</li>
          <li>Chips £6</li>
        </ul>
        <p className="links"><a href="https://www.little-portland.com/sunday-16-apr-menu" target="_blank">[Menu]</a> <a href="https://www.little-portland.com/sunday-funday-flyer" target="_blank">[Flyer]</a></p>
        </div>}
       {<div
        className="box-3"
      > 
        <h4>Sunday Funday // 23rd April</h4>
        <p>Complimentary Sake Sake, on Arrival</p>
        <hr/>
        <p>Happy Hour 4-5pm // buy a drink, get a house cocktail free</p>
        <hr/>
        <p>Get your tickets <a href="https://www.little-portland.com/events" target="_blank">here</a>.</p>
        <p>Choice of one:</p>
        <ul>
          <li>Chicken Katsudon</li>
          <li>Pork Katsudon</li>
          <li>Tendon</li>
          <li>Mushroom Donburi</li>
        </ul>
        <p>+ Sashimi, Pickles, Salad and Miso Soup</p>
        <p className="links"><a href="https://www.little-portland.com/sunday-23-apr-menu" target="_blank">[Menu]</a></p>
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
