import dynamic from "next/dynamic";

const FlipBook = dynamic(() => import("../components/FlipMenu"), {
  ssr: false,
});

export default function ExploreMenuPage() {
  return <FlipBook />;
}
