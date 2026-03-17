import dynamic from "next/dynamic";

// Disable SSR (flipbook needs browser)
const FlipBook = dynamic(
  () => import("../components/FlipBook"),
  { ssr: false }
);

export default function EbookPage() {
  return (
    <div style={{ padding: 40 }}>
      <FlipBook />
    </div>
  );
}
