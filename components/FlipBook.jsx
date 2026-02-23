"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure container width
  useEffect(() => {
    const updateSize = () => {
      setContainerWidth(window.innerWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // --- PAGE SIZING ---
  const basePageWidth = isMobile
    ? Math.min(containerWidth * 0.9, 500)
    : Math.min(containerWidth * 0.42, 650); // 2 pages fit nicely

  // 15% larger than previous baseline
  const pageWidth = basePageWidth * 1.15;
  const pageHeight = pageWidth * 1.414; // A4 ratio

  return (
    <div style={styles.wrapper}>
      <p style={styles.hint}>
        Click or drag page corner to flip →
      </p>

      <div style={styles.bookContainer}>
        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            width={pageWidth}
            height={pageHeight}
            size="stretch"
            minWidth={300}
            maxWidth={900}
            minHeight={400}
            maxHeight={1200}
            maxShadowOpacity={0.25}
            showCover={true}
            useMouseEvents={true}
            mobileScrollSupport={true}
            className="flipbook"
            style={{
              margin: "0 auto",
            }}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={index} className="page">
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

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        .flipbook {
          margin: 0 auto;
        }

        .page {
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Magazine spine shadow */
        .flipbook .page:nth-child(odd)::after {
          content: "";
          position: absolute;
          right: -1px;
          top: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.18),
            rgba(0,0,0,0.05),
            transparent
          );
          pointer-events: none;
        }

        .flipbook .page:nth-child(even)::before {
          content: "";
          position: absolute;
          left: -1px;
          top: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(
            to left,
            rgba(0,0,0,0.18),
            rgba(0,0,0,0.05),
            transparent
          );
          pointer-events: none;
        }

        /* Fix transparent flip */
        .stf__item {
          background: white !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#c79aa5",
    padding: "40px 0",
  },

  hint: {
    marginBottom: "20px",
    fontSize: "14px",
    letterSpacing: "1px",
    opacity: 0.8,
  },

  bookContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};
