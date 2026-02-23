"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// Required for Next.js / Vercel
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [bookWidth, setBookWidth] = useState(400);

  // Responsive width
  useEffect(() => {
    function handleResize() {
      const maxWidth = 500; // max desktop size
      const padding = 40;   // side spacing
      const availableWidth = window.innerWidth - padding;

      setBookWidth(Math.min(availableWidth, maxWidth));
    }

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const bookHeight = bookWidth * 1.4; // keeps nice book ratio

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <HTMLFlipBook
          width={bookWidth}
          height={bookHeight}
          showCover={true}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div key={index}>
              <Page
                pageNumber={index + 1}
                width={bookWidth}
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
