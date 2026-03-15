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
    className="deck-slide flex flex-col justify-center snap-start min-h-[100svh] px-6 pb-16 pt-24 md:px-12 lg:px-20 relative"
  >
    <div className="mx-auto w-full max-w-7xl relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex-1">
          <p className="deck-mono text-[10px] tracking-[0.3em] uppercase text-clay mb-4" aria-hidden="true">
            {String(index).padStart(2, '0')} // AX-G
          </p>
          <h2 className="deck-heading text-4xl font-light leading-[1.1] text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter uppercase italic text-balance">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-8 max-w-xl text-xl font-medium leading-relaxed text-ink/90 font-medium italic border-l-2 border-clay pl-6 italic text-balance">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="deck-slide-body mt-16">{children}</div>
      
      {/* Decorative brutalist elements */}
      <div className="absolute top-0 right-10 w-px h-full bg-ink/5 hidden lg:block" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-ink/5 hidden lg:block" />
    </div>
    
    {/* Large background index - Brutalist style */}
    <span
      className="pointer-events-none select-none absolute -bottom-10 -left-10 font-bold leading-none opacity-[0.03] text-ink mix-blend-multiply"
      style={{ fontSize: '25vw', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.05em' }}
      aria-hidden="true"
    >
      {String(index).padStart(2, '0')}
    </span>
  </section>
);

const SlideFootnotes = ({ items }: { items: SlideFootnoteLink[] }) => (
  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="deck-mono text-[10px] text-sage/95 font-medium italic hover:text-sage/95 font-medium italic transition-colors"
      >
        &#8599; {item.label}
      </a>
    ))}
  </div>
);

const GeoCompanionMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative group transition-transform duration-500 hover:scale-110"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#121212" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#B35C37" strokeWidth="2" strokeDasharray="8 8" className="animate-[spin_10s_linear_infinite_reverse]" />
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="#121212" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="8" fill="#121212" />
      <circle cx="50" cy="50" r="4" fill="#FBFBFB" />
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
  <div className="relative">
    <div className="flex items-center justify-between mb-1.5 px-1">
      <span className="deck-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink">{label}</span>
      <span className="deck-mono text-[9px] text-clay font-bold">{Math.round(weight * 100)}</span>
    </div>
    <div className="h-2 bg-void border border-ink/10 overflow-hidden relative">
      <div 
        className="h-full bg-clay transition-all duration-1000 ease-out" 
        style={{ width: `${weight * 100}%` }} 
      />
      {/* Texture overlay on bar */}
      <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none" />
    </div>
  </div>
);

const PublicAgentCard = ({ name, cloud, context, accent, hooks }: PublicAgentCardProps) => (
  <article className="h-full bg-hull border-2 border-ink shadow-brutalist p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 py-1 px-3 bg-ink text-void deck-mono text-[8px] tracking-widest uppercase rotate-90 origin-top-right transition-transform group-hover:translate-x-1">
      {cloud}
    </div>
    
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <p className="deck-heading text-2xl font-bold text-ink uppercase tracking-tighter leading-none">{name}</p>
        <div className="mt-3 label-stamp">{accent.split('-').pop()} // MODEL_ID</div>
        <p className="mt-4 text-sm leading-relaxed text-ink/80 font-medium italic italic font-medium">{context}</p>
      </div>
    </div>

    <div className="space-y-5">
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
    <div className="relative h-56 w-44 shrink-0 group">
      {/* Shadow Layer */}
      <div className="absolute inset-0 bg-ink translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
      
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden border-2 border-ink bg-hull">
        <img
          src={member.photo}
          alt={member.photoAlt}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          style={{ objectPosition: member.photoPosition }}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 hidden items-center justify-center bg-clay/20 text-4xl font-bold text-ink deck-heading">
          {initials}
        </div>
        
        {/* Grain Overlay on Image */}
        <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none" />
      </div>
      
      {/* Industrial Label */}
      <div className="absolute -bottom-4 -right-4 bg-clay text-void px-3 py-1 deck-mono text-[9px] font-bold uppercase tracking-widest border border-ink">
        {member.role.split(' & ')[0]}
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
    geoCompanion: 'Beta free \u2192 <$10/mo starter',
  },
];

const marketRows = [
  {
    market: 'AI Search Optimization (GEO / AEO)',
    size: '~$1B today \u2192 $10B+',
    growth: '40%+ CAGR',
  },
  {
    market: 'Creator Economy + Social Tools',
    size: '$214B\u2013$314B',
    growth: '22% CAGR',
  },
  {
    market: 'Marketing AI SaaS',
    size: '~$8B today \u2192 $20B+',
    growth: '20% CAGR',
  },
];

