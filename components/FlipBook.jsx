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

  const [hasOpened, setHasOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const bookRef = useRef(null);
  const timersRef = useRef([]);

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
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const schedule = (fn, delay) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

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

  // Page 1 is standalone cover. Book starts from PDF page 2.
  const interiorPages = Math.max((numPages || 0) - 1, 0);

  const containerDisplayWidth =
    !showBook && !hasOpened ? pageWidth : (isMobile ? pageWidth : pageWidth * 2);

  const fullScreenLoader = (label = "Loading…") => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: isMobile ? 12 : 16,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );

  const pageLoader = (width, height, label = "Loading…") => (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: isMobile ? 12 : 16,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </div>
  );

  const handleOpenCover = () => {
    if (isOpening || hasOpened || !numPages) return;

    const flip = bookRef.current?.pageFlip();
    if (flip) {
      flip.turnToPage(0);
    }

    setShowBook(true);
    setIsOpening(true);

    schedule(() => {
      setHasOpened(true);
      setIsOpening(false);
    }, 550);
  };

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
      loading={fullScreenLoader("Loading PDF")}
      error={fullScreenLoader("Failed to load PDF")}
      noData={fullScreenLoader("No PDF")}
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
          background: "rgb(232, 186, 201)",
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
            minHeight: isMobile ? 18 : 24,
          }}
        >
          {!hasOpened
            ? (isMobile ? "Tap to open" : "Click to open")
            : (isMobile ? "Tap to flip the page" : "Click to flip the page")}
        </p>

        <div
          style={{
            position: "relative",
            width: containerDisplayWidth,
            height: pageHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "width 240ms ease",
            overflow: "hidden",
          }}
        >
          {isMobile && hasOpened && (
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

          <div
            style={{
              opacity: showBook || hasOpened ? 1 : 0,
              transform: showBook || hasOpened ? "scale(1)" : "scale(0.985)",
              transition: "opacity 320ms ease, transform 320ms ease",
              willChange: "opacity, transform",
            }}
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
              showPageCorners={!isMobile && hasOpened}
              startPage={0}
              style={{
                margin: "0 auto",
                visibility: numPages ? "visible" : "hidden",
                pointerEvents: hasOpened ? "auto" : "none",
              }}
            >
              {Array.from({ length: interiorPages }, (_, index) => {
                const pdfPageNumber = index + 2;

                return (
                  <div
                    key={pdfPageNumber}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgb(232, 186, 201)",
                    }}
                  >
                    <Page
                      pageNumber={pdfPageNumber}
                      width={pageWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      loading={pageLoader(pageWidth, pageHeight, "Loading page")}
                      error={pageLoader(pageWidth, pageHeight, "Failed to load page")}
                    />
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>

          {!hasOpened && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isOpening ? "none" : "auto",
                background: "transparent",
              }}
            >
              <button
                onClick={handleOpenCover}
                aria-label="Open book"
                style={{
                  all: "unset",
                  cursor: isOpening ? "default" : "pointer",
                  width: pageWidth,
                  height: pageHeight,
                  display: "block",
                  position: "relative",
                  background: "rgba(0,0,0,0.55)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.14)",
                  opacity: isOpening ? 0 : 1,
                  transform: isOpening ? "scale(1.04)" : "scale(1)",
                  filter: isOpening ? "blur(6px)" : "blur(0px)",
                  transition:
                    "opacity 320ms ease, transform 320ms ease, filter 320ms ease",
                  willChange: "opacity, transform, filter",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "rgb(232, 186, 201)",
                  }}
                >
                  <Page
                    pageNumber={1}
                    width={pageWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    loading={pageLoader(pageWidth, pageHeight, "Loading page")}
                    error={pageLoader(pageWidth, pageHeight, "Failed to load page")}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(110deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.06) 100%)",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </Document>
  );
}
