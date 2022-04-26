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
          <Grid>
            <div />
            <Middle>
              <div style={{ position: "relative" }}>
                <Top onClick={close}>
                  <Closer />
                </Top>
                <div style={{ maxWidth: "80vw" }}>{children}</div>
              </div>
            </Middle>
            <ButtonWrapper>
              <ButtonWrapper>
                {email && (
                  <a href={`mailto:${email}`}>
                    <Button btnType="solid">
                      {isMobile ? "email" : email}
                    </Button>
                  </a>
                )}
                {phone &&
                  (isMobile ? (
                    <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                      <Button btnType="hollow">call</Button>
                    </a>
                  ) : (
                    <Button btnType="hollow">{phone}</Button>
                  ))}
              </ButtonWrapper>
            </ButtonWrapper>
          </Grid>
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;
