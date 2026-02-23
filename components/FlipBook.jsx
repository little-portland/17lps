"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
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

  // ---------- SIZE CONTROL ----------
  // Base size (your original working size)
  const baseWidth = 400;
  const baseHeight = 600;

  // Increase only 15%
  const pageWidth = baseWidth * 1.15;
  const pageHeight = baseHeight * 1.15;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

          // ---------- KEY LAYOUT FIX ----------
          usePortrait={isMobile}   // 1 page on mobile
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}

          style={{
            margin: "0 auto",
          }}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff", // removes transparency
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
      </Document>
    </div>
  );
}
