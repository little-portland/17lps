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
  const [enteredBook, setEnteredBook] = useState(false);

  const bookRef = useRef(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
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

  const interiorPages = Math.max((numPages || 0) - 1, 0); // skip PDF page 1

  const flipNext = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;

    const current = flip.getCurrentPageIndex();
    if (current < interiorPages - 1) {
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
    <Document
      file="/docs/explore-menu.pdf"
      onLoadSuccess={onLoadSuccess}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#fff",
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
            lineHeight: 1.2,
          }}
        >
          {!enteredBook
            ? (isMobile ? "Tap to open" : "Click to open")
            : (isMobile ? "Tap to flip the page" : "Click to flip the page")}
        </p>

        {!enteredBook ? (
          <button
            onClick={() => setEnteredBook(true)}
            style={{
              all: "unset",
              cursor: "pointer",
              width: pageWidth,
              height: pageHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            }}
            aria-label="Open book"
          >
            <Page
              pageNumber={1}
              width={pageWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </button>
        ) : (
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
              startPage={0}
              style={{ margin: "0 auto" }}
            >
              {Array.from({ length: interiorPages }, (_, index) => {
                const pdfPageNumber = index + 2; // start flipbook at PDF page 2

                return (
                  <div
                    key={pdfPageNumber}
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
                      pageNumber={pdfPageNumber}
                      width={pageWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>
        )}
      </div>
    </Document>
  );
}
