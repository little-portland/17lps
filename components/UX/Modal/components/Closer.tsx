import Image from "next/image";

import { CloserStyle, Close } from "../styles";

interface SidebarProps {
  close: () => void;
}

const Closer: React.FC<SidebarProps> = ({ close }) => {
  // console.log(close);
  return (
    <CloserStyle onClick={close}>
      <Image
        src="/Web_assets/exitbutton.svg"
        alt="close"
        width="50"
        height="50"
        layout="responsive"
      />
    </CloserStyle>
  );
};

export default Closer;
