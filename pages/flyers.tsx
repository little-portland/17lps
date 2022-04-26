import React from "react";

import twentyn9ne from "../public/images/April_29th.jpg";
import thirty from "../public/images/April_30th.jpg";

//Components
import FlyerGrid from "@components/FlyerGrid/index";

const flyerTests = [
  { url: twentyn9ne, date: "29.04.22", day: "Friday" },
  { url: thirty, date: "30.04.22", day: "Saturday" },
];

const flyers = () => {
  return <FlyerGrid flyers={flyerTests}></FlyerGrid>;
};

export default flyers;
