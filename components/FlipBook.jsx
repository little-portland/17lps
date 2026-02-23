"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [spreadWidth, setSpreadWidth] = useState(900);

  useEffect(() => {
    function resize() {
      const maxSpread = 1000;
      const padding = 60;
      const width = Math.min(window.innerWidth - padding, maxSpread);
      setSpreadWidth(width);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pageWidth = spreadWidth / 2;
  const pageHeight = pageWidth * 1.4;

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
      {/* Hint */}
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
          width={spreadWidth}
          height={pageHeight}
          showCover={true}
          usePortrait={false}      // FORCE spread mode
          drawShadow={true}
          maxShadowOpacity={0.4}
          size="fixed"
          mobileScrollSupport={true}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f2ea", // paper colour
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "inset 0 0 2px rgba(0,0,0,0.2)",
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
