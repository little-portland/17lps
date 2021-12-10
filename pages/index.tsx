import { useLoaded } from "../store/context";

//Components
import Canvas from "@components/canvas";
import Animation from "@components/Animation";

import { motion } from "framer-motion";

//hooks
import useOnScreen from "@utils/useOnScreen";

export default function Index() {
  const { isLoaded, setLoaded } = useLoaded();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      // exit={{ opacity: 0 }}
      // style={{ marginTop: "60px" }}
    >
      {/* <Canvas /> */}

      <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
    </motion.div>
  );
}
