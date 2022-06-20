import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";
import useScript from "@utils/useScriptTag";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer";
import { IFrameContainerStyle } from "@components/UX/CenterContainer/styles";

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
      // SevenroomsWidget.init({
      //   venueId: "littleportland",
      //   triggerId: "sr-res-root", // id of the dom element that will trigger this widget
      //   type: "reservations", // either 'reservations' or 'waitlist' or 'events'
      //   styleButton: true, // true if you are using the SevenRooms button
      //   clientToken: "", //(Optional) Pass the api generated clientTokenId here
      // });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bookings</title>
      </Head>

      <CenterContainer>
        <IFrameContainerStyle
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.sevenrooms.com/reservations/littleportland" style="border:0px none;" width="100%" height="100%"> </iframe>',
          }}
          style={style}
        />
      </CenterContainer>

      <Script
        src="https://www.sevenrooms.com/reservations/embed.js"
        onLoad={() => {
          console.log("loaded sevenrooms");
          SevenroomsWidget.init({
            venueId: "littleportland",
            triggerId: "sr-res-root", // id of the dom element that will trigger this widget
            type: "reservations", // either 'reservations' or 'waitlist' or 'events'
            styleButton: true, // true if you are using the SevenRooms button
            clientToken: "", //(Optional) Pass the api generated clientTokenId here
          });
        }}
      ></Script>
      {/* <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
        if (SevenroomsWidget) {
          SevenroomsWidget.init({
            venueId: "littleportland",
            triggerId: "sr-res-root", // id of the dom element that will trigger this widget
            type: "reservations", // either 'reservations' or 'waitlist' or 'events'
            styleButton: true, // true if you are using the SevenRooms button
            clientToken: "" //(Optional) Pass the api generated clientTokenId here
        })
        }
  `,
        }}
      /> */}
    </>
  );
};

export default Bookings;
