
"use client";

import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// PDF worker (required for Vercel / Next.js)
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FlipBook() {
  const [numPages, setNumPages] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Document file="/docs/ebook.pdf" onLoadSuccess={onLoadSuccess}>
        <HTMLFlipBook
          width={400}
          height={600}
          showCover={true}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div key={index}>
              <Page pageNumber={index + 1} />
            </div>
          ))}
        </HTMLFlipBook>
      </Document>
    </div>
  );
}
