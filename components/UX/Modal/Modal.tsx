import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

            <ButtonWrapper style={link && link2 && { flexWrap: "wrap" }}>
              {link && (
                <FirstButtonWrapper>
                 <div className="sample-menu btn-wrapper" >
                  <Link href={link.target}>
                    <a>
                      <Button btnType="solid">{link.title}</Button>
                    </a>
                  </Link>
                 </div>
                </FirstButtonWrapper>
              )}              

              {link2 && (
                <FirstButtonWrapper>
                  <div className="sample-menu btn-wrapper" >
                  <Link href={link2.target}>
                    <a>
                      <Button btnType="solid">{link2.title}</Button>
                    </a>
                  </Link>
                  <a className="insta" href="https://www.instagram.com/thetentattheendoftheuniverse/" target="_blank">
                <Image
                  src={"/images/instagram.svg"}
                  width={25}
                  height={25} 
                />
                </a>
                </div>
                  </FirstButtonWrapper>
              )}
              {email && (
              <div className="btn-wrapper-border" >
                <a href={`mailto:${email}`}>
                    <Button btnType={isMobile || email === eatEmail ? "hollow" : "solid"}>
                    {isMobile ? "email" : email}
                  </Button>
                </a>
               </div>
              )}
              {phone &&
                (isMobile ? (
                  <div className="btn-wrapper-border" >
                  <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                    <Button btnType="hollow">call</Button>
                  </a>
                 </div>
                ) : (
                  <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                    <div className="btn-wrapper-border" >
                    <Button onClick={clickHandler} btnType="hollow">
                      {phone}
                    </Button>
                  </div>
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
