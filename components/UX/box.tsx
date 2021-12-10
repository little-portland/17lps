import React, { useState, useEffect } from "react";

import styles from "./box.module.scss";
//Framer Motion
import { motion } from "framer-motion";

// Transition Animation
const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

import useWindowDimensions from "@utils/useWindowDimensions";

const Panels = () => {
  const [panelComplete, setPanelComplete] = useState(false);
  const [height, setHeight] = React.useState(0);

  // const { width, height } = useWindowDimensions();

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <>
      <motion.div initial="">
        <motion.div
          initial={{ height: height }}
          animate={{
            height: [height, height, 0],
            bottom: [0, 0, height],
          }}
          exit={{
            height: [0, height, 0],
            bottom: [0, 0, height],
          }}
          transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
          style={{ background: panelComplete ? "#e7e7de" : "#e7e7de" }}
          className={styles.leftpanelbackground}
        ></motion.div>
      </motion.div>
    </>
  );
};

export default Panels;
