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

  // Test-only DANCE modal state
  const [showDanceModal, setShowDanceModal] = useState(false);

  return (
    <>
      <Layout
        main={
          <>
            <AnimatePresence>
              <Animation isLoaded={isLoaded} setLoaded={setLoaded} />
            </AnimatePresence>

            {/* 🔘 Button to trigger test modal */}
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <button
                onClick={() => setShowDanceModal(true)}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
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

      {/* 🪩 Test-only DANCE Modal */}
      <Modal open={showDanceModal} close={() => setShowDanceModal(false)}>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Image
            src={dancePic}
            alt="Dance"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <h2>Test DANCE Modal</h2>
          <p>This is a standalone version of the DANCE modal for testing purposes.</p>
        </div>
      </Modal>
    </>
  );
}
