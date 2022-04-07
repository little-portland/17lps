import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { ModalStyle, BG, Close } from "./styles";
import Closer from "./components/Closer";
import Button from "../Button/Button";

interface SidebarProps {
  children: any;
  open: boolean;
  close: () => void;
}

const Modal: FC<SidebarProps> = ({ children, open, close }) => {
  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          exit={{ opacity: 0, transition: { delay: 1 } }}

          //onClick={() => setMenuState(!menuState)}
        >
          <ModalStyle>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </div>
            <Closer close={close} />
          </ModalStyle>
          <Button>hire</Button>
          {/* {children} */}
          <BG onClick={close}></BG>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
