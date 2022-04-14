import React from "react";

import { Button } from "./styles";

const CloseIcon = () => {
  return (
    <Button>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        style={{
          height: "18px",
          width: "18px",
          padding: "6px",
          border: "solid 3px #5C2C7C",
        }}
      >
        <g fill="#5C2C7C">
          <rect
            x="835.4"
            y="-163.2"
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -424.1547 1024)"
            width="377.1"
            height="2374.5"
          />
        </g>
        <g fill="#5C2C7C">
          <rect
            x="-163.2"
            y="835.4"
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -424.1547 1024)"
            width="2374.5"
            height="377.1"
          />
        </g>
      </svg>
    </Button>
  );
};

export default CloseIcon;
