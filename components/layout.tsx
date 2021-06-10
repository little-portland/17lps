//Components
import Header from "./Header";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  return (
    <div className="layout">
      <Header />
      <main style={{ minHeight: "calc(100vh -64px)" }}>{main}</main>

      <footer>
        <p>Copyright 2021 Just Add Marmite :)</p>
      </footer>
    </div>
  );
};

export default Layout;
