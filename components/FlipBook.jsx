```jsx
"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

  // ---------- Size ----------
  const baseWidth = 400;
  const baseHeight = 600;

  const pageWidth = baseWidth * 1.15;
  const pageHeight = baseHeight * 1.15;

  return (
    <div className="flipbook-wrapper">

      {/* Instruction */}
      <p className="flip-hint">
        Click or drag page corner to flip →
      </p>

      <div className="book-container">

        {/* CENTER GUTTER SHADOW */}
        {!isMobile && <div className="book-gutter" />}

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
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={!isMobile}
            drawShadow={true}
            flippingTime={800}
            startPage={0}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            swipeDistance={30}
            showPageCorners={true}
            className="flip-book"
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div key={index} className="page">

                {/* Curl hint */}
                <div className="curl-hint" />

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

      {/* ---------- STYLES ---------- */}
      <style jsx global>{`

        /* Wrapper */
        .flipbook-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .flip-hint {
          margin-bottom: 20px;
          font-family: monospace;
          font-size: 14px;
          opacity: 0.7;
        }

        /* Book container */
        .book-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* ---------- CENTER GUTTER ---------- */

        .book-gutter {
          position: absolute;
          width: 80px;
          height: 100%;
          pointer-events: none;
          z-index: 5;

          background: linear-gradient(
            to right,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.18) 15%,
            rgba(0,0,0,0.08) 35%,
            rgba(0,0,0,0.02) 50%,
            rgba(0,0,0,0.08) 65%,
            rgba(0,0,0,0.18) 85%,
            rgba(0,0,0,0.25) 100%
          );

          filter: blur(6px);
          opacity: 0.6;
        }

        /* ---------- PAGE ---------- */

        .page {
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Ensure PDF not transparent */
        .react-pdf__Page {
          background: white;
        }

        /* ---------- CURL HINT ---------- */

        .curl-hint {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .page:hover .curl-hint {
          opacity: 1;
        }

        .curl-hint::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.12) 30%,
            rgba(255,255,255,0.9) 55%,
            rgba(255,255,255,1) 100%
          );
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          box-shadow: -4px 4px 12px rgba(0,0,0,0.2);
        }

        /* Mobile always faint */
        @media (max-width: 768px) {
          .curl-hint {
            opacity: 0.5;
            width: 70px;
            height: 70px;
          }
        }

      `}</style>
    </div>
  );
}
```
