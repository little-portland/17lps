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

// ---------- Detect screen ----------
useEffect(() => {
const handleResize = () => {
setIsMobile(window.innerWidth < 768);
};

```
handleResize();
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
```

}, []);

// ---------- Size (15% larger than original) ----------
const baseWidth = 400;
const baseHeight = 600;

const pageWidth = baseWidth * 1.15;
const pageHeight = baseHeight * 1.15;

return ( <div className="flipbook-wrapper">

```
  {/* Instruction */}
  <p className="flipbook-instruction">
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
      maxShadowOpacity={0.3}
      showCover={true}
      mobileScrollSupport={true}
      useMouseEvents={!isMobile}
      drawShadow={true}
      flippingTime={800}
      usePortrait={isMobile}
      startPage={0}
      autoSize={true}
      clickEventForward={true}
      swipeDistance={30}
      showPageCorners={true}
      style={{ margin: "0 auto" }}
    >

      {Array.from(new Array(numPages || 0), (_, index) => (
        <div key={index} className="page-wrapper">

          {/* Page content */}
          <div className="page-content">
            <Page
              pageNumber={index + 1}
              width={pageWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </div>

          {/* Edge shading */}
          <div className="page-gradient page-gradient-left" />
          <div className="page-gradient page-gradient-right" />

          {/* Curl hint */}
          <div className="page-curl-hint" />

        </div>
      ))}

    </HTMLFlipBook>
  </Document>

  {/* ---------- STYLES ---------- */}
  <style jsx>{`

    .flipbook-wrapper {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .flipbook-instruction {
      margin-bottom: 20px;
      font-family: monospace;
      font-size: 14px;
      opacity: 0.7;
    }

    /* Page base */
    .page-wrapper {
      position: relative;
      background: #fff;
      overflow: hidden;
    }

    .page-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
    }

    /* Edge shading */
    .page-gradient {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 40px;
      pointer-events: none;
      z-index: 5;
    }

    .page-gradient-left {
      left: 0;
      background: linear-gradient(
        to right,
        rgba(0,0,0,0.18),
        rgba(0,0,0,0.08),
        transparent
      );
    }

    .page-gradient-right {
      right: 0;
      background: linear-gradient(
        to left,
        rgba(0,0,0,0.12),
        rgba(0,0,0,0.05),
        transparent
      );
    }

    /* Page curl hint */
    .page-curl-hint {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 90px;
      height: 90px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 6;
      background: linear-gradient(
        135deg,
        rgba(0,0,0,0.18) 0%,
        rgba(0,0,0,0.08) 35%,
        rgba(255,255,255,0.6) 60%,
        transparent 75%
      );
      clip-path: polygon(100% 0, 0 100%, 100% 100%);
    }

    @media (hover: hover) {
      .page-wrapper:hover .page-curl-hint {
        opacity: 1;
      }
    }

  `}</style>

</div>
```

);
}
