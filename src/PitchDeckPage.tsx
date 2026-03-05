import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, ShieldCheck, BarChart3, Coins, Users, Search, DollarSign, Building2, Handshake, Rocket, Target, Activity, Wallet, Cpu, Server, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type SlideShellProps = {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const SlideShell = ({ id, index, title, subtitle, children }: SlideShellProps) => (
  <section
    id={id}
    className="deck-slide snap-start min-h-[100svh] px-5 pb-14 pt-28 md:px-10 lg:px-14 lg:pt-32"
  >
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
          Slide {index}
        </span>
        <div className="h-px w-20 bg-gradient-to-r from-emerald-300/50 to-transparent" />
      </div>

      <h2 className="deck-slide-title font-['Space_Grotesk'] text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="deck-slide-subtitle mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-[1.15rem]">{subtitle}</p>
      ) : null}

      <div className="deck-slide-body mt-10 flex-1">{children}</div>
    </div>
  </section>
);

const GeoCompanionMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative rounded-2xl border border-emerald-300/40 bg-gradient-to-br from-emerald-300/20 via-cyan-300/10 to-slate-900/70 shadow-[0_10px_30px_rgba(16,185,129,0.22)]"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full p-2.5">
      <defs>
        <linearGradient id="gclogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gclogo)" strokeWidth="7" strokeLinecap="round" strokeDasharray="160 70" />
      <path d="M38 60 L50 40 L63 60" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="5" fill="#5eead4" />
    </svg>
  </div>
);

const competitorRows = [
  {
    category: 'GEO / AI search scoring',
    brightedge: 'Yes',
    evertune: 'Yes (measurement)',
    athena: 'Yes (monitoring)',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Fix outputs you can deploy',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Social content execution',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'Yes (generic)',
    geoCompanion: 'Yes (platform-native)',
  },
  {
    category: 'Agent API (machine-to-machine)',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 1)',
  },
  {
    category: 'On-chain performance verification',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 5)',
  },
  {
    category: 'SMB / creator accessible',
    brightedge: 'No',
    evertune: 'No',
    athena: 'Partial',
    surfer: 'Yes',
    jasper: 'Yes',
    geoCompanion: 'Yes',
  },
  {
    category: 'Entry price',
    brightedge: '$12K+/yr',
    evertune: '$3K/mo',
    athena: '$295/mo',
    surfer: '$79/mo',
    jasper: '$39/mo',
    geoCompanion: 'Beta free -> <$10/mo + pay-per-call',
  },
];

const marketRows = [
  {
    market: 'AI Search Optimization (GEO / AEO)',
    size: '~$1B today -> $10B+',
    growth: '40%+ CAGR',
  },
  {
    market: 'Creator Economy + Social Tools',
    size: '$214B-$314B',
    growth: '22% CAGR',
  },
  {
    market: 'Marketing AI SaaS',
    size: '~$8B today -> $20B+',
    growth: '20% CAGR',
  },
];

const roadmapRows = [
  {
    phase: 'Phase 0',
    when: 'Live',
    ships: 'GEO Audit + Vibe Marketing, beta free + Starter (<$10/mo) + Agency',
    target: '[INSERT] current MRR',
  },
  {
    phase: 'Phase 1',
    when: 'Months 1-3',
    ships: 'Backend API, server-side model orchestration, x402 + stablecoin payment rails',
    target: 'First API paying customers',
  },
  {
    phase: 'Phase 2',
    when: 'Months 3-6',
    ships: 'Dynamic market monitoring, competitor alerts',
    target: '5+ enterprise betas',
  },
  {
    phase: 'Phase 3',
    when: 'Months 6-12',
    ships: 'Vision Navigator, Predictive Analytics',
    target: '10+ enterprise, $50K MRR',
  },
  {
    phase: 'Phase 4',
    when: 'Months 12-18',
    ships: 'Agent Marketplace, hook combination data',
    target: '[X] agents, $[Y] GMV',
  },
  {
    phase: 'Phase 5',
    when: 'Months 18-24',
    ships: 'ERC8004 on MegaETH, trust score',
    target: '15-20% take-rate active',
  },
];

const askRows = [
  {
    allocation: '40% Engineering',
    use: 'Backend API, provider-agnostic model runtime, x402 + stablecoin rails, Phase 2 intelligence pipeline',
  },
  {
    allocation: '30% GTM',
    use: 'Enterprise pilot acquisition, creator onboarding, agency partnerships',
  },
  {
    allocation: '20% Infrastructure',
    use: 'Multi-model API costs, cloud, data pipeline, payment and settlement infrastructure',
  },
  {
    allocation: '10% Legal / Web3 R&D',
    use: 'ERC8004 architecture prep, compliance groundwork',
  },
];

