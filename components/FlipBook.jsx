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

  // ---------- SIZE (15% larger than base) ----------
  const baseWidth = 400;
  const baseHeight = 600;

  const pageWidth = baseWidth * 1.15;
  const pageHeight = baseHeight * 1.15;

  return (
    <div className="flipbook-root">
      <p className="flipbook-hint">
        Click or drag page corner to flip →
      </p>

      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={pageHeight}
          size="stretch"
          minWidth={280}
          maxWidth={1200}
          minHeight={420}
          maxHeight={1600}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={!isMobile}
          drawShadow={true}
          flippingTime={800}
          startPage={0}
          usePortrait={isMobile}
          autoSize={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          style={{ margin: "0 auto" }}
          className="magazine-book"
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div key={index} className="page-wrapper">
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

      {/* ---------- STYLES ---------- */}
      <style jsx global>{`
        /* Root layout */
        .flipbook-root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .flipbook-hint {
          margin-bottom: 20px;
          font-family: monospace;
          font-size: 14px;
          opacity: 0.7;
        }

        /* Page base */
        .page-wrapper {
          position: relative;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden; /* prevents curl overflow glitches */
        }

        /* ---------- GUTTER SHADOW (center fold) ---------- */
        .page-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          pointer-events: none;
          z-index: 5;
          opacity: 0.35;
          transition: opacity 0.3s;
        }

        /* Left page inner shadow */
        .stf__item.--left .page-wrapper::after {
          right: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0)
          );
        }

        /* Right page inner shadow */
        .stf__item.--right .page-wrapper::after {
          left: 0;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0)
          );
        }

        /* ---------- PAGE EDGE DARKEN ---------- */
        .page-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 70%,
            rgba(0, 0, 0, 0.18) 100%
          );
          opacity: 0.25;
        }

        /* ---------- HOVER CURL HINT ---------- */
        .page-wrapper .curl-hint {
          position: absolute;
          width: 80px;
          height: 80px;
          bottom: 0;
          right: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .page-wrapper:hover .curl-hint {
          opacity: 0.9;
        }

        .curl-hint::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(230, 230, 230, 0.6) 40%,
            rgba(0, 0, 0, 0.25) 100%
          );
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
          box-shadow: -6px -6px 12px rgba(0, 0, 0, 0.25);
        }

        /* Hide curl on mobile */
        @media (max-width: 768px) {
          .curl-hint {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
