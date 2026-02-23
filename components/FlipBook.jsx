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

  // ---------- Screen detection ----------
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------- LOCK BODY SCROLL ----------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ---------- Original PDF ratio ----------
  const baseWidth = 1080;
  const baseHeight = 1325;
  const ratio = baseHeight / baseWidth;

  // ---------- Viewport ----------
  const vw =
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh =
    typeof window !== "undefined" ? window.innerHeight : 900;

  // ---------- Scaling ----------
  let pageWidth;
  let pageHeight;

  if (isMobile) {
    // Fit WIDTH on mobile (prevents cropping)
    pageWidth = vw * 0.9;
    pageHeight = pageWidth * ratio;
  } else {
    // Fit HEIGHT on desktop
    const scale = (vh * 0.85) / baseHeight;
    pageWidth = baseWidth * scale;
    pageHeight = baseHeight * scale;
  }

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#cfa3b1",
      }}
    >
      {/* ---------- Instruction ---------- */}
      <p
        style={{
          marginBottom: "16px",
          fontFamily: "monospace",
          fontSize: "18px",
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {isMobile
          ? "Tap page edge or swipe to flip"
          : "Click or drag page corner to flip"}
      </p>

      {/* ---------- Stage ---------- */}
      <div
        style={{
          width: "100%",
          height: pageHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
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
            maxHeight={pageHeight}
            drawShadow={true}
            flippingTime={800}
            usePortrait={isMobile}          // ✅ Single page mobile
            useMouseEvents={!isMobile}      // ✅ Touch safe
            mobileScrollSupport={true}     // ✅ Swipe enabled
            clickEventForward={true}       // ✅ Tap flip
            swipeDistance={30}
            showPageCorners={!isMobile}    // Hide on mobile
            startPage={0}
            style={{ margin: "0 auto" }}
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fff",
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
    </div>
  );
}
