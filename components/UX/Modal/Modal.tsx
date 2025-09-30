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
  link3?: {
    target: string;
    title: string;
  };
    link4?: {
    target: string;
    title: string;
  };
  className?: string; 
}

const Modal: FC<SidebarProps> = ({
  children,
  open,
  close,
  email,
  phone,
  link,
  link2,
  link3,
  link4,
  className, 
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
          <Grid className={className}> 
            <div />
            <Middle>
              <div style={{ position: "relative" }}>
                <Top onClick={closeHandler}>
                  <Closer />
                </Top>
                <div style={{ maxWidth: "80vw" }}>{children}</div>
              </div>
            </Middle>

            <ButtonWrapper style={link && link2 && link3 && link4 && { flexWrap: "wrap" }}>
              {(link && link2) && (
                <FirstButtonWrapper>
                 <div className="sample-menu btn-wrapper double-btn" >
                  <Link href={link.target}>
                    <a className="left-btn" target="_blank" rel="noreferrer noopener">
                      <Button btnType="solid">{link.title}</Button>
                    </a>
                  </Link>
                  <Link href={link2.target}>
                    <a className="right-btn" target="_blank" rel="noreferrer noopener">
                      <Button btnType="solid">{link2.title}</Button>
                    </a>
                  </Link>
                 </div>
                </FirstButtonWrapper>
              )}              

             {(link3 && link4) && (
                <FirstButtonWrapper>
                 <div className="sample-menu btn-wrapper double-btn" >
                  <Link href={link3.target}>
                    <a className="left-btn" target="_blank" rel="noreferrer noopener">
                      <Button btnType="solid">{link3.title}</Button>
                    </a>
                  </Link>
                  <Link href={link4.target}>
                    <a className="right-btn" target="_blank" rel="noreferrer noopener">
                      <Button btnType="solid">{link4.title}</Button>
                    </a>
                  </Link>
                 </div>
                </FirstButtonWrapper>
              )}
              {email && (
              <div className="btn-wrapper-border" >
                <a className="left-btn" href={`mailto:${email}`}>
                    <Button btnType={isMobile || email === eatEmail ? "hollow" : "solid"}>
                    {isMobile ? "email" : email}
                  </Button>
                </a>
               </div>
              )}
              {phone &&
                (isMobile ? (
                  <div className="btn-wrapper-border" >
                  <a className="right-btn" href={`tel:+${phone.replace(/\s/g, "")}`}>
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
