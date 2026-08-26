import React from "react";

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
          justifyContent: "space-between",
        }}
      >
        <a onClick={openLineup}>
          <Button btnType="solid">Dance</Button>
        </a>

        <a onClick={openHire}>
          <Button btnType="solid">Hire</Button>
        </a>
      </div>
    </MobileButtonWrapper>
  );
};

export default MobileButtons;
