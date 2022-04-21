import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Middle, BG, Top, Grid, ButtonWrapper } from "./styles";
import Closer from "./components/CloseIcon";
import Button from "../Button/Button";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

interface SidebarProps {
  children: any;
  open: boolean;
  close: () => void;
  email?: string;
  phone?: string;
}

const Modal: FC<SidebarProps> = ({ children, open, close, email, phone }) => {
  //Check Device
  const { isMobile } = useDeviceDetect();

  let phoneNr;

  useEffect(() => {
    if (phone) {
      phoneNr = `tel:+${phone.replace(/\s/g, "")}`;
    }
  }, []);

  return (
    <>
      {open && (
        <>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { delay: 0.5 } }}

            //onClick={() => setMenuState(!menuState)}
          > */}
          <Grid>
            {/* <Middle> */}
            <div />
            <Middle>
              <div style={{ position: "relative" }}>
                <Top onClick={close}>
                  <Closer />
                </Top>
                <div style={{ maxWidth: "80vw" }}>{children}</div>
              </div>
            </Middle>
            {/* </Middle> */}
            <ButtonWrapper>
              <ButtonWrapper>
                {email && (
                  <a href={`mailto:${email}`}>
                    <Button btnType="solid">
                      {isMobile ? "email" : email}
                    </Button>
                  </a>
                )}
                {phone && (
                  <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                    <Button btnType="hollow">
                      {isMobile ? "call" : phone}
                    </Button>
                  </a>
                )}
              </ButtonWrapper>
            </ButtonWrapper>
          </Grid>
          {/* </motion.div> */}
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;
