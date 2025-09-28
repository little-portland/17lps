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

// hooks
import useDeviceDetect from "@utils/useDeviceDetect";

interface SidebarProps {
  children: any;
  open: boolean;
  close: () => void;
  email?: string;
  phone?: string;
  link?: { target: string; title: string };
  link2?: { target: string; title: string };
  link3?: { target: string; title: string };
  className?: string;
}

const Modal = ({
  children,
  open,
  close,
  email,
  phone,
  link,
  link2,
  link3,
  className,
}: SidebarProps) => {
  const { isMobile } = useDeviceDetect();
  const [copied, setCopied] = useState(false);

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

            <ButtonWrapper>
              {/* ---- FIRST TWO ROWS: 2 × 2 grid ---- */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "14px",
                  width: "100%",
                }}
              >
                {link && (
                  <FirstButtonWrapper>
                    <div className="sample-menu btn-wrapper">
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
                    <div className="sample-menu btn-wrapper">
                      <Link href={link2.target}>
                        <a>
                          <Button btnType="solid">{link2.title}</Button>
                        </a>
                      </Link>
                    </div>
                  </FirstButtonWrapper>
                )}

                {link3 && (
                  <FirstButtonWrapper>
                    <div className="sample-menu btn-wrapper">
                      <Link href={link3.target}>
                        <a>
                          <Button btnType="solid">{link3.title}</Button>
                        </a>
                      </Link>
                    </div>
                  </FirstButtonWrapper>
                )}

                {/* Instagram as 4th button so it pairs with the 3rd */}
                <FirstButtonWrapper>
                  <div className="sample-menu btn-wrapper">
                    <a
                      className="insta"
                      href="https://www.instagram.com/thetentattheendoftheuniverse/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button btnType="solid">Inst</Button>
                    </a>
                  </div>
                </FirstButtonWrapper>
              </div>

              {/* ---- BELOW: keep original full-width buttons ---- */}
              {email && (
                <div className="btn-wrapper-border">
                  <a href={`mailto:${email}`}>
                    <Button
                      btnType={
                        isMobile || email === eatEmail ? "hollow" : "solid"
                      }
                    >
                      {isMobile ? "email" : email}
                    </Button>
                  </a>
                </div>
              )}

              {phone &&
                (isMobile ? (
                  <div className="btn-wrapper-border">
                    <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                      <Button btnType="hollow">call</Button>
                    </a>
                  </div>
                ) : (
                  <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                    <div className="btn-wrapper-border">
                      <Button btnType="hollow">{phone}</Button>
                    </div>
                  </CopyToClipboard>
                ))}
            </ButtonWrapper>

            {copied ? (
              <span
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: 400,
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
