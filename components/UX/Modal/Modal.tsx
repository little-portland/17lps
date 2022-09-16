import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Middle,
  BG,
  Top,
  Grid,
  ButtonWrapper,
  FirstButtonWrapper,
} from "./styles";
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
  link?: {
    target: string;
    title: string;
  };
  link2?: {
    target: string;
    title: string;
  };
}

const Modal: FC<SidebarProps> = ({
  children,
  open,
  close,
  email,
  phone,
  link,
  link2,
}) => {
  //Check Device
  const { isMobile } = useDeviceDetect();
  const [copied, setCopied] = useState(false);

  const clickHandler = ({ target: { innerHTML } }) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  const closeHandler = () => {
    close();
    setCopied(false);
  };
  
  const eatEmail = "eat@little-portland.com";

  return (
    <>
      {open && (
        <>
          <Grid>
            <div />
            <Middle>
              <div style={{ position: "relative" }}>
                <Top onClick={closeHandler}>
                  <Closer />
                </Top>
                <div style={{ maxWidth: "80vw" }}>{children}</div>
              </div>
            </Middle>

            <ButtonWrapper>
              {link && (
                <FirstButtonWrapper>
                  <Link href={link.target}>
                    <a>
                      <Button btnType="solid">{link.title}</Button>
                    </a>
                  </Link>
                </FirstButtonWrapper>
              )}              
              {link2 && (
                <FirstButtonWrapper>
                  <Link href={link2.target}>
                    <a>
                      <Button btnType="solid">{link2.title}</Button>
                    </a>
                  </Link>
                  </FirstButtonWrapper>
              )}
              {email && (
                <a href={`mailto:${email}`}>
                    <Button btnType={isMobile || email === eatEmail ? "hollow" : "solid"}>
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
                  <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                    <Button onClick={clickHandler} btnType="hollow">
                      {phone}
                    </Button>
                  </CopyToClipboard>
                ))}
            </ButtonWrapper>
            {copied ? (
              <span
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "400",
                }}
              >
                Number copied
              </span>
            ) : null}
          </Grid>
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;
