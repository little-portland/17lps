"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [bookSize, setBookSize] = useState({ width: 0, height: 0 });
  const bookRef = useRef();

  const ASPECT_RATIO = 1080 / 1325; // ORIGINAL DESIGN RATIO

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const updateSize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const mobile = vw < 768;
      setIsMobile(mobile);

      // MOBILE: fill most of screen height
      if (mobile) {
        const height = vh * 0.9;
        const width = height * ASPECT_RATIO;

        setBookSize({ width, height });
      } else {
        // DESKTOP: use 85% height (much larger)
        const height = vh * 0.85;
        const width = height * ASPECT_RATIO;

        setBookSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#e8bac9",
      }}
    >
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

      {bookSize.width > 0 && (
        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={bookSize.width}
            height={bookSize.height}
            size="fixed"
            showCover={true}
            usePortrait={isMobile}
            mobileScrollSupport={true}
            drawShadow={true}
            flippingTime={800}
            maxShadowOpacity={0.3}
            startPage={0}
            style={{ margin: "0 auto" }}
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
      )}

      <style jsx global>{`
        .react-pdf__Page,
        .react-pdf__Page canvas {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
}
