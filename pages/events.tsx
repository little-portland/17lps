import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

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

  const style = {
    width: isMobile ? "100%" : "32%",
    height: isMobile ? "70%" : "80%",
    display: "grid",
    placeItems: "center",
    "@media (min-width: 500px)": {
      display: "none",
    },
  };

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
      <h1>
        Public Events Program <br/>
        <span>[For the private events program, <br/> Friends of the Club should see the latest What’s On email]</span>
      </h1>
        <IFrameContainerStyle
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.sevenrooms.com/events/littleportland" style="border:0px none;" width="100%" height="100%"> </iframe>',
          }}
          style={style}
        />
        <ButtonWrapper>
          <FirstButtonWrapper>
            <a href={"/bookings"} >
                <Button btnType="solid">Reservations</Button>
            </a>
          </FirstButtonWrapper>
          <a href={"/menu"} >
              <Button btnType="solid">Menu</Button>
          </a>
          <a href={"mailto:eat@little-portland.com"} >
              <Button btnType="hollow">eat@little-portland.com</Button>
          </a>
          <Button btnType="hollow">+44 20 3848 7430</Button>
        </ButtonWrapper>
      </CenterContainer>
    </>
  );
};

export default Bookings;
