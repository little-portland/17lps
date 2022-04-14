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
      <div style={{ display: "flex" }}>
        <a onClick={openMenu}>
          <Button btnType="solid">Eat</Button>
        </a>
        <a onClick={openLineup}>
          <Button btnType="hollow">Dance</Button>
        </a>
      </div>
      <a onClick={openHire}>
        <Button btnType="solid">Hire</Button>
      </a>
    </MobileButtonWrapper>
  );
};

export default MobileButtons;