const slideIds = Array.from({ length: 13 }, (_, idx) => `slide-${idx + 1}`);
const PDF_EXPORT_WIDTH = 1366;
const PDF_EXPORT_BG = '#070b14';

const PitchDeckPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const scrollToSlide = (id: string) => {
    const slide = document.getElementById(id);
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const exportStage = document.createElement('div');
    exportStage.className = 'pdf-export-stage';
    document.body.appendChild(exportStage);

    try {
      const slides = Array.from(document.querySelectorAll<HTMLElement>('.deck-slide'));
      if (!slides.length) {
        throw new Error('No slides were found to export.');
      }

      if ('fonts' in document) {
        await document.fonts.ready;
      }

      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const pageBg: [number, number, number] = [7, 11, 20];
      const waitForPaint = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let pdf: jsPDF | null = null;

      for (let idx = 0; idx < slides.length; idx += 1) {
        const sourceSlide = slides[idx];
        const slide = sourceSlide.cloneNode(true) as HTMLElement;
        slide.removeAttribute('id');
        exportStage.appendChild(slide);

        const layoutRoot = slide.firstElementChild as HTMLElement | null;
        if (layoutRoot) {
          layoutRoot.style.maxWidth = 'none';
          layoutRoot.style.width = '100%';
        }

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach(node => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach(table => {
          table.style.width = '100%';
          table.style.minWidth = '0';
        });
        slide.querySelectorAll<HTMLElement>('th, td').forEach(cell => {
          cell.style.wordBreak = 'break-word';
        });

        await waitForPaint();

        const canvas = await html2canvas(slide, {
          backgroundColor: PDF_EXPORT_BG,
          scale,
          useCORS: true,
          logging: false,
          windowWidth: PDF_EXPORT_WIDTH,
          windowHeight: Math.max(1080, slide.scrollHeight),
          scrollX: 0,
          scrollY: 0,
        });
        exportStage.removeChild(slide);

        const pageOrientation = canvas.width >= canvas.height ? 'landscape' : 'portrait';
        if (!pdf) {
          pdf = new jsPDF({
            orientation: pageOrientation,
            unit: 'px',
            format: [canvas.width, canvas.height],
            compress: true,
            putOnlyUsedFonts: true,
          });
        } else {
          pdf.addPage([canvas.width, canvas.height], pageOrientation);
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imageData = canvas.toDataURL('image/png');
        pdf.setFillColor(pageBg[0], pageBg[1], pageBg[2]);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }

      if (!pdf) {
        throw new Error('Could not initialize PDF export.');
      }
      pdf.save('GeoCompanion_Pitch_Deck.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      window.alert('PDF export failed. Please try again after the page fully loads.');
    } finally {
      if (exportStage.parentNode) {
        exportStage.parentNode.removeChild(exportStage);
      }
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100">
      <style>{`
        .deck-grid {
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 42px 42px;
        }

        .deck-card {
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.48));
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 10px 30px rgba(2,6,23,0.28);
        }

        .deck-slide h2 {
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .deck-slide-title {
          margin: 0;
        }

        .deck-slide-subtitle {
          margin-top: 1.1rem;
        }

        .deck-slide-body {
          margin-top: 2.2rem;
        }

        .deck-card p,
        .deck-card li {
          text-wrap: pretty;
        }

        .deck-card .text-sm {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .deck-card .text-xs {
          line-height: 1.55;
        }

        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.92rem;
        }

        .deck-table th {
          text-align: left;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.92);
          font-weight: 600;
          background: rgba(15, 23, 42, 0.75);
        }

        .deck-table th,
        .deck-table td {
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 0.72rem 0.82rem;
          vertical-align: top;
        }

        .deck-table td {
          color: rgba(226, 232, 240, 0.94);
          line-height: 1.45;
        }

        .deck-highlight {
          color: #5eead4;
        }

        .deck-hero-ring {
          position: relative;
          isolation: isolate;
        }

        .deck-hero-ring::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: 20px;
          background: conic-gradient(from 120deg, rgba(45,212,191,0.45), rgba(34,211,238,0.16), rgba(16,185,129,0.38), rgba(45,212,191,0.45));
          filter: blur(10px);
          z-index: -1;
          animation: deckSpin 10s linear infinite;
        }

        @keyframes deckSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .pdf-export-stage {
          position: fixed;
          left: -20000px;
          top: 0;
          width: ${PDF_EXPORT_WIDTH}px;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          background: ${PDF_EXPORT_BG};
        }

        .pdf-export-stage .deck-slide {
          width: ${PDF_EXPORT_WIDTH}px !important;
          min-height: 860px !important;
          padding: 52px 72px 44px !important;
          box-sizing: border-box;
          background: ${PDF_EXPORT_BG};
        }

        .pdf-export-stage .deck-slide > div {
          max-width: none !important;
          width: 100% !important;
        }

        .pdf-export-stage .deck-slide-title {
          margin-bottom: 0 !important;
          line-height: 1.08 !important;
        }

        .pdf-export-stage .deck-slide-subtitle {
          margin-top: 1.2rem !important;
          max-width: 68ch !important;
        }

        .pdf-export-stage .deck-slide-body {
          margin-top: 2.4rem !important;
        }

        .pdf-export-stage .overflow-x-auto {
          overflow: visible !important;
        }

        .pdf-export-stage .deck-table {
          width: 100% !important;
          min-width: 0 !important;
        }

        .pdf-export-stage .deck-card {
          backdrop-filter: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .deck-scroll {
            scroll-behavior: auto !important;
          }
          .deck-bg-blur {
            display: none !important;
          }
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media print {
          @page {
            size: landscape;
            margin: 0.4in;
          }

          html,
          body {
            background: #ffffff !important;
          }

          .deck-topbar,
          .deck-side-nav,
          .deck-hint,
          .deck-grid,
          .deck-bg-blur {
            display: none !important;
          }

          .deck-scroll {
            height: auto !important;
            overflow: visible !important;
          }

          .deck-slide {
            min-height: auto !important;
            break-after: page;
            page-break-after: always;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 0.2in 0 !important;
          }

          .deck-slide h2,
          .deck-slide p,
          .deck-slide li,
          .deck-slide span,
          .deck-slide h3,
          .deck-slide h4,
          .deck-slide td,
          .deck-slide th,
          .deck-slide strong {
            color: #0f172a !important;
            text-shadow: none !important;
          }

          .deck-card {
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            box-shadow: none !important;
          }

          .deck-table th,
          .deck-table td {
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      <div className="deck-grid pointer-events-none fixed inset-0 opacity-55" />
      <div className="deck-bg-blur pointer-events-none fixed -left-28 top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-[130px]" />
      <div className="deck-bg-blur pointer-events-none fixed -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <header className="deck-topbar fixed left-0 right-0 top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.09em] text-slate-200 transition hover:border-emerald-300/50 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <GeoCompanionMark />
            <div className="text-left">
              <p className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-[0.14em] text-emerald-200">GeoCompanion.ai</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Investor Pitch Deck</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {isDownloading ? 'Generating PDF\u2026' : 'Download PDF'}
          </button>
        </div>
      </header>

      <aside className="deck-side-nav fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 gap-2 rounded-2xl border border-slate-700/70 bg-slate-900/75 p-2 backdrop-blur-md lg:flex lg:flex-col">
        {slideIds.map((id, idx) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSlide(id)}
            className="h-8 w-8 rounded-lg border border-slate-700 bg-slate-900/70 text-[11px] font-bold text-slate-300 transition hover:border-emerald-300/50 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </aside>

      <main className="deck-scroll h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <SlideShell
          id="slide-1"
          index={1}
          title="AI search has replaced Google. The creator economy has replaced brand marketing."
          subtitle="Most businesses are losing on both fronts and do not know it."
        >
          <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="deck-card rounded-3xl p-7 sm:p-9">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2">
                <GeoCompanionMark size={28} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">Super Intelligence Layer</span>
              </div>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">What we do</p>
              <p className="mt-4 text-xl leading-relaxed text-slate-100 sm:text-2xl">
                GeoCompanion.ai makes you visible to AI search engines and builds your social content system.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                One platform, built for the era where AI agents run marketing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="deck-card deck-hero-ring rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Platform Loop</p>
                <div className="mt-4 grid gap-2 text-sm text-slate-200">
                  <p className="flex items-center gap-2"><Radar className="h-4 w-4 text-emerald-300" /> Diagnose AI visibility gaps</p>
                  <p className="flex items-center gap-2"><Bot className="h-4 w-4 text-cyan-300" /> Generate platform-native content</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-200" /> Rank agents by verified outcomes</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <BarChart3 className="h-4 w-4 text-emerald-200" />, label: 'AI Search', value: 'GEO' },
                  { icon: <Sparkles className="h-4 w-4 text-cyan-200" />, label: 'Content', value: 'Vibe' },
                  { icon: <Coins className="h-4 w-4 text-teal-200" />, label: 'Agents', value: 'x402' },
                ].map((item) => (
                  <div key={item.label} className="deck-card rounded-xl p-3">
                    <div>{item.icon}</div>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="deck-hint mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
            <ChevronDown className="h-4 w-4" aria-hidden="true" /> Scroll for full 13-slide deck
          </p>
        </SlideShell>

        <SlideShell id="slide-2" index={2} title="The Problem" subtitle="Two things broke at the same time.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'AI Retrieval Shift', value: '60%+', note: 'Information retrieval handled by generative AI' },
              { label: 'Referral Shock', value: '+752%', note: 'YoY AI-driven e-commerce referral surge' },
              { label: 'Creator Economy', value: '$214B', note: 'Authentic creator-native content now leads' },
              { label: 'Execution Cost', value: '$850K-$1.2M', note: 'Annual cost for 12-18 person content ops' },
            ].map((item) => (
              <article key={item.label} className="deck-card rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
                <p className="mt-2 font-['Space_Grotesk'] text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="deck-card rounded-2xl p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Discovery changed
              </div>
              <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Old playbook</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">SEO rankings on Google blue links.</p>
              </div>
              <div className="mt-3 rounded-xl border border-cyan-300/35 bg-cyan-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-cyan-200">New reality</p>
                <p className="mt-1 text-sm leading-relaxed text-cyan-50">
                  AI answer engines decide visibility. Ranking pages no longer guarantees citation in answers.
                </p>
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Content changed
              </div>
              <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Old playbook</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">Polished campaigns produced by large teams/agencies.</p>
              </div>
              <div className="mt-3 rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-emerald-200">New reality</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-50">
                  Platform-native creator execution wins attention, but requires a repeatable multi-platform system.
                </p>
              </div>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-emerald-200">The structural gap</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4 text-sm text-slate-200">GEO tools measure visibility but do not create content.</div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4 text-sm text-slate-200">Content tools generate posts but do not optimize AI citation share.</div>
              <div className="rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 text-sm font-medium text-emerald-50">GeoCompanion connects diagnosis, execution, and compounding outcomes.</div>
            </div>
          </div>
        </SlideShell>

        <SlideShell id="slide-3" index={3} title="Why Now" subtitle="Three shifts are colliding right now.">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
                Shift 1
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">AI search is default</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                GEO / AEO is now an emerging infrastructure category, estimated around ~$1B today with a path to
                $10B+ as AI-answer behavior scales. Competitors raised $200M+ in the last 12 months. Enterprise is
                spending while SMB and creators are ignored.
              </p>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
                Shift 2
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Agent payments are live</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                x402 (Coinbase + Cloudflare) launched in September 2025 and processed 15M+ transactions.
                Infrastructure for autonomous agents paying per query already exists.
              </p>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-teal-300/35 bg-teal-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-teal-200">
                Shift 3
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Vibe beats brand campaigns</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Influencer marketing reached $32.55B in 2025 (+35.6% YoY). Lean teams with authentic,
                platform-native content outperform expensive agencies.
              </p>
            </article>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr,1fr]">
            <div className="deck-card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-emerald-200">Window for GeoCompanion.ai</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-100">
                Incumbents are locked in enterprise contract structures. The SMB + creator + agent-native layer is open.
              </p>
              <div className="mt-4 rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 text-sm leading-relaxed text-emerald-50">
                Timing advantage: category budgets are forming now, before long-tail market share is locked.
              </div>
            </div>

            <div className="deck-card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-400">Incumbent context</p>
              <div className="mt-3 grid gap-3">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <p className="text-sm font-semibold text-slate-100">BrightEdge</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">Enterprise SEO/GEO intelligence and reporting platform.</p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <p className="text-sm font-semibold text-slate-100">Evertune</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">Enterprise AI visibility measurement and optimization platform.</p>
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.1em] text-emerald-200">$12K-$36K+/year contract orientation</p>
            </div>
          </div>
        </SlideShell>

        <SlideShell id="slide-4" index={4} title="What Is Live Today" subtitle="Two tools. One session. URL to action plan.">
          <div className="grid gap-5 lg:grid-cols-[1.1fr,1fr]">
            <article className="deck-card rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Left side: Inputs and processing</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                    <p className="font-['Space_Grotesk'] text-lg font-semibold text-white">GEO Audit Engine</p>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-300">
                    <li>- Input: website URL plus optional competitors</li>
                    <li>- Processing: GEO score, EEAT, ranking of deployable fixes</li>
                    <li>- Speed: initial output in about 15 seconds</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-200" aria-hidden="true" />
                    <p className="font-['Space_Grotesk'] text-lg font-semibold text-white">Vibe Marketing Engine</p>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-300">
                    <li>- Input: brand page or creator profile</li>
                    <li>- Processing: platform and voice detection, hook-based campaign generation</li>
                    <li>- Output format: 30/60/90-day multi-platform content system</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.1em] text-emerald-200">Fusion layer</p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-50">
                    GeoCompanion combines both engines into one prioritized execution backlog.
                  </p>
                </div>
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Right side: What users receive</p>
              <div className="mt-4 grid gap-3">
                {[
                  { source: 'From GEO Audit', title: 'Visibility Package', bullets: ['GEO scorecard + EEAT breakdown', 'Citation-share competitor view', 'Schema + CTA rewrite suggestions'] },
                  { source: 'From Vibe Engine', title: 'Content Package', bullets: ['9 hook-pattern campaign planning', 'Platform-native formatting', 'Voice-consistent generation'] },
                  { source: 'Combined Output', title: 'Action Package', bullets: ['One prioritized backlog to execute now', 'Clear ownership across marketing workflows', 'Pricing: beta free, then starter under $10/month + agent pay-per-call'] },
                ].map((block) => (
                  <div key={block.title} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-200">{block.source}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-100">{block.title}</p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-300">
                      {block.bullets.map((b) => (
                        <li key={b}>- {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-lg leading-relaxed text-slate-100">
              The combination is what matters: <span className="deck-highlight font-semibold">GEO tells you what AI search needs.</span>{' '}
              <span className="deck-highlight font-semibold">Vibe Marketing produces it.</span>
            </p>
            <p className="mt-3 text-sm text-slate-300">Mapping rule: left shows how data is processed, right shows the exact deliverables from that processing.</p>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-5"
          index={5}
          title="Why Every Competitor Is Half an Answer"
          subtitle="Serious money is in the GEO category. Each winner is good at one thing."
        >
          <div className="deck-card overflow-x-auto rounded-2xl">
            <table className="deck-table min-w-[900px]">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>BrightEdge</th>
                  <th>Evertune</th>
                  <th>AthenaHQ</th>
                  <th>Surfer SEO</th>
                  <th>Jasper / Copy.ai</th>
                  <th>GeoCompanion</th>
                </tr>
              </thead>
              <tbody>
                {competitorRows.map((row) => (
                  <tr key={row.category}>
                    <td className="font-medium text-slate-100">{row.category}</td>
                    <td>{row.brightedge}</td>
                    <td>{row.evertune}</td>
                    <td>{row.athena}</td>
                    <td>{row.surfer}</td>
                    <td>{row.jasper}</td>
                    <td className="font-semibold text-emerald-200">{row.geoCompanion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              'GEO + content execution in one product.',
              'Agent-queryable API with pay-per-call billing (fractional-dollar calls).',
              'Verifiable agent performance for enterprise trust.',
            ].map((gap, idx) => (
              <div key={gap} className="deck-card rounded-xl p-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Gap {idx + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-lg leading-relaxed text-slate-100">
              Others provide tools. We provide an operating system for AI-era growth.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-6" index={6} title="Where We Are Going" subtitle="GEO + Vibe gets us in the door. We are building the foundational intelligence layer for businesses and autonomous agents.">
          <div className="deck-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Step-by-step build path</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  step: 'Step 1',
                  phase: 'Today',
                  title: 'Ship GEO + Vibe',
                  desc: 'Run audits and campaigns; collect real outcome data from every session.',
                  icon: <Rocket className="h-4 w-4 text-emerald-300" aria-hidden="true" />,
                },
                {
                  step: 'Step 2',
                  phase: 'Phase 1',
                  title: 'Open agent API',
                  desc: 'Move intelligence server-side so autonomous agents can query and pay per call.',
                  icon: <Server className="h-4 w-4 text-cyan-300" aria-hidden="true" />,
                },
                {
                  step: 'Step 3',
                  phase: 'Phase 2-3',
                  title: 'Continuous intelligence',
                  desc: 'Track competitors and white-space opportunities in real time.',
                  icon: <Activity className="h-4 w-4 text-teal-300" aria-hidden="true" />,
                },
                {
                  step: 'Step 4',
                  phase: 'Phase 4-5',
                  title: 'Verified marketplace',
                  desc: 'Rank agents by ERC8004 performance so enterprise can select winners.',
                  icon: <ShieldCheck className="h-4 w-4 text-emerald-200" aria-hidden="true" />,
                },
              ].map((item) => (
                <article key={item.step} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{item.step}</span>
                    {item.icon}
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-emerald-200">{item.phase}</p>
                  <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Hook Intelligence</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>- Hooks are algorithmic patterns that drive distribution and engagement.</li>
                <li>- Public agents are deployed with different hook-weight combinations.</li>
                <li>- Users can deploy custom hook weights for platform, product, and industry context.</li>
              </ul>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Agent Routing Logic</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>- Personal agents query context: platform, product, and industry.</li>
                <li>- Routing selects the highest ERC8004-credit public agent for that context.</li>
                <li>- Outcomes feed back into ranking, improving future routing quality.</li>
              </ul>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Compounding model: Phase 0 outcome data improves Phase 2 intelligence. Better intelligence improves Phase 4 marketplace ranking and enterprise results.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-7" index={7} title="How It Is Built" subtitle="Designed for agents from day one.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Structured outputs (live)',
                body: 'Our model layer is constrained to strict JSON contracts for consistent rendering and stable UI.',
              },
              {
                title: 'Prompts-as-Skills',
                body: 'AI logic in Markdown/JSON skill files so viral patterns can update without redeployment.',
              },
              {
                title: 'Practical compliance',
                body: 'Billing stays in fiat; no native token required, reducing regulatory complexity.',
              },
              {
                title: 'Agentic API (Phase 1)',
                body: 'Stable REST endpoints for programmatic consumption with x402 authorization and stablecoin-ready micro-payments.',
              },
              {
                title: 'Dynamic intelligence (Phase 2-3)',
                body: 'Real-time trend and competitor monitoring feeds predictive analytics trained on live data.',
              },
              {
                title: 'On-chain verification (Phase 4-5)',
                body: 'ERC8004 contracts on MegaETH hash campaign outcomes into immutable proof trails.',
              },
            ].map((item) => (
              <article key={item.title} className="deck-card rounded-2xl p-5">
                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </SlideShell>

        <SlideShell id="slide-8" index={8} title="Market Size" subtitle="At the intersection of three fast-growing markets.">
          <div className="deck-card overflow-x-auto rounded-2xl">
            <table className="deck-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Market</th>
                  <th>2026 Size</th>
                  <th>Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {marketRows.map((row) => (
                  <tr key={row.market}>
                    <td className="font-medium text-slate-100">{row.market}</td>
                    <td>{row.size}</td>
                    <td className="font-semibold text-emerald-200">{row.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ['TAM', '$87B', 'Global software market for marketing intelligence, content SaaS, and creator tools.'],
              ['SAM', '$12B', 'AI-first marketing tools for SMB through enterprise.'],
              ['Creator/SMB sub-TAM', '$6B', 'Serviceable market focused on creators and SMBs, excluding enterprise-heavy spend.'],
              ['SOM (Year 3)', '$150M', 'Under 1.5% SAM penetration target.'],
            ].map(([label, value, desc]) => (
              <article key={label} className="deck-card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</p>
                <p className="mt-2 font-['Space_Grotesk'] text-3xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-emerald-200">Market Focus Visual</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'TAM $87B', width: 100, tone: 'from-emerald-400 to-emerald-300' },
                { label: 'SAM $12B', width: 38, tone: 'from-cyan-400 to-cyan-300' },
                { label: 'Creator/SMB $6B', width: 24, tone: 'from-teal-400 to-teal-300' },
                { label: 'SOM $150M', width: 8, tone: 'from-slate-300 to-slate-200' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-300">{bar.label}</div>
                  <div className="h-2.5 rounded-full bg-slate-800/90">
                    <div className={`h-full rounded-full bg-gradient-to-r ${bar.tone}`} style={{ width: `${bar.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>

        <SlideShell id="slide-9" index={9} title="How We Make Money" subtitle="Three layers, each compounding the previous one.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'SaaS subscriptions (now)',
                body: 'Beta is free today. Paid launch starts under $10/month, then scales through Agency and Enterprise tiers.',
              },
              {
                title: 'Agent API (Phase 1)',
                body: 'Pay-per-call billing for autonomous agents via x402 + stablecoin settlement rails, including fractional-dollar calls per request.',
              },
              {
                title: 'Marketplace take-rate (Phase 4+)',
                body: '15-20% commission on verified agent transactions. Creators keep 80-85%, while personal agents route spend to top-ranked public agents.',
              },
            ].map((item) => (
              <article key={item.title} className="deck-card rounded-2xl p-6">
                <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">How the Agent Marketplace Works</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>- Public agents are listed by hook-combination profiles (including different hook weights).</li>
                <li>- Users may use public agents or deploy custom hook-weight agents.</li>
                <li>- Personal agents query context (platform A, product B, industry X) and select the best public agent by ERC8004 credit.</li>
                <li>- Measured outcomes feed back into on-chain credit, continuously improving ranking quality.</li>
              </ul>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Why This Is Defensible</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>- Every campaign adds more hook-outcome data to the ranking model.</li>
                <li>- Better rankings drive better outcomes, attracting more enterprise demand.</li>
                <li>- More demand attracts better agents, reinforcing marketplace quality.</li>
                <li>- Verification and ranking history create switching costs that generic tools cannot match.</li>
              </ul>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Comparable benchmark: Shopify takes 1.5-3% of GMV. GeoCompanion targets higher defensibility through
              outcome verification and trust-layer switching costs.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Payment logic: x402 handles machine-to-machine authorization while stablecoins provide efficient
              per-call settlement for global agents and low-friction micro-transactions.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-10" index={10} title="Traction and Growth Plan" subtitle="Insert hard metrics before investor send.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Registered Users', value: '[X]', icon: <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" /> },
              { label: 'GEO Audits Run', value: '[X]', icon: <Search className="h-4 w-4 text-cyan-200" aria-hidden="true" /> },
              { label: 'Campaigns Generated', value: '[X]', icon: <BarChart3 className="h-4 w-4 text-teal-200" aria-hidden="true" /> },
              { label: 'Paying / MRR', value: '[X] / $[Y]', icon: <DollarSign className="h-4 w-4 text-emerald-100" aria-hidden="true" /> },
            ].map((kpi) => (
              <article key={kpi.label} className="deck-card rounded-2xl p-5">
                <div>{kpi.icon}</div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.13em] text-slate-400">{kpi.label}</p>
                <p className="mt-1 font-['Space_Grotesk'] text-3xl font-semibold text-white">{kpi.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Current traction narrative</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>- GEO audits completed: [X]</li>
                <li>- Vibe campaigns generated: [X]</li>
                <li>- Paying customers: [X] with $[Y] MRR</li>
                <li>- [Insert one customer story or early signal before investor send]</li>
              </ul>
              <div className="mt-4 rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 text-sm leading-relaxed text-emerald-100">
                Core message: we already own the workflow from diagnosis to execution. This round scales distribution and machine-to-machine usage.
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Owned distribution channels</h3>
              <div className="mt-4 grid gap-3">
                {[
                  {
                    title: 'Creators',
                    desc: 'Warm network activation and creator partnerships.',
                    target: 'Target: [X] creator partnerships in first 90 days',
                    icon: <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" />,
                  },
                  {
                    title: 'Enterprise',
                    desc: 'Austin-led access via LayerZero, Sei, and Xiaomi relationships.',
                    target: 'Target: 5 signed pilots by month 6',
                    icon: <Building2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />,
                  },
                  {
                    title: 'Agencies',
                    desc: 'White-label GEO reports create expandable multi-client revenue.',
                    target: 'One agency contract unlocks multiple downstream accounts',
                    icon: <Handshake className="h-4 w-4 text-teal-200" aria-hidden="true" />,
                  },
                ].map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <div className="flex items-center gap-2">
                      {channel.icon}
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">{channel.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{channel.desc}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-emerald-200">{channel.target}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SlideShell>

        <SlideShell id="slide-11" index={11} title="The Team" subtitle="Engineering depth, product insight, and distribution in one founding group.">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                name: 'Wilson - Founder & Architect',
                body: 'Serial technical founder across Web2 and Web3. Built Honeypot Finance from 0 to 1, raised $1.3M VC, and generated ~$1.3M in mechanism-driven NFT sales. Previously Co-Founder/CTO of Antslabor (Top 30 innovative startup in Canada, later acquired), CTO of Cosmostarter, and Senior Software Architect at Mastodon.',
              },
              {
                name: 'Huan - Co-Founder & Product',
                body: 'Cross-functional background across Web3, AI, and traditional finance. At GeoCompanion, focuses on product strategy and translating technical capability into practical customer use cases.',
              },
              {
                name: 'Austin - Co-Founder & GTM',
                body: 'Led partnerships at LayerZero and Sei, secured Xiaomi, and grew a music project to 100M+ organic streams.',
              },
            ].map((member) => (
              <article key={member.name} className="deck-card rounded-2xl p-6">
                <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{member.body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Most marketing AI startups have strong engineering or strong distribution. GeoCompanion has both,
              plus product-level content science.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-12" index={12} title="Roadmap" subtitle="Each phase compounds defensibility and data advantage.">
          <div className="deck-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Roadmap Snapshot</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roadmapRows.map((row) => (
                <article key={row.phase} className="rounded-2xl border border-slate-700/70 bg-slate-900/45 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-['Space_Grotesk'] text-xl font-semibold text-emerald-200">{row.phase}</p>
                    <span className="rounded-full border border-slate-600 bg-slate-800/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-300">
                      {row.when}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">{row.ships}</p>
                  <div className="mt-4 rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-emerald-100">Target</p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-emerald-50">{row.target}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Phase 0 data trains Phase 2 intelligence. Phase 2 trains Phase 4 ranking. Phase 4 is locked by Phase 5
              verification. Every step increases moat and copying cost.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { label: 'Near-term', value: 'API + first machine-paying usage', icon: <Server className="h-4 w-4 text-cyan-200" aria-hidden="true" /> },
                { label: 'Mid-term', value: 'Predictive intelligence + enterprise beta depth', icon: <Activity className="h-4 w-4 text-emerald-200" aria-hidden="true" /> },
                { label: 'Long-term', value: 'Marketplace ranking locked by ERC8004 verification', icon: <ShieldCheck className="h-4 w-4 text-teal-200" aria-hidden="true" /> },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-3">
                  <div>{item.icon}</div>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
                  <p className="text-sm leading-relaxed text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-13"
          index={13}
          title="The Ask"
          subtitle="Raising $[X]M at $[Y]M post-money cap to reach $50K MRR and launch a live agentic API."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr,1.12fr]">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Use of funds</h3>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800/90">
                {[
                  { pct: 40, tone: 'bg-emerald-400' },
                  { pct: 30, tone: 'bg-cyan-400' },
                  { pct: 20, tone: 'bg-teal-400' },
                  { pct: 10, tone: 'bg-slate-300' },
                ].map((seg, idx) => (
                  <span key={`${seg.pct}-${idx}`} className={`inline-block h-full ${seg.tone}`} style={{ width: `${seg.pct}%` }} />
                ))}
              </div>

              <div className="mt-4 space-y-3">
                {askRows.map((row, idx) => {
                  const pct = Number.parseInt(row.allocation, 10) || 0;
                  const color = ['text-emerald-200', 'text-cyan-200', 'text-teal-200', 'text-slate-300'][idx] || 'text-slate-300';
                  const icon = [
                    <Cpu className="h-4 w-4 text-emerald-300" aria-hidden="true" />,
                    <Target className="h-4 w-4 text-cyan-300" aria-hidden="true" />,
                    <Server className="h-4 w-4 text-teal-300" aria-hidden="true" />,
                    <Wallet className="h-4 w-4 text-slate-200" aria-hidden="true" />,
                  ][idx] || <Activity className="h-4 w-4 text-slate-200" aria-hidden="true" />;

                  return (
                    <div key={row.allocation} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {icon}
                          <p className={`text-sm font-semibold uppercase tracking-[0.11em] ${color}`}>{row.allocation}</p>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">{pct}%</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{row.use}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Round outcome targets</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'API Revenue', value: 'Live', detail: 'First machine-paying customers', icon: <Rocket className="h-4 w-4 text-emerald-300" aria-hidden="true" /> },
                  { title: 'Enterprise', value: '5+', detail: 'Pilots into Phase 3 pipeline', icon: <Building2 className="h-4 w-4 text-cyan-300" aria-hidden="true" /> },
                  { title: 'MRR', value: '$50K', detail: 'Clear Series A narrative', icon: <CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /> },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <div>{item.icon}</div>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-slate-400">{item.title}</p>
                    <p className="font-['Space_Grotesk'] text-2xl font-semibold text-white">{item.value}</p>
                    <p className="text-xs leading-relaxed text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-emerald-300/40 bg-emerald-300/10 p-4 text-sm leading-relaxed text-emerald-100">
                GEO is being defined right now. Enterprise is locked by BrightEdge and Evertune; the SMB + creator +
                agent API layer is still open.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Deck ready for investor review
            </span>
            <span className="inline-flex rounded-full border border-slate-700 px-3 py-1">Replace all [INSERT] values before send</span>
          </div>
        </SlideShell>
      </main>
    </div>
  );
};

export default PitchDeckPage;
