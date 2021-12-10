import React from "react";

import useFetchContent from "@utils/useFetchContent";
import MenuItem from "@utils/contentTypes/MenuItem";

import { motion } from "framer-motion";

import Link from "next/link";

//Components
import Panels from "@components/UX/box";

type Props = {
  menuItems: MenuItem[];
};

const Tent: React.FC<Props> = ({ menuItems }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        exit={{ opacity: 0 }}
        style={{
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Link href="/" scroll={false}>
          <a>
            <h2>home</h2>
          </a>
        </Link>
        <h1>TENT</h1>
        {menuItems.map(({ title, description, price }) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{price} $</p>
          </div>
        ))}
      </motion.div>
      <Panels />
    </>
  );
};

export async function getStaticProps() {
  const { menuItemCollection } = await useFetchContent(`
  {
    menuItemCollection {
      items {
        title
        description
        price
      }
    }
  }
  `);
  return {
    props: {
      menuItems: menuItemCollection.items,
    },
  };
}

export default Tent;
