import React from 'react';
import Head from 'next/head';

import SceneNav from '@components/SceneNav';

const PROJECTS = [
  {
    eyebrow: 'TRANSMISSION 01',
    title: 'THE TENT RADIO',
    description: 'Archived sound from The Tent at the End of the Universe.',
    href: '/thetentradio',
    meta: 'ONLINE',
    mode: 'waves',
    footer: 'OPEN SIGNAL',
  },
  {
    eyebrow: 'TRANSMISSION 02',
    title: 'LPX RADIO',
    description:
      'Resident frequencies, recordings and future transmissions from 17 Little Portland Street.',
    href: null,
    meta: 'COMING SOON',
    mode: 'radar',
    footer: 'SIGNAL STANDBY',
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
          transition:
            opacity 0.22s ease,
            color 0.22s ease,
            text-shadow 0.22s ease !important;
          white-space: nowrap !important;
        }

        .scene-nav--projects a:hover,
        .scene-nav--projects a.active {
          color: #04ff00 !important;
          opacity: 0.68 !important;
          transform: none !important;
        }

        .scene-nav--projects a[href="/projects"],
        .scene-nav--projects a[href="/projects/"],
        .scene-nav--projects a[href*="/projects"] {
          color: #04ff00 !important;
          opacity: 1 !important;
          text-shadow:
            0 0 7px rgba(4, 255, 0, 0.9),
            0 0 16px rgba(4, 255, 0, 0.42) !important;
        }

        .scene-nav--projects a[href="/projects"]:hover,
        .scene-nav--projects a[href="/projects/"]:hover,
        .scene-nav--projects a[href*="/projects"]:hover {
          opacity: 1 !important;
        }

        .scene-nav--projects a.disabled {
          color: rgba(4, 255, 0, 0.38) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          cursor: default !important;
          text-shadow: none !important;
          box-shadow: none !important;
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

        .scene-nav-mobile--projects .scene-nav-mobile-inner a[href="/projects"],
        .scene-nav-mobile--projects .scene-nav-mobile-inner a[href="/projects/"],
        .scene-nav-mobile--projects .scene-nav-mobile-inner a[href*="/projects"] {
          color: #04ff00 !important;
          opacity: 1 !important;
          text-shadow:
            0 0 7px rgba(4, 255, 0, 0.9),
            0 0 16px rgba(4, 255, 0, 0.42) !important;
        }

        .scene-nav-mobile--projects .scene-nav-mobile-inner a.disabled {
          color: rgba(4, 255, 0, 0.38) !important;
          opacity: 1 !important;
          pointer-events: none !important;
          text-shadow: none !important;
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
            {PROJECTS.map((project) => {
              const CardTag = project.href ? 'a' : 'div';

              return (
                <CardTag
                  key={project.title}
                  className={`project-card ${!project.href ? 'project-card--disabled' : ''}`}
                  {...(project.href
                    ? {
                        href: project.href,
                      }
                    : {
                        'aria-disabled': 'true',
                      })}
                >
                  <div className="card-meta">
                    <span>{project.eyebrow}</span>
                    <span>{project.meta}</span>
                  </div>

                  <h2 style={{ '--title-max': `${project.title.length + 1}ch` }}>
                    <span className="project-title-mask">
                      <span className="project-title-text">{project.title}</span>
                    </span>
                  </h2>

                  <p>{project.description}</p>

                  <div className={`signal-panel signal-panel--${project.mode}`} aria-hidden="true">
                    <div className="signal-stage">
                      {project.mode === 'waves' && (
                        <>
                          <div className="waveform">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>

                          <div className="frequency-line" />
                        </>
                      )}

                      {project.mode === 'radar' && (
                        <div className="radar">
                          <span className="radar-ring ring-1" />
                          <span className="radar-ring ring-2" />
                          <span className="radar-ring ring-3" />
                          <span className="radar-sweep" />
                          <span className="radar-dot dot-1" />
                          <span className="radar-dot dot-2" />
                          <span className="radar-dot dot-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>{project.footer}</span>
                    {project.href ? (
                      <span className="arrow">→</span>
                    ) : (
                      <span className="standby-dot">●</span>
                    )}
                  </div>
                </CardTag>
              );
            })}
          </div>
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
            linear-gradient(rgba(5, 5, 5, 0.1), rgba(5, 5, 5, 0.58)),
            url('/images/projects/projects-bg.jpeg');
          background-size: cover;
          background-position: center;
          opacity: 0.92;
          filter: contrast(1.18) brightness(0.84);
          transform: scale(1.02);
          pointer-events: none;
        }

        .scanlines {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.18;
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
          background: transparent;
          box-sizing: border-box;
          box-shadow:
            0 0 0 1px rgba(4, 255, 0, 0.08),
            0 0 38px rgba(4, 255, 0, 0.08);
        }

        .projects-header {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
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
          min-height: 500px;
          padding: 20px;
          border: 2px solid #04ff00;
          color: #04ff00 !important;
          text-decoration: none;
          background: rgba(0, 0, 0, 0.58);
          overflow: hidden;
          box-sizing: border-box;
          transition:
            transform 0.24s ease,
            background 0.24s ease,
            box-shadow 0.24s ease;
        }

        .project-card:not(.project-card--disabled):hover {
          transform: translateY(-3px);
          background: rgba(0, 0, 0, 0.42);
          box-shadow: 0 0 24px rgba(4, 255, 0, 0.16);
        }

        .project-card--disabled {
          cursor: default;
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

        .project-card:not(.project-card--disabled):hover::before {
          transform: translateX(120%);
        }

        .card-meta,
        .project-card h2,
        .project-card p,
        .signal-panel,
        .card-footer {
          position: relative;
          z-index: 2;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 34px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .project-card h2 {
          max-width: 100%;
          min-height: 1.05em;
          margin: 0 0 24px 0;
          overflow: hidden;
          color: #04ff00;
          font-size: clamp(30px, 2.75vw, 50px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          text-shadow: none;
        }

        .project-title-mask {
          display: inline-block;
          max-width: 0;
          overflow: hidden;
          vertical-align: bottom;
          white-space: nowrap;
          animation: projectTitleType 12s steps(18, end) infinite;
        }

        .project-title-text {
          display: inline-block;
          white-space: nowrap;
          text-shadow: none;
        }

        .project-card p {
          max-width: 94%;
          min-height: 70px;
          margin: 0 0 28px 0;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.45;
          text-transform: uppercase;
        }

        .signal-panel {
          display: flex;
          flex-direction: column;
          width: calc(100% + 40px);
          min-height: 190px;
          margin: auto -20px 18px -20px;
          border-top: 2px solid rgba(4, 255, 0, 0.82);
          border-bottom: 2px solid rgba(4, 255, 0, 0.82);
          background:
            radial-gradient(circle at 50% 50%, rgba(4, 255, 0, 0.08), transparent 42%),
            linear-gradient(rgba(4, 255, 0, 0.04), rgba(4, 255, 0, 0.01));
          overflow: hidden;
        }

        .signal-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              to right,
              rgba(4, 255, 0, 0.08) 0,
              rgba(4, 255, 0, 0.08) 1px,
              transparent 1px,
              transparent 34px
            );
          opacity: 0.32;
          animation: gridDrift 5s linear infinite;
        }

        .signal-panel::after {
          content: '';
          position: absolute;
          left: -20%;
          top: 0;
          width: 18%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(4, 255, 0, 0.24),
            transparent
          );
          animation: signalSweep 4.8s ease-in-out infinite;
        }

        .signal-stage {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-height: 188px;
          width: 100%;
          overflow: hidden;
        }

        .waveform {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          height: 110px;
          width: 78%;
        }

        .waveform span {
          display: block;
          width: 8px;
          height: 34px;
          background: #04ff00;
          box-shadow: 0 0 10px rgba(4, 255, 0, 0.55);
          animation: waveform 1.1s ease-in-out infinite;
        }

        .waveform span:nth-child(1) {
          animation-delay: -0.8s;
        }

        .waveform span:nth-child(2) {
          animation-delay: -0.64s;
        }

        .waveform span:nth-child(3) {
          animation-delay: -0.48s;
        }

        .waveform span:nth-child(4) {
          animation-delay: -0.32s;
        }

        .waveform span:nth-child(5) {
          animation-delay: -0.16s;
        }

        .waveform span:nth-child(6) {
          animation-delay: 0s;
        }

        .waveform span:nth-child(7) {
          animation-delay: -0.22s;
        }

        .waveform span:nth-child(8) {
          animation-delay: -0.44s;
        }

        .waveform span:nth-child(9) {
          animation-delay: -0.66s;
        }

        .waveform span:nth-child(10) {
          animation-delay: -0.88s;
        }

        .waveform span:nth-child(11) {
          animation-delay: -0.5s;
        }

        .waveform span:nth-child(12) {
          animation-delay: -0.18s;
        }

        .frequency-line {
          position: absolute;
          z-index: 2;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          background: rgba(4, 255, 0, 0.72);
          box-shadow: 0 0 12px rgba(4, 255, 0, 0.45);
          animation: lineFlicker 3.5s steps(2, end) infinite;
        }

        .radar {
          position: relative;
          z-index: 2;
          width: 138px;
          height: 138px;
          border: 2px solid rgba(4, 255, 0, 0.92);
          border-radius: 999px;
          box-shadow:
            0 0 16px rgba(4, 255, 0, 0.22),
            inset 0 0 18px rgba(4, 255, 0, 0.12);
        }

        .radar-ring {
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(4, 255, 0, 0.45);
          border-radius: 999px;
        }

        .ring-2 {
          inset: 38px;
        }

        .ring-3 {
          inset: 58px;
          background: #04ff00;
          box-shadow: 0 0 14px rgba(4, 255, 0, 0.75);
        }

        .radar-sweep {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 50%;
          height: 2px;
          background: linear-gradient(to right, #04ff00, transparent);
          transform-origin: left center;
          animation: radarSweep 1.9s linear infinite;
        }

        .radar-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #04ff00;
          box-shadow: 0 0 10px rgba(4, 255, 0, 0.75);
          animation: dotBlink 2.4s steps(2, end) infinite;
        }

        .dot-1 {
          left: 30px;
          top: 42px;
        }

        .dot-2 {
          right: 28px;
          top: 70px;
          animation-delay: 0.4s;
        }

        .dot-3 {
          left: 62px;
          bottom: 25px;
          animation-delay: 0.8s;
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

        .project-card:not(.project-card--disabled):hover .arrow {
          transform: translateX(5px);
        }

        .standby-dot {
          font-size: 12px;
          animation: dotBlink 2s steps(2, end) infinite;
        }

        @keyframes projectTitleType {
          0% {
            max-width: 0;
          }

          12% {
            max-width: var(--title-max);
          }

          76% {
            max-width: var(--title-max);
          }

          88% {
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

        @keyframes gridDrift {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(34px);
          }
        }

        @keyframes signalSweep {
          0% {
            transform: translateX(0);
            opacity: 0;
          }

          22% {
            opacity: 1;
          }

          60% {
            opacity: 1;
          }

          100% {
            transform: translateX(760%);
            opacity: 0;
          }
        }

        @keyframes waveform {
          0%,
          100% {
            height: 26px;
            opacity: 0.58;
          }

          50% {
            height: 98px;
            opacity: 1;
          }
        }

        @keyframes lineFlicker {
          0%,
          100% {
            opacity: 0.7;
          }

          50% {
            opacity: 0.2;
          }

          52% {
            opacity: 1;
          }
        }

        @keyframes radarSweep {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dotBlink {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.25;
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
            min-height: 480px;
          }

          .project-card h2 {
            font-size: clamp(30px, 3.5vw, 44px);
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
            min-height: 0;
            padding: 16px;
          }

          .card-meta {
            font-size: 11px;
            margin-bottom: 24px;
          }

          .project-card h2 {
            margin-bottom: 20px;
            font-size: clamp(28px, 8vw, 38px);
            line-height: 0.96;
            letter-spacing: -0.055em;
          }

          .project-card p {
            max-width: 100%;
            min-height: 0;
            margin-bottom: 26px;
            font-size: 13px;
          }

          .signal-panel {
            width: calc(100% + 32px);
            min-height: 170px;
            margin: 0 -16px 18px -16px;
          }

          .signal-stage {
            min-height: 168px;
          }

          .waveform {
            width: 82%;
            gap: 6px;
          }

          .waveform span {
            width: 6px;
          }

          .radar {
            width: 112px;
            height: 112px;
          }

          .ring-1 {
            inset: 15px;
          }

          .ring-2 {
            inset: 31px;
          }

          .ring-3 {
            inset: 48px;
          }

          .card-footer {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectsPage;
