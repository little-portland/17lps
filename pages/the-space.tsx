import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

/**
 * Drop this file into /pages, for example as pages/venue.tsx
 *
 * Then place your 3D PNG somewhere public, for example:
 *   /public/images/venue-3d.png
 *
 * Update VENUE_IMAGE if needed.
 */

const VENUE_IMAGE = '/images/venue-3d.png';

const AREAS = [
  {
    id: 'tent',
    title: 'The Tent',
    href: '/tent',
    subtitle: 'Lounge energy under a luminous canopy.',
    accent: 'from-fuchsia-400/80 via-pink-400/60 to-cyan-300/80',
    glow: 'shadow-[0_0_35px_rgba(232,121,249,0.35)]',
    position: {
      desktop: { top: '15%', left: '21%' },
      mobile: { top: '6%', left: '50%' },
    },
  },
  {
    id: 'chefs-studio',
    title: "The Chef's Studio",
    href: '/chefs-studio',
    subtitle: 'Interactive culinary moments in mission control.',
    accent: 'from-emerald-300/80 via-teal-300/65 to-cyan-200/80',
    glow: 'shadow-[0_0_35px_rgba(94,234,212,0.30)]',
    position: {
      desktop: { bottom: '14%', left: '40%' },
      mobile: { bottom: '19%', left: '16%' },
    },
  },
  {
    id: 'studio',
    title: 'The Studio',
    href: '/studio',
    subtitle: 'Broadcast-grade atmosphere with cosmic drama.',
    accent: 'from-sky-300/80 via-cyan-300/60 to-violet-400/80',
    glow: 'shadow-[0_0_35px_rgba(125,211,252,0.30)]',
    position: {
      desktop: { bottom: '12%', right: '8%' },
      mobile: { bottom: '7%', right: '6%' },
    },
  },
] as const;

