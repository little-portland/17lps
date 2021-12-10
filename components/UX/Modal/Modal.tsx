import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { ModalStyle, BG, Close } from "./styles";

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
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible", transition: { delay: 0.2 } }}
          exit={{ visibility: "hidden", transition: { delay: 1 } }}

          //onClick={() => setMenuState(!menuState)}
        >
          <ModalStyle>{children}</ModalStyle>
          {/* {children} */}
          <BG onClick={close}></BG>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
