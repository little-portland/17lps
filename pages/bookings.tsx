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
        <IFrameContainerStyle className="bookings-iframe"
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.sevenrooms.com/reservations/littleportland?default_date=yyyy-mm-06&default_time=21:00&default_party_size=4" style="border:0px none;" width="100%" height="100%"> </iframe>',
          }}
          style={style}
        />
        <div className="bookings-body-text"> 
        <h1 className="bookings-heading-0">LARGE GROUPS</h1>
          <ul>
            <li>For group reservations for 10 persons or more, please email us at <a href="mailto:eat@little-portland.com">eat@little-portland.com</a>.</li>
            <li>We can cater for groups of up to 34 in The Tent, or 12 in the Chef’s Studio.</li>
            <li>Large groups can choose from 2 set menu options. <a href="https://www.little-portland.com/large-group-bookings-menu" target="_blank">Click here</a> to see sample menus.</li>
            <li>To confirm a reservation, we require a deposit equal to 50% of the set menu price, per person.</li>
            <li>Cancellations within 10 days of your dinner reservation or no-shows will be subject to a late cancellation fee equal to the deposit paid.</li>
            <li>Reductions in group sizes within 10 days of your reservation time will also result in late cancellation fees being charged.</li>
          </ul>
          
          <h1 className="bookings-heading-1">CHEF’S STUDIO</h1>
          <ul>
            <li>The Chef’s Studio follows a set menu format with a choice between our <a href="https://www.little-portland.com/regular-set-menu" target="_blank">standard</a> and <a href="https://www.little-portland.com/premium-set-menu" target="_blank">premium</a> menus.</li>
            <li>To confirm a reservation, we require a £40 per person deposit redeemable towards your final bill.</li>
            <li>Cancellations within 10 days of your dinner reservation or no-shows will be subject to a £40 per person cancellation fee.</li>
            <li>Reductions in group sizes within 10 days of your reservation time will also result in late cancellation fees being charged.</li>
            <li>Reservations can be made for a minimum group size of 8 and maximum 12 between Wednesdays – Saturdays.</li>
            <li>Reservations must be made at least 7 days in advance.</li>
            <li>Please let us know in advance for any specific dietary requirements within the group.</li>
            <li>For more information, to make a reservation or modify an existing one, contact <a href="mailto:eat@little-portland.com">eat@little-portland.com</a></li>
          </ul>

          <h1 className="bookings-heading-1">PRIVATE HIRE + PRIVATE DINING</h1>
          <ul>
            <li>Both The Tent and Studio are available for private hire. Contact <a href="mailto:yo@little-portland.com">yo@little-portland.com</a> for more information.</li>
            <li>Large groups dining with us, must be on a chosen set menu per person.</li>
            <li>We also offer canapés for private events. <a href="https://www.little-portland.com/canape-menu" target="_blank">Click here</a> to see the sample canapé menu.</li>
            <li>We are able to cater for Private Dining requests for groups of up to 12 in the Chef’s Studio (see details above).</li>
          </ul>

         <h1 className="bookings-heading-1">CANCELLATION POLICY FOR GROUP SIZES OF LESS THAN 10</h1>
          <ul>
            <li>To confirm a reservation, we require a credit card guarantee.</li>
            <li>Cancellations within 48 hours of your dinner reservation or no-shows will be subject to a £30pp late cancellation fee.</li>
            <li>For any changes to reservations, or for further information, contact <a href="mailto:eat@little-portland.com">eat@little-portland.com</a></li>
            <li>Reductions in group sizes within 48 hours of your reservation time will also result in late cancellation fees.</li>
          </ul>
          
          <h1 className="bookings-heading-2">MISCELLANEOUS</h1>
          <ul>
            <li>All menus are subject to change depending on availability.</li>
            <li>Anyone under the age of 18 is not permitted to enter the venue.</li>
            <li>Dogs are not permitted to enter the venue.</li>
            <li>No photos or videos are permitted to be taken inside the venue.</li>
            <li>Reservations can be made two months in advance.</li>
            <li>All menus are subject to change depending on availability.</li>
            <li> For any changes to reservations, or for further information, contact <a href="mailto:eat@little-portland.com">eat@little-portland.com</a>.</li>
          </ul>
        </div>

      </CenterContainer>

      <Script
        src="https://www.sevenrooms.com/reservations/embed.js"
        onLoad={() => {
          console.log("loaded sevenrooms");
          // SevenroomsWidget.init({
          //   venueId: "littleportland",
          //   triggerId: "sr-res-root", // id of the dom element that will trigger this widget
          //   type: "reservations", // either 'reservations' or 'waitlist' or 'events'
          //   styleButton: true, // true if you are using the SevenRooms button
          //   clientToken: "", //(Optional) Pass the api generated clientTokenId here
          // });
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
