import React from "react";
import Link from "next/link";

import Button from "../Button";

// styles
import { MobileButtonWrapper } from "./styles";

// hooks
import { useUI } from "@components/UX/context";

const MobileButtons = () => {
  const {
    displayLineup,
    closeLineup,
    openLineup,
    displayHire,
    closeHire,
    openHire,
  } = useUI();

  return (
    <MobileButtonWrapper>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <a onClick={openLineup}>
          <Button btnType="solid">Dance</Button>
        </a>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Link href="/events">
          <Button btnType="hollow">Events</Button>
        </Link>

        <a onClick={openHire}>
          <Button btnType="hollow">Hire</Button>
        </a>
      </div>
    </MobileButtonWrapper>
  );
};

export default MobileButtons;
