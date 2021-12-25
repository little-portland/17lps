import Image from "next/image";

//Components
import Canvas from "@components/Canvas";
import Modal from "@components/UX/Modal";

//Hooks
import { useUI } from "@components/UX/context";

//styles
import { MainStyle } from "./styles";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  //UI Handlers
  const { displayLineup, closeLineup, openLineup } = useUI();

  return (
    <>
      {/* <Header /> */}
      {/* <Canvas /> */}
      <MainStyle>{main}</MainStyle>
      <Modal open={displayLineup} close={closeLineup}>
        {/* <Image
          src="/tester.png"
          alt="pic"
          width="400"
          height="600"
          // layout="responsive"
        /> */}
        <img src="/tester.png"></img>
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
