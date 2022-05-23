import React from "react";
import Head from "next/head";

//hooks
import useDeviceDetect from "@utils/useDeviceDetect";

import CenterContainer from "@components/UX/CenterContainer/CenterContainer";
import { IFrameContainerStyle } from "@components/UX/CenterContainer/styles";

const Bookings = () => {
  //Check Device
  const { isMobile } = useDeviceDetect();

  const style = {
    width: isMobile ? "100%" : "32%",
    height: "80vh",
    display: "grid",
    placeItems: "center",
    "@media (min-width: 500px)": {
      display: "none",
    },
  };

  return (
    <>
      <Head>
        <title>Bookings</title>
      </Head>

      <CenterContainer>
        <IFrameContainerStyle
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://tableagent.com/iframe/tassen/" style="border:0px none;" width="100%" height="100%"> </iframe>',
          }}
          style={style}
        />
      </CenterContainer>
    </>
  );
};

export default Bookings;
