import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, ShieldCheck, BarChart3, Coins, Users, Search, DollarSign, Building2, Handshake, Rocket, Target, Activity, Wallet, Cpu, Server, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import wilsonImage from './team/wilson_image_optimized.jpg';
import huanImage from './team/huan_image.jpg';
import austinImage from './team/Austin_image_optimized.jpg';

type SlideShellProps = {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

type SlideFootnoteLink = {
  label: string;
  href: string;
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

const SlideFootnotes = ({ items }: { items: SlideFootnoteLink[] }) => (
  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-500">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-slate-700/70 bg-slate-900/50 px-3 py-1 transition hover:border-emerald-300/50 hover:text-emerald-200"
      >
        {item.label}
      </a>
    ))}
  </div>
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

type HookWeight = {
  label: string;
  weight: number;
  tone: string;
};

type PublicAgentCardProps = {
  name: string;
  cloud: string;
  context: string;
  accent: string;
  hooks: HookWeight[];
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  body: string;
};

const HookWeightBar = ({ label, weight, tone }: HookWeight) => (
  <div>
    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
      <span>{label}</span>
      <span>{Math.round(weight * 100)}%</span>
    </div>
    <div className="mt-1 h-2 rounded-full bg-slate-800/90">
      <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${weight * 100}%` }} />
    </div>
  </div>
);

const PublicAgentCard = ({ name, cloud, context, accent, hooks }: PublicAgentCardProps) => (
  <article className="h-full rounded-2xl border border-slate-700/70 bg-slate-900/55 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-200">{cloud}</p>
        <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold text-white">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{context}</p>
      </div>
      <div className={`flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-slate-700 bg-slate-950/80 shadow-[0_18px_45px_rgba(15,23,42,0.4)] ${accent}`}>
        <Bot className="h-7 w-7" aria-hidden="true" />
      </div>
    </div>

    <div className="mt-4 space-y-3">
      {hooks.map((hook) => (
        <HookWeightBar key={hook.label} {...hook} />
      ))}
    </div>
  </article>
);

const teamMembers: TeamMember[] = [
  {
    name: 'Wilson',
    role: 'Founder & Architect',
    photo: wilsonImage,
    photoAlt: 'Portrait of Wilson',
    photoPosition: 'center 18%',
    body: 'Serial technical founder with two exits. Raised $1.3M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired; ranked Top 30 most innovative startups in Canada) and Senior Software Architect at Mastodon, one of the largest decentralized social infrastructure projects in production. Brings a rare combination of product engineering depth, agent architecture experience, and prior fundraising across Web2 and Web3.',
  },
  {
    name: 'Huan',
    role: 'Co-Founder & Product',
    photo: huanImage,
    photoAlt: 'Portrait of Huan',
    photoPosition: 'center 20%',
    body: 'Product leader spanning Web3, AI, and traditional finance. At GeoCompanion, owns the loop between GEO signal and content execution, the core conversion mechanic behind the platform thesis. Focuses on turning technical capability into workflows marketing teams can actually adopt, bridging product strategy, customer use cases, and day-to-day execution.',
  },
  {
    name: 'Austin',
    role: 'Co-Founder & GTM',
    photo: austinImage,
    photoAlt: 'Portrait of Austin',
    photoPosition: 'center 16%',
    body: 'Enterprise distribution leader with relationship-driven access into networks around LayerZero, Sei, and Xiaomi. Built and scaled a media project to 100M+ organic streams, demonstrating platform-native distribution at scale, the same playbook GeoCompanion sells to brands. Understands creator economics from both the operator side and the platform side.',
  },
];

const TeamAvatar = ({ member }: { member: TeamMember }) => {
  const initials = member.name.slice(0, 1);

  return (
    <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-[1.5rem] border border-slate-700/80 bg-slate-900 shadow-[0_20px_44px_rgba(15,23,42,0.34)] ring-1 ring-white/5">
      <img
        src={member.photo}
        alt={member.photoAlt}
        className="h-full w-full object-cover"
        style={{ objectPosition: member.photoPosition }}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
          const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-slate-950 text-2xl font-semibold text-white">
        {initials}
      </div>
    </div>
  );
};

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
    geoCompanion: 'Beta free -> <$10/mo starter',
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

const buildPathRows = [
  {
    phase: 'Phase 0',
    when: 'Now -> Q2 2026',
    ships: 'GEO Audit + Vibe Marketing',
    target: 'Turn beta usage into repeatable activation: 1,500+ cumulative users, 10,000+ search events, 50 creator/KOL customer accounts, and the first 10 paying brand or agency teams.',
  },
  {
    phase: 'Phase 1-3',
    when: 'Q3 2026 -> Q4 2027',
    ships: 'Enterprise Strategic Intelligence',
    target: 'Reach seed and Series A readiness with $100K MRR, 25+ brand or agency customers, 500 creator/KOL customer accounts, and a clear expansion path from SMB into enterprise intelligence.',
  },
  {
    phase: 'Phase 4-5',
    when: '2028 -> IPO window (Q3 2029)',
    ships: 'Agent Marketplace + On-Chain Trust',
    target: 'Scale toward IPO readiness with $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, audited enterprise-grade trust infrastructure, and category leadership in AI-native marketing intelligence.',
  },
];

const flywheelRows = [
  {
    title: 'Diagnose',
    body: 'Run a GEO audit to surface visibility gaps, citation risks, and priority fixes.',
    icon: <Radar className="h-4 w-4 text-cyan-200" aria-hidden="true" />,
  },
  {
    title: 'Create',
    body: 'Turn those gaps into platform-native hooks, campaigns, and content systems.',
    icon: <Sparkles className="h-4 w-4 text-emerald-200" aria-hidden="true" />,
  },
  {
    title: 'Deploy',
    body: 'Ship through SaaS workflows today and through agent/API calls as usage expands.',
    icon: <Rocket className="h-4 w-4 text-teal-200" aria-hidden="true" />,
  },
  {
    title: 'Learn',
    body: 'Outcome data improves recommendations, routing, and future marketplace trust signals.',
    icon: <Activity className="h-4 w-4 text-emerald-100" aria-hidden="true" />,
  },
];

const askRows = [
  {
    allocation: '40% Engineering',
    use: 'Backend API, provider-agnostic model runtime, agent orchestration, and the Phase 2 intelligence pipeline',
  },
  {
    allocation: '30% GTM',
    use: 'Enterprise pilot acquisition, creator onboarding, agency partnerships',
  },
  {
    allocation: '20% Infrastructure',
    use: 'Multi-model API costs, cloud, data pipeline, and analytics infrastructure',
  },
  {
    allocation: '10% Product Ops',
    use: 'Customer feedback loops, analytics instrumentation, onboarding, and the operational systems needed to turn beta usage into repeatable retention',
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
          title="AI now decides who gets found. Most businesses have no system to change that."
          subtitle="Discovery and execution have both shifted. GeoCompanion starts by fixing both and becomes the intelligence layer that tells businesses where to go next."
        >
          <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="deck-card rounded-3xl p-7 sm:p-9">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2">
                <GeoCompanionMark size={28} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">Enterprise Strategic Intelligence Platform</span>
              </div>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">What we do</p>
              <p className="mt-4 text-xl leading-relaxed text-slate-100 sm:text-2xl">
                GeoCompanion starts by helping businesses get cited by AI search engines and build platform-native content that wins attention.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Over time, it becomes the Enterprise Strategic Intelligence Platform that tells businesses where their market is going, what to build next, and which verified agents can execute that vision. One workflow from diagnosis to execution, built for an AI-shaped world.
              </p>
            </div>

            <div className="space-y-4">
              <div className="deck-card deck-hero-ring rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">The Three-Pillar Destination</p>
                <div className="mt-4 grid gap-2 text-sm text-slate-200">
                  <p className="flex items-center gap-2"><Radar className="h-4 w-4 text-emerald-300" /> Enterprise Strategic Intelligence: vision, market positioning, and predictive analytics</p>
                  <p className="flex items-center gap-2"><Bot className="h-4 w-4 text-cyan-300" /> AI Agent Marketplace: agents ranked by verified outcome data, not claims</p>
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-200" /> On-Chain Trust Layer: immutable performance attestation via ERC8004</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-emerald-200" />, label: 'Today', value: 'GEO + Vibe Marketing' },
                  { icon: <BarChart3 className="h-4 w-4 text-cyan-200" />, label: 'Phase 1-3', value: 'Enterprise Intelligence' },
                  { icon: <Coins className="h-4 w-4 text-teal-200" />, label: 'Phase 4-5', value: 'Agent Marketplace + Trust' },
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

        <SlideShell id="slide-2" index={2} title="The Problem" subtitle="Discovery got harder. Content execution stayed expensive and fragmented.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'AI Search Shift', value: '58%', note: 'Consumers using GenAI tools instead of traditional search for recommendations' },
              { label: 'AI Commerce Traffic', value: '+1,300%', note: 'Holiday-season traffic from AI sources to U.S. retail sites' },
              { label: 'Creator Economy', value: '$214B', note: 'Authentic creator-native content now leads' },
              { label: 'Execution Cost', value: '$850K-$1.2M', note: 'Estimated annual cost of a 12-18 person in-house content operation' },
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

          <SlideFootnotes
            items={[
              { label: 'Source: Capgemini Research Institute (AI search shift)', href: 'https://www.capgemini.com/insights/research-library/what-matters-to-todays-consumer-2025/' },
              { label: 'Source: Adobe Analytics (AI commerce traffic)', href: 'https://news.adobe.com/news/news-details/2025/Adobe-Analytics-Generative-AI-Traffic-to-US-Retail-Sites-Jumps-1300-Percent-over-Holiday-Season/default.aspx' },
              { label: 'Source: APC salary guide + internal team-cost model', href: 'https://www.apc.org.au/resources/annual-salary-guide/' },
            ]}
          />
        </SlideShell>

        <SlideShell id="slide-3" index={3} title="Why Now" subtitle="The category is opening before the stack is settled.">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
                Shift 1
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">AI discovery behavior is changing faster than tooling</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Buyers are moving toward AI answers and recommendation flows now, but most teams still use SEO and content stacks built for the old web.
              </p>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
                Shift 2
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">Budgets are reallocating toward creator-native execution</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Teams want content that feels native to each platform, but the tooling market still separates strategy, generation, and measurement into different products.
              </p>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <div className="mb-3 inline-flex rounded-full border border-teal-300/35 bg-teal-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-teal-200">
                Shift 3
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">API and agent infrastructure make a platform play possible</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Per-call billing, server-side orchestration, and machine-to-machine workflows mean this can become more than a point solution over time.
              </p>
            </article>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr,1fr]">
            <div className="deck-card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-emerald-200">Window for GeoCompanion.ai</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-100">
                Incumbents skew enterprise and reporting-first. The SMB, creator, and agent-native layer is still underbuilt.
              </p>
              <div className="mt-4 rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 text-sm leading-relaxed text-emerald-50">
                Timing advantage: this is early enough to define the workflow, not just compete inside an established one.
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
              <p className="mt-3 text-xs uppercase tracking-[0.1em] text-emerald-200">Reporting-first tools. Enterprise contract orientation.</p>
            </div>
          </div>
        </SlideShell>

        <SlideShell id="slide-4" index={4} title="Our Solution" subtitle="Two engines, one workflow, one prioritized action plan.">
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
                  { source: 'Combined Output', title: 'Action Package', bullets: ['One prioritized backlog to execute now', 'Clear ownership across marketing workflows', 'Pricing: beta free, then starter under $10/month with premium tiers later'] },
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
          title="Why We’re Different"
          subtitle="Others either diagnose or create. We do both, and connect the loop."
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
              'Agent-queryable API and ranking layer built on proprietary outcome data.',
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
              Others either diagnose or create. We do both, and connect the loop.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-6" index={6} title="Platform Vision" subtitle="Start with diagnosis and execution. Expand into intelligence, agents, and verified trust.">
          <div className="deck-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Why the marketing tool creates a moat no intelligence platform can replicate</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-5">
                <p className="text-lg leading-relaxed text-emerald-50">
                  Every GEO audit tells us what AI engines are citing and why. Every campaign tells us which content
                  patterns drive real results by platform and industry. That outcome data is the training signal for
                  our agent ranking model.
                </p>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-5">
                <p className="text-sm leading-relaxed text-slate-200">
                  Vision Navigator is the strategic center of this roadmap: a system that helps companies answer whether
                  they are running in the right direction before they spend more money scaling execution. The marketplace
                  matters later, but the intelligence layer is the category-defining product.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Step-by-step build path</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {buildPathRows.map((item, idx) => {
                const icon = [
                  <Rocket className="h-4 w-4 text-emerald-300" aria-hidden="true" />,
                  <Server className="h-4 w-4 text-cyan-300" aria-hidden="true" />,
                  <Activity className="h-4 w-4 text-teal-300" aria-hidden="true" />,
                ][idx];

                return (
                <article key={item.phase} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{item.phase}</span>
                    {icon}
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-emerald-200">{item.when}</p>
                  <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold text-white">{item.ships}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.target}</p>
                </article>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Training signal', 'Each audit and campaign adds the ranking data that improves which agent wins future jobs.'],
              ['Enterprise intelligence', 'The next layer is continuous decision support, not just another dashboard or one-off report.'],
              ['Verified trust', 'The marketplace only works if enterprise buyers can audit real performance history before they trust an agent.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Phase 0 is intentional. The app generates the proprietary training signal that makes Phase 1 routing defensible. We are not pivoting to infra; we are building toward it with every workflow we run today.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-7" index={7} title="How the Agent Marketplace Works" subtitle="Private context in, best-fit public agent out.">
          <div className="deck-card rounded-2xl p-6">
            <div className="grid gap-6 lg:grid-cols-[0.92fr,1.18fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Agent marketplace routing</p>
                <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-white">Personal agent to public agent, routed by context.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Agents compete on results, not on marketing. A brand sends context, platform, industry, and objective.
                  GeoCompanion's ranking layer selects the best agent by verified hook performance, platform fit, and
                  outcome history. That history lives on-chain so enterprise buyers can audit it. Public agents run on
                  AWS or GCP, and the ranking improves with every campaign run through the platform.
                </p>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-cyan-200">1. Personal agent</p>
                    <p className="mt-1">Sends private context: platform, product, industry, and objective.</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-200">2. GeoCompanion router</p>
                    <p className="mt-1">Selects the best public agent using verified hook performance, platform fit, and outcome history.</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-teal-200">3. Public agent</p>
                    <p className="mt-1">Executes with a weighted hook profile and feeds outcomes back into the ranking loop.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Request flow</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200/30 bg-slate-950/80">
                          <Bot className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-cyan-200">Personal agent</p>
                          <p className="text-sm font-semibold text-white">Private context</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-200">TikTok, skincare launch, beauty / DTC.</p>
                    </div>

                    <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200/30 bg-slate-950/80">
                          <Server className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-200">GeoCompanion</p>
                          <p className="text-sm font-semibold text-white">Routing layer</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-200">Scores hook fit, availability, and performance.</p>
                    </div>

                    <div className="rounded-xl border border-teal-300/30 bg-teal-300/10 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-200/30 bg-slate-950/80">
                          <ShieldCheck className="h-5 w-5 text-teal-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-teal-200">Public agent layer</p>
                          <p className="text-sm font-semibold text-white">Marketplace agents</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-200">AWS / GCP deployed agents with different hook mixes.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Public agent examples</p>
                      <p className="mt-1 text-sm text-slate-300">Each agent mixes several hook patterns at different weights, like a recipe for tone and structure.</p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-200">Cloud-deployed</p>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <PublicAgentCard
                      name="Alice"
                      cloud="AWS"
                      context="Weighted for contrast-led product storytelling."
                      accent="text-emerald-200"
                      hooks={[
                        { label: 'Contrast hook', weight: 0.3, tone: 'from-emerald-400 to-emerald-300' },
                        { label: 'Humble flex', weight: 0.35, tone: 'from-cyan-400 to-cyan-300' },
                        { label: 'Curiosity gap', weight: 0.2, tone: 'from-teal-400 to-teal-300' },
                        { label: 'Soft CTA', weight: 0.15, tone: 'from-slate-300 to-slate-200' },
                      ]}
                    />
                    <PublicAgentCard
                      name="Bob"
                      cloud="GCP"
                      context="Weighted for sharper opinion-led campaign framing."
                      accent="text-cyan-200"
                      hooks={[
                        { label: 'Humble flex', weight: 0.2, tone: 'from-cyan-400 to-cyan-300' },
                        { label: 'Hot take', weight: 0.4, tone: 'from-emerald-400 to-emerald-300' },
                        { label: 'Proof stack', weight: 0.25, tone: 'from-teal-400 to-teal-300' },
                        { label: 'Authority cue', weight: 0.15, tone: 'from-slate-300 to-slate-200' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Weighted agents', 'Each public agent is a weighted basket of hooks, not a single-hook identity. In plain English: each agent blends several messaging patterns in different proportions, like a recipe tuned to a brand context.'],
              ['Cloud-native layer', 'Public agents run on AWS or GCP while personal agents keep private context local.'],
              ['Compounding loop', 'Measured outcomes improve routing quality, ranking history, and future hook weights.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              The on-chain layer (ERC8004) is a trust primitive, not a payment mechanism. Billing stays on fiat throughout.
              The chain provides immutable performance attestation that enterprise buyers require before trusting autonomous
              agents with their brand.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-8" index={8} title="Early Signal" subtitle="Pre-revenue for now. Here is the signal we are building toward.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Website Visitors', value: '457', icon: <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" /> },
              { label: 'Active Users', value: '340', icon: <Search className="h-4 w-4 text-cyan-200" aria-hidden="true" /> },
              { label: 'Search Events', value: '2,326', icon: <BarChart3 className="h-4 w-4 text-teal-200" aria-hidden="true" /> },
              { label: 'Activation Rate', value: '74%', icon: <DollarSign className="h-4 w-4 text-emerald-100" aria-hidden="true" /> },
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
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">What the current beta signal already says</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                We are live in beta and already seeing meaningful usage depth: 340 of 457 visitors became active users,
                generating 2,326 search events. That is roughly 74% activation and 6.8 searches per active user.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                At this stage, the most important proof is not enterprise revenue yet. It is repeat engagement inside the
                diagnosis workflow, because repeated search behavior is the leading indicator that users treat the product
                as an operating surface rather than a one-time demo.
              </p>
              <div className="mt-4 rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 text-sm leading-relaxed text-emerald-100">
                This round funds user growth, conversion into paid teams, and the intelligence layer on top of existing
                search behavior so we can turn current engagement into durable revenue.
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Milestones from beta to IPO window</h3>
              <div className="mt-4 grid gap-3">
                {[
                  {
                    title: 'Pre-seed / Accelerator',
                    desc: 'Convert beta traffic into repeat product usage and first revenue before institutional seed.',
                    target: 'Goal by Q2 2026: 1.5K users, 10K searches, 50 creator/KOL customer accounts, 10 paying brand or agency teams, $5K-$10K MRR',
                    icon: <Building2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />,
                  },
                  {
                    title: 'Seed / Series A',
                    desc: 'Move upmarket with intelligence workflows and prove expansion revenue across SMB, agency, and enterprise accounts.',
                    target: 'Goal by Q4 2027: 25+ brand or agency customers, 500 creator/KOL customer accounts, $100K MRR, <3 month payback, strong retention',
                    icon: <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" />,
                  },
                  {
                    title: 'Growth / IPO readiness',
                    desc: 'Use marketplace and verification infrastructure to become the system of record for AI-native marketing performance.',
                    target: 'Goal by Q3 2029: $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, enterprise-grade reporting and controls',
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

        <SlideShell id="slide-9" index={9} title="Market Size" subtitle="At the intersection of three fast-growing markets.">
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

        <SlideShell id="slide-10" index={10} title="Business Model" subtitle="Three layers, each compounding the previous one.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'SaaS subscriptions (now)',
                body: 'Beta is free today. Paid launch starts under $10/month, then scales through Agency and Enterprise tiers.',
              },
              {
                title: 'Agent API (Phase 1)',
                body: 'Usage-based API billing for autonomous agents and enterprise workflows, billed in fiat while the trust layer stays separate.',
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
                <li>- Personal agents query context and select the best public agent by verified performance history and brand fit.</li>
                <li>- Measured outcomes feed back into ranking quality, while ERC8004 stores the trust record buyers can audit.</li>
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
              Billing stays on fiat. The on-chain layer exists to prove performance history and make agent selection
              auditable for enterprise buyers.
            </p>
          </div>
        </SlideShell>

        <SlideShell id="slide-11" index={11} title="Flywheel" subtitle="Every workflow improves the next one.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flywheelRows.map((item) => (
              <article key={item.title} className="deck-card rounded-2xl p-5">
                <div>{item.icon}</div>
                <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr,1fr]">
            <article className="deck-card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-emerald-200">Compounding loop</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-100">
                Better audits drive better content. Better content creates better outcome data. Vision Navigator turns that
                repeated usage into strategic guidance on whether the business is moving in the right direction before it
                scales execution further.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ['Phase 0', 'Own the diagnosis -> execution workflow'],
                  ['Phase 1', 'Vision Navigator: turn usage into directional guidance'],
                  ['Phase 2', 'Open the loop to agent/API traffic'],
                ].map(([phase, detail]) => (
                  <div key={phase} className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-cyan-200">{phase}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-400">Longer-term upside</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <p className="text-sm font-semibold text-slate-100">Vision Navigator</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">As more teams use the system, GeoCompanion gets better at helping companies understand whether they are running in the right direction before scaling more budget and effort.</p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/45 p-4">
                  <p className="text-sm font-semibold text-slate-100">Marketplace routing</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">As machine-to-machine traffic grows, routing and ranking become a monetizable execution layer on top of that intelligence system.</p>
                </div>
              </div>
            </article>
          </div>
        </SlideShell>

        <SlideShell id="slide-12" index={12} title="Team" subtitle="Engineering depth, product insight, and distribution in one founding group.">
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="deck-card flex h-full flex-col rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <TeamAvatar member={member} />
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">{member.name}</h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">{member.role}</p>
                  </div>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-slate-300">
                  {member.body}
                </p>
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

        <SlideShell
          id="slide-13"
          index={13}
          title="The Ask"
          subtitle="Raising a focused pre-seed now to convert product signal into revenue and seed readiness."
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
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">This round</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$1.25M', detail: 'SAFE round sized for 18 months of runway and disciplined hiring', icon: <Rocket className="h-4 w-4 text-emerald-300" aria-hidden="true" /> },
                  { title: 'Target cap', value: '$12M', detail: 'Priced to match current beta traction and leave room for seed step-up', icon: <Building2 className="h-4 w-4 text-cyan-300" aria-hidden="true" /> },
                  { title: 'Unlocks', value: '$100K MRR', detail: 'Goal: 25+ paying customers and a clean seed story by late 2027', icon: <CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /> },
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
                We are raising one round: $1.25M on a $12M cap. If we join an accelerator, it will be because it helps
                fill this same round with strategic capital, distribution, and follow-on access, not because we are changing
                the plan.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              Pre-final investor deck
            </span>
            <span className="inline-flex rounded-full border border-slate-700 px-3 py-1">Ask: $1.25M SAFE on $12M cap</span>
            <span className="inline-flex rounded-full border border-slate-700 px-3 py-1">Accelerator participates only if it strengthens the same round</span>
          </div>

          <SlideFootnotes
            items={[
              { label: 'YC standard deal', href: 'https://www.ycombinator.com/deal/' },
              { label: 'Antler terms', href: 'https://www.antler.co/residency/singapore' },
              { label: 'Protocol Labs interest form', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfPkuHoM2a6XkZYvtoZnWJD7lXRNHCWNkOh8Ki9otJncd0mug/viewform' },
            ]}
          />
        </SlideShell>
      </main>
    </div>
  );
};

export default PitchDeckPage;
