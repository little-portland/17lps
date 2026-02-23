"use client";

import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const containerRef = useRef(null);
  const flipRef = useRef(null);

  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

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

  // ---------- PDF base size ----------
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

  // ---------- Init PageFlip ----------
  useEffect(() => {
    if (!containerRef.current || !numPages) return;

    if (flipRef.current) {
      flipRef.current.destroy();
    }

    flipRef.current = new PageFlip(containerRef.current, {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      maxShadowOpacity: 0.3,
      showCover: false,
      mobileScrollSupport: false,
      usePortrait: isMobile,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30,
    });

    const pages = containerRef.current.querySelectorAll(".page");
    flipRef.current.loadFromHTML(pages);

  }, [numPages, pageWidth, pageHeight, isMobile]);

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
      {/* Instructions */}
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
          ? "Tap page edge or swipe to flip →"
          : "Click or drag page corner to flip →"}
      </p>

      {/* Book container */}
      <div
        ref={containerRef}
        style={{
          width: isMobile ? pageWidth : pageWidth * 2,
          height: pageHeight,
        }}
      >
        <Document
          file="/docs/explore-menu.pdf"
          onLoadSuccess={onLoadSuccess}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={index}
              className="page"
              style={{
                width: pageWidth,
                height: pageHeight,
                background: "#fff",
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
        </Document>
      </div>
    </div>
  );
}
