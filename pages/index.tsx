import { useLoaded } from "../store/context";

//Components
import Animation from "@components/Animation";
import Layout from "@components/Layout";
import { AnimatePresence } from "framer-motion";

//hooks
import useFetchContent from "@utils/useFetchContent";

export default function Index({ eatItem, hireItem }) {
  const { isLoaded, setLoaded } = useLoaded();
  return (
    // <motion.div
    //   initial="initial"
    //   animate="animate"
    //   // exit={{ opacity: 0 }}
    //   // style={{ marginTop: "60px" }}
    // >
    // <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
    // </motion.div>

    <Layout
      main={
        <AnimatePresence exitBeforeEnter>
          <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
        </AnimatePresence>
      }
      eatItem={eatItem}
      hireItem={hireItem}
    />
  );
}

export async function getStaticProps() {
  const imageData = await useFetchContent(`
    {
      eatImageCollection {
        items {
          title
          image {
            title
            description
            url
            width
            height
          }
          eMail
          phoneNumber
        }
      }

      hireImageCollection {
        items {
          title
          image {
            title
            description
            url
            width
            height
          }
          eMail
          phoneNumber
        }
      }
    }
  `);

  const eatItem = imageData.eatImageCollection.items[0];

  const hireItem = imageData.hireImageCollection.items[0];

  return {
    props: {
      eatItem,
      hireItem,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
