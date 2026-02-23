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

  const bookRef = useRef(null);

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

  // ---------- Base PDF dimensions ----------
  const baseWidth = 1080;
  const baseHeight = 1325;

  const vw = viewport.width;
  const vh = viewport.height;

  // Desktop = spread (2 pages), Mobile = single page
  const spreadWidth = isMobile ? baseWidth : baseWidth * 2;

  const scale = Math.min(
    (vh * 0.92) / baseHeight,
    (vw * 0.95) / spreadWidth
  );

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  // ---------- Symmetric curl navigation ----------
  const flipNext = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;

    const current = flip.getCurrentPageIndex();
    if (current < numPages - 1) {
      flip.flip(current + 1);
    }
  };

  const flipPrev = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;

    const current = flip.getCurrentPageIndex();
    if (current > 0) {
      flip.flip(current - 1);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Instruction */}
      <p
        style={{
          marginBottom: 16,
          fontFamily: "monospace",
          fontSize: isMobile ? 14 : 20,
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {isMobile
          ? "Tap page edge to flip →"
          : "Click or drag page corner to flip →"}
      </p>

      <div
        style={{
          position: "relative",
          width: isMobile ? pageWidth : pageWidth * 2,
          height: pageHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Mobile Tap Zones */}
        {isMobile && (
          <>
            <div
              onClick={flipPrev}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "30%",
                height: "100%",
                zIndex: 10,
              }}
            />
            <div
              onClick={flipNext}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "30%",
                height: "100%",
                zIndex: 10,
              }}
            />
          </>
        )}

        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            size="fixed"
            minWidth={pageWidth}
            maxWidth={isMobile ? pageWidth : pageWidth * 2}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            drawShadow={true}
            flippingTime={800}
            showCover={false}
            usePortrait={isMobile}
            mobileScrollSupport={false}
            showPageCorners={!isMobile}
            style={{ margin: "0 auto" }}
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
                  background: "#ffffff",
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
    </div>
  );
}
