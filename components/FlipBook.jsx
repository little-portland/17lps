"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [bookSize, setBookSize] = useState({
    width: 450,
    height: 630,
  });

  // Responsive spread sizing
  useEffect(() => {
    function resize() {
      const maxSpread = 1000;
      const padding = 40;
      const screenWidth = window.innerWidth - padding;

      // Two-page spread
      const pageWidth = Math.min(screenWidth / 2, 450);
      const pageHeight = pageWidth * 1.4;

      setBookSize({
        width: pageWidth,
        height: pageHeight,
      });
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      {/* Flip hint */}
      <div
        style={{
          marginBottom: 20,
          fontSize: 14,
          color: "#444",
          letterSpacing: 1,
        }}
      >
        Click or drag page corner to flip →
      </div>

      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          showCover={true}
          drawShadow={true}          // restore flip realism
          maxShadowOpacity={0.5}     // soften shadow
          flippingTime={900}
          useMouseEvents={true}
          mobileScrollSupport={true}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff", // prevents transparency bleed
                width: "100%",
                height: "100%",
              }}
            >
              <Page
                pageNumber={index + 1}
                width={bookSize.width}
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
