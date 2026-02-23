"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const bookRef = useRef();

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      setIsMobile(w < 768);
      setViewport({ width: w, height: h });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const baseWidth = 1080;
  const baseHeight = 1325;

  const vw = viewport.width;
  const vh = viewport.height;

  const spreadWidth = isMobile ? baseWidth : baseWidth * 2;

  const scale = Math.min(
    (vh * 0.92) / baseHeight,
    (vw * 0.95) / spreadWidth
  );

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  const flipNext = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;
    flip.flipNext("top");
  };

  const flipPrev = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;
    flip.flipPrev("top"); // forces curl mode
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
      <p
        style={{
          marginBottom: 16,
          fontFamily: "monospace",
          fontSize: isMobile ? 14 : 20,
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {isMobile
          ? "Tap page edge or swipe to flip →"
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
        {isMobile && (
          <>
            <div
              onClick={flipPrev}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "25%",
                height: "100%",
                zIndex: 20,
              }}
            />
            <div
              onClick={flipNext}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "25%",
                height: "100%",
                zIndex: 20,
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
            maxWidth={pageWidth}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            drawShadow
            flippingTime={800}
            usePortrait={isMobile}
            showPageCorners
            showCover={false}
            mobileScrollSupport={false}
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
