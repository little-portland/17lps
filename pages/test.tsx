import { useState } from "react";
import { useEffect } from "react";
import Layout from "@components/Layout/Layout-old";
import { AnimatePresence } from "framer-motion";
import Animation from "@components/Animation";
import { useLoaded } from "../store/context";

import { motion } from "framer-motion";

// Import Modal and test content
import Modal from "@components/UX/Modal";
import Image from "next/image";
import dancePic from "../public/images/Dance.jpeg";

// Mock data based on your Layout props 
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

  useEffect(() => {
  // save previous body styles
  const prevBg = document.body.style.backgroundColor;
  const prevColor = document.body.style.color;

  // apply white body for this page
  document.body.style.backgroundColor = "#fff";
  document.body.style.color = "#000";

  // cleanup on unmount
  return () => {
    document.body.style.backgroundColor = prevBg;
    document.body.style.color = prevColor;
  };
}, []);

  return (
    <>
      <Layout
        main={
          <>
          <AnimatePresence>
            {/* FILTERED LAYER */}
            <div className="scene-filter">
              <Animation
                isLoaded={isLoaded}
                setLoaded={setLoaded}
                isTestPage={true}
              />
            </div>

            <svg className="scene-overlay" viewBox="0 0 3840 2160">
              <defs>
                <clipPath id="obelisk-clip">
                  <motion.rect
                    x="2420"
                    y="620"         // START at bottom of obelisk
                    width="175"
                    height="0"
                    initial={{ height: 0 }}
                    animate={{ height: 500 }}
                    transition={{
                      duration: 0.9,
                      delay: 3,
                      ease: [0.2, 0.8, 0.2, 1.05],
                    }}
                  />
                </clipPath>
              </defs>
            
              <image
                href="/images/obelisk.png"
                x="2590"
                y="1020"
                width="175"
                height="500"
                clipPath="url(#obelisk-clip)"
              />
            </svg>

            
          </AnimatePresence>

          </>
        }
        eatItem={mockEatItem}
        hireItem={mockHireItem}
        hideNav={true} // Hide nav for testing purpuses
      />
      

      <Modal open={showDanceModal} close={() => setShowDanceModal(false)} className="dance-modal">
        <div className="eat-note dance-popup">
          <div>
          <div className="cat-wrapper">
            <div class="cat-scroll">
              <h1 className="dance-title">THE CLUB</h1>
              <h2>Open Thursday to Saturday</h2>
              <h3 className="open-time">FROM 10PM</h3>
              <p>Access to the club is for <strong>Friends of the Club</strong> only.</p> 
              <p>To apply to become a <strong>Friend of the Club</strong>, <a href="mailto:yo@little-portland.com?subject=FOC%20Enquiry">email us</a>.</p>
              <p>Or you can access the club by <a href="https://www.little-portland.com/bookings" target="_blank">booking</a> a dinner table.</p>
               <img src="/images/dance-popup-img.jpg" />
                  <div className="category thu">
                    <h3>Thursday <span className="italic-word">is</span> <span className="group-item">Underground</span></h3>
                    <p><span className="group-item">Thursday Underground</span> kicks off the weekend, showcasing cutting-edge electronic artists at the forefront of the underground scene, bringing together a community deeply rooted in its culture.</p>
                  </div>
                  <div className="category fri">
                    <h3>Friday <span className="italic-word">is</span> <span className="group-item">Residents</span></h3>
                    <p><span className="group-item">Friday Residents</span> bridges Underground and Disco3000, shaping the weekend’s rhythm and flow. Focused on club residents, it brings a sense of familiarity and community. The heartbeat of the weekend.</p>
                  </div>
                  <div className="category sat">
                    <h3>Saturday <span className="italic-word">is</span> <span className="group-item">Disco3000</span></h3>
                    <p><span className="group-item">Disco3000</span> captures the evolving spirit of the disco era. Embracing a soundscape that truly resonates with the soul, it delivers a timeless and uplifting journey. A cosmic finale to the weekend.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

