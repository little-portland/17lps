import dynamic from "next/dynamic";

const FlipBook = dynamic(() => import("../components/FlipBook"), {
  ssr: false,
});

export default function ExploreMenuPage() {
  return <FlipBook />;
}
