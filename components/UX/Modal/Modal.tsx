import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Middle, BG, Top, Grid, ButtonWrapper } from "./styles";
import Closer from "./components/CloseIcon";
import Button from "../Button/Button";

interface SidebarProps {
  children: any;
  open: boolean;
  close: () => void;
  button: string;
}

const Modal: FC<SidebarProps> = ({ children, open, close, button }) => {
  return (
    <>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0 } }}
            exit={{ opacity: 0, transition: { delay: 1 } }}

            //onClick={() => setMenuState(!menuState)}
          >
            <Grid>
              {/* <Middle> */}
              <div />
              <Middle>
                <div style={{ position: "relative" }}>
                  <Top onClick={close}>
                    <Closer />
                  </Top>
                  {children}
                  {/* <Closer close={close} /> */}
                </div>
              </Middle>
              {/* </Middle> */}
              <ButtonWrapper>
                <a href="mailto:email@example.com">
                  <Button btnType="solid">{button}</Button>
                </a>
              </ButtonWrapper>
            </Grid>
          </motion.div>
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;
