import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer";
import { IFrameContainerStyle } from "@components/UX/CenterContainer/styles";

import Button from "@components/UX/Button";

import {
  Middle,
  BG,
  Top,
  Grid,
  ButtonWrapper,
  FirstButtonWrapper,
} from "../components/UX/Modal/styles";

const Bookings = () => {
  //Check Device
  const { isMobile } = useDeviceDetect();
  const [copied, setCopied] = useState(false);

  const clickHandler = ({ target: { innerHTML } }) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  const style = {
    width: isMobile ? "100%" : "32%",
    height: isMobile ? "70%" : "80%",
    display: "grid",
    placeItems: "center",
    "@media (min-width: 500px)": {
      display: "none",
    },
  };
  
  const email = "yo@little-portland.com";
  const phone = "+44 20 3848 7430";

  useEffect(() => {
    let SevenroomsWidget;
    
    if (typeof SevenroomsWidget !== "undefined") {
      console.log(SevenroomsWidget);
      SevenroomsWidget.init({
        venueId: "littleportland",
        triggerId: "sr-res-root", // id of the dom element that will trigger this widget
        type: "reservations", // either 'reservations' or 'waitlist' or 'events'
        styleButton: true, // true if you are using the SevenRooms button
        clientToken: "", //(Optional) Pass the api generated clientTokenId here
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bookings</title>
      </Head>

      <CenterContainer>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="events-header">
            Public Events Program <br />
            <span>
              [For the private events program, <br /> Friends of the Club should
              see the latest Program email]
            </span>
          </h1>
          <div>
            <IFrameContainerStyle
              className="events-iframe"
              dangerouslySetInnerHTML={{
                __html:
                  '<iframe src="https://www.sevenrooms.com/events/littleportland" style="border:0px none;" width="100%" height="100%"> </iframe>',
              }}
              // style={style}
            />
          </div>

          <ButtonWrapper className="button-wrapper">
            {email && (
              <a href={`mailto:${email}`}>
                <Button
                  classes="events-button"
                  btnType={isMobile ? "hollow" : "solid"}
                >
                  {isMobile ? "email" : email}
                </Button>
              </a>
            )}
            {phone &&
              (isMobile ? (
                <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                  <Button classes="events-button" btnType="hollow">
                    call
                  </Button>
                </a>
              ) : (
                <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                  <Button
                    classes="events-button"
                    onClick={clickHandler}
                    btnType="hollow"
                  >
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
                marginTop: "1rem"
              }}
            >
              Number copied
            </span>
          ) : null}
        </div>
      </CenterContainer>
    </>
  );
};

export default Bookings;
