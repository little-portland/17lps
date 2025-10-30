import Link from "next/link";
import styles from "./HoverImageLink.module.css";

type Props = {
  href: string;
  img: string;
  hoverImg: string;
  aspect?: string;
  ariaLabel?: string;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export default function HoverImageLink({
  href,
  img,
  hoverImg,
  aspect = "2048 / 594",
  ariaLabel,
  className,
  target,
}: Props) {
  const merged = `${styles.imageLink} ${className ?? ""}`;
  const style: React.CSSProperties = {
    ["--img" as any]: `url(${img})`,
    ["--imgHover" as any]: `url(${hoverImg})`,
    aspectRatio: aspect,
  };

  // external links (http/https/mailto/tel) → plain <a>
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={merged}
        aria-label={ariaLabel}
        style={style}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      />
    );
  }

  // internal routes → Next <Link> + <a>
  return (
   <Link href={href} passHref>
      <a
        className={merged}
        aria-label={ariaLabel}
        style={style}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      />
    </Link>
  );
}
