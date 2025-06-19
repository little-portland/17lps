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
            <p>To apply, <a href="mailto:yo@little-portland.com?subject=FOC%20Enquiry">email us</a>.</p>
            <p>Or you can access the club by <a href="https://www.little-portland.com/bookings" target="_blank">booking</a> a dinner table.</p>
            <div className="category">
              <h3>Thursday <span>is</span> Underground</h3>
              <p><span>Thursday Underground</span> kicks off the weekend, showcasing cutting-edge electronic artists at the forefront of the underground scene, bringing together a community deeply rooted in its culture.</p>
            </div>
            <div className="category">
              <h3>Friday <span>is</span> Residents</h3>
              <p><span>Friday Residents</span> bridges Underground and Disco3000, shaping the weekend’s rhythm and flow. Focused on club residents, it brings a sense of familiarity and community—the heartbeat of the weekend.</p>
            </div>
            <div className="category">
              <h3>Saturday <span>is</span> Disco3000</h3>
              <p><span>Disco3000</span> captures the evolving spirit of the disco era. Embracing a soundscape that truly resonates with the soul, it delivers a timeless and uplifting journey—a cosmic finale to the weekend.</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

