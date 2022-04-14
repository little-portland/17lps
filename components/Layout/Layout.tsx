import Image from "next/image";

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

      {isMobile && !canvasState && displayMobileButtons ? (
        <MobileButtons />
      ) : null}

      <MainStyle>{main}</MainStyle>
      <Modal open={displayLineup} close={closeLineup} button="dance">
        {/* <Image
          src="/images/Dance.jpg"
          alt="pic"
          width="auto"
          height="auto"
          // layout="fill"
        /> */}
        <img src="/images/Dance.jpg"></img>
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
