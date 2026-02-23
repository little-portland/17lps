"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const bookRef = useRef();

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🚫 LOCK ALL PAGE SCROLLING (vertical + horizontal)
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // ---------- YOUR ORIGINAL SIZE (UNCHANGED) ----------
  const baseWidth = 400;
  const baseHeight = 600;

  const pageWidth = baseWidth * 1.15;
  const pageHeight = baseHeight * 1.15;

  // ---------- COVER / LAST PAGE CENTERING ----------
  const getBookTransform = () => {
    if (isMobile) return "translateX(0)";

    if (currentPage === 0) {
      return "translateX(25%)"; // center first page
    }

    if (numPages && currentPage === numPages - 1) {
      return "translateX(-25%)"; // center last page
    }

    return "translateX(0)";
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",            // fill viewport
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",        // prevent scroll
      }}
    >
      {/* Instruction text */}
      <p
        style={{
          marginBottom: "20px",
          fontFamily: "monospace",
          fontSize: "14px",
          opacity: 0.7,
        }}
      >
        Click or drag page corner to flip →
      </p>

      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        {/* CENTERING WRAPPER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* HORIZONTAL SHIFT CONTAINER */}
          <div
            style={{
              transition: "transform 0.6s ease",
              transform: getBookTransform(),
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={pageWidth}
              height={pageHeight}
              size="stretch"
              minWidth={280}
              maxWidth={1200}
              minHeight={420}
              maxHeight={1600}
              maxShadowOpacity={0.3}
              showCover={true}
              mobileScrollSupport={true}
              useMouseEvents={!isMobile}
              drawShadow={true}
              flippingTime={800}
              startPage={0}
              usePortrait={isMobile}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              swipeDistance={30}
              showPageCorners={true}

              // 🧭 TRACK PAGE FOR CENTERING
              onFlip={(e) => setCurrentPage(e.data)}
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        </div>
      </Document>
    </div>
  );
}
