import React from "react";
import { useRouter } from "next/router";

const FourOhFour = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/");
  }, []);

  return <div>404</div>;
};

export default FourOhFour;
