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

  useEffect(() => {}, []);

  const testNr = "+44 20 3848 7430";

  return (
    <>
      {canvasState && <Canvas removeSelf={setCanvasState} />}

      {isMobile && isLoaded && displayMobileButtons ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
        // phoneNr={`tel:+${testNr.replace(/\s/g, "")}`}
      >
        <Image
          src={eatItem ? eatItem.image.url : eatPic}
          alt={eatItem.image.description}
          width={eatItem ? eatItem.image.width : 300} //automatically provided
          height={eatItem ? eatItem.image.height : 800} //automatically provided
          blurDataURL={"/images/Eat.jpeg"} //automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
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
