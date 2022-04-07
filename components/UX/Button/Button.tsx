import React from "react";

//styles
import { Button } from "./styles";

export type ButtonProps = {
  background?: string;
};

const ButtonCTA: React.FC<ButtonProps> = ({ children, background }) => {
  return <Button>{children}</Button>;
};

export default ButtonCTA;
