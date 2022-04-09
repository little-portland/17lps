import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Middle, BG, Close, Grid, ButtonWrapper } from "./styles";
import Closer from "./components/Closer";
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
                <>
                  {children}
                  {/* <Closer close={close} /> */}
                </>
              </Middle>
              {/* </Middle> */}
              <ButtonWrapper>
                <Button>{button}</Button>
              </ButtonWrapper>
            </Grid>
            {/* {children} */}
          </motion.div>
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;
