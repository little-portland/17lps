"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const bookRef = useRef(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Detect viewport
  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // PDF base ratio
  const baseWidth = 1080;
  const baseHeight = 1325;

  const vw = viewport.width;
  const vh = viewport.height;

  let scale;

  if (isMobile) {
    // Fit ONE page
    scale = Math.min(
      (vw * 0.95) / baseWidth,
      (vh * 0.9) / baseHeight
    );
  } else {
    // Fit SPREAD
    scale = Math.min(
      (vw * 0.9) / (baseWidth * 2),
      (vh * 0.9) / baseHeight
    );
  }

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Instruction */}
      <p
        style={{
          marginBottom: isMobile ? 10 : 16,
          fontFamily: "monospace",
          fontSize: isMobile ? 14 : 20,
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {isMobile
          ? "Tap page edge or swipe to flip →"
          : "Click or drag page corner to flip →"}
      </p>

      {/* Stage = EXACT BOOK WIDTH */}
      <div
        style={{
          width: isMobile ? pageWidth : pageWidth * 2,
          height: pageHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            maxWidth={pageWidth}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            drawShadow={true}
            flippingTime={800}
            usePortrait={isMobile}
            useMouseEvents={true}
            mobileScrollSupport={false}
            swipeDistance={30}
            clickEventForward={true}
            showPageCorners={true}
            showCover={false}
            maxShadowOpacity={0.3}
            style={{
              margin: "0 auto",
              touchAction: "none",
            }}
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
                  width={pageWidth}   // ✅ ONLY width
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