export default function VenuePage() {
  const [activeArea, setActiveArea] = useState<string>(AREAS[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = useMemo(
    () => AREAS.find((area) => area.id === activeArea) ?? AREAS[0],
    [activeArea]
  );

  return (
    <>
      <Head>
        <title>Venue Portal</title>
        <meta
          name="description"
          content="Explore the venue across The Tent, The Chef's Studio, and The Studio."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
        <SceneBackground />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8">
          <header className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-200 backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                Venue Navigation Portal
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Retro-futurist venue map
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Drift through the space station and jump directly into each experience zone.
                Tap the floating beacons on the venue or use the control cards below.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-[1.75rem] border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
              {AREAS.map((area) => {
                const isActive = area.id === active.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onMouseEnter={() => setActiveArea(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    onClick={() => setActiveArea(area.id)}
                    className={[
                      'rounded-2xl border px-3 py-2 text-left transition duration-300',
                      isActive
                        ? 'border-cyan-300/40 bg-cyan-300/10 text-white'
                        : 'border-white/5 bg-white/0 text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white',
                    ].join(' ')}
                  >
                    <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Zone</div>
                    <div className="mt-1 text-xs font-medium sm:text-sm">{area.title}</div>
                  </button>
                );
              })}
            </div>
          </header>

          <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_360px] xl:grid-cols-[minmax(0,1.5fr)_400px]">
            <div className="relative order-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:order-1 lg:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.14),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(244,114,182,0.14),transparent_24%)]" />
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

              <div className="relative aspect-[16/11] w-full rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.22),rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.5)_68%,rgba(0,0,0,0.95)_100%)] p-2 sm:p-4">
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem]">
                  <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:46px_46px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.9)_100%)]" />
                </div>

                <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.25rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.18),transparent_26%)] blur-2xl" />

                  <img
                    src={VENUE_IMAGE}
                    alt="3D venue map with highlighted spaces"
                    className={[
                      'relative z-10 h-auto w-full max-w-[1200px] object-contain transition duration-700',
                      mounted ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
                    ].join(' ')}
                  />

                  {AREAS.map((area) => (
                    <AreaHotspot
                      key={area.id}
                      area={area}
                      isActive={active.id === area.id}
                      onHover={() => setActiveArea(area.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {AREAS.map((area) => {
                  const isActive = area.id === active.id;
                  return (
                    <Link key={area.id} href={area.href} passHref>
                      <a
                        onMouseEnter={() => setActiveArea(area.id)}
                        className={[
                          'group relative block overflow-hidden rounded-[1.5rem] border p-4 transition duration-300',
                          isActive
                            ? 'border-cyan-300/30 bg-white/10'
                            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]',
                        ].join(' ')}
                      >
                        <div
                          className={[
                            'absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90',
                            area.accent,
                          ].join(' ')}
                        />
                        <div className="text-[10px] uppercase tracking-[0.26em] text-slate-400">Access node</div>
                        <div className="mt-2 text-lg font-medium text-white">{area.title}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{area.subtitle}</p>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200 transition group-hover:translate-x-1">
                          Enter zone
                          <span aria-hidden>→</span>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            <aside className="order-1 flex flex-col gap-4 lg:order-2">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Now selected</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">{active.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{active.subtitle}</p>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
                    <span>Jump sequence</span>
                    <span>01</span>
                  </div>
                  <div className="space-y-3">
                    {AREAS.map((area, index) => {
                      const selected = area.id === active.id;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setActiveArea(area.id)}
                          className={[
                            'flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition',
                            selected
                              ? 'border-cyan-300/30 bg-cyan-300/10'
                              : 'border-white/5 bg-white/0 hover:border-white/10 hover:bg-white/5',
                          ].join(' ')}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">
                            0{index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-white">{area.title}</div>
                            <div className="truncate text-xs text-slate-400">Open destination page</div>
                          </div>
                          <Link href={area.href} passHref>
                            <a
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-cyan-200 hover:bg-white/5"
                              onClick={(event) => event.stopPropagation()}
                            >
                              Open
                            </a>
                          </Link>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <DataTile label="Zones" value="03" />
                <DataTile label="Mode" value="Live" />
                <DataTile label="Theme" value="Neo" />
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}

function AreaHotspot({
  area,
  isActive,
  onHover,
}: {
  area: (typeof AREAS)[number];
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <div
      className="absolute z-20"
      style={{
        ...area.position.mobile,
      }}
    >
      <div className="hidden lg:block" style={area.position.desktop} />
      <div className="lg:hidden" />
      <HotspotBubble area={area} isActive={isActive} onHover={onHover} mobile />
      <style jsx>{`
        div.absolute {
          top: ${area.position.mobile.top ?? 'auto'};
          left: ${area.position.mobile.left ?? 'auto'};
          right: ${area.position.mobile.right ?? 'auto'};
          bottom: ${area.position.mobile.bottom ?? 'auto'};
        }
        @media (min-width: 1024px) {
          div.absolute {
            top: ${area.position.desktop.top ?? 'auto'};
            left: ${area.position.desktop.left ?? 'auto'};
            right: ${area.position.desktop.right ?? 'auto'};
            bottom: ${area.position.desktop.bottom ?? 'auto'};
          }
        }
      `}</style>
    </div>
  );
}

function HotspotBubble({
  area,
  isActive,
  onHover,
}: {
  area: (typeof AREAS)[number];
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <Link href={area.href} passHref>
      <a
        onMouseEnter={onHover}
        onFocus={onHover}
        className="group relative block -translate-x-1/2"
        aria-label={`Open ${area.title}`}
      >
        <div className="absolute left-1/2 top-full h-10 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-transparent" />
        <div className="absolute left-1/2 top-[calc(100%+2.25rem)] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />

        <div
          className={[
            'relative rounded-full border px-3 py-2 backdrop-blur-xl transition duration-300 sm:px-4',
            isActive
              ? `border-white/20 bg-white/12 ${area.glow} scale-100`
              : 'border-white/10 bg-black/25 scale-95 hover:scale-100 hover:border-white/20 hover:bg-white/10',
          ].join(' ')}
        >
          <div className="flex items-center gap-2">
            <span className={[
              'h-2.5 w-2.5 rounded-full bg-gradient-to-r',
              area.accent,
            ].join(' ')} />
            <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-white sm:text-xs">
              {area.title}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}

function DataTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 text-center backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function SceneBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.18),transparent_26%),radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(56,189,248,0.10),transparent_24%),linear-gradient(180deg,#03050a_0%,#02040a_45%,#010308_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cyan-300/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/12 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-950/20 to-transparent" />
    </>
  );
}
