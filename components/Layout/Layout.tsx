import Image from "next/image";

//Components
import Canvas from "@components/Canvas";
import Modal from "@components/UX/Modal";
import Button from "../UX/Button";

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
  } = useUI();
  const { canvasState, setCanvasState } = useLoaded();
  //Check Device
  const { isMobile } = useDeviceDetect();

  return (
    <>
      {/* <Header /> */}
      {canvasState && <Canvas removeSelf={setCanvasState} />}

      {isMobile && (
        <div
          onClick={openLineup}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 9999999 }}
        >
          <Button>Open modal</Button>
        </div>
      )}

      <MainStyle>{main}</MainStyle>
      <Modal open={displayLineup} close={closeLineup} button="dance">
        {/* <Image
          src="/tester.png"
          alt="pic"
          width="400"
          height="600"
          // layout="responsive"
        /> */}
        <img src="/tester.png"></img>
      </Modal>
      <Modal open={displayMenu} close={closeMenu} button="eat">
        <h3>eat image here</h3>
      </Modal>
      <Modal open={displayHire} close={closeHire} button="hire">
        <h3>hire image here</h3>
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
