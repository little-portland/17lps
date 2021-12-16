//Components
import Canvas from "@components/Canvas";

//styles
import { MainStyle } from "./styles";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  return (
    <>
      {/* <Header /> */}
      {/* <Canvas /> */}
      <MainStyle>{main}</MainStyle>
    </>
  );
};

export default Layout;
