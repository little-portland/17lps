import React from "react";

import { CenterContainerStyle } from "./styles";

const CenterContainer: React.FC = ({ children }) => {
  return <CenterContainerStyle>{children}</CenterContainerStyle>;
};

export default CenterContainer;
