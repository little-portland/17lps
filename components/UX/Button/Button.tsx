import React from "react";

//styles
import { Button } from "./styles";

export type BtnType = "solid" | "hollow";

export type ButtonProps = {
  btnType: BtnType;
  classes: string;
  onClick?: (input?: any) => void;
};

const ButtonCTA: React.FC<ButtonProps> = ({
  onClick,
  children,
  classes,
  btnType,
}) => {
  return (
    <Button className={classes} onClick={onClick} btnType={btnType}>
      {children}
    </Button>
  );
};

export default ButtonCTA;
