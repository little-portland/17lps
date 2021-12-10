import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header>
      <Link href="/tent">
        <a>
          <h2>17lps</h2>
        </a>
      </Link>
    </header>
  );
};

export default Header;
