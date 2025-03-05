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
         <h1 className="bookings-heading-0">DINNER RESERVATIONS</h1>
          <ul>
            <li>For all dinner reservations in the Tent, we have a specially designed set menu curated by John Javier and Zen Ong. Available until the end of June. </li>
            <li>Please note, we cannot cater to any dietary requirements for this special menu. </li>
            <li>Cancellations within 48 hours prior to your dinner reservation, group reduction size or no-shows will be subject to a £30 per person cancellation fee. </li>
            <li>For large groups of 6 of more guests, or any changes to reservations, please contact <a href="mailto:eat@little-portland.com">eat@little-portland.com</a> </li>
          </ul>
          
          <h1 className="bookings-heading-1">CHEF’S STUDIO</h1>
          <ul>
            <li>The Chef’s Studio is a private dining space located beneath the Tent and can cater between 6 - 12 guests at 8pm between Thursdays - Saturdays </li>
            <li>To confirm a reservation, we will require a credit card guarantee. This will only be chargeable at £30 per person in the event of a cancellation, late reductions in group size (within 7 days), or no-show on the day of the reservation.</li>
            <li>We unfortunately cannot cater to any dietary requirements.</li>
            <li>To book or modify an existing reservation, please contact <a href="mailto:eat@little-portland.com">eat@little-portland.com</a></li>
          </ul>

          <h1 className="bookings-heading-1">PRIVATE HIRE + PRIVATE DINING</h1>
          <ul>
            <li>Both The Tent and Studio are available for private hire. Contact <a href="mailto:yo@little-portland.com">yo@little-portland.com</a> for more information.</li>
            <li>We also offer canapés for Tent or Full venue exclusive events. </li>
          </ul>
          
          <h1 className="bookings-heading-2">MISCELLANEOUS</h1>
          <ul>
            <li>All menus are subject to change per each override special guest chef curated menu. </li>
            <li>Anyone under the age of 18 is not permitted to enter the venue. </li>
            <li>Dogs are not permitted to enter the venue. </li>
            <li>No photos or videos are permitted to be taken inside the venue. </li>
            <li>Reservations can be made two months in advance.</li>
            <li>We have a relaxed casual dress code.</li>
          </ul>
        </div>

      </CenterContainer>
    </>
  );
};

export default Bookings;
