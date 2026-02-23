"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const bookRef = useRef();

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // ---------- Viewport ----------
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      setViewport({ width: w, height: h });
      setIsMobile(w < 768);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---------- Lock scroll ----------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ---------- Base PDF size ----------
  const baseWidth = 1080;
  const baseHeight = 1325;

  const vw = viewport.width;
  const vh = viewport.height;

  // ---------- Scaling ----------
  const scaleByHeight = (vh * 0.9) / baseHeight;

  const scaleByWidth = isMobile
    ? (vw * 0.95) / baseWidth       // 1 page mobile
    : (vw * 0.9) / (baseWidth * 2); // 2 pages desktop

  const scale = Math.min(scaleByHeight, scaleByWidth);

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  // Book width depends on mode
  const bookWidth = isMobile
    ? pageWidth
    : pageWidth * 2;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#cfa3b2",
        overflow: "hidden",
      }}
    >
      {/* Instruction */}
      <p
        style={{
          marginBottom: "16px",
          fontFamily: "monospace",
          fontSize: isMobile ? "14px" : "20px",
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {isMobile
          ? "Tap page edge to flip"
          : "Click or drag page corner to flip"}
      </p>

      <Document
        file="/docs/explore-menu.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={bookWidth}
          height={pageHeight}
          size="fixed"
          minWidth={bookWidth}
          maxWidth={bookWidth}
          minHeight={pageHeight}
          maxHeight={pageHeight}
          drawShadow={true}
          flippingTime={800}
          useMouseEvents={true}
          showCover={false}
          startPage={0}
          clickEventForward={true}
          swipeDistance={0}
          usePortrait={false}
          mobileScrollSupport={false}
          showPageCorners={true}
          style={{
            margin: "0 auto",
          }}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
              }}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                scale={1}
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
