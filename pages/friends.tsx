import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

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
    "@media (minWidth: 500px)": {
      display: "none",
    },

    "div.dynamic-height-adjust": {
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
        <IFrameContainerStyle className="bookings-iframe"
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.sevenrooms.com/reservations/littleportland?client_id=726461756e9725a88ff001a4cae308fd0b5020c074f3e2a8324b11b92c890e1a9154f6d75f5af47a4328f2d005c03c4682b66fe2bcf82664bcbb340e918684fa" width="100%" height="100%"></iframe>',
          }}
          style={style}
        />
        <div className="bookings-body-text">
         <h1 className="bookings-heading-1">Large Groups</h1>
          <ul>
            <li>For larger group bookings of 10 or more, please email us at <a href="mailto:eat@little-portland.com">eat@little-portland.com</a>.</li>
            <li>Large groups can choose from 2 set menu options.<a href="https://www.little-portland.com/menu-options"> Click here</a> to see the menus.</li>
          </ul>
          <h1 className="bookings-heading-2">Bookings &amp; Cancellations</h1>
          <ul>
            <li>We ask that any changes to your reservation be made at least 48 hours before the reservation time in order to avoid a late cancellation fee.</li>
            <li>Late cancellations or no-shows will be subject to a £30pp late cancellation fee.</li>
            <li>Last minute reductions in group sizes may also be charged a cancellation fee.</li>
            <li>Children under the age of 16 are not permitted to enter the venue.</li>
          </ul>
        </div>
      </CenterContainer>
    </>
  );
};

export default Bookings;
