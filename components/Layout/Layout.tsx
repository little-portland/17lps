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
import useFetchContent from "@utils/useFetchContent";

//image local
import dancePic from "../../public/images/Dance.jpg";
import eatPic from "../../public/images/Eat.jpg";
import hirePic from "../../public/images/Hire.jpg";

//styles
import { MainStyle } from "./styles";

interface IProps {
  main: React.ReactNode;
}

interface imageDataType {
  url: string;
}

const Layout: React.FC<IProps> = ({ main }) => {
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

  const [data, setData] = useState<imageDataType>();

  useEffect(() => {
    async function fetchData() {
      const globalData = await useFetchContent(`
    {
      eatImageCollection {
        items {
          title
          image {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
      }
    }
  `);

      setData(globalData.eatImageCollection.items[0].image);
    }
    fetchData();
  }, []);

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
          alt="Picture of the author"
          // width={500} automatically provided
          // height={500} automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </Modal>
      <Modal open={displayMenu} close={closeMenu} button="eat">
        <Image
          src={data ? data.url : eatPic}
          alt="Picture of the author"
          width={500} //automatically provided
          height={500} //automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </Modal>
      <Modal open={displayHire} close={closeHire} button="hire">
        <Image
          src={hirePic}
          alt="Picture of the author"
          // width={500} automatically provided
          // height={500} automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
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
