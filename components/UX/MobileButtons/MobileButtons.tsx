import React from "react";

import Button from "../Button";
//styles
import { MobileButtonWrapper } from "./styles";

//Hooks
import { useUI } from "@components/UX/context";

const MobileButtons = () => {
  const {
    displayLineup,
    closeLineup,
    openLineup,
    openMenu,
    closeMenu,
    displayMenu,
    openHire,
    closeHire,
    displayHire,
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
        <a onClick={openMenu}>
          <Button btnType="solid">Eat</Button>
        </a>
        <a onClick={openLineup}>
          <Button btnType="solid">Dance</Button>
        </a>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <a onClick={openHire}>
          <Button btnType="hollow">Hire</Button>
        </a>
      </div>
    </MobileButtonWrapper>
  );
};

export default MobileButtons;
