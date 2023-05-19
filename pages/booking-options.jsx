import React from "react";
import Head from "next/head";
import Image from "next/image";

//Components
import CenterContainer from "@components/UX/CenterContainer/CenterContainer";

//hooks
import useFetchContent from "@utils/useFetchContent";

import Button from "@components/UX/Button";

const SundayMenu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <title>Sunday Menu</title>
      </Head>

      <CenterContainer>
          <ButtonWrapper className="button-wrapper">
            {email && (
              <a href={`mailto:${email}`}>
                <Button
                  classes="events-button"
                  btnType={isMobile ? "hollow" : "solid"}
                >
                  {isMobile ? "email" : email}
                </Button>
              </a>
            )}
            {phone &&
              (isMobile ? (
                <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                  <Button classes="events-button" btnType="hollow">
                    call
                  </Button>
                </a>
              ) : (
                <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                  <Button
                    classes="events-button"
                    onClick={clickHandler}
                    btnType="hollow"
                  >
                    {phone}
                  </Button>
                </CopyToClipboard>
              ))}
          </ButtonWrapper>
      </CenterContainer>
    </>
  );
};
export default SundayMenu;

export async function getStaticProps() {
  const sundaymenuData = await useFetchContent(`
    {
      sundayMenuCollection {
        items {
          sundayMenuImage {
            title
            description
            url
            width
            height
          }
        }
      }
    }
  `);

  const menuImage =
    sundaymenuData.sundayMenuCollection.items[0].sundayMenuImage;

  return {
    props: {
      menuImage,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds
  };
}
