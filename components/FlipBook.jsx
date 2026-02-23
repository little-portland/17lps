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

  // ---------- Screen detection ----------
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------- Original PDF ratio ----------
  const baseWidth = 1080;
  const baseHeight = 1325;

  // ---------- Responsive scaling ----------
  const scale = isMobile ? 0.95 : 0.55; 
  // Desktop ≈ double your previous size
  // Mobile fills screen nicely

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  // ---------- Center logic ----------
  const isCover =
    currentPage === 0 || currentPage === numPages - 1;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden", // 🚫 no vertical scroll
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Instruction */}
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

      {/* ---------- Book wrapper (for centering animation) ---------- */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: isCover ? "center" : "center",
          transition: "all 0.6s ease",
        }}
      >
        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            size="fixed"
            minWidth={pageWidth}
            maxWidth={pageWidth * 2}
            minHeight={pageHeight}
            maxHeight={pageHeight * 2}
            drawShadow={true}
            flippingTime={800}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={!isMobile}
            usePortrait={isMobile}
            startPage={0}
            clickEventForward={true}
            swipeDistance={30}
            showPageCorners={true}
            maxShadowOpacity={0.3}
            style={{
              margin: "0 auto",
            }}
            onFlip={(e) => setCurrentPage(e.data)}
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{
                  backgroundColor: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  height={pageHeight}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>
    </div>
  );
}
