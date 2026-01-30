import dynamic from "next/dynamic";

export default dynamic(() => import("./TestPageClient"), {
  ssr: false,
});
