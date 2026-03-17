"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Custom cinematic book component.
 *
 * What it does:
 * - Closed front cover, centered
 * - Click/tap front cover to open with a book-opening animation
 * - Shows 2-page spreads while open
 * - Click/tap left side to go back, right side to go forward
 * - At the end, closes into a centered back cover
 * - Click/tap back cover to reopen into the last spread
 * - Same interaction model on desktop + mobile
 *
 * Important configuration:
 * This component assumes your PDF includes:
 *   page 1 = front cover
 *   page 2..(n-1) = interior pages
 *   page n = back cover
 *
 * If your PDF structure is different, change FRONT_COVER_PAGE and BACK_COVER_PAGE,
 * or adjust getInteriorPageNumbers().
 */

const FRONT_COVER_PAGE = 1;

const BASE_PAGE_WIDTH = 1080;
const BASE_PAGE_HEIGHT = 1325;
const UI_BAR_HEIGHT = 56;
const OPEN_CLOSE_MS = 900;
const PAGE_TURN_MS = 700;

export default function CustomBookViewer() {
  const [numPages, setNumPages] = useState(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [bookState, setBookState] = useState("front-closed");
  const [leftInteriorIndex, setLeftInteriorIndex] = useState(0);
  const [turnPageNumber, setTurnPageNumber] = useState(null);
  const [turnDirection, setTurnDirection] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [bookReady, setBookReady] = useState(false);

  const timersRef = useRef([]);

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
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

  const backCoverPage = numPages ?? 1;

  const interiorPages = useMemo(() => {
    if (!numPages || numPages < 3) return [];
    return Array.from({ length: Math.max(numPages - 2, 0) }, (_, index) => index + 2);
  }, [numPages]);

  const spreadCount = Math.max(Math.ceil(interiorPages.length / 2), 0);
  const lastSpreadIndex = Math.max(spreadCount - 1, 0);

  const visibleLeftPage = interiorPages[leftInteriorIndex] ?? null;
  const visibleRightPage = interiorPages[leftInteriorIndex + 1] ?? null;

  const containerWidth = viewport.width;
  const containerHeight = Math.max(viewport.height - UI_BAR_HEIGHT - 24, 0);

  const closedScale = Math.min(
    (containerHeight * 0.94) / BASE_PAGE_HEIGHT,
    (containerWidth * 0.92) / BASE_PAGE_WIDTH
  );

  const openScale = Math.min(
    (containerHeight * 0.94) / BASE_PAGE_HEIGHT,
    (containerWidth * 0.94) / (BASE_PAGE_WIDTH * 2)
  );

  const pageWidth = BASE_PAGE_WIDTH * openScale;
  const pageHeight = BASE_PAGE_HEIGHT * openScale;
  const coverWidth = BASE_PAGE_WIDTH * closedScale;
  const coverHeight = BASE_PAGE_HEIGHT * closedScale;

  const currentCoverPage = bookState === "back-closed" || bookState === "back-opening"
    ? backCoverPage
    : FRONT_COVER_PAGE;

  const isClosed = bookState === "front-closed" || bookState === "back-closed";
  const isOpening = bookState === "front-opening" || bookState === "back-opening";
  const isOpen = bookState === "open";
  const isClosing = bookState === "front-closing" || bookState === "back-closing";
  const showSpread = isOpen || isOpening || isClosing || turnDirection !== null;

  const coverTransformOrigin = bookState === "back-opening" || bookState === "back-closed"
    ? "right center"
    : "left center";

  const coverAnimationName = (() => {
    if (bookState === "front-opening") return "frontCoverOpen";
    if (bookState === "back-opening") return "backCoverOpen";
    if (bookState === "back-closing") return "backCoverClose";
    if (bookState === "front-closing") return "frontCoverClose";
    return "none";
  })();

  const canGoPrev = isOpen && !animating && leftInteriorIndex > 0;
  const canGoNext = isOpen && !animating && leftInteriorIndex < interiorPages.length - 2;
  const canCloseToBack = isOpen && !animating && leftInteriorIndex >= lastSpreadIndex * 2;

  function onLoadSuccess({ numPages: loadedPages }) {
    setNumPages(loadedPages);
    setBookReady(true);
  }

  const openFront = () => {
    if (animating || !bookReady) return;
    setAnimating(true);
    setLeftInteriorIndex(0);
    setBookState("front-opening");

    schedule(() => {
      setBookState("open");
      setAnimating(false);
    }, OPEN_CLOSE_MS);
  };

  const openBack = () => {
    if (animating || !bookReady) return;
    setAnimating(true);
    setLeftInteriorIndex(lastSpreadIndex * 2);
    setBookState("back-opening");

    schedule(() => {
      setBookState("open");
      setAnimating(false);
    }, OPEN_CLOSE_MS);
  };

  const closeToBack = () => {
    if (animating || !bookReady) return;
    setAnimating(true);
    setBookState("back-closing");

    schedule(() => {
      setBookState("back-closed");
      setAnimating(false);
    }, OPEN_CLOSE_MS);
  };

  const closeToFront = () => {
    if (animating || !bookReady) return;
    setAnimating(true);
    setBookState("front-closing");

    schedule(() => {
      setBookState("front-closed");
      setLeftInteriorIndex(0);
      setAnimating(false);
    }, OPEN_CLOSE_MS);
  };

  const turnNext = () => {
    if (!canGoNext) {
      if (canCloseToBack) closeToBack();
      return;
    }

    const turning = visibleRightPage;
    if (!turning) return;

    setAnimating(true);
    setTurnDirection("forward");
    setTurnPageNumber(turning);

    schedule(() => {
      setLeftInteriorIndex((prev) => Math.min(prev + 2, lastSpreadIndex * 2));
      setTurnDirection(null);
      setTurnPageNumber(null);
      setAnimating(false);
    }, PAGE_TURN_MS);
  };

  const turnPrev = () => {
    if (!canGoPrev) {
      closeToFront();
      return;
    }

    const turning = visibleLeftPage;
    if (!turning) return;

    setAnimating(true);
    setTurnDirection("backward");
    setTurnPageNumber(turning);

    schedule(() => {
      setLeftInteriorIndex((prev) => Math.max(prev - 2, 0));
      setTurnDirection(null);
      setTurnPageNumber(null);
      setAnimating(false);
    }, PAGE_TURN_MS);
  };

  const handleClosedClick = () => {
    if (bookState === "front-closed") openFront();
    else if (bookState === "back-closed") openBack();
  };

  const handleLeftTap = () => {
    if (!isOpen) return;
    turnPrev();
  };

  const handleRightTap = () => {
    if (!isOpen) return;
    turnNext();
  };

  const renderPdfPage = (pageNumber, width, keyPrefix = "page") => {
    if (!pageNumber) return <BlankPage width={width} height={pageHeight} />;

    return (
      <div className="pageSurface" key={`${keyPrefix}-${pageNumber}`}>
        <Page
          pageNumber={pageNumber}
          width={width}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </div>
    );
  };

  const spreadLeft = turnDirection === "backward"
    ? interiorPages[Math.max(leftInteriorIndex - 2, 0)] ?? null
    : visibleLeftPage;

  const spreadRight = turnDirection === "forward"
    ? interiorPages[Math.min(leftInteriorIndex + 3, interiorPages.length - 1)] ?? null
    : visibleRightPage;

  return (
    <Document file="/docs/explore-menu.pdf" onLoadSuccess={onLoadSuccess}>
      <div className="bookRoot">
        <div className="instructionBar">
          {!bookReady
            ? "Loading book…"
            : isClosed
              ? "Click to open"
              : turnDirection || isOpening || isClosing
                ? ""
                : "Click left/right to flip the page"}
        </div>

        <div className="stage">
          {showSpread && (
            <div
              className={`openBook ${isOpen ? "interactive" : ""}`}
              style={{ width: pageWidth * 2, height: pageHeight }}
            >
              <div className="spineShadow" />

              <div className="spreadBase leftBase">
                {renderPdfPage(spreadLeft, pageWidth, "base-left")}
              </div>
              <div className="spreadBase rightBase">
                {renderPdfPage(spreadRight, pageWidth, "base-right")}
              </div>

              {turnDirection === "forward" && turnPageNumber && (
                <div
                  className="turnLayer forward"
                  style={{ width: pageWidth, height: pageHeight }}
                >
                  {renderPdfPage(turnPageNumber, pageWidth, "turn-forward")}
                </div>
              )}

              {turnDirection === "backward" && turnPageNumber && (
                <div
                  className="turnLayer backward"
                  style={{ width: pageWidth, height: pageHeight }}
                >
                  {renderPdfPage(turnPageNumber, pageWidth, "turn-backward")}
                </div>
              )}

              {isOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Previous pages"
                    className="hitZone left"
                    onClick={handleLeftTap}
                  />
                  <button
                    type="button"
                    aria-label="Next pages"
                    className="hitZone right"
                    onClick={handleRightTap}
                  />
                </>
              )}
            </div>
          )}

          {(isClosed || isOpening || isClosing) && (
            <button
              type="button"
              className={`coverButton ${isClosed ? "clickable" : ""}`}
              onClick={handleClosedClick}
              disabled={!isClosed || !bookReady}
              aria-label={bookState === "back-closed" ? "Open back cover" : "Open front cover"}
              style={{
                width: coverWidth,
                height: coverHeight,
                transformOrigin: coverTransformOrigin,
                animation: coverAnimationName === "none"
                  ? "none"
                  : `${coverAnimationName} ${OPEN_CLOSE_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards`,
              }}
            >
              <div className="coverInner">
                <Page
                  pageNumber={currentCoverPage}
                  width={coverWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
              <div className="coverGloss" />
              <div className="coverEdge" />
            </button>
          )}
        </div>

        <style jsx>{`
          .bookRoot {
            position: fixed;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            background: #f4f4f4;
            overflow: hidden;
          }

          .instructionBar {
            height: ${UI_BAR_HEIGHT}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: monospace;
            font-size: clamp(12px, 1.7vw, 20px);
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #8d6cab;
            opacity: 0.9;
            user-select: none;
          }

          .stage {
            position: relative;
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 2400px;
            perspective-origin: center center;
            overflow: hidden;
            padding: 12px;
          }

          .openBook {
            position: relative;
            display: flex;
            align-items: stretch;
            justify-content: center;
            transform-style: preserve-3d;
          }

          .openBook.interactive {
            cursor: pointer;
          }

          .spreadBase {
            position: relative;
            width: ${pageWidth}px;
            height: ${pageHeight}px;
            background: white;
            overflow: hidden;
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
          }

          .leftBase {
            transform-origin: right center;
          }

          .rightBase {
            transform-origin: left center;
          }

          .spineShadow {
            position: absolute;
            left: 50%;
            top: 0;
            width: 22px;
            height: 100%;
            transform: translateX(-50%);
            z-index: 6;
            pointer-events: none;
            background: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.16),
              rgba(0, 0, 0, 0.08)
            );
            filter: blur(8px);
            opacity: ${showSpread ? 1 : 0};
          }

          .pageSurface {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            overflow: hidden;
          }

          .turnLayer {
            position: absolute;
            top: 0;
            background: white;
            overflow: hidden;
            z-index: 10;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            box-shadow: 0 18px 32px rgba(0, 0, 0, 0.16);
          }

          .turnLayer.forward {
            left: 50%;
            transform-origin: left center;
            animation: turnForward ${PAGE_TURN_MS}ms cubic-bezier(0.2, 0.65, 0.2, 1) forwards;
          }

          .turnLayer.backward {
            left: 0;
            transform-origin: right center;
            animation: turnBackward ${PAGE_TURN_MS}ms cubic-bezier(0.2, 0.65, 0.2, 1) forwards;
          }

          .hitZone {
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
            z-index: 20;
            background: transparent;
            border: 0;
            padding: 0;
            margin: 0;
            cursor: pointer;
          }

          .hitZone.left {
            left: 0;
          }

          .hitZone.right {
            right: 0;
          }

          .coverButton {
            position: absolute;
            inset: auto;
            border: 0;
            padding: 0;
            margin: 0;
            background: transparent;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
            z-index: 30;
          }

          .coverButton.clickable {
            cursor: pointer;
          }

          .coverInner {
            width: 100%;
            height: 100%;
            background: white;
            overflow: hidden;
            backface-visibility: hidden;
          }

          .coverGloss {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(
              110deg,
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.02) 30%,
              rgba(0, 0, 0, 0.06) 100%
            );
            mix-blend-mode: screen;
          }

          .coverEdge {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 10px;
            background: linear-gradient(
              to left,
              rgba(0, 0, 0, 0.12),
              rgba(255, 255, 255, 0.18)
            );
            pointer-events: none;
          }

          @keyframes frontCoverOpen {
            0% {
              transform: rotateY(0deg);
              opacity: 1;
            }
            35% {
              transform: rotateY(-28deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(-155deg) translateX(-6px);
              opacity: 0;
            }
          }

          @keyframes backCoverOpen {
            0% {
              transform: rotateY(0deg);
              opacity: 1;
            }
            35% {
              transform: rotateY(28deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(155deg) translateX(6px);
              opacity: 0;
            }
          }

          @keyframes backCoverClose {
            0% {
              transform: rotateY(155deg) translateX(6px);
              opacity: 0;
            }
            45% {
              transform: rotateY(30deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(0deg);
              opacity: 1;
            }
          }

          @keyframes frontCoverClose {
            0% {
              transform: rotateY(-155deg) translateX(-6px);
              opacity: 0;
            }
            45% {
              transform: rotateY(-30deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(0deg);
              opacity: 1;
            }
          }

          @keyframes turnForward {
            0% {
              transform: rotateY(0deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(-180deg);
              opacity: 0.98;
            }
          }

          @keyframes turnBackward {
            0% {
              transform: rotateY(0deg);
              opacity: 1;
            }
            100% {
              transform: rotateY(180deg);
              opacity: 0.98;
            }
          }

          @media (max-width: 768px) {
            .instructionBar {
              letter-spacing: 0.08em;
            }

            .spineShadow {
              width: 16px;
            }
          }
        `}</style>
      </div>
    </Document>
  );
}

function BlankPage({ width, height }) {
  return (
    <div
      style={{
        width,
        height,
        background: "#fff",
      }}
    />
  );
}
