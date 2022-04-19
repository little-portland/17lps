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

//styles
import { MainStyle } from "./styles";

interface IProps {
  main: React.ReactNode;
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
        {/* <Image
          src="/images/Dance.jpg"
          alt="pic"
          width="auto"
          height="auto"
          // layout="fill"
        /> */}
        <img src="/images/Dance.jpg"></img>
        {/* //Try PDF */}
        {/* <object
          data="/images/Dance.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            Alternative text - include a link{" "}
            <a href="/images/Dance.pdf">to the PDF!</a>
          </p>
        </object> */}
      </Modal>
      <Modal open={displayMenu} close={closeMenu} button="eat">
        <img src="/images/Eat.jpg"></img>
      </Modal>
      <Modal open={displayHire} close={closeHire} button="hire">
        <img src="/images/Hire.jpg"></img>
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
