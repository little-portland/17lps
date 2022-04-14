import React from "react";

//styles
import { Button } from "./styles";

export type BtnType = "solid" | "hollow";

export type ButtonProps = {
  btnType: BtnType;
};

const ButtonCTA: React.FC<ButtonProps> = ({ children, btnType }) => {
  return <Button btnType={btnType}>{children}</Button>;
};

export default ButtonCTA;
