import React from "react";

//styles
import { Button } from "./styles";

export type BtnType = "solid" | "hollow";

export type ButtonProps = {
  btnType: BtnType;
  onClick?: (input?: any) => void;
};

const ButtonCTA: React.FC<ButtonProps> = ({ onClick, children, btnType }) => {
  return (
    <Button onClick={onClick} btnType={btnType}>
      {children}
    </Button>
  );
};

export default ButtonCTA;
