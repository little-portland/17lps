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
        <div className="eat-note dance-popup">
          <div>
            <h2>Open Thursday to Saturday <span>FROM 10PM</span></h2>
            <p>Access to the club is for Friends of the Club only.</p> 
            <p>To apply, email us.</p>
            <p>Or you can access the club by booking a dinner table.</p>
            <h3>Thursday <span>is</span> Underground</h3>
            <p><span>Thursday Underground</span> </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

