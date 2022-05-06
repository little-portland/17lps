import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { format, compareAsc } from "date-fns";

//components
import Modal from "@components/UX/Modal";

//styles
import { FlyerGridContainer, Text } from "./styles";

//Lib
import mapDays from "./lib/mapDays";

type Image = {
  url: string;
  width: number;
  height: number;
  title: string;
  description?: string;
};

export type Flyer = {
  date: string;
  entryTitle?: string;
  image: Image;
};

interface FlyerGridProps {
  flyers: Flyer[];
}

const FlyerGrid: React.FC<FlyerGridProps> = ({ flyers }) => {
  const [selectedImage, setSelectedImage] = useState<Image>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal open={openModal} close={closeModalHandler}>
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.title}
            className={"image"}
            width={selectedImage.width} //automatically provided
            height={selectedImage.height} //automatically provided
            blurDataURL={"/images/Eat.jpeg"} //automatically provided
            placeholder="blur" // Optional blur-up while loading
          />
        )}
        {/* <h1>{JSON.stringify(selectedImage)}</h1> */}
      </Modal>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        <FlyerGridContainer style={openModal ? { opacity: 0 } : { opacity: 1 }}>
          {flyers.map((flyer, idx) => {
            const utcDate = new Date(flyer.date);
            const weekday = utcDate.getUTCDay();

            const dayOfWeek = mapDays(weekday);
            return (
              <div
                key={idx}
                onClick={() => {
                  setOpenModal(!openModal);
                  setSelectedImage(flyer.image);
                }}
                style={{
                  position: "relative",
                  width: "fit-content",
                }}
              >
                <Text>
                  {dayOfWeek} [{format(utcDate, "dd.MM.yy")}]
                </Text>
                <Image
                  src={flyer.image.url}
                  alt={flyer.image.title}
                  className={"image"}
                  width={flyer.image.width} //automatically provided
                  height={flyer.image.height} //automatically provided
                  blurDataURL={"/images/April_30th.jpg"} //automatically provided
                  placeholder="blur" // Optional blur-up while loading
                />
              </div>
            );
          })}
        </FlyerGridContainer>
      </motion.div>
    </>
  );
};

export default FlyerGrid;