const buildPathRows = [
  {
    phase: 'Phase 0',
    when: 'Now \u2192 Q2 2026',
    ships: 'GEO Audit + Vibe Marketing',
    target: '1,500+ users, 10K+ search events, 50 creator accounts, and first 10 paying teams.',
  },
  {
    phase: 'Phase 1\u20133',
    when: 'Q3 2026 \u2192 Q4 2027',
    ships: 'Enterprise Strategic Intelligence',
    target: '$100K MRR, 25+ agency customers, 500 creator accounts, and upmarket expansion.',
  },
  {
    phase: 'Phase 4\u20135',
    when: '2028+',
    ships: 'Agent Marketplace + On-Chain Trust',
    target: '$50M+ ARR, 120+ enterprise customers, 5,000 creator accounts, and verified infrastructure.',
  },
];

const flywheelRows = [
  {
    title: 'Diagnose',
    body: 'Run a GEO audit to surface visibility gaps, citation risks, and priority fixes.',
    icon: <Radar className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
  },
  {
    title: 'Create',
    body: 'Turn those gaps into platform-native hooks, campaigns, and content systems.',
    icon: <Sparkles className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
  },
  {
    title: 'Deploy',
    body: 'Ship through SaaS workflows today and through agent/API calls as usage expands.',
    icon: <Rocket className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
  },
  {
    title: 'Learn',
    body: 'Outcome data improves recommendations, routing, and future marketplace trust signals.',
    icon: <Activity className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
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
const PDF_EXPORT_BG = '#FAFBFC';

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
      const pageBg: [number, number, number] = [250, 251, 252];
      const waitForPaint = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let pdf: jsPDF | null = null;

      for (let idx = 0; idx < slides.length; idx += 1) {
        const sourceSlide = slides[idx];
        const slide = sourceSlide.cloneNode(true) as HTMLElement;
        const sourceRect = sourceSlide.getBoundingClientRect();
        const sourceStyle = window.getComputedStyle(sourceSlide);
        slide.removeAttribute('id');
         const realHeight = Math.max(sourceSlide.scrollHeight, sourceRect.height);
         slide.style.width = `${Math.ceil(sourceRect.width)}px`;
         slide.style.height = `${Math.ceil(realHeight)}px`;
         slide.style.minHeight = '0';
         slide.style.justifyContent = 'flex-start';
         slide.style.paddingTop = sourceStyle.paddingTop;
         slide.style.paddingRight = sourceStyle.paddingRight;
         slide.style.paddingBottom = sourceStyle.paddingBottom;
         slide.style.paddingLeft = sourceStyle.paddingLeft;
        
        // Ensure ink children keep their dark background in PDF
        slide.querySelectorAll<HTMLElement>('.bg-ink, .bg-onyx').forEach(el => {
          el.style.backgroundColor = '#121212';
          el.style.color = '#FBFBFB';
        });

        // Ensure background numbers are visible but subtle
        slide.querySelectorAll<HTMLElement>('span').forEach(el => {
          if (el.style.fontSize.includes('vw')) {
            el.style.opacity = '0.03';
            el.style.color = '#121212';
          }
        });

        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'deck-grid pointer-events-none absolute inset-0';
        slide.appendChild(gridOverlay);

        exportStage.appendChild(slide);

        const layoutRoot = slide.firstElementChild as HTMLElement | null;
        if (layoutRoot) {
          layoutRoot.style.maxWidth = sourceStyle.maxWidth;
          layoutRoot.style.width = '100%';
          layoutRoot.style.marginLeft = 'auto';
          layoutRoot.style.marginRight = 'auto';
        }

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach(node => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach(table => {
          table.style.width = '100%';
          table.style.tableLayout = 'fixed';
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
          windowWidth: Math.ceil(sourceRect.width),
          windowHeight: Math.ceil(sourceRect.height),
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
    <div className="relative min-h-screen overflow-hidden bg-void text-onyx">
      <style>{`
        *, *::before, *::after {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .deck-heading {
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .deck-mono {
          font-family: 'JetBrains Mono', monospace;
          font-variant-numeric: tabular-nums;
        }

        .bg-noise {
          background-image: var(--noise);
        }

        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          border: 2px solid #121212;
        }

        .deck-table th {
          text-align: left;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FBFBFB;
          font-weight: 700;
          background: #121212;
          padding: 1rem 0.875rem;
        }

        .deck-table th,
        .deck-table td {
          border: 1px solid #121212;
          padding: 1rem 0.875rem;
          vertical-align: top;
        }

        .deck-table td {
          color: #121212;
          line-height: 1.5;
          background: #FFFFFF;
        }

        .deck-table tr:nth-child(even) td {
          background: #F8F8F8;
        }

        .deck-topbar {
          border-bottom: 2px solid #121212;
          background: #FFFFFF;
        }

        .label-stamp {
          padding: 0.25rem 0.6rem;
          background: #121212;
          color: #FBFBFB;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-block;
        }

        .deck-card p,
        .deck-card li {
          text-wrap: pretty;
        }

        .deck-card .text-sm {
          font-size: 0.91rem;
          line-height: 1.65;
        }

        .deck-card .text-xs {
          line-height: 1.6;
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
          font-family: 'Inter', system-ui, sans-serif;
          color: #0F1115;
        }

        .pdf-export-stage .deck-slide {
          box-sizing: border-box;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .pdf-export-stage .deck-slide > div {
          max-width: 80rem !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          position: relative;
          z-index: 10;
        }

        .pdf-export-stage .deck-slide-title {
          margin-bottom: 0 !important;
          line-height: 1.08 !important;
        }

        .pdf-export-stage .deck-slide-subtitle {
          margin-top: 2.4rem !important;
          max-width: 68ch !important;
          color: #6B7280 !important;
        }

        .pdf-export-stage .deck-slide-body {
          margin-top: 3.2rem !important;
          color: #0F1115 !important;
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

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-slate-950 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="deck-grid pointer-events-none fixed inset-0" />
      <div className="deck-bg-blur pointer-events-none fixed -left-32 top-20 h-96 w-96 rounded-full bg-accent-cyan/10 blur-[120px]" />
      <div className="deck-bg-blur pointer-events-none fixed -right-28 bottom-16 h-[500px] w-[500px] rounded-full bg-accent-violet/5 blur-[150px]" />

      <header className="deck-topbar fixed left-0 right-0 top-0 z-40 border-b border-slate-200/50 bg-void/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <h1 className="sr-only">GeoCompanion Investor Pitch Deck</h1>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sage/95 font-medium italic hover:text-onyx transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] tracking-[0.15em] uppercase">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <GeoCompanionMark size={28} />
            <div>
              <p className="deck-mono text-[10px] tracking-[0.22em] text-onyx uppercase">GeoCompanion.ai</p>
              <p className="deck-mono text-[9px] tracking-[0.14em] text-sage/95 font-medium italic">Investor Deck &middot; 2026</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/8 px-4 py-2 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 transition hover:bg-accent-cyan/15 hover:border-accent-cyan/35 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] tracking-[0.1em] uppercase">{isDownloading ? 'Generating\u2026' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      <aside className="deck-side-nav fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-slate-200/50 bg-white/50 p-2.5 pb-3 pt-3 shadow-elevation backdrop-blur-md lg:flex">
        {slideIds.map((id, idx) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSlide(id)}
            className="group relative flex h-6 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap bg-onyx text-onyx px-2 py-0.5 rounded-md"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px' }}
              aria-hidden="true"
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="block h-px bg-stardust transition-all duration-200 w-3 group-hover:w-5 group-hover:bg-accent-cyan" />
          </button>
        ))}
      </aside>

      <main id="main-content" className="deck-scroll h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">

        {/* Slide 1 */}
        <SlideShell
          id="slide-1"
          index={1}
          title="AI now decides who gets found. Most businesses have no system to change that."
          subtitle="The intelligence layer for an AI-first world. One workflow from diagnosis to execution."
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="bg-hull border-2 border-ink shadow-brutalist p-10 transform -rotate-1 lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <GeoCompanionMark size={28} />
                <span className="deck-mono text-[10px] tracking-[0.2em] uppercase text-sage/95 font-medium italic">Enterprise Strategic Intelligence Platform</span>
              </div>
              <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-sage/95 font-medium italic mb-3">Core Mission</p>
              <p className="text-2xl font-semibold leading-relaxed text-ink sm:text-3xl">
                Helping brands win AI citations and build platform-native content that captures market attention.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-sage/95 font-medium italic">
                GeoCompanion bridges the gap between diagnosis and execution, surfacing exactly where you are missing citations and providing the native content system to fix it.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
                <p className="deck-mono text-[9px] uppercase tracking-[0.18em] text-sage/95 font-medium italic mb-4">The Destination</p>
                <div className="space-y-5">
                  {[
                    { icon: <Radar className="h-5 w-5 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, title: 'Strategic Intelligence', desc: 'Vision, market positioning, predictive analytics' },
                    { icon: <Bot className="h-5 w-5 text-clay font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, title: 'Agent Marketplace', desc: 'Agents ranked by verified outcome data' },
                    { icon: <ShieldCheck className="h-5 w-5 text-indigo-400" aria-hidden="true" />, title: 'On-Chain Trust', desc: 'Immutable performance attestation' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 bg-void shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-base font-bold text-ink">{item.title}</p>
                        <p className="mt-0.5 text-sm text-sage/95 font-medium italic">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, label: 'Today', value: 'GEO + Vibe Marketing' },
                  { icon: <BarChart3 className="h-4 w-4 text-clay font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, label: 'Phase 1\u20133', value: 'Enterprise Intelligence' },
                ].map((item) => (
                  <div key={item.label} className="bg-hull border-2 border-ink shadow-brutalist p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50">{item.icon}</div>
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.label}</p>
                      <p className="text-sm font-bold text-ink">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="deck-hint mt-6 inline-flex items-center gap-2 deck-mono text-[10px] uppercase tracking-[0.18em] text-slate-700">
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> Scroll for full 13-slide deck
          </p>
        </SlideShell>

        {/* Slide 2 */}
        <SlideShell id="slide-2" index={2} title="The Problem" subtitle="Discovery got harder. Content execution stayed expensive and fragmented.">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'AI Search Shift', value: '58%', note: 'GenAI vs traditional search' },
                { label: 'AI Shopping', value: '39%', note: 'Used AI for shopping' },
                { label: 'Creator Market', value: '$214B', note: 'Native content leads' },
                { label: 'Execution Cost', value: '$1M+', note: 'Annual ops overhead' },
              ].map((item) => (
                <article key={item.label} className="bg-hull border border-ink/10 shadow-brutalist p-6">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.label}</p>
                  <p className="deck-heading mt-4 text-4xl font-bold text-ink tabular-nums">{item.value}</p>
                  <p className="mt-3 text-[10px] leading-tight text-sage/95 font-medium italic">{item.note}</p>
                </article>
              ))}
            </div>
            <div className="lg:col-span-4 bg-hull border-2 border-ink shadow-brutalist p-8 flex items-center justify-center text-center rotate-1">
               <p className="text-sm font-medium text-sage/95 font-medium italic italic">The gap between diagnosis and execution is the single biggest leak in marketing ROI today.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic flex items-center gap-2 mb-4">
                <Search className="h-3 w-3" aria-hidden="true" />
                Discovery changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">SEO rankings on Google blue links.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-ink">
                  AI answer engines decide visibility. Ranking pages no longer guarantees citation in answers.
                </p>
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic flex items-center gap-2 mb-4">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Content changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">Polished campaigns produced by large teams/agencies.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-ink">
                  Platform-native creator execution wins attention, but requires a repeatable multi-platform system.
                </p>
              </div>
            </article>
          </div>

          <div className="bg-hull border-2 border-ink shadow-brutalist p-8 mt-5">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">The structural gap</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-ink/10 bg-void p-4 text-sm text-sage/95 font-medium italic">GEO tools measure visibility but do not create content.</div>
              <div className="border border-ink/10 bg-void p-4 text-sm text-sage/95 font-medium italic">Content tools generate posts but do not optimize AI citation share.</div>
              <div className="bg-clay/5 border border-clay/20 p-4 text-sm font-medium text-ink">GeoCompanion connects diagnosis, execution, and compounding outcomes.</div>
            </div>
          </div>

          <SlideFootnotes
            items={[
              { label: 'Source: Capgemini Research Institute (AI search shift)', href: 'https://www.capgemini.com/insights/research-library/what-matters-to-todays-consumer-2025/' },
              { label: 'Source: Adobe survey (AI shopping usage)', href: 'https://www.adobe.com/express/business/blog/online-shopping-trends' },
              { label: 'Source: APC salary guide + internal team-cost model', href: 'https://www.apc.org.au/resources/annual-salary-guide/' },
            ]}
          />
        </SlideShell>

        {/* Slide 3 */}
        <SlideShell id="slide-3" index={3} title="Why Now" subtitle="The category is opening before the stack is settled.">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {[
              {
                tag: 'Shift 1',
                title: 'Behavior shifts faster than tooling',
                body: 'Buyers are moving toward AI answers now, but teams still use SEO stacks built for the old web.',
              },
              {
                tag: 'Shift 2',
                title: 'Creator-native budgets',
                body: 'Teams want platform-native content, but the market stills separates strategy from execution.',
              },
              {
                tag: 'Shift 3',
                title: 'Agent Infrastructure',
                body: 'Machine-to-machine workflows mean this becomes a platform play, not just a point solution.',
              },
            ].map((item, idx) => (
              <article key={item.tag} className="bg-hull border-2 border-ink shadow-brutalist p-10 lg:col-span-4 flex flex-col justify-between">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-clay mb-4">{item.tag}</p>
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="bg-hull border-2 border-ink shadow-brutalist p-10 transform -rotate-1 lg:col-span-7">
              <p className="deck-mono text-[10px] uppercase tracking-[0.16em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-3">The Window</p>
              <p className="text-xl font-medium leading-relaxed text-ink">
                Incumbents skew toward enterprise reporting. The <span className="text-clay font-bold">SMB, creator, and agent-native layer</span> is still wide open for a category-defining workflow.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-hull border-2 border-ink shadow-brutalist p-8 bg-white shadow-elevation">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-clay" />
                  <p className="text-sm font-bold text-ink">Early Advantage</p>
                </div>
                <p className="mt-2 text-sm text-sage/95 font-medium italic">We aren't just competing in a workflow; we are defining it before the incumbents pivot from reporting to execution.</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* Slide 4 */}
        <SlideShell id="slide-4" index={4} title="Our Solution" subtitle="Two engines, one workflow, one prioritized action plan.">
          <div className="grid gap-8 lg:grid-cols-12">
            <article className="bg-hull border bg-noise border-2 border-ink shadow-brutalist p-10 flex flex-col justify-between transform -rotate-1 lg:col-span-6">
              <div>
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-6">Execution Engines</p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 group transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-100"><Search className="h-5 w-5 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /></div>
                      <p className="text-lg font-bold text-ink">GEO Audit Engine</p>
                    </div>
                    <ul className="space-y-2 text-sm text-sage/95 font-medium italic">
                      <li>• Citation-share competitive analysis</li>
                      <li>• EEAT & algorithm fit scoring</li>
                      <li>• Deployable fix prioritization</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 group transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-100"><Sparkles className="h-5 w-5 text-clay font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /></div>
                      <p className="text-lg font-bold text-ink">Vibe Marketing Engine</p>
                    </div>
                    <ul className="space-y-2 text-sm text-sage/95 font-medium italic">
                      <li>• Platform-native voice detection</li>
                      <li>• Hook-based campaign architecting</li>
                      <li>• Voice-consistent automated generation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <article className="lg:col-span-6 space-y-6">
              <div className="bg-hull border-2 border-ink shadow-brutalist p-10 transform rotate-1">
                <p className="deck-mono text-[10px] uppercase tracking-[0.2em] text-sage/95 font-medium italic mb-4">The Output</p>
                <h3 className="text-2xl font-bold mb-4 text-ink">The "Prioritized Action Plan"</h3>
                <p className="text-ink leading-relaxed font-medium">We don't just dump data. GeoCompanion produces a single backlog of high-impact moves across SEO, AI citation, and social content.</p>
                <div className="mt-8 flex items-center gap-4">
                   <div className="h-px flex-1 bg-ink/10" />
                   <div className="text-[10px] deck-mono text-sage/95 font-medium italic">AUTOMATED WORKFLOW</div>
                </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Latency', value: '15s' },
                    { label: 'Price', value: '<$10/mo' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-hull border-2 border-ink shadow-brutalist p-8 text-center">
                       <p className="deck-mono text-[9px] text-sage/95 font-medium italic uppercase tracking-widest">{stat.label}</p>
                       <p className="text-2xl font-bold text-ink mt-1">{stat.value}</p>
                    </div>
                  ))}
               </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 5 */}
        <SlideShell
          id="slide-5"
          index={5}
          title="Why We're Different"
          subtitle="Others either diagnose or create. We do both, and connect the loop."
        >
          <div className="bg-hull border-2 border-ink shadow-brutalist p-4 overflow-x-auto">
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
                    <td className="font-medium text-ink">{row.category}</td>
                    <td>{row.brightedge}</td>
                    <td>{row.evertune}</td>
                    <td>{row.athena}</td>
                    <td>{row.surfer}</td>
                    <td>{row.jasper}</td>
                    <td className="font-semibold text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5">{row.geoCompanion}</td>
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
              <div key={gap} className="bg-hull border border-ink/10 shadow-brutalist p-5">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-2">Gap {idx + 1}</p>
                <p className="text-sm leading-relaxed text-ink">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-lg leading-relaxed text-ink">
              Others either diagnose or create. We do both, and connect the loop.
            </p>
          </div>
        </SlideShell>

        {/* Slide 6 */}
        <SlideShell id="slide-6" index={6} title="Platform Vision" subtitle="From workflow to intelligence to a verified agent economy.">
          <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-5">
                <p className="text-base leading-relaxed text-ink">
                  <span className="font-bold">The Moat:</span> Every audit and campaign feeds our ranking model. This outcome data is a proprietary training signal that no generic intelligence platform can replicate.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5">
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
                  <span className="font-bold">Vision Navigator:</span> We help brands answer whether they are running in the right direction before they scale execution budget.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Step-by-step build path</p>
            <div className="grid gap-4 md:grid-cols-3">
              {buildPathRows.map((item, idx) => {
                const icon = [
                  <Rocket className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                  <Server className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  <Activity className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                ][idx];

                return (
                  <article key={item.phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.phase}</span>
                      {icon}
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">{item.when}</p>
                    <p className="deck-heading text-base font-semibold text-ink mb-2">{item.ships}</p>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.target}</p>
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
                <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Phase 0 is intentional. The app generates the proprietary training signal that makes Phase 1 routing defensible. We are not pivoting to infra; we are building toward it with every workflow we run today.
            </p>
          </div>
        </SlideShell>

        {/* Slide 7 */}
        <SlideShell id="slide-7" index={7} title="Agent Marketplace" subtitle="Private context in, best-fit execution out.">
          <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">1. Private Context</p>
                  <p className="text-sm text-ink/90 font-medium italic">Brands send platform, product, and objective context.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">2. Smart Routing</p>
                  <p className="text-sm text-ink/90 font-medium italic">GeoCompanion selects agents by verified hook performance and outcome history.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">3. Native Execution</p>
                  <p className="text-sm text-ink/90 font-medium italic">Agents execute and feed outcomes back into the ranking loop.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Request flow</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Bot className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Personal agent</p>
                          <p className="text-xs font-semibold text-ink">Private context</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">TikTok, skincare launch, beauty / DTC.</p>
                    </div>

                    <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Server className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">GeoCompanion</p>
                          <p className="text-xs font-semibold text-ink">Routing layer</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">Scores hook fit, availability, and performance.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <ShieldCheck className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Public agents</p>
                          <p className="text-xs font-semibold text-ink">Marketplace agents</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">AWS / GCP deployed agents with different hook mixes.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic">Public agent examples</p>
                      <p className="mt-1 text-xs text-sage/95 font-medium italic">Each agent mixes several hook patterns at different weights, like a recipe for tone and structure.</p>
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Cloud-deployed</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <PublicAgentCard
                      name="Alice"
                      cloud="AWS"
                      context="Weighted for contrast-led product storytelling."
                      accent="text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5"
                      hooks={[
                        { label: 'Contrast hook', weight: 0.3, tone: 'from-accent-cyan to-blue-400' },
                        { label: 'Humble flex', weight: 0.35, tone: 'from-accent-violet to-purple-400' },
                        { label: 'Curiosity gap', weight: 0.2, tone: 'from-blue-400 to-indigo-400' },
                        { label: 'Soft CTA', weight: 0.15, tone: 'from-slate-500 to-slate-400' },
                      ]}
                    />
                    <PublicAgentCard
                      name="Bob"
                      cloud="GCP"
                      context="Weighted for sharper opinion-led campaign framing."
                      accent="text-sage/95 font-medium italic"
                      hooks={[
                        { label: 'Humble flex', weight: 0.2, tone: 'from-accent-violet to-purple-400' },
                        { label: 'Hot take', weight: 0.4, tone: 'from-accent-cyan to-blue-400' },
                        { label: 'Proof stack', weight: 0.25, tone: 'from-blue-400 to-indigo-400' },
                        { label: 'Authority cue', weight: 0.15, tone: 'from-slate-500 to-slate-400' },
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
                <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              The on-chain layer (ERC8004) is a trust primitive, not a payment mechanism. Billing stays on fiat throughout.
              The chain provides immutable performance attestation that enterprise buyers require before trusting autonomous
              agents with their brand.
            </p>
          </div>
        </SlideShell>

        {/* Slide 8 */}
        <SlideShell id="slide-8" index={8} title="Early Signal" subtitle="Pre-revenue for now. Here is the signal we are building toward.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Website Visitors', value: '457', icon: <Users className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
              { label: 'Active Users', value: '340', icon: <Search className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
              { label: 'Search Events', value: '2,326', icon: <BarChart3 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
              { label: 'Activation Rate', value: '74%', icon: <DollarSign className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
            ].map((kpi) => (
              <article key={kpi.label} className="deck-card rounded-2xl p-5">
                <div>{kpi.icon}</div>
                <p className="deck-mono mt-3 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{kpi.label}</p>
                <p className="deck-heading mt-2 text-5xl font-bold text-ink tabular-nums">{kpi.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">The Beta Thesis</h3>
              <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
                We are seeing <span className="font-bold text-ink">74% activation</span> and 6.8 searches per active user. This depth of engagement proves users treat GeoCompanion as a core operating surface, not a one-time demo.
              </p>
              <div className="mt-6 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-ink">
                This round builds our upmarket intelligence layer and scales conversion to durable revenue.
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">Milestones from beta to IPO window</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Pre-seed / Accelerator',
                    desc: 'Convert beta traffic into repeat product usage and first revenue before institutional seed.',
                    target: 'Goal by Q2 2026: 1.5K users, 10K searches, 50 creator/KOL customer accounts, 10 paying brand or agency teams, $5K\u2013$10K MRR',
                    icon: <Building2 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  },
                  {
                    title: 'Seed / Series A',
                    desc: 'Move upmarket with intelligence workflows and prove expansion revenue across SMB, agency, and enterprise accounts.',
                    target: 'Goal by Q4 2027: 25+ brand or agency customers, 500 creator/KOL customer accounts, $100K MRR, <3 month payback, strong retention',
                    icon: <Users className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  },
                  {
                    title: 'Growth / IPO readiness',
                    desc: 'Use marketplace and verification infrastructure to become the system of record for AI-native marketing performance.',
                    target: 'Goal by Q3 2029: $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, enterprise-grade reporting and controls',
                    icon: <Handshake className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                  },
                ].map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      {channel.icon}
                      <p className="text-sm font-semibold text-ink">{channel.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{channel.desc}</p>
                    <p className="deck-mono mt-2 text-[9px] uppercase tracking-[0.1em] text-sage/95 font-medium italic">{channel.target}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 9 */}
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
                    <td className="font-medium text-ink">{row.market}</td>
                    <td>{row.size}</td>
                    <td className="font-semibold text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5">{row.growth}</td>
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
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-2">{label}</p>
                <p className="deck-heading text-4xl font-bold text-ink tabular-nums">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/80 font-medium italic">{desc}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Market Focus</p>
            <div className="space-y-4">
              {[
                { label: 'TAM $87B', width: 100, tone: 'from-emerald-500 to-emerald-400' },
                { label: 'SAM $12B', width: 38, tone: 'from-emerald-600/80 to-emerald-500/80' },
                { label: 'Creator/SMB $6B', width: 24, tone: 'from-slate-500 to-slate-400' },
                { label: 'SOM $150M', width: 8, tone: 'from-slate-600 to-slate-500' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="deck-mono mb-1.5 text-[10px] tracking-[0.1em] text-sage/95 font-medium italic">{bar.label}</div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-gradient-to-r ${bar.tone}`} style={{ width: `${bar.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>

        {/* Slide 10 */}
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
                body: '15\u201320% commission on verified agent transactions. Creators keep 80\u201385%, while personal agents route spend to top-ranked public agents.',
              },
            ].map((item) => (
              <article key={item.title} className="bg-hull border-2 border-ink shadow-brutalist p-8">
                <h3 className="text-lg font-semibold text-ink mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-lg font-semibold text-ink mb-3">Flywheel Defensibility</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-ink/80 font-medium italic">
                <li><span className="font-bold text-ink">Data Moat:</span> Every campaign refined our ranking model.</li>
                <li><span className="font-bold text-ink">Outcome Lifts:</span> Better rankings drive better results, attracting demand.</li>
                <li><span className="font-bold text-ink">Creator Lock-in:</span> Distribution and verification create switching costs.</li>
              </ul>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8 bg-slate-50 flex flex-col justify-center">
              <p className="text-base font-semibold text-ink italic text-center">
                GeoCompanion doesn't just manage workflows; it owns the outcome data that makes autonomous execution reliable.
              </p>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Comparable benchmark: Shopify takes 1.5\u20133% of GMV. GeoCompanion targets higher defensibility through
              outcome verification and trust-layer switching costs.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80 font-medium italic">
              Billing stays on fiat. The on-chain layer exists to prove performance history and make agent selection
              auditable for enterprise buyers.
            </p>
          </div>
        </SlideShell>

        {/* Slide 11 */}
        <SlideShell id="slide-11" index={11} title="Flywheel" subtitle="Every workflow improves the next one.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flywheelRows.map((item, idx) => (
              <article key={item.title} className="deck-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>{item.icon}</div>
                  <span className="deck-mono text-[9px] text-slate-700">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr,1fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-3">Compounding loop</p>
              <p className="text-lg leading-relaxed text-ink">
                Better audits drive better content. Better content creates better outcome data. Vision Navigator turns that
                repeated usage into strategic guidance on whether the business is moving in the right direction before it
                scales execution further.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ['Phase 0', 'Own the diagnosis \u2192 execution workflow'],
                  ['Phase 1', 'Vision Navigator: turn usage into directional guidance'],
                  ['Phase 2', 'Open the loop to agent/API traffic'],
                ].map(([phase, detail]) => (
                  <div key={phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">{phase}</p>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Longer-term upside</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-ink mb-1">Vision Navigator</p>
                  <p className="text-sm leading-relaxed text-ink/80 font-medium italic">As more teams use the system, GeoCompanion gets better at helping companies understand whether they are running in the right direction before scaling more budget and effort.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-ink mb-1">Marketplace routing</p>
                  <p className="text-sm leading-relaxed text-ink/80 font-medium italic">As machine-to-machine traffic grows, routing and ranking become a monetizable execution layer on top of that intelligence system.</p>
                </div>
              </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 12 */}
        <SlideShell id="slide-12" index={12} title="Team" subtitle="Engineering depth, product insight, and distribution in one founding group.">
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="bg-hull border-2 border-ink shadow-brutalist p-8 transform rotate-1 flex h-full flex-col">
                <div className="flex items-start gap-5">
                  <TeamAvatar member={member} />
                  <div className="pt-1">
                    <h3 className="deck-heading text-3xl font-bold text-ink leading-none">{member.name}</h3>
                    <p className="deck-mono mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-sage/95 font-medium italic">{member.role}</p>
                </div>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-sage/95 font-medium italic">
                  {member.body}
                </p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Most marketing AI startups have strong engineering or strong distribution. GeoCompanion has both,
              plus product-level content science.
            </p>
          </div>
        </SlideShell>

        {/* Slide 13 */}
        <SlideShell
          id="slide-13"
          index={13}
          title="The Ask"
          subtitle="Raising a focused pre-seed now to convert product signal into revenue and seed readiness."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr,1.12fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-5">Use of funds</h3>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 mb-5">
                {[
                  { pct: 40, tone: 'bg-emerald-400' },
                  { pct: 30, tone: 'bg-emerald-600' },
                  { pct: 20, tone: 'bg-slate-500' },
                  { pct: 10, tone: 'bg-slate-600' },
                ].map((seg, idx) => (
                  <span key={`${seg.pct}-${idx}`} className={`inline-block h-full ${seg.tone}`} style={{ width: `${seg.pct}%` }} />
                ))}
              </div>

              <div className="space-y-3">
                {askRows.map((row, idx) => {
                  const pct = Number.parseInt(row.allocation, 10) || 0;
                  const icon = [
                    <Cpu className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                    <Target className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                    <Server className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                    <Wallet className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  ][idx] || <Activity className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />;

                  return (
                    <div key={row.allocation} className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {icon}
                          <p className="text-sm font-semibold text-ink">{row.allocation}</p>
                        </div>
                        <span className="deck-mono text-[9px] text-sage/95 font-medium italic">{pct}%</span>
                      </div>
                      <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{row.use}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-5">This round</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$1.25M', detail: 'SAFE round sized for 18 months of runway and disciplined hiring', icon: <Rocket className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
                  { title: 'Target cap', value: '$12M', detail: 'Priced to match current beta traction and leave room for seed step-up', icon: <Building2 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
                  { title: 'Unlocks', value: '$100K MRR', detail: 'Goal: 25+ paying customers and a clean seed story by late 2027', icon: <CheckCircle2 className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="mb-2">{item.icon}</div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic mb-1">{item.title}</p>
                    <p className="deck-heading text-2xl font-bold text-ink tabular-nums">{item.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80 font-medium italic">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-ink">
                We are raising one round: $1.25M on a $12M cap. If we join an accelerator, it will be because it helps
                fill this same round with strategic capital, distribution, and follow-on access, not because we are changing
                the plan.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white/25 px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />
              <span className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">Pre-final investor deck</span>
            </span>
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">Ask: $1.25M SAFE on $12M cap</span>
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">Accelerator participates only if it strengthens the same round</span>
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
