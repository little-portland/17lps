//Components
// import Canvas from "@components/Canvas";

//styles
import { MainStyle } from "./styles";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  return (
    <div className="layout">
      {/* <Header /> */}
      {/* <Canvas /> */}
      <MainStyle>{main}</MainStyle>
    </div>
  );
};

export default Layout;
