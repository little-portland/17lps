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

  // ---------- Viewport detection ----------
  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---------- Lock body scroll ----------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ---------- Original PDF ratio ----------
  const baseWidth = 1080;
  const baseHeight = 1325;

  const vw = viewport.width;
  const vh = viewport.height;

  // ---------- MOBILE: scale by width (avoid cropping) ----------
  const mobileScale = (vw * 0.92) / baseWidth;

  // ---------- DESKTOP: scale by height ----------
  const desktopScale = (vh * 0.9) / baseHeight;

  const scale = isMobile
    ? mobileScale
    : desktopScale;

  const pageWidth = baseWidth * scale;
  const pageHeight = baseHeight * scale;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ---------- Instructions ---------- */}
      <p
        style={{
          marginBottom: "16px",
          fontFamily: "monospace",
          fontSize: "20px",
          opacity: 0.7,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {isMobile
          ? "Tap page edge or swipe to flip"
          : "Click or drag page corner to flip"}
      </p>

      {/* ---------- Stage ---------- */}
      <div
        style={{
          width: "100%",
          height: pageHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={pageWidth}
            height={pageHeight}
            size={isMobile ? "stretch" : "fixed"}
            minWidth={pageWidth}
            maxWidth={isMobile ? pageWidth : pageWidth * 2}
            minHeight={pageHeight}
            maxHeight={pageHeight}
            drawShadow={true}
            flippingTime={800}
            showCover={false}
            usePortrait={isMobile}
            useMouseEvents={!isMobile}
            mobileScrollSupport={false}
            clickEventForward={true}
            swipeDistance={30}
            showPageCorners={true}
            maxShadowOpacity={0.3}
            startPage={0}
            style={{
              margin: "0 auto",
              touchAction: "none", // required for mobile flipping
            }}
          >
            {Array.from(
              new Array(numPages || 0),
              (_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    height={pageHeight}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              )
            )}
          </HTMLFlipBook>
        </Document>
      </div>
    </div>
  );
}
