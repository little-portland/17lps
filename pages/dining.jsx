import React from "react";
import Head from "next/head";

const DinningPage = () => {
  return (
    <>
      <Head>
        <title>Dining at 17 Little Portland Street</title>
        <meta
          name="description"
          content="Dining at 17 Little Portland Street — The Tent and Chef’s Studio."
        />
        <style>{`
          :root {
            --bg: #090909;
            --line: rgba(255, 255, 255, 0.88);
            --line-soft: rgba(255, 255, 255, 0.18);
            --text: #f2f2ef;
            --muted: rgba(242, 242, 239, 0.72);
            --display: "Orbitron", "Eurostile", "Bank Gothic", "Arial Black", sans-serif;
            --body: "Space Mono", "IBM Plex Mono", monospace;
            --italic-display: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }

          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap');

          html {
            background: var(--bg) !important;
            overflow-x: hidden !important;
          }

          body {
            margin: 0;
            background: var(--bg) !important;
            color: var(--text);
            overflow-x: hidden !important;
            font-family: var(--body);
          }

          * { box-sizing: border-box; }
          a { color: inherit; text-decoration: none; }

          @keyframes grainShift {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-0.7%, 0.4%); }
            40% { transform: translate(0.45%, -0.55%); }
            60% { transform: translate(0.5%, 0.3%); }
            80% { transform: translate(-0.35%, -0.25%); }
            100% { transform: translate(0, 0); }
          }

          @keyframes tunnelPulse {
            0%, 100% { opacity: 0.78; filter: brightness(1); }
            50% { opacity: 1; filter: brightness(1.18); }
          }

          @keyframes scanSweep {
            0% { transform: translateY(-130%); opacity: 0; }
            10% { opacity: 0.12; }
            50% { opacity: 0.24; }
            90% { opacity: 0.12; }
            100% { transform: translateY(130%); opacity: 0; }
          }

          @keyframes screenGlitch {
            0%, 88%, 100% { opacity: 0; transform: translateX(0); }
            89% { opacity: 0.12; transform: translateX(-3px); }
            90% { opacity: 0.04; transform: translateX(3px); }
            91% { opacity: 0.08; transform: translateX(0); }
          }

          @keyframes ambientBars {
            0% { background-position: 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 36px 0, -22px 0, 0 0, 0 0; }
          }

          @keyframes dividerDrift {
            0% {
              transform: translateX(-60%);
              opacity: 0.4;
            }
            50% {
              transform: translateX(220%);
              opacity: 1;
            }
            100% {
              transform: translateX(-60%);
              opacity: 0.4;
            }
          }
            50% {
              transform: translateX(18%) scaleX(1.02);
              opacity: 0.9;
            }
            100% {
              transform: translateX(-18%) scaleX(0.92);
              opacity: 0.45;
            }
          }
            50% { transform: translateX(6%); opacity: 1; }
            100% { transform: translateX(-6%); opacity: 0.68; }
          }

          @keyframes floatPulse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }

          @keyframes lineGlow {
            0%, 100% { opacity: 0.9; box-shadow: 0 0 0 rgba(255,255,255,0); }
            50% { opacity: 1; box-shadow: 0 0 18px rgba(255,255,255,0.08); }
          }

          @keyframes ambientBars {
            0% { background-position: 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 36px 0, -22px 0, 0 0, 0 0; }
          }

          @keyframes glowTagline {
            0%, 100% {
              text-shadow:
                0 1px 0 rgba(255,255,255,0.22),
                -3px 4px 0 rgba(255,255,255,0.14),
                -7px 9px 0 rgba(255,255,255,0.07),
                -11px 14px 0 rgba(255,255,255,0.04),
                0 0 18px rgba(255,255,255,0.08);
            }
            50% {
              text-shadow:
                0 1px 0 rgba(255,255,255,0.26),
                -4px 5px 0 rgba(255,255,255,0.16),
                -9px 12px 0 rgba(255,255,255,0.08),
                -13px 17px 0 rgba(255,255,255,0.05),
                0 0 30px rgba(255,255,255,0.16);
            }
          }

          @keyframes crawlFloat {
            0%, 100% {
              transform: perspective(1100px) rotateX(52deg) scaleX(0.96) scaleY(1.08) translateY(0);
              filter: brightness(1);
            }
            50% {
              transform: perspective(1100px) rotateX(52deg) scaleX(0.96) scaleY(1.08) translateY(-2px);
              filter: brightness(1.04);
            }
          }
            50% {
              transform: perspective(900px) rotateX(58deg) scaleY(1.18) translateY(-4px);
              filter: brightness(1.06);
            }
          }
            50% {
              transform: perspective(1100px) rotateX(18deg) skewX(-8deg) translateY(-2px);
              text-shadow:
                0 1px 0 rgba(255,255,255,0.26),
                -4px 5px 0 rgba(255,255,255,0.16),
                -9px 12px 0 rgba(255,255,255,0.08),
                -13px 17px 0 rgba(255,255,255,0.05),
                0 0 30px rgba(255,255,255,0.16);
            }
          }

          @keyframes shimmerBand {
            0% { transform: translateX(-120%); opacity: 0; }
            20% { opacity: 0.08; }
            50% { opacity: 0.18; }
            80% { opacity: 0.08; }
            100% { transform: translateX(120%); opacity: 0; }
          }

          @keyframes boxGlitch {
            0%, 100% { transform: translateX(0); }
            96% { transform: translateX(0); }
            97% { transform: translateX(1px); }
            98% { transform: translateX(-1px); }
            99% { transform: translateX(0); }
          }

          .page {
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            padding: 28px 16px 42px;
            background:
              radial-gradient(circle at 50% 10%, rgba(255,255,255,0.04), transparent 30%),
              radial-gradient(circle at 15% 80%, rgba(255,255,255,0.025), transparent 28%),
              linear-gradient(180deg, #101010 0%, #070707 100%);
          }

          .page::before,
          .page::after {
            content: "";
            position: fixed;
            inset: -8%;
            pointer-events: none;
            z-index: 0;
          }

          .page::before {
            opacity: 0.34;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            mix-blend-mode: screen;
            animation: grainShift 0.18s steps(2, end) infinite;
          }

          .page::after {
            background:
              repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 2px, transparent 2px 24px),
              repeating-linear-gradient(90deg, transparent 0 12px, rgba(255,255,255,0.018) 12px 14px, transparent 14px 34px),
              linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 18%, transparent 82%, rgba(255,255,255,0.035)),
              radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 40%);
            opacity: 0.3;
            animation: ambientBars 6s linear infinite;
          }

          .screen-glitch {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background:
              linear-gradient(90deg, transparent 0 18%, rgba(255,255,255,0.1) 18% 19%, transparent 19% 100%),
              linear-gradient(0deg, transparent 0 56%, rgba(255,255,255,0.06) 56% 58%, transparent 58% 100%),
              linear-gradient(180deg, transparent 0 28%, rgba(255,255,255,0.03) 28% 30%, transparent 30% 100%);
            mix-blend-mode: screen;
            animation: screenGlitch 5.5s steps(1, end) infinite;
          }

          .shell {
            width: min(1160px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .frame {
            position: relative;
            border: 2px solid var(--line);
            border-radius: 10px;
            background: transparent;
            overflow: hidden;
          }

          .frame::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(180deg, rgba(255,255,255,0.025), transparent 22%, transparent 78%, rgba(255,255,255,0.02));
          }

          .frame::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: -25%;
            height: 50%;
            pointer-events: none;
            background: linear-gradient(
              to bottom,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.03) 18%,
              rgba(255,255,255,0.16) 50%,
              rgba(255,255,255,0.03) 82%,
              rgba(255,255,255,0) 100%
            );
            opacity: 0.28;
            animation: scanSweep 5.5s linear infinite;
          }

          .header-bar {
            display: grid;
            grid-template-columns: 1fr;
            align-items: center;
            gap: 12px;
            padding: 26px 22px 18px;
            position: relative;
            z-index: 2;
            text-align: center;
          }

          .title-wrap {
            width: min(1180px, 100%);
            margin: 0 auto;
          }

          .header-title {
            font-family: var(--future);
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 0.88;
            font-size: clamp(66px, 10vw, 150px);
            font-weight: 900;
            color: var(--text);
            animation: floatPulse 6s ease-in-out infinite;
          }

          .header-subtitle {
            width: 100%;
            margin: 12px auto 12px;
            color: var(--text);
            font-family: var(--future);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: clamp(24px, 3vw, 58px);
            line-height: 1;
            font-weight: 700;
          }

          .top-lines {
            position: relative;
            width: 100%;
            height: 18px;
            margin: 4px auto 20px;
            overflow: hidden;
          }

          .top-lines::before,
          .top-lines::after {
            content: "";
            position: absolute;
            left: 10%;
            right: 10%;
            border-radius: 999px;
          }

          .top-lines::before {
            top: 6px;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 10%, rgba(255,255,255,0.9) 24%, rgba(255,255,255,0.9) 76%, rgba(255,255,255,0.32) 90%, transparent 100%);
            opacity: 0.95;
          }

          .top-lines::after {
            top: 11px;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 8%, rgba(255,255,255,0.58) 24%, rgba(255,255,255,0.58) 76%, rgba(255,255,255,0.12) 92%, transparent 100%);
            opacity: 0.85;
          }

          .top-lines span {
            position: absolute;
            left: 24%;
            width: 18%;
            top: 8px;
            height: 2px;
            border-radius: 999px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent);
            box-shadow: 0 0 12px rgba(255,255,255,0.08);
            animation: dividerDrift 5s ease-in-out infinite;
          }

          .top-lines i,
          .top-lines b,
          .top-lines em,
          .top-lines strong {
            display: none;
          }

          .tagline {
            width: auto;
            max-width: 100%;
            margin: 0 auto;
            color: var(--text);
            font-family: var(--italic-display);
            font-style: italic;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.01em;
            line-height: 0.92;
            font-size: clamp(40px, 4vw, 72px);
            text-shadow:
              0 1px 0 rgba(255,255,255,0.16),
              0 0 14px rgba(255,255,255,0.05);
            transform: perspective(1100px) rotateX(52deg) scaleX(0.96) scaleY(1.08);
            transform-origin: center top;
            display: inline-block;
            position: relative;
            white-space: nowrap;
            animation: crawlFloat 5.2s ease-in-out infinite;
          }

          .tagline::after,
          .tagline::before {
            display: none;
          }

          .header-tagline-wrap {
            text-align: center;
            overflow: visible;
            padding: 8px 2.5% 10px;
          }

          .hero {
            position: relative;
            z-index: 1;
            padding: 8px 22px 22px;
          }

          .tunnel-box {
            position: relative;
            margin: 0 0 22px;
            height: min(46vw, 470px);
            min-height: 260px;
            border: 2px solid var(--line);
            border-radius: 10px;
            overflow: hidden;
            background: transparent;
          }

          .tunnel-box::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              repeating-linear-gradient(to right, transparent 0, transparent 3.8%, var(--line) 3.8%, var(--line) 4%, transparent 4%, transparent 7.8%),
              repeating-linear-gradient(to bottom, transparent 0, transparent 4.8%, var(--line) 4.8%, var(--line) 5%, transparent 5%, transparent 9.8%);
            transform: perspective(1100px) rotateX(69deg) scale(2.15) translateY(-3%);
            transform-origin: center center;
            opacity: 0.92;
            animation: tunnelPulse 4.5s ease-in-out infinite;
          }

          .tunnel-box::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 10%;
            height: 13%;
            transform: translate(-50%, -50%);
            background: var(--text);
            box-shadow: 0 0 24px rgba(255,255,255,0.34);
          }

          .floating-panel {
            position: relative;
            z-index: 2;
            display: grid;
            gap: 14px;
            margin: 0 22px 22px;
          }

          .content-stack {
            padding: 0 22px 22px;
            display: grid;
            gap: 18px;
            position: relative;
            z-index: 1;
          }

          .schedule-wrap,
          .cta-card,
          .venue-card,
          .content-wrap {
            position: relative;
            background: transparent;
            border: 2px solid var(--line);
            border-radius: 10px;
            overflow: hidden;
            animation: lineGlow 7s ease-in-out infinite;
          }

          .schedule-wrap::before,
          .cta-card::before,
          .venue-card::before,
          .content-wrap::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px);
            opacity: 0.08;
          }

          .schedule-header {
            position: relative;
            z-index: 1;
            padding: 16px 18px 0;
            text-align: center;
          }

          .schedule-open {
            font-family: var(--future);
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.12em;
            font-size: clamp(18px, 2vw, 28px);
            color: var(--text);
            margin-bottom: 8px;
          }

          .schedule-label-top {
            font-family: var(--body);
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.24em;
            font-size: 22px;
            color: var(--text);
            margin-bottom: 18px;
            padding: 4px 0 6px;
          }

          .schedule-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .schedule-item {
            position: relative;
            z-index: 1;
            padding: 18px 16px 16px;
            border-top: 2px solid var(--line);
            border-right: 2px solid var(--line);
          }

          .schedule-item:last-child { border-right: none; }

          .card-title {
            color: var(--text);
            font-family: var(--future);
            font-size: clamp(22px, 2vw, 34px);
            line-height: 0.95;
            text-transform: uppercase;
            margin-bottom: 12px;
            font-weight: 800;
          }

          .card-time {
            color: var(--text);
            font-family: var(--future);
            font-size: clamp(36px, 3vw, 52px);
            line-height: 0.9;
            text-transform: uppercase;
            font-weight: 900;
          }

          .cta-link {
            position: relative;
            z-index: 1;
            display: block;
            text-align: center;
            padding: 18px 20px 18px 20px;
            color: var(--text);
            font-family: var(--future);
            text-transform: uppercase;
            font-size: clamp(24px, 2.4vw, 38px);
            line-height: 0.92;
            letter-spacing: 0.04em;
            font-weight: 800;
            background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015));
            transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          }

          .cta-link::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 18px;
            height: 2px;
            background: var(--text);
            transform: translate(calc(-50% - 290px), -50%);
            box-shadow: 0 -4px 0 rgba(255,255,255,0.18), 0 4px 0 rgba(255,255,255,0.18);
            pointer-events: none;
          }

          .cta-link::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(calc(-50% - 272px), -50%);
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-left: 9px solid var(--text);
            display: block;
            pointer-events: none;
          }

          .cta-link:hover {
            color: var(--text);
            background: linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03));
            box-shadow: 0 0 18px rgba(255,255,255,0.08);
            transform: translateY(-1px);
          }

          .venue-card-inner {
            min-height: 220px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 26px 20px;
            position: relative;
            z-index: 1;
          }

          .venue-title,
          .concept-title,
          .image-placeholder-title {
            color: var(--text);
            font-family: var(--future);
            text-transform: uppercase;
            line-height: 0.92;
            letter-spacing: 0.03em;
            font-weight: 900;
          }

          .venue-title { font-size: clamp(34px, 4vw, 58px); }

          .venue-copy,
          .image-placeholder-path,
          .concept-subtitle {
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 12px;
            font-weight: 800;
            font-family: var(--body);
          }

          .venue-copy {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.35;
          }

          .venue-path {
            margin-top: 10px;
            color: rgba(243,243,240,0.48);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 800;
            font-family: var(--body);
          }

          .concept-stack {
            display: grid;
            gap: 18px;
          }

          .concept-block {
            display: grid;
            gap: 18px;
          }

          .image-placeholder {
            min-height: 220px;
            border: 2px solid var(--line);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 18px;
            background: transparent;
            animation: lineGlow 9s ease-in-out infinite;
          }

          .image-placeholder-title { font-size: clamp(28px, 3vw, 44px); }
          .image-placeholder-path { display: block; margin-top: 10px; }

          .concept-kicker {
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 10px;
            font-family: var(--body);
          }

          .concept-title {
            margin: 0;
            font-size: clamp(34px, 4.2vw, 68px);
          }

          .concept-subtitle { margin-top: 8px; }

          .concept-copy {
            margin: 18px 0 18px;
            color: var(--text);
            font-size: clamp(18px, 1.6vw, 24px);
            line-height: 1.34;
            font-weight: 700;
            max-width: none;
            width: 100%;
          }

          .feature-list {
            list-style: none;
            padding: 0;
            margin: 0 0 18px;
            display: grid;
            gap: 8px;
          }

          .feature-list li {
            color: var(--text);
            font-family: var(--body);
            text-transform: none;
            font-size: clamp(18px, 1.6vw, 24px);
            line-height: 1.34;
            letter-spacing: 0;
            position: relative;
            padding-left: 34px;
            font-weight: 700;
          }

          .feature-list li::before {
            content: "";
            position: absolute;
            left: 5px;
            top: 50%;
            width: 11px;
            height: 11px;
            transform: translateY(-50%);
            border: 2px solid var(--text);
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(255,255,255,0.04);
          }

          .link-row {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          .link-row a {
            color: var(--text);
            font-family: var(--future);
            text-transform: uppercase;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 1;
            letter-spacing: 0.05em;
            position: relative;
            padding: 14px 18px 14px 46px;
            font-weight: 800;
            border: 1px solid var(--line);
            border-radius: 999px;
            background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015));
            transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
            display: inline-block;
          }

          .link-row a::before {
            content: "";
            position: absolute;
            left: 16px;
            top: 50%;
            width: 14px;
            height: 2px;
            background: var(--text);
            transform: translateY(-50%);
            box-shadow: 0 -4px 0 rgba(255,255,255,0.18), 0 4px 0 rgba(255,255,255,0.18);
            pointer-events: none;
          }

          .link-row a::after {
            content: "";
            position: absolute;
            left: 28px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 8px solid var(--text);
            display: block;
            pointer-events: none;
          }

          .link-row a:hover {
            color: var(--text);
            background: linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03));
            box-shadow: 0 0 18px rgba(255,255,255,0.08);
            transform: translateY(-1px);
          }

          .footer-strip {
            display: grid;
            grid-template-columns: 140px 1fr 140px;
            gap: 0;
            border-top: 2px solid var(--line);
            margin-top: 18px;
            position: relative;
            z-index: 1;
          }

          .footer-cell {
            min-height: 92px;
            border-right: 2px solid var(--line);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            position: relative;
            overflow: hidden;
            background: transparent;
          }

          .footer-cell:last-child { border-right: none; }

          .footer-mark {
            width: 74px;
            height: 74px;
            position: relative;
            border-radius: 50%;
            border: 3px solid var(--text);
          }

          .footer-mark::before,
          .footer-mark::after {
            content: "";
            position: absolute;
            border-radius: 50%;
          }

          .footer-mark::before {
            inset: 15px;
            border: 3px solid var(--text);
          }

          .footer-mark::after {
            width: 10px;
            height: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: var(--text);
          }

          .footer-lines {
            width: 100%;
            height: 44px;
            background:
              linear-gradient(to bottom,
                var(--text) 0 2px,
                transparent 2px 7px,
                var(--text) 7px 11px,
                transparent 11px 16px,
                var(--text) 16px 18px,
                transparent 18px 24px,
                var(--text) 24px 29px,
                transparent 29px 34px,
                var(--text) 34px 36px,
                transparent 36px 41px,
                var(--text) 41px 44px
              );
            opacity: 0.92;
          }

          @media (max-width: 980px) {
            .footer-strip { grid-template-columns: 110px 1fr 110px; }
          }

          @media (max-width: 900px) {
            .schedule-grid { grid-template-columns: 1fr; }
            .schedule-item {
              border-right: none;
              border-bottom: 2px solid var(--line);
            }
            .schedule-item:last-child { border-bottom: none; }
            .footer-strip { grid-template-columns: 100px 1fr 100px; }
          }

          @media (max-width: 900px) {
            .header-tagline-wrap {
              padding-left: 4%;
              padding-right: 4%;
            }
            .tagline {
              white-space: normal;
              font-size: clamp(28px, 5.6vw, 52px);
              line-height: 0.98;
            }
          }

          @media (max-width: 640px) {
            .page { padding: 14px 8px 22px; }
            .header-bar,
            .hero,
            .content-stack { margin-left: 0; margin-right: 0; }
            .hero,
            .content-stack,
            .header-bar { padding-left: 14px; padding-right: 14px; }
            .floating-panel { margin: 0 14px 18px; }
            .tunnel-box { height: 220px; }
            .cta-link::before {
              transform: translate(calc(-50% - 118px), -50%);
            }
            .cta-link::after {
              transform: translate(calc(-50% - 100px), -50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .page::before,
            .frame::after,
            .tunnel-box::before,
            .screen-glitch,
            .header-title,
            .page::after,
            .tagline,
            .tagline::after,
            .schedule-wrap,
            .content-wrap,
            .image-placeholder,
            .cta-link {
              animation: none !important;
            }
          }
        `}</style>
      </Head>

      <main className="page">
        <div className="screen-glitch" aria-hidden="true" />
        <div className="shell">
          <section className="frame">
            <div className="header-bar">
              <div className="title-wrap">
                <div className="header-title">Dining At</div>
                <div className="header-subtitle">17 Little Portland Street</div>
                <div className="top-lines" aria-hidden="true"><span /></div>
                <div className="header-tagline-wrap">
                  <div className="tagline">More Than a Meal. Step Into The Void</div>
                </div>
              </div>
            </div>

            <div className="hero">
              <div className="tunnel-box" aria-hidden="true" />
            </div>

            <div className="floating-panel">
              <div className="schedule-wrap">
                <div className="schedule-header">
                  <div className="schedule-open">Open Thursdays to Saturdays</div>
                  <div className="schedule-label-top">Nightly Schedule</div>
                </div>
                <div className="schedule-grid">
                  <div className="schedule-item">
                    <div className="card-title">Chef&apos;s Studio</div>
                    <div className="card-time">20:00</div>
                  </div>
                  <div className="schedule-item">
                    <div className="card-title">Dinner in The Tent</div>
                    <div className="card-time">20:30</div>
                  </div>
                  <div className="schedule-item">
                    <div className="card-title">Club Opens</div>
                    <div className="card-time">22:00</div>
                  </div>
                </div>
              </div>

              <div className="cta-card">
                <a className="cta-link" href="#concepts">Explore our futurist dining concept</a>
              </div>
            </div>

            <div className="content-stack">
              <div className="venue-card">
                <div className="venue-card-inner">
                  <div className="venue-title">Venue Map Placeholder</div>
                  <div className="venue-copy">Add your PNG later and swap this block for an image</div>
                  <div className="venue-path">Suggested path: /images/dinning-map.png</div>
                </div>
              </div>

              <div className="concept-stack" id="concepts">
                <article className="concept-block">
                  <div className="image-placeholder">
                    <div>
                      <div className="image-placeholder-title">The Tent Image Placeholder</div>
                      <span className="image-placeholder-path">Suggested path: /images/the-tent.png</span>
                    </div>
                  </div>

                  <div className="content-wrap concept-copy-wrap">
                    <div style={{ padding: '18px' }}>
                      <div className="concept-kicker">Dining concept</div>
                      <h2 className="concept-title">The Tent</h2>
                      <div className="concept-subtitle">at the End of the Universe</div>

                      <p className="concept-copy">
                        In a floating tent, lost in space, futurist menus set the stage for a sensorial
                        experience as dinner seamlessly transitions into our hypnotic after-dark mode - a
                        cosmic journey.
                      </p>

                      <ul className="feature-list">
                        <li>£65pp Set Dinner</li>
                        <li>Futurist Menu</li>
                        <li>8:30pm Start</li>
                        <li>Club Access Included</li>
                      </ul>

                      <div className="link-row">
                        <a href="#">Book</a>
                        <a href="#">Menu</a>
                        <a href="#">Explore The Tent</a>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="concept-block">
                  <div className="image-placeholder">
                    <div>
                      <div className="image-placeholder-title">Chef&apos;s Studio Image Placeholder</div>
                      <span className="image-placeholder-path">Suggested path: /images/chefs-studio.png</span>
                    </div>
                  </div>

                  <div className="content-wrap concept-copy-wrap">
                    <div style={{ padding: '18px' }}>
                      <div className="concept-kicker">Dining concept</div>
                      <h2 className="concept-title">Chef&apos;s Studio</h2>
                      <div className="concept-subtitle">Where the Heads Dine</div>

                      <p className="concept-copy">
                        Chef&apos;s Studio is an intimate and futuristic space beneath The Tent - the table of
                        choice for those in the know.
                      </p>

                      <ul className="feature-list">
                        <li>£65pp Set Dinner</li>
                        <li>Futurist Menu</li>
                        <li>6-12 PAX</li>
                        <li>8pm Start</li>
                      </ul>

                      <div className="link-row">
                        <a href="#">Book</a>
                        <a href="#">Menu</a>
                        <a href="#">Explore Chef&apos;s Studio</a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="footer-strip">
                <div className="footer-cell"><div className="footer-mark" aria-hidden="true" /></div>
                <div className="footer-cell"><div className="footer-lines" aria-hidden="true" /></div>
                <div className="footer-cell"><div className="footer-mark" aria-hidden="true" /></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DinningPage;
