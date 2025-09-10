import Link from "next/link";
import styles from "./HoverImageLink.module.css";

type Props = {
  href: string;
  img: string;        // normal image (e.g. "/images/..jpg")
  hoverImg: string;   // hover image  (e.g. "/images/..jpg")
  aspect?: string;    // e.g. "2048 / 594"  (defaults below)
  ariaLabel?: string;
  className?: string;
};

export default function HoverImageLink({
  href,
  img,
  hoverImg,
  aspect = "2048 / 594",     // set this to your banner’s ratio
  ariaLabel,
  className
}: Props) {
  return (
    <Link
      href={href}
      className={`${styles.imageLink} ${className ?? ""}`}
      aria-label={ariaLabel}
      style={
        {
          // CSS custom props used by the CSS module
          ["--img" as any]: `url(${img})`,
          ["--img-hover" as any]: `url(${hoverImg})`,
          aspectRatio: aspect
        } as React.CSSProperties
      }
    />
  );
}
