import React from 'react';
import Head from 'next/head';

import SceneNav from '@components/SceneNav';

const PROJECTS = [
  {
    eyebrow: 'TRANSMISSION 01',
    title: 'THE TENT RADIO',
    description:
      'Live and archived sound from The Tent at the End of the Universe.',
    href: 'https://www.little-portland.com/thetentradio',
    meta: 'ONLINE',
    image: '/images/projects/projects-board.jpeg',
  },
  {
    eyebrow: 'TRANSMISSION 02',
    title: 'LPX RADIO',
    description:
      'Resident frequencies, recordings and future transmissions from 17 Little Portland Street.',
    href: '/lpxradio',
    meta: 'COMING SOON',
    image: '/images/projects/projects-bg.jpeg',
  },
];

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects — 17 Little Portland Street</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <style>
          {`
            html,
            body,
            #__next {
              min-height: 100%;
              background: #050505 !important;
            }

            body {
              margin: 0;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              -webkit-overflow-scrolling: touch !important;
              -webkit-font-smoothing: antialiased;
            }
          `}
        </style>
      </Head>

      <SceneNav theme="projects" />

      <style jsx global>{`
        /*
          PROJECTS PAGE NAV
          Same compact sizing / spacing principle as nocturn-test,
          colour-swapped for the projects flyer style.
        */

        .scene-nav.scene-nav--projects {
          grid-template-columns: 1fr 36px 1fr !important;
          gap: 0 !important;
          padding-top: 11px !important;
          padding-bottom: 9px !important;
          background: transparent !important;
        }

        .scene-nav.scene-nav--projects.has-scrolled {
          background: rgba(5, 5, 5, 0.86) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 8px 28px rgba(4, 255, 0, 0.08) !important;
        }

        .scene-nav--projects .scene-nav-left,
        .scene-nav--projects .scene-nav-right {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          gap: 28px !important;
        }

        .scene-nav--projects .scene-nav-left {
          justify-content: flex-end !important;
          padding-right: 32px !important;
        }

        .scene-nav--projects .scene-nav-right {
          justify-content: flex-start !important;
          padding-left: 32px !important;
        }

        .scene-nav--projects .scene-nav-logo {
          width: 36px !important;
          height: 36px !important;
          flex: 0 0 36px !important;
          transform: none !important;
        }

        .scene-nav--projects .scene-nav-logo img {
          width: 36px !important;
          height: 36px !important;
          object-fit: contain !important;
          opacity: 1 !important;
          filter: brightness(0) saturate(100%) invert(63%) sepia(98%)
            saturate(2082%) hue-rotate(76deg) brightness(114%) contrast(129%) !important;
        }

        .scene-nav--projects a {
          font-size: 13px !important;
          line-height: 1 !important;
          letter-spacing: 0.015em !important;
          font-family: 'Space Mono', 'Courier New', monospace !important;
          font-weight: 700 !important;
          color: #04ff00 !important;
          opacity: 1 !important;
          text-decoration: none !important;
          transform: none !important;
          transition: opacity 0.22s ease, color 0.22s ease !important;
          white-space: nowrap !important;
        }

        .scene-nav--projects a:hover,
        .scene-nav--projects a.active {
          color: #04ff00 !important;
          opacity: 0.68 !important;
          transform: none !important;
        }

        .scene-nav--projects a.disabled {
          color: rgba(4, 255, 0, 0.38) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
        }

        .scene-nav--projects a::before,
        .scene-nav--projects a::after {
          content: none !important;
          display: none !important;
        }

        .scene-nav--projects .scene-nav-burger span {
          background: #04ff00 !important;
        }

        .scene-nav-mobile--projects {
          background: rgba(5, 5, 5, 0.96) !important;
        }

        .scene-nav-mobile--projects .scene-nav-mobile-inner a {
          font-family: 'Space Mono', 'Courier New', monospace !important;
          color: #04ff00 !important;
        }

        .scene-nav-mobile--projects .scene-nav-mobile-inner a:hover,
        .scene-nav-mobile--projects .scene-nav-mobile-inner a.active {
          color: #04ff00 !important;
          opacity: 0.68 !important;
        }

        .scene-nav-mobile--projects .scene-nav-mobile-inner a.disabled {
          color: rgba(4, 255, 0, 0.38) !important;
          opacity: 1 !important;
          pointer-events: none !important;
        }

        @media (max-width: 900px) {
          .scene-nav.scene-nav--projects {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            grid-template-columns: none !important;
            gap: 0 !important;
            padding: 18px 6% 14px 6% !important;
            background: transparent !important;
          }

          .scene-nav.scene-nav--projects.has-scrolled,
          .scene-nav.scene-nav--projects.is-open {
            background: rgba(5, 5, 5, 0.92) !important;
          }

          .scene-nav--projects .scene-nav-left,
          .scene-nav--projects .scene-nav-right {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 0 !important;
          }

          .scene-nav--projects .scene-nav-logo {
            display: block !important;
            width: 46px !important;
            height: 46px !important;
            flex: 0 0 46px !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            order: 2 !important;
          }

          .scene-nav--projects .scene-nav-logo img {
            width: 46px !important;
            height: 46px !important;
          }

          .scene-nav--projects .scene-nav-burger {
            display: flex !important;
            order: 1 !important;
            margin-right: auto !important;
            margin-left: 0 !important;
          }
        }
      `}</style>

      <main className="projects-page">
        <div className="projects-bg" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />

        <section className="projects-frame">
          <header className="projects-header">
            <div className="header-topline">
              <span className="typing tiny">LPX//PROJECTS</span>
              <span className="typing tiny delay">ISSUE 001</span>
            </div>

            <div className="title-row">
              <h1 className="glitch-title" data-text="PROJECTS">
                PROJECTS
              </h1>

              <div className="spinner" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="project-divider" aria-hidden="true" />
          </header>

          <div className="projects-grid">
            {PROJECTS.map((project, index) => (
              <a
                key={project.title}
                className="project-card"
                href={project.href}
                target={project.href.startsWith('http') ? '_blank' : undefined}
                rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="card-meta">
                  <span>{project.eyebrow}</span>
                  <span>{project.meta}</span>
                </div>

                <h2 className="typing-loop">{project.title}</h2>

                <p>{project.description}</p>

                <div
                  className={`project-art project-art-${index + 1}`}
                  style={{ backgroundImage: `url(${project.image})` }}
                  aria-hidden="true"
                />

                <div className="card-footer">
                  <span>OPEN SIGNAL</span>
                  <span className="arrow">→</span>
                </div>
              </a>
            ))}
          </div>

          <footer className="projects-footer">
            <span>www.little-portland.com</span>
            <span>17 LITTLE PORTLAND STREET</span>
          </footer>
        </section>
      </main>

      <style jsx>{`
        .projects-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding-top: 86px;
          padding-bottom: 110px;
          background: #050505;
          color: #04ff00;
          font-family: 'Space Mono', 'Courier New', monospace;
          box-sizing: border-box;
          overflow: hidden;
        }

        .projects-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(5, 5, 5, 0.18), rgba(5, 5, 5, 0.72)),
            url('/images/projects/projects-bg.jpeg');
          background-size: cover;
          background-position: center;
          opacity: 0.88;
          filter: contrast(1.16) brightness(0.82);
          transform: scale(1.02);
          pointer-events: none;
        }

        .scanlines {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.22;
          background:
            repeating-linear-gradient(
              to bottom,
              rgba(4, 255, 0, 0.12) 0,
              rgba(4, 255, 0, 0.12) 1px,
              transparent 1px,
              transparent 5px
            );
          mix-blend-mode: screen;
          animation: scanMove 8s linear infinite;
        }

        .projects-frame {
          position: relative;
          z-index: 2;
          width: 65%;
          margin: 0 auto;
          padding: 30px;
          border: 2px solid #04ff00;
          background: rgba(4, 4, 4, 0.62);
          box-sizing: border-box;
          box-shadow:
            0 0 0 1px rgba(4, 255, 0, 0.12),
            0 0 38px rgba(4, 255, 0, 0.08);
        }

        .projects-frame::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(4, 255, 0, 0.18);
          pointer-events: none;
        }

        .projects-header {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
        }

        .header-topline {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 62px;
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.015em;
          text-transform: uppercase;
        }

        .tiny {
          font-size: 15px;
        }

        .title-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 24px;
        }

        .glitch-title {
          position: relative;
          margin: 0;
          color: #04ff00;
          font-size: clamp(58px, 9vw, 150px);
          font-weight: 700;
          line-height: 0.82;
          letter-spacing: -0.055em;
          text-transform: uppercase;
          text-shadow:
            0 0 8px rgba(4, 255, 0, 0.45),
            3px 0 0 rgba(4, 255, 0, 0.12);
          animation: titleLoad 1.4s steps(9, end) both;
        }

        .glitch-title::before,
        .glitch-title::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
        }

        .glitch-title::before {
          transform: translate(2px, -1px);
          clip-path: inset(0 0 54% 0);
          animation: glitchA 7s infinite;
        }

        .glitch-title::after {
          transform: translate(-2px, 1px);
          clip-path: inset(54% 0 0 0);
          animation: glitchB 9s infinite;
        }

        .spinner {
          position: relative;
          width: 46px;
          height: 46px;
          margin-bottom: 3px;
          animation: spinnerRotate 1.1s steps(8) infinite;
        }

        .spinner span {
          position: absolute;
          left: 50%;
          top: 0;
          width: 5px;
          height: 14px;
          margin-left: -2.5px;
          background: #04ff00;
          border-radius: 4px;
          transform-origin: 50% 23px;
          opacity: 0.25;
        }

        .spinner span:nth-child(1) {
          transform: rotate(0deg);
          opacity: 1;
        }

        .spinner span:nth-child(2) {
          transform: rotate(45deg);
          opacity: 0.88;
        }

        .spinner span:nth-child(3) {
          transform: rotate(90deg);
          opacity: 0.74;
        }

        .spinner span:nth-child(4) {
          transform: rotate(135deg);
          opacity: 0.6;
        }

        .spinner span:nth-child(5) {
          transform: rotate(180deg);
          opacity: 0.48;
        }

        .spinner span:nth-child(6) {
          transform: rotate(225deg);
          opacity: 0.36;
        }

        .spinner span:nth-child(7) {
          transform: rotate(270deg);
          opacity: 0.28;
        }

        .spinner span:nth-child(8) {
          transform: rotate(315deg);
          opacity: 0.2;
        }

        .project-divider {
          width: 100%;
          height: 2px;
          margin-top: 34px;
          background-image: linear-gradient(
            to right,
            #04ff00 0,
            #04ff00 38px,
            transparent 38px,
            transparent 62px
          );
          background-size: 62px 2px;
          background-repeat: repeat-x;
          animation: dashDrift 2.8s linear infinite;
        }

        .projects-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 34px;
        }

        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 460px;
          padding: 20px;
          border: 2px solid #04ff00;
          color: #04ff00 !important;
          text-decoration: none;
          background: rgba(0, 0, 0, 0.64);
          overflow: hidden;
          box-sizing: border-box;
          transition:
            transform 0.24s ease,
            background 0.24s ease,
            box-shadow 0.24s ease;
        }

        .project-card:hover {
          transform: translateY(-3px);
          background: rgba(4, 255, 0, 0.08);
          box-shadow: 0 0 24px rgba(4, 255, 0, 0.16);
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(
              110deg,
              transparent 0%,
              transparent 42%,
              rgba(4, 255, 0, 0.18) 50%,
              transparent 58%,
              transparent 100%
            );
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
        }

        .project-card:hover::before {
          transform: translateX(120%);
        }

        .card-meta,
        .project-card h2,
        .project-card p,
        .card-footer {
          position: relative;
          z-index: 2;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .project-card h2 {
          width: max-content;
          max-width: 100%;
          margin: 0 0 20px 0;
          overflow: hidden;
          color: #04ff00;
          font-size: clamp(30px, 4vw, 56px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(4, 255, 0, 0.35);
        }

        .project-card p {
          max-width: 92%;
          margin: 0 0 24px 0;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.45;
          text-transform: uppercase;
        }

        .project-art {
          position: relative;
          z-index: 1;
          width: calc(100% + 40px);
          min-height: 180px;
          margin: auto -20px 18px -20px;
          background-size: cover;
          background-position: center;
          filter: grayscale(1) contrast(1.25) brightness(0.75);
          border-top: 2px solid rgba(4, 255, 0, 0.8);
          border-bottom: 2px solid rgba(4, 255, 0, 0.8);
          opacity: 0.82;
        }

        .project-art::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(4, 255, 0, 0.08);
          mix-blend-mode: screen;
        }

        .project-art-2 {
          background-position: center top;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          text-transform: uppercase;
        }

        .arrow {
          font-size: 28px;
          line-height: 0.7;
          transition: transform 0.24s ease;
        }

        .project-card:hover .arrow {
          transform: translateX(5px);
        }

        .projects-footer {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-top: 76px;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
        }

        .typing {
          display: inline-block;
          width: max-content;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          animation: typeOnce 1.2s steps(16, end) both;
        }

        .typing.delay {
          animation-delay: 0.35s;
        }

        .typing-loop {
          animation: typeLoop 12s steps(22, end) infinite;
        }

        @keyframes typeOnce {
          from {
            max-width: 0;
          }

          to {
            max-width: 42ch;
          }
        }

        @keyframes typeLoop {
          0% {
            max-width: 0;
          }

          11% {
            max-width: 32ch;
          }

          78% {
            max-width: 32ch;
          }

          86% {
            max-width: 0;
          }

          100% {
            max-width: 0;
          }
        }

        @keyframes titleLoad {
          from {
            clip-path: inset(0 100% 0 0);
          }

          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes glitchA {
          0%,
          88%,
          100% {
            opacity: 0;
          }

          89% {
            opacity: 0.65;
            transform: translate(3px, -2px);
          }

          90% {
            opacity: 0.25;
            transform: translate(-1px, 1px);
          }

          91% {
            opacity: 0;
          }
        }

        @keyframes glitchB {
          0%,
          72%,
          100% {
            opacity: 0;
          }

          73% {
            opacity: 0.52;
            transform: translate(-3px, 2px);
          }

          74% {
            opacity: 0.18;
            transform: translate(2px, -1px);
          }

          75% {
            opacity: 0;
          }
        }

        @keyframes spinnerRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dashDrift {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 62px 0;
          }
        }

        @keyframes scanMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 80px;
          }
        }

        @media (max-width: 1100px) {
          .projects-frame {
            width: 75%;
          }

          .projects-grid {
            gap: 16px;
          }

          .project-card {
            min-height: 420px;
          }
        }

        @media (max-width: 768px) {
          .projects-page {
            padding-top: 86px;
            padding-bottom: 70px;
          }

          .projects-frame {
            width: 88%;
            padding: 18px;
          }

          .projects-frame::before {
            inset: 6px;
          }

          .header-topline {
            margin-bottom: 42px;
            font-size: 12px;
          }

          .tiny {
            font-size: 12px;
          }

          .title-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .glitch-title {
            font-size: clamp(42px, 17vw, 72px);
          }

          .spinner {
            width: 38px;
            height: 38px;
            margin-left: auto;
            margin-bottom: 0;
          }

          .spinner span {
            height: 12px;
            transform-origin: 50% 19px;
          }

          .project-divider {
            margin-top: 28px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 28px;
          }

          .project-card {
            min-height: 390px;
            padding: 16px;
          }

          .card-meta {
            font-size: 11px;
            margin-bottom: 24px;
          }

          .project-card h2 {
            font-size: clamp(28px, 9vw, 42px);
            white-space: normal;
            animation: none;
          }

          .project-card p {
            max-width: 100%;
            font-size: 13px;
          }

          .project-art {
            width: calc(100% + 32px);
            min-height: 150px;
            margin-left: -16px;
            margin-right: -16px;
          }

          .projects-footer {
            flex-direction: column;
            gap: 8px;
            margin-top: 48px;
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectsPage;
