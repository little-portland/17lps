"use client";

import { useState, useEffect, useRef } from "react";
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

  const bookRef = useRef();

  // Responsive sizing
  useEffect(() => {
    function resize() {
      const maxWidth = 900;
      const padding = 40;
      const screenWidth = window.innerWidth - padding;

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

  // Navigation
  const nextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Flip hint */}
      <div style={{ color: "#666", fontSize: 14 }}>
        Click or drag page corner to flip →
      </div>

      {/* Book */}
      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={bookSize.width}
          height={bookSize.height}
          showCover={true}
          drawShadow={false}
          flippingTime={800}
          useMouseEvents={true}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
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

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <button onClick={prevPage}>← Prev</button>
        <span>
          {numPages ? `1 / ${numPages}` : "Loading…"}
        </span>
        <button onClick={nextPage}>Next →</button>
      </div>
    </div>
  );
}
