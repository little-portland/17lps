import { useState } from "react";
import Layout from "@components/Layout/Layout";
import { AnimatePresence } from "framer-motion";
import Animation from "@components/Animation";
import { useLoaded } from "../store/context";

// Import Modal and test content
import Modal from "@components/UX/Modal";
import Image from "next/image";
import dancePic from "../public/images/Dance.jpeg";

// ✅ Mock data based on your Layout props
const mockEatItem = {
  image: {
    url: "/images/Eat.jpeg",
    width: 800,
    height: 600,
    description: "Mock Eat Image",
  },
  eMail: "eat@example.com",
  phoneNumber: "1234567890",
};

const mockHireItem = {
  image: {
    url: "/images/hire-page-collage.jpg",
    width: 800,
    height: 600,
    description: "Mock Hire Image",
  },
  eMail: "hire@example.com",
  phoneNumber: "0987654321",
};

export default function LayoutTestPage() {
  const { isLoaded, setLoaded } = useLoaded();
  const [showDanceModal, setShowDanceModal] = useState(false);

  return (
    <>
      <Layout
        main={
          <>
            <AnimatePresence>
              <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
            </AnimatePresence>

            {/* 🟡 Test Button Overlay */}
            <div
              style={{
                position: "fixed",
                top: "2rem",
                right: "2rem",
                zIndex: 9999,
                background: "#000",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
              }}
            >
              <button
                onClick={() => setShowDanceModal(true)}
                style={{
                  color: "#fff",
                  fontSize: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Open DANCE Modal (Test Only)
              </button>
            </div>
          </>
        }
        eatItem={mockEatItem}
        hireItem={mockHireItem}
      />

      {/* 🎬 DANCE Modal (Test Only) */}
      <Modal open={showDanceModal} close={() => setShowDanceModal(false)}>
        <div className="eat-note"
          style={{
            backgroundColor: "#092834",
            border: "20px solid #092834",
            boxShadow: "inset 0px 2px 169px rgba(0, 0, 0, 1)", // inner shadow
            backgroundImage: "url('/images/dance_bg_image.png')", // optional
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Scrollable content starting from halfway down */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "2rem",
              marginTop: "30px", // start content from middle
              color: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Test DANCE Modal</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              eget sapien eget sem feugiat imperdiet. Donec porttitor, velit ut
              vehicula aliquet, orci erat dapibus erat, nec ullamcorper nisl risus
              sit amet ante.
            </p>
            <p>
              Curabitur nec justo lorem. Quisque eget tincidunt lectus. Duis sed
              fermentum justo. Etiam ac nisl mattis, semper arcu at, dictum nunc.
            </p>
                        <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              eget sapien eget sem feugiat imperdiet. Donec porttitor, velit ut
              vehicula aliquet, orci erat dapibus erat, nec ullamcorper nisl risus
              sit amet ante.
            </p>
            <p>
              Curabitur nec justo lorem. Quisque eget tincidunt lectus. Duis sed
              fermentum justo. Etiam ac nisl mattis, semper arcu at, dictum nunc.
            </p>
                        <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              eget sapien eget sem feugiat imperdiet. Donec porttitor, velit ut
              vehicula aliquet, orci erat dapibus erat, nec ullamcorper nisl risus
              sit amet ante.
            </p>
            <p>
              Curabitur nec justo lorem. Quisque eget tincidunt lectus. Duis sed
              fermentum justo. Etiam ac nisl mattis, semper arcu at, dictum nunc.
            </p>
                        <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              eget sapien eget sem feugiat imperdiet. Donec porttitor, velit ut
              vehicula aliquet, orci erat dapibus erat, nec ullamcorper nisl risus
              sit amet ante.
            </p>
            <p>
              Curabitur nec justo lorem. Quisque eget tincidunt lectus. Duis sed
              fermentum justo. Etiam ac nisl mattis, semper arcu at, dictum nunc.
            </p>
                        <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              eget sapien eget sem feugiat imperdiet. Donec porttitor, velit ut
              vehicula aliquet, orci erat dapibus erat, nec ullamcorper nisl risus
              sit amet ante.
            </p>
            <p>
              Curabitur nec justo lorem. Quisque eget tincidunt lectus. Duis sed
              fermentum justo. Etiam ac nisl mattis, semper arcu at, dictum nunc.
            </p>
            {/* Add more paragraphs or elements here to test scroll */}
          </div>
        </div>
      </Modal>
    </>
  );
}

