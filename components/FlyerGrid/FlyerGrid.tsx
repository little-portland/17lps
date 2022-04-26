import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

//components
import Modal from "@components/UX/Modal";

//styles
import { FlyerGridContainer, Text } from "./styles";

export type Flyer = {
  url: string | any;
  date: string;
  day: string;
};

interface FlyerGridProps {
  flyers: Flyer[];
}

const FlyerGrid: React.FC<FlyerGridProps> = ({ flyers }) => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal open={openModal} close={closeModalHandler}>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={"description"}
            className={"image"}
            //width={400} //automatically provided
            //height={800} //automatically provided
            blurDataURL={"/images/Eat.jpeg"} //automatically provided
            placeholder="blur" // Optional blur-up while loading
          />
        )}
        {/* <h1>{JSON.stringify(selectedImage)}</h1> */}
      </Modal>
      {!openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
        >
          <FlyerGridContainer>
            {flyers.map((flyer, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setOpenModal(!openModal);
                    setSelectedImage(flyer.url);
                  }}
                  style={{
                    position: "relative",
                    width: "fit-content",
                  }}
                >
                  <Text>
                    {flyer.day} [{flyer.date}]
                  </Text>
                  <Image
                    src={flyer.url}
                    alt={"description"}
                    className={"image"}
                    //width={400} //automatically provided
                    //height={800} //automatically provided
                    blurDataURL={"/images/Eat.jpeg"} //automatically provided
                    placeholder="blur" // Optional blur-up while loading
                  />
                </div>
              );
            })}
          </FlyerGridContainer>
        </motion.div>
      )}
    </>
  );
};

export default FlyerGrid;
