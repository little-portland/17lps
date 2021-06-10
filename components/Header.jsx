import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <h1>
            <span>Just Add</span>
            <span>Marmite</span>
          </h1>
          <h2>Spread The Joy</h2>
        </a>
      </Link>
    </header>
  );
};

export default Header;
