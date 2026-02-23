"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(400);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function resize() {
      const mobileBreakpoint = 768;
      const mobile = window.innerWidth < mobileBreakpoint;

      setIsMobile(mobile);

      const padding = 40;

      if (mobile) {
        // Single page takes most of screen
        setPageWidth(window.innerWidth - padding);
      } else {
        // Spread mode (2 pages)
        const spreadWidth = window.innerWidth - 100;
        setPageWidth(spreadWidth / 2);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pageHeight = pageWidth * 1.4;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
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
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          showCover={true}
          usePortrait={isMobile}   // 🔥 THIS is the key
          autoSize={true}
          drawShadow={true}
          maxShadowOpacity={0.4}
          mobileScrollSupport={true}
          style={{ margin: "0 auto" }}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f2ea",
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
  );
}
