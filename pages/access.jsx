import React from "react";
import Head from "next/head";
import Image from "next/image";

// hooks
import useFetchContent from "@utils/useFetchContent";

const Menu = ({ menuImage }) => {
  return (
    <>
      <Head>
        <style>
          {`
            html {
              overflow-x: hidden !important;
              background: #000 !important;
            }

            body {
              background: #000 !important;
              overflow-x: hidden !important;
              color: #ffab00;
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }

            a {
              text-decoration: none;
            }

            @keyframes terminalFlicker {
              0%, 100% { opacity: 1; }
              8% { opacity: 0.985; }
              10% { opacity: 0.95; }
              12% { opacity: 0.99; }
              28% { opacity: 0.985; }
              30% { opacity: 0.96; }
              32% { opacity: 0.99; }
              58% { opacity: 0.985; }
              60% { opacity: 0.955; }
              62% { opacity: 0.99; }
              78% { opacity: 0.98; }
              80% { opacity: 0.945; }
              82% { opacity: 0.99; }
            }

            @keyframes scanlineDriftY {
              0% { transform: translateY(-120%); }
              100% { transform: translateY(120%); }
            }

            @keyframes scanlineDriftX {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(120%); }
            }

            @keyframes borderPulse {
              0%, 100% {
                box-shadow:
                  0 0 0 1px rgba(57,255,20,0.15),
                  0 0 24px rgba(57,255,20,0.08),
                  inset 0 0 0 rgba(57,255,20,0);
              }
              50% {
                box-shadow:
                  0 0 0 1px rgba(57,255,20,0.28),
                  0 0 42px rgba(57,255,20,0.14),
                  inset 0 0 24px rgba(57,255,20,0.03);
              }
            }

            @keyframes textGlow {
              0%, 100% {
                text-shadow:
                  0 0 0 rgba(255,171,0,0),
                  0 0 0 rgba(57,255,20,0);
              }
              50% {
                text-shadow:
                  0 0 10px rgba(255,171,0,0.22),
                  0 0 18px rgba(255,171,0,0.08);
              }
            }

            @keyframes greenGlow {
              0%, 100% {
                text-shadow: 0 0 0 rgba(57,255,20,0);
              }
              50% {
                text-shadow: 0 0 12px rgba(57,255,20,0.28);
              }
            }

            @keyframes cursorBlink {
              0%, 45% { opacity: 1; }
              46%, 100% { opacity: 0; }
            }

            @keyframes signalPulse1 {
              0%, 100% { transform: scaleY(0.72); opacity: 0.55; }
              50% { transform: scaleY(1.12); opacity: 1; }
            }

            @keyframes signalPulse2 {
              0%, 100% { transform: scaleY(0.88); opacity: 0.65; }
              40% { transform: scaleY(1.25); opacity: 1; }
              70% { transform: scaleY(0.7); opacity: 0.6; }
            }

            @keyframes signalPulse3 {
              0%, 100% { transform: scaleY(0.68); opacity: 0.55; }
              35% { transform: scaleY(1.32); opacity: 1; }
              75% { transform: scaleY(0.82); opacity: 0.7; }
            }

            @keyframes buttonHum {
              0%, 100% {
                box-shadow:
                  0 0 0 rgba(57,255,20,0),
                  inset 0 0 0 rgba(57,255,20,0);
              }
              50% {
                box-shadow:
                  0 0 26px rgba(57,255,20,0.22),
                  inset 0 0 12px rgba(255,255,255,0.05);
              }
            }

            @keyframes buttonSweep {
              0% { transform: translateX(-130%); }
              100% { transform: translateX(130%); }
            }

            @keyframes panelSweep {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(120%); }
            }

            @keyframes typeReveal {
              from { width: 0; }
              to { width: 100%; }
            }

            @keyframes textAppear {
              0% {
                opacity: 0;
                transform: translateY(4px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .page-shell {
              min-height: 100vh;
              background: #000;
              padding: 32px 18px;
            }

            .nocturn.override {
              width: min(100%, 980px);
              margin: 0 auto;
              border: 2px solid #39ff14;
              padding: 0;
              background: #000;
              position: relative;
              overflow: hidden;
              box-shadow: 0 0 0 1px rgba(57,255,20,0.15), 0 0 24px rgba(57,255,20,0.08);
              animation: borderPulse 4.2s ease-in-out infinite, terminalFlicker 5.5s linear infinite;
            }

            .nocturn.override::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.024) 0px,
                  rgba(255,255,255,0.024) 1px,
                  transparent 1px,
                  transparent 3px
                );
              opacity: 0.12;
              z-index: 2;
            }

            .nocturn.override::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              height: 140px;
              pointer-events: none;
              background: linear-gradient(
                to bottom,
                rgba(57,255,20,0) 0%,
                rgba(57,255,20,0.04) 35%,
                rgba(57,255,20,0.14) 50%,
                rgba(57,255,20,0.04) 65%,
                rgba(57,255,20,0) 100%
              );
              mix-blend-mode: screen;
              z-index: 3;
              animation: scanlineDriftY 7s linear infinite;
            }

            .poster-topbar {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 10px 16px;
              border-bottom: 2px solid #39ff14;
              min-height: 54px;
              position: relative;
              z-index: 4;
            }

            .poster-dots {
              display: flex;
              gap: 10px;
              flex-shrink: 0;
            }

            .poster-dots span {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #ffab00;
              display: inline-block;
              animation: textGlow 2.8s ease-in-out infinite;
            }

            .poster-dots span:nth-child(2) {
              animation-delay: 0.25s;
            }

            .poster-dots span:nth-child(3) {
              animation-delay: 0.5s;
            }

            .poster-title {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 30px;
              line-height: 1;
              letter-spacing: 0.08em;
              font-weight: 700;
              animation: textGlow 3.2s ease-in-out infinite;
            }

            .poster-title::after {
              content: "_";
              margin-left: 0.18em;
              color: #39ff14;
              animation: cursorBlink 1s steps(1, end) infinite;
            }

            .poster-inner {
              padding: 56px 54px 64px;
              position: relative;
              z-index: 4;
            }

            .hero-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 28px;
              align-items: start;
              width: 100%;
            }

            .hero-left {
              display: flex;
              flex-direction: column;
              gap: 26px;
              width: 100%;
            }

            .hero-kicker {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: uppercase;
              font-size: 13px;
              letter-spacing: 0.18em;
              margin-bottom: 8px;
              font-weight: 700;
              animation: greenGlow 3.4s ease-in-out infinite;
            }

            .hero-heading {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: clamp(36px, 7vw, 54px);
              line-height: 0.95;
              letter-spacing: 0.08em;
              margin: 0;
              font-weight: 700;
            }

            .hero-heading-line {
              display: inline-block;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              width: 0;
              animation:
                typeReveal 1.6s steps(15, end) 0.35s forwards,
                textGlow 3s ease-in-out 2s infinite;
            }

            .hero-heading-line::after {
              content: "_";
              position: absolute;
              right: 0;
              top: 0;
              color: #39ff14;
              animation: cursorBlink 0.9s steps(1, end) infinite;
            }

            .hero-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              font-size: 18px;
              line-height: 1.8;
              letter-spacing: 0.06em;
              text-transform: lowercase;
            }

            .hero-copy-line {
              display: block;
              opacity: 0;
              animation: textAppear 0.8s ease forwards;
            }

            .hero-copy-line.line-1 {
              animation-delay: 1.6s;
            }

            .hero-copy-line.line-2 {
              animation-delay: 2.05s;
            }

            .hero-copy .green {
              color: #39ff14;
              animation: greenGlow 2.8s ease-in-out 2.2s infinite;
            }

            .hero-panel {
              border: 2px solid #39ff14;
              padding: 20px;
              min-height: 100%;
              position: relative;
              background:
                linear-gradient(to bottom, rgba(57,255,20,0.08), rgba(57,255,20,0.08)),
                #050505;
              width: 100%;
              overflow: hidden;
            }

            .hero-panel::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                rgba(57,255,20,0.01) 0%,
                rgba(57,255,20,0.08) 50%,
                rgba(57,255,20,0.01) 100%
              );
              animation: terminalFlicker 4.5s linear infinite;
            }

            .hero-panel::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              width: 30%;
              pointer-events: none;
              background: linear-gradient(
                90deg,
                rgba(57,255,20,0) 0%,
                rgba(57,255,20,0.08) 50%,
                rgba(57,255,20,0) 100%
              );
              animation: panelSweep 5.8s linear infinite;
              opacity: 0.55;
            }

            .panel-label {
              color: #39ff14;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 14px;
              letter-spacing: 0.12em;
              margin-bottom: 18px;
              position: relative;
              z-index: 1;
              font-weight: 700;
              animation: greenGlow 2.6s ease-in-out infinite;
            }

            .panel-label::after {
              content: " ▋";
              color: #39ff14;
              animation: cursorBlink 1.1s steps(1, end) infinite;
            }

            .panel-copy {
              color: #ffab00;
              font-family: "Courier New", monospace;
              text-transform: lowercase;
              font-size: 16px;
              line-height: 1.8;
              letter-spacing: 0.04em;
              margin-bottom: 26px;
              position: relative;
              z-index: 1;
            }

            .friend-link-wrap {
              margin-top: 10px;
              width: 100%;
              position: relative;
              z-index: 1;
              overflow: hidden;
            }

            .friend-link-wrap a {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-height: 64px;
              padding: 18px 20px;
              background: #39ff14;
              color: #000 !important;
              font-family: "Courier New", monospace;
              font-size: 20px;
              font-weight: 700;
              text-transform: lowercase;
              letter-spacing: 0.08em;
              text-decoration: none !important;
              transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
              text-align: center;
              position: relative;
              overflow: hidden;
              animation: buttonHum 2.6s ease-in-out infinite;
            }

            .friend-link-wrap a::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              width: 22%;
              background: linear-gradient(
                90deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.18) 50%,
                rgba(255,255,255,0) 100%
              );
              transform: translateX(-130%);
              animation: buttonSweep 3.4s linear infinite;
              pointer-events: none;
            }

            .friend-link-wrap a:hover {
              background: #000;
              border: 1px solid #39ff14;
              color: #39ff14 !important;
              box-shadow: inset 0 0 0 1px #39ff14, 0 0 18px rgba(57,255,20,0.14);
              transform: translateY(-1px);
            }

            .poster-footer {
              padding-top: 40px;
              display: grid;
              grid-template-columns: 1fr auto;
              align-items: end;
              gap: 20px;
              position: relative;
            }

            .footer-meta {
              font-family: "Courier New", monospace;
              color: #ffab00;
              text-transform: lowercase;
              font-size: 14px;
              line-height: 1.9;
              letter-spacing: 0.08em;
              font-weight: 700;
            }

            .footer-accent {
              color: #39ff14;
              animation: greenGlow 3s ease-in-out infinite;
            }

            .hero-image-wrap {
              width: 100%;
              margin: 0;
              border: 2px solid #39ff14;
              background: #000;
              padding: 10px;
              position: relative;
              overflow: hidden;
            }

            .hero-image-wrap::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.02) 0px,
                  rgba(255,255,255,0.02) 1px,
                  transparent 1px,
                  transparent 4px
                );
              opacity: 0.12;
              z-index: 1;
            }

            .hero-image-wrap::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              width: 28%;
              pointer-events: none;
              background: linear-gradient(
                90deg,
                rgba(57,255,20,0) 0%,
                rgba(57,255,20,0.12) 50%,
                rgba(57,255,20,0) 100%
              );
              transform: translateX(-120%);
              animation: scanlineDriftX 4.8s linear infinite;
              z-index: 2;
            }

            .hero-image-inner {
              width: 100%;
              background: #030303;
              line-height: 0;
              position: relative;
              z-index: 0;
            }

            .hero-image {
              display: block;
              width: 100%;
              height: auto;
            }

            .signal-bars {
              display: flex;
              gap: 8px;
              align-items: end;
              height: 44px;
            }

            .signal-bars span {
              display: block;
              width: 10px;
              background: #c40000;
              transform-origin: bottom;
            }

            .signal-bars span:nth-child(1) {
              height: 16px;
              animation: signalPulse1 1.4s ease-in-out infinite;
            }

            .signal-bars span:nth-child(2) {
              height: 22px;
              animation: signalPulse2 1.15s ease-in-out infinite;
            }

            .signal-bars span:nth-child(3) {
              height: 28px;
              animation: signalPulse3 1.35s ease-in-out infinite;
            }

            .signal-bars span:nth-child(4) {
              height: 34px;
              animation: signalPulse2 1s ease-in-out infinite;
            }

            .signal-bars span:nth-child(5) {
              height: 40px;
              animation: signalPulse1 1.25s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .nocturn.override,
              .nocturn.override::after,
              .poster-dots span,
              .poster-title,
              .poster-title::after,
              .hero-kicker,
              .hero-heading-line,
              .hero-heading-line::after,
              .hero-copy-line,
              .hero-panel::before,
              .hero-panel::after,
              .panel-label,
              .panel-label::after,
              .friend-link-wrap a,
              .friend-link-wrap a::after,
              .hero-image-wrap::after,
              .footer-accent,
              .signal-bars span {
                animation: none !important;
              }

              .hero-heading-line {
                width: 100% !important;
              }

              .hero-copy-line {
                opacity: 1 !important;
                transform: none !important;
              }
            }

            @media (max-width: 768px) {
              .page-shell {
                padding: 14px;
              }

              .nocturn.override {
                width: 100%;
              }

              .poster-topbar {
                padding: 10px 12px;
                min-height: 46px;
              }

              .poster-dots span {
                width: 12px;
                height: 12px;
              }

              .poster-title {
                font-size: 19px;
              }

              .poster-inner {
                padding: 28px 18px 32px;
              }

              .hero-grid {
                grid-template-columns: 1fr;
                gap: 24px;
              }

              .hero-heading {
                font-size: 30px;
              }

              .hero-copy,
              .panel-copy {
                font-size: 14px;
                line-height: 1.7;
              }

              .hero-kicker,
              .panel-label,
              .footer-meta {
                font-size: 12px;
              }

              .friend-link-wrap a {
                min-height: 54px;
                font-size: 15px;
                padding: 14px 16px;
              }

              .poster-footer {
                grid-template-columns: 1fr;
                gap: 12px;
              }
            }
          `}
        </style>

        <title>17 Little Portland Street - Friend of the Club</title>
      </Head>

      <div className="page-shell">
        <div className="nocturn override">
          <div className="poster-topbar">
            <div className="poster-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="poster-title">friend of the club</div>
          </div>

          <div className="poster-inner">
            <div className="hero-grid">
              <div className="hero-left">
                <div>
                  <div className="hero-kicker">17 little portland street</div>
                  <h1 className="hero-heading">
                    <span className="hero-heading-line">access protocol</span>
                  </h1>
                </div>

                <div className="hero-copy">
                  <span className="hero-copy-line line-1">
                    entry to the club is reserved for <span className="green">friends of the club</span>.
                  </span>
                  <span className="hero-copy-line line-2">
                    submit your enquiry to begin the process.
                  </span>
                </div>
              </div>

              <div className="hero-panel">
                <div className="panel-label">status: accepting enquiries</div>

                <div className="panel-copy">
                  membership requests are handled via direct contact.
                  <br />
                  use the transmission panel below.
                </div>

                <div className="friend-link-wrap">
                  <a
                    href="mailto:friends@little-portland.com?subject=FOC Enquiry"
                    aria-label="apply to become a friend of the club"
                    target="_blank"
                    rel="noreferrer"
                  >
                    apply to become a friend of the club
                  </a>
                </div>
              </div>
            </div>

            <div className="poster-footer">
              <div className="hero-image-wrap">
                <div className="hero-image-inner">
                  <Image
                    src="/images/foc/foc-page-img1.png"
                    alt="Friends of the Club artwork"
                    width={2000}
                    height={353}
                    className="hero-image"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

export async function getStaticProps() {
  const menuData = await useFetchContent(`
    {
      menuCollection {
        items {
          menuImage {
            title
            description
            url
            width
            height
          }
        }
      }
    }
  `);

  const menuImage = menuData?.menuCollection?.items?.[0]?.menuImage || null;

  return {
    props: {
      menuImage,
    },
    revalidate: 30,
  };
}
