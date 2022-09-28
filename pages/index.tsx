import { useLoaded } from "../store/context";

//Components
import Animation from "@components/Animation";
import Layout from "@components/Layout";
import { AnimatePresence } from "framer-motion";

<link
href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
rel="stylesheet"
/>

//hooks
import useFetchContent from "@utils/useFetchContent";

export default function Index({ eatItem, hireItem }) {
  const { isLoaded, setLoaded } = useLoaded();
  return (
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
