"use client";

import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef();

  /* -----------------------------
     Detect screen size
  ----------------------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  /* -----------------------------
     Responsive sizing
     (≈15% larger than before)
  ----------------------------- */
  const pageWidth = isMobile ? 320 : 500;
  const pageHeight = isMobile ? 480 : 720;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#cfa3ad",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      {/* Instruction */}
      <p
        style={{
          marginBottom: 20,
          fontSize: 14,
          letterSpacing: 1,
          color: "#333",
        }}
      >
        Click or drag page corner to flip →
      </p>

      {/* Book wrapper (for spine effect) */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Spine shadow */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 60,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.05), rgba(0,0,0,0.15))",
              zIndex: 5,
              pointerEvents: "none",
              borderRadius: 4,
            }}
          />
        )}

        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            size="stretch"
            minWidth={280}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1200}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={true}
            drawShadow={true}
            flippingTime={900}
            usePortrait={isMobile}   // ← KEY: 1 page on mobile
            startPage={0}
            className="flipbook"
            style={{ margin: "0 auto" }}
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index}
                className="page"
                style={{
                  background: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>

      {/* Extra styling */}
      <style jsx global>{`
        .flipbook {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        }

        .page {
          background: white;
        }

        /* Page edge shading */
        .page:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 12px;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.12),
            transparent
          );
        }
      `}</style>
    </div>
  );
}
