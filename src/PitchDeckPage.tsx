import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  Download,
  Radar,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
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

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  body: string;
};

type TagTone = 'paper' | 'oxide' | 'signal' | 'ember';

const LabGlyph = ({ variant = 'orbit' }: { variant?: 'orbit' | 'wave' | 'pin' | 'bracket' }) => {
  const common = 'h-3.5 w-3.5';
  switch (variant) {
    case 'wave':
      return (
        <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
          <path
            d="M1.2 9.4c1.6 0 1.6-2.8 3.2-2.8s1.6 2.8 3.2 2.8 1.6-2.8 3.2-2.8 1.6 2.8 3.2 2.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
          <path
            d="M8 14s4-3.1 4-7.2A4 4 0 0 0 4 6.8C4 10.9 8 14 8 14Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="6.8" r="1.35" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'bracket':
      return (
        <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
          <path
            d="M6 2.5H4.6c-.9 0-1.6.7-1.6 1.6v7.8c0 .9.7 1.6 1.6 1.6H6M10 2.5h1.4c.9 0 1.6.7 1.6 1.6v7.8c0 .9-.7 1.6-1.6 1.6H10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'orbit':
    default:
      return (
        <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
          <circle cx="8" cy="8" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M2.2 8c0-2.2 2.6-4 5.8-4s5.8 1.8 5.8 4-2.6 4-5.8 4S2.2 10.2 2.2 8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      );
  }
};

const toneClasses: Record<TagTone, { base: string; text: string; border: string; shadow: string }> = {
  paper: {
    base: 'bg-[color:var(--paper)]',
    text: 'text-[color:var(--ink)]',
    border: 'border-[color:var(--ink-muted)]/35',
    shadow: 'shadow-[0_12px_28px_rgba(5,8,16,0.22),0_1px_0_rgba(255,255,255,0.28)_inset]',
  },
  oxide: {
    base: 'bg-[color:var(--oxide)]/16',
    text: 'text-[color:var(--oxide)]',
    border: 'border-[color:var(--oxide)]/35',
    shadow: 'shadow-[0_18px_42px_rgba(5,8,16,0.22),0_1px_0_rgba(255,255,255,0.06)_inset]',
  },
  signal: {
    base: 'bg-[color:var(--signal)]/14',
    text: 'text-[color:var(--signal)]',
    border: 'border-[color:var(--signal)]/35',
    shadow: 'shadow-[0_18px_42px_rgba(5,8,16,0.22),0_1px_0_rgba(255,255,255,0.06)_inset]',
  },
  ember: {
    base: 'bg-[color:var(--ember)]/14',
    text: 'text-[color:var(--ember)]',
    border: 'border-[color:var(--ember)]/30',
    shadow: 'shadow-[0_18px_42px_rgba(5,8,16,0.22),0_1px_0_rgba(255,255,255,0.06)_inset]',
  },
};

const ExperimentTag = ({
  tone = 'paper',
  icon,
  children,
  className = '',
}: {
  tone?: TagTone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={[
      'lab-tag inline-flex items-center gap-2 rounded-[999px] border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]',
      'select-none',
      toneClasses[tone].base,
      toneClasses[tone].text,
      toneClasses[tone].border,
      toneClasses[tone].shadow,
      className,
    ].join(' ')}
  >
    <span className="lab-tag-glyph inline-flex items-center justify-center">{icon}</span>
    <span>{children}</span>
  </span>
);

const AxisTag = ({
  tone = 'oxide',
  children,
  className = '',
}: {
  tone?: TagTone;
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={[
      'lab-axis inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em]',
      toneClasses[tone].base,
      toneClasses[tone].text,
      toneClasses[tone].border,
      toneClasses[tone].shadow,
      className,
    ].join(' ')}
  >
    {children}
  </span>
);

const AnnotationTag = ({
  tone = 'paper',
  icon,
  children,
  className = '',
}: {
  tone?: TagTone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={[
      'lab-anno inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-[12px] font-medium',
      toneClasses[tone].base,
      toneClasses[tone].text,
      toneClasses[tone].border,
      toneClasses[tone].shadow,
      className,
    ].join(' ')}
  >
    <span className="inline-flex items-center justify-center opacity-80">{icon}</span>
    <span className="leading-none">{children}</span>
  </span>
);

const StatusChip = ({
  tone = 'signal',
  label,
  className = '',
}: {
  tone?: TagTone;
  label: string;
  className?: string;
}) => (
  <span
    className={[
      'lab-chip inline-flex items-center gap-2 rounded-[999px] border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]',
      toneClasses[tone].base,
      toneClasses[tone].text,
      toneClasses[tone].border,
      toneClasses[tone].shadow,
      className,
    ].join(' ')}
  >
    <span className="lab-chip-dot h-2 w-2 rounded-full bg-current opacity-80" aria-hidden="true" />
    <span>{label}</span>
  </span>
);

const TagCluster = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={['relative flex flex-wrap items-center gap-3', className].join(' ')}>
    {children}
    <span
      className="pointer-events-none absolute -left-7 -top-7 h-16 w-16 rounded-full border border-white/10 bg-white/5 blur-[0.2px]"
      aria-hidden="true"
    />
    <span
      className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full border border-white/10 bg-white/5 blur-[0.2px]"
      aria-hidden="true"
    />
  </div>
);

const SlideShell = ({ id, index, title, subtitle, children }: SlideShellProps) => (
  <section
    id={id}
    className="deck-slide snap-start min-h-[100svh] h-auto flex flex-col justify-center px-5 py-24 md:px-10 lg:px-14 lg:py-32"
  >
    <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col">
      <div className="mb-6 flex items-center justify-between">
        <ExperimentTag tone="paper" icon={<LabGlyph variant="bracket" />} className="-rotate-[1.25deg]">
          Slide {index.toString().padStart(2, '0')}
        </ExperimentTag>
        <div className="h-px w-24 bg-[linear-gradient(to_right,rgba(220,231,198,0.65),rgba(220,231,198,0))]" />
      </div>

      <h2 className="deck-slide-title font-['Fraunces_Variable'] text-3xl font-semibold leading-[1.05] text-[color:var(--paper)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="deck-slide-subtitle mt-5 max-w-3xl text-base leading-relaxed text-[color:var(--paper-dim)] sm:text-[1.15rem]">
          {subtitle}
        </p>
      ) : null}

      <div className="deck-slide-body mt-6 lg:mt-10 flex-1">{children}</div>
    </div>
  </section>
);

const GeoCompanionMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative rounded-2xl border border-[color:var(--ink-muted)]/40 bg-[linear-gradient(145deg,rgba(220,231,198,0.14),rgba(8,10,16,0.68))] shadow-[0_12px_34px_rgba(5,8,16,0.42)] ring-1 ring-white/10"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full p-2.5">
      <defs>
        <linearGradient id="gclogo-short" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--oxide)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gclogo-short)" strokeWidth="7" strokeLinecap="round" strokeDasharray="160 70" />
      <path d="M38 60 L50 40 L63 60" fill="none" stroke="var(--paper)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <circle cx="50" cy="50" r="5" fill="var(--signal)" />
    </svg>
  </div>
);

const teamMembers: TeamMember[] = [
  {
    name: 'Wilson',
    role: 'Founder & Architect',
    photo: wilsonImage,
    photoAlt: 'Portrait of Wilson',
    photoPosition: 'center 18%',
    body: 'Serial technical founder with two exits. Raised $1.6M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired; ranked Top 30 most innovative startups in Canada) and Senior Software Architect at Mastodon. Brings a rare combination of product engineering depth, agent architecture experience, and prior fundraising across Web2 and Web3.',
  },
  {
    name: 'Huan',
    role: 'Co-Founder & Product',
    photo: huanImage,
    photoAlt: 'Portrait of Huan',
    photoPosition: 'center 20%',
    body: 'Product leader spanning Web3, AI, and traditional finance. At GeoCompanion, owns the loop between visibility signal and content execution — the core conversion mechanic behind the platform thesis. Focuses on turning technical capability into workflows marketing teams can actually adopt, bridging product strategy, customer use cases, and day-to-day execution.',
  },
  {
    name: 'Austin',
    role: 'Co-Founder & GTM',
    photo: austinImage,
    photoAlt: 'Portrait of Austin',
    photoPosition: 'center 16%',
    body: 'Enterprise distribution leader with relationship-driven access into networks around LayerZero, Sei, and Xiaomi. Built and scaled a media project to 100M+ organic streams, demonstrating platform-native distribution at scale — the same playbook GeoCompanion sells to brands. Understands creator economics from both the operator side and the platform side.',
  },
];

const TeamAvatar = ({ member }: { member: TeamMember }) => {
  const initials = member.name.slice(0, 1);

  return (
    <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_22px_54px_rgba(3,6,12,0.48)] ring-1 ring-white/10">
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
      <div className="absolute inset-0 hidden items-center justify-center bg-[linear-gradient(145deg,rgba(77,140,106,0.18),rgba(8,10,16,0.78))] text-2xl font-semibold text-[color:var(--paper)]">
        {initials}
      </div>
    </div>
  );
};

const competitorRows = [
  {
    category: 'AI citation visibility & scoring',
    cloverlabs: 'No',
    hootsuite: 'No',
    semrush: 'Partial',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Deployable code fixes',
    cloverlabs: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Platform-native content',
    cloverlabs: 'Yes',
    hootsuite: 'Scheduling only',
    semrush: 'No',
    jasper: 'Generic',
    geoCompanion: 'Yes (hook-based)',
  },
  {
    category: 'Agent API (machine-to-machine)',
    cloverlabs: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 1)',
  },
  {
    category: 'On-chain performance verification',
    cloverlabs: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 3)',
  },
  {
    category: 'Open infra / ecosystem model',
    cloverlabs: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Entry price',
    cloverlabs: 'Enterprise',
    hootsuite: '$99/mo',
    semrush: '$130/mo',
    jasper: '$39/mo',
    geoCompanion: 'Beta free → <$10/mo starter',
  },
];

const slideIds = Array.from({ length: 6 }, (_, idx) => `slide-${idx + 1}`);
const PDF_EXPORT_BG = '#070913';
const slideLabels = ['Thesis', 'Live', 'Differentiation', 'Roadmap', 'Ask', 'Team'];

const PitchDeckPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(1);

  const scrollToSlide = (id: string) => {
    const slide = document.getElementById(id);
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    const slides = slideIds
      .map((id, idx) => ({ el: document.getElementById(id), idx: idx + 1 }))
      .filter((item): item is { el: HTMLElement; idx: number } => Boolean(item.el));

    if (!slides.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            idx: Number((entry.target as HTMLElement).dataset.slideIndex || '0'),
            ratio: entry.intersectionRatio,
          }))
          .sort((a, b) => b.ratio - a.ratio);
        if (visible[0]?.idx) setActiveSlide(visible[0].idx);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    slides.forEach(({ el, idx }) => {
      el.dataset.slideIndex = String(idx);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      const waitForPaint = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let pdf: jsPDF | null = null;

      for (let idx = 0; idx < slides.length; idx += 1) {
        const sourceSlide = slides[idx];
        const slide = sourceSlide.cloneNode(true) as HTMLElement;
        const sourceRect = sourceSlide.getBoundingClientRect();
        const sourceStyle = window.getComputedStyle(sourceSlide);
        slide.removeAttribute('id');
        slide.style.width = `${Math.ceil(sourceRect.width)}px`;
        slide.style.minHeight = `${Math.ceil(sourceRect.height)}px`;
        slide.style.height = `${Math.ceil(sourceRect.height)}px`;
        slide.style.paddingTop = '72px';
        slide.style.paddingRight = sourceStyle.paddingRight;
        slide.style.paddingBottom = '44px';
        slide.style.paddingLeft = sourceStyle.paddingLeft;
        exportStage.appendChild(slide);

        const layoutRoot = slide.firstElementChild as HTMLElement | null;
        if (layoutRoot) {
          layoutRoot.style.maxWidth = '80rem';
          layoutRoot.style.width = '100%';
          layoutRoot.style.marginLeft = 'auto';
          layoutRoot.style.marginRight = 'auto';
          layoutRoot.style.height = '100%';
        }

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach((node) => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach((table) => {
          table.style.width = '100%';
          table.style.minWidth = '0';
        });
        slide.querySelectorAll<HTMLElement>('th, td').forEach((cell) => {
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
      pdf.save('GeoCompanion_Short_Deck.pdf');
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
    <div className="lab-root relative min-h-screen overflow-hidden bg-[color:var(--bg)] font-['IBM_Plex_Sans_Variable'] text-[color:var(--paper)]">
      <style>{`
        :root {
          --bg: #070913;
          --bg-2: #090f1a;
          --ink: #0b1020;
          --ink-muted: #9aa58a;
          --paper: #dce7c6;
          --paper-dim: rgba(220,231,198,0.78);
          --paper-faint: rgba(220,231,198,0.12);
          --oxide: #95ac53;
          --signal: #63cba9;
          --ember: #eda06f;
        }

        .deck-grid {
          background-image:
            linear-gradient(to right, rgba(220,231,198,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220,231,198,0.06) 1px, transparent 1px),
            radial-gradient(circle at 1px 1px, rgba(220,231,198,0.06) 1px, transparent 1.2px);
          background-size: 46px 46px, 46px 46px, 23px 23px;
        }

        .deck-card {
          border: 1px solid rgba(220,231,198, 0.16);
          background: linear-gradient(145deg, rgba(12, 16, 28, 0.82), rgba(10, 12, 18, 0.42));
          backdrop-filter: blur(10px);
          box-shadow:
            0 18px 50px rgba(3,6,12,0.46),
            inset 0 1px 0 rgba(255,255,255,0.06);
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
          color: rgba(220,231,198,0.85);
          font-weight: 600;
          background: rgba(10, 12, 18, 0.95);
        }

        .deck-table th,
        .deck-table td {
          border: 1px solid rgba(220,231,198,0.14);
          padding: 0.72rem 0.82rem;
          vertical-align: top;
        }

        .deck-table td {
          color: rgba(220,231,198,0.88);
          line-height: 1.45;
        }

        .deck-highlight {
          color: var(--signal);
        }

        .lab-root {
          position: relative;
          isolation: isolate;
        }

        .lab-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            radial-gradient(circle at 20% 18%, rgba(77,140,106,0.18), transparent 55%),
            radial-gradient(circle at 84% 72%, rgba(217,139,90,0.14), transparent 52%),
            radial-gradient(circle at 55% 40%, rgba(122,138,68,0.14), transparent 56%);
          filter: blur(2px);
          z-index: 0;
        }

        .lab-root::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.22;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          z-index: 0;
        }

        .lab-layer {
          position: relative;
          z-index: 1;
        }

        @media (prefers-reduced-motion: no-preference) {
          .lab-layer {
            animation: labEnter 760ms cubic-bezier(.16,1,.3,1) both;
          }
          .deck-slide-title {
            animation: labTitle 900ms cubic-bezier(.16,1,.3,1) both;
          }
          .deck-slide-subtitle {
            animation: labFadeUp 920ms cubic-bezier(.16,1,.3,1) both;
            animation-delay: 70ms;
          }
        }

        @keyframes labEnter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes labTitle {
          from { opacity: 0; transform: translateY(16px); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes labFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .lab-tag {
          transform: translateZ(0);
          transition: transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms cubic-bezier(.2,.9,.2,1), filter 180ms cubic-bezier(.2,.9,.2,1);
        }

        .lab-tag:hover {
          transform: translateY(-1px) rotate(-0.2deg);
          filter: saturate(1.05);
        }

        .lab-tag:active {
          transform: translateY(0px) rotate(0deg) scale(0.99);
          box-shadow: 0 10px 24px rgba(5,8,16,0.20), 0 1px 0 rgba(255,255,255,0.22) inset;
        }

        @media (prefers-reduced-motion: no-preference) {
          .lab-tag:hover .lab-tag-glyph {
            animation: labJitter 520ms steps(2, end) infinite;
          }
        }

        .lab-tag:focus-visible,
        .lab-anno:focus-visible,
        .lab-chip:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 4px rgba(77,140,106,0.18),
            0 0 0 1px rgba(77,140,106,0.42),
            0 18px 42px rgba(3,6,12,0.46);
        }

        @keyframes labJitter {
          0% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(.4px,-.3px) rotate(-1deg); }
          50% { transform: translate(-.3px,.35px) rotate(1deg); }
          75% { transform: translate(.3px,.2px) rotate(0deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }

        .lab-anno {
          position: relative;
        }

        .lab-anno::after {
          content: "";
          position: absolute;
          left: 14px;
          bottom: -8px;
          width: 14px;
          height: 14px;
          transform: rotate(45deg);
          background: inherit;
          border-left: 1px solid rgba(220,231,198,0.18);
          border-bottom: 1px solid rgba(220,231,198,0.18);
          border-radius: 2px;
        }

        .lab-axis {
          transform: rotate(-90deg);
          transform-origin: left top;
          white-space: nowrap;
        }

        .lab-spine {
          position: fixed;
          left: 22px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(220,231,198,0.22), rgba(220,231,198,0.04), rgba(220,231,198,0.18));
          opacity: 0.65;
          z-index: 20;
          pointer-events: none;
        }

        .lab-spine::before {
          content: "";
          position: absolute;
          top: 92px;
          left: -7px;
          width: 15px;
          height: 15px;
          border-radius: 999px;
          border: 1px solid rgba(220,231,198,0.35);
          background: rgba(7,9,19,0.8);
          box-shadow: 0 16px 40px rgba(3,6,12,0.46);
        }

        .lab-spine::after {
          content: "";
          position: absolute;
          top: 92px;
          left: -7px;
          width: 15px;
          height: 15px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(77,140,106,0.9), rgba(77,140,106,0.0) 70%);
          opacity: 0.65;
          filter: blur(1px);
        }

        .pdf-export-stage {
          position: fixed;
          left: -20000px;
          top: 0;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          background: ${PDF_EXPORT_BG};
          --paper-dim: rgba(220,231,198,0.92);
          --paper: rgba(220,231,198,0.98);
        }

        .pdf-export-stage * {
          animation: none !important;
          transition: none !important;
        }

        .pdf-export-stage .deck-slide {
          box-sizing: border-box;
          background: ${PDF_EXPORT_BG};
        }

        .pdf-export-stage .deck-slide > div {
          max-width: 80rem !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .pdf-export-stage .deck-slide-title {
          margin-bottom: 0 !important;
          line-height: 1.08 !important;
          color: rgba(220,231,198,0.98) !important;
          text-shadow: 0 1px 0 rgba(0,0,0,0.35) !important;
        }

        .pdf-export-stage .deck-slide-subtitle {
          margin-top: 1.2rem !important;
          max-width: 68ch !important;
          color: rgba(220,231,198,0.92) !important;
          text-shadow: 0 1px 0 rgba(0,0,0,0.35) !important;
        }

        .pdf-export-stage .deck-slide-body {
          margin-top: 2.4rem !important;
          flex: 1 1 auto !important;
          color: rgba(220,231,198,0.92) !important;
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
          color: rgba(220,231,198,0.92) !important;
        }

        .pdf-export-stage .deck-card p,
        .pdf-export-stage .deck-card li {
          color: rgba(220,231,198,0.92) !important;
        }

        .pdf-export-stage .deck-table th {
          color: rgba(220,231,198,0.86) !important;
        }

        .pdf-export-stage .deck-table td {
          color: rgba(220,231,198,0.92) !important;
        }

        /* Fix html2canvas inline-flex vertical alignment bug */
        .pdf-export-stage .lab-tag,
        .pdf-export-stage .lab-chip,
        .pdf-export-stage .lab-anno {
          display: inline-flex !important;
          align-items: center !important;
        }
        
        .pdf-export-stage .lab-tag span,
        .pdf-export-stage .lab-chip span,
        .pdf-export-stage .lab-anno span {
          display: inline-flex !important;
          align-items: center !important;
          line-height: 1 !important;
          height: auto !important;
          margin: auto 0 !important;
        }
      `}</style>

      <div className="lab-layer">
        <div className="deck-grid pointer-events-none fixed inset-0 opacity-55" />
        <div className="pointer-events-none fixed -left-28 top-24 h-64 w-64 rounded-full bg-[color:var(--signal)]/14 blur-[140px]" />
        <div className="pointer-events-none fixed -right-24 bottom-20 h-72 w-72 rounded-full bg-[color:var(--ember)]/12 blur-[140px]" />
        <div className="pointer-events-none fixed left-1/2 top-32 h-56 w-56 -translate-x-1/2 rounded-full bg-[color:var(--oxide)]/10 blur-[160px]" />
        <div className="lab-spine hidden sm:block" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[color:var(--bg)]/72 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--paper-dim)] transition hover:border-[color:var(--signal)]/45 hover:text-[color:var(--paper)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <GeoCompanionMark />
            <div className="text-left">
              <p className="font-['Fraunces_Variable'] text-sm font-semibold tracking-[0.06em] text-[color:var(--paper)]">GeoCompanion.ai</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Short Deck</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(77,140,106,0.9),rgba(122,138,68,0.76))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ink)] shadow-[0_18px_44px_rgba(3,6,12,0.46)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {isDownloading ? 'Generating PDF…' : 'Download PDF'}
          </button>
        </div>
      </header>

      <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 gap-2 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md lg:flex lg:flex-col">
        {slideIds.map((id, idx) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSlide(id)}
            className={[
              'group relative h-9 w-9 overflow-hidden rounded-2xl border bg-white/5 text-[11px] font-bold transition',
              idx + 1 === activeSlide
                ? 'border-[color:var(--signal)]/55 text-[color:var(--paper)] shadow-[0_18px_44px_rgba(3,6,12,0.46)]'
                : 'border-white/10 text-[color:var(--paper-dim)] hover:border-[color:var(--signal)]/45 hover:text-[color:var(--paper)]',
            ].join(' ')}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span className="relative z-10">{idx + 1}</span>
            <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper)] shadow-[0_18px_44px_rgba(3,6,12,0.46)] backdrop-blur-md group-hover:block">
              {slideLabels[idx] ?? `Slide ${idx + 1}`}
            </span>
            <span
              className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(77,140,106,0.38), transparent 58%), radial-gradient(circle at 70% 70%, rgba(217,139,90,0.16), transparent 56%)',
              }}
            />
          </button>
        ))}
      </aside>

      <main className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <SlideShell
          id="slide-1"
          index={1}
          title="Marketing teams are being replaced by AI agents. We build the infrastructure those agents run on."
          subtitle="The content execution infrastructure for the AI era. Signal to content to distribution to verified outcomes — one compounding loop."
        >
          <div className="relative grid gap-6 lg:grid-cols-[1.25fr,1fr]">
            <div className="deck-card relative overflow-hidden rounded-[2.25rem] p-7 sm:p-9">
              <div className="absolute -right-10 -top-6 rotate-[9deg]">
                <ExperimentTag tone="paper" icon={<LabGlyph variant="orbit" />} className="opacity-95">
                  Live system
                </ExperimentTag>
              </div>
              <div className="absolute -left-6 top-16 -rotate-[8deg]">
                <StatusChip tone="signal" label="Beta active" />
              </div>

              <div className="mb-5 inline-flex items-center gap-3">
                <GeoCompanionMark size={28} />
                <ExperimentTag tone="paper" icon={<LabGlyph variant="bracket" />} className="-rotate-[1.25deg]">
                  Content execution infrastructure
                </ExperimentTag>
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Core mission</p>
              <p className="mt-4 font-['Fraunces_Variable'] text-2xl leading-[1.22] text-[color:var(--paper)] sm:text-3xl">
                The infrastructure layer connecting AI visibility signal, hook-based content execution, and agent-powered distribution into one compounding loop.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--paper-dim)] sm:text-lg">
                Built because the founder had to run 90% of marketing himself. Now rebuilt as the system that runs whether or not humans show up. The core stays lean — an open agentic API lets partners build richer experiences on top while GeoCompanion compounds the shared intelligence layer underneath.
              </p>
            </div>

            <div className="space-y-4">
              <TagCluster className="justify-start">
                <ExperimentTag tone="paper" icon={<LabGlyph variant="pin" />} className="rotate-[2deg]">
                  AI citation signal
                </ExperimentTag>
                <ExperimentTag tone="oxide" icon={<LabGlyph variant="orbit" />} className="-rotate-[3deg]">
                  Hook intelligence
                </ExperimentTag>
                <ExperimentTag tone="ember" icon={<LabGlyph variant="wave" />} className="rotate-[1deg]">
                  Agent-ready
                </ExperimentTag>
              </TagCluster>

              <div className="deck-card relative overflow-hidden rounded-3xl p-5">
                <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[0.2px]" />
                <div className="absolute -right-8 -bottom-10 h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[0.2px]" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">The destination</p>
                <div className="mt-4 grid gap-2 text-sm text-[color:var(--paper)]">
                  <p className="flex items-center gap-2">
                    <Radar className="h-4 w-4 text-[color:var(--oxide)]" /> Strategic intelligence &amp; positioning
                  </p>
                  <p className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-[color:var(--signal)]" /> Agent marketplace ranked by outcomes
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[color:var(--paper)] opacity-80" /> On-chain trust for autonomous workflows
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-[color:var(--signal)]" />, label: 'Today', value: 'Hook Intelligence + Content Engines' },
                  { icon: <BarChart3 className="h-4 w-4 text-[color:var(--oxide)]" />, label: 'Phase 1–2', value: 'Agent API + Marketplace' },
                ].map((item) => (
                  <div key={item.label} className="deck-card rounded-2xl p-3">
                    <div>{item.icon}</div>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--paper-dim)]">{item.label}</p>
                    <p className="text-sm font-semibold text-[color:var(--paper)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">
            <ChevronDown className="h-4 w-4" aria-hidden="true" /> Scroll for the short deck
          </p>
        </SlideShell>

        <SlideShell
          id="slide-2"
          index={2}
          title="Three Engines Are Live Today"
          subtitle="Core workflow: diagnosis → content → execution. Built lean today, open as an agentic API tomorrow."
        >
          <div className="relative grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <div className="pointer-events-none absolute -right-2 -top-6 hidden lg:block">
              <AnnotationTag tone="paper" icon={<LabGlyph variant="pin" />}>
                This is the working product.
              </AnnotationTag>
            </div>

            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">Live now — three modules</p>
              <div className="mt-4 space-y-3">
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute -right-6 -top-5 rotate-[6deg]">
                    <ExperimentTag tone="oxide" icon={<LabGlyph variant="orbit" />}>
                      Engine 1
                    </ExperimentTag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radar className="h-4 w-4 text-[color:var(--oxide)]" aria-hidden="true" />
                    <p className="font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">Hook Intelligence Engine</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                    A continuously updated database of what makes content go viral — captured and scored across every major platform. The pattern library that powers everything else.
                  </p>
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute -left-6 -top-5 -rotate-[6deg]">
                    <ExperimentTag tone="signal" icon={<LabGlyph variant="wave" />}>
                      Engine 2
                    </ExperimentTag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-[color:var(--signal)]" aria-hidden="true" />
                    <p className="font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">AI Visibility Audit Engine</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                    Finds exactly why AI assistants like ChatGPT skip your brand in their answers — then generates the code fixes and content updates you can ship the same day.
                  </p>
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute -right-6 -top-5 rotate-[5deg]">
                    <ExperimentTag tone="ember" icon={<LabGlyph variant="bracket" />}>
                      Engine 3
                    </ExperimentTag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[color:var(--ember)]" aria-hidden="true" />
                    <p className="font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">Platform Content Engine</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                    Generates platform-native posts, threads, and articles for 7+ channels — written in your brand's voice, structured around proven hook patterns.
                  </p>
                </div>
              </div>
            </article>

            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">What users receive</p>
              <div className="mt-4 grid gap-3">
                {[
                  { source: 'From Hook Engine', title: 'Hook Library', bullets: ['Pattern database by platform', 'Viral scoring across channels', 'Voice-matched generation'] },
                  { source: 'From Audit Engine', title: 'Visibility Package', bullets: ['GEO scorecard + EEAT breakdown', 'Citation-share competitor view', 'Schema + CTA fixes to ship same day'] },
                  { source: 'From Content Engine', title: 'Content Package', bullets: ['Platform-native campaigns for 7+ channels', '30/60/90-day execution system', 'Agent-ready structured output'] },
                ].map((block) => (
                  <div key={block.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">{block.source}</p>
                    <p className="font-['Fraunces_Variable'] text-lg font-semibold tracking-[0.02em] text-[color:var(--paper)]">{block.title}</p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[color:var(--paper-dim)]">
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(10,12,18,0.4),rgba(77,140,106,0.12))] p-4 shadow-[0_8px_30px_rgba(3,6,12,0.36)] ring-1 ring-white/5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--signal)]">Activation Rate</p>
                  <p className="mt-0.5 font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--paper)]">74%</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--signal)]">Active Users</p>
                  <p className="mt-0.5 font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--paper)]">340</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--oxide)]">Search Events</p>
                  <p className="mt-0.5 font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--paper)]">2,326</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--oxide)]">Website Visitors</p>
                  <p className="mt-0.5 font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--paper)]">457</p>
                </div>
              </div>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
              <span className="font-semibold">Hook Intelligence finds what earns attention.</span>{' '}
              <span className="font-semibold text-[color:var(--paper-dim)]">Audit Engine surfaces why AI skips you. Content Engine ships the fix. One loop that compounds with every workflow.</span>
            </p>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-3"
          index={3}
          title="Why We're Different"
          subtitle="Others are point tools built for human workflows. We're building the infrastructure layer for the agent era."
        >
          <div className="relative">
            <div className="pointer-events-none absolute -left-3 -top-6 hidden lg:block">
              <AnnotationTag tone="paper" icon={<LabGlyph variant="bracket" />}>
                Competitor grid (lab cut)
              </AnnotationTag>
            </div>

            <div className="deck-card overflow-x-auto rounded-3xl">
              <table className="deck-table min-w-[900px]">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cloverlabs</th>
                    <th>Hootsuite</th>
                    <th>Semrush</th>
                    <th>Jasper / Copy.ai</th>
                    <th>GeoCompanion</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorRows.map((row) => (
                    <tr key={row.category}>
                      <td className="font-medium text-[color:var(--paper)]">{row.category}</td>
                      <td>{row.cloverlabs}</td>
                      <td>{row.hootsuite}</td>
                      <td>{row.semrush}</td>
                      <td>{row.jasper}</td>
                      <td className="font-semibold text-[color:var(--signal)]">{row.geoCompanion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              'AI citation signal + content execution in one infrastructure layer.',
              'Agent API built on proprietary hook intelligence and outcome data.',
              'Verifiable agent performance for enterprise trust — an ecosystem path no point tool can replicate.',
            ].map((gap, idx) => (
              <div key={gap} className="deck-card relative rounded-3xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Gap {idx + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper)]">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
              Others are point tools built for human workflows. We are building the infrastructure layer for the agent era — one system connecting visibility signal, content execution, and verified outcomes.
            </p>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-4"
          index={4}
          title="Platform Vision"
          subtitle="From workflow to intelligence to a verified agent economy. Keep the core focused. Open the capability. Let data compound."
        >
          <div className="deck-card relative rounded-3xl p-6">
            <div className="absolute -right-8 -top-6 rotate-[8deg]">
              <ExperimentTag tone="paper" icon={<LabGlyph variant="orbit" />}>
                Build path
              </ExperimentTag>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">Why today's product matters tomorrow</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="relative rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(77,140,106,0.18),rgba(10,12,18,0.52))] p-5">
                <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
                  Every audit tells us what AI engines cite and why. Every campaign tells us which hook patterns drive real results by platform. Packaging that into a structured plan gives us a reusable agentic call surface that becomes a shared standard.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-[color:var(--paper)]">
                  We keep the core focused so external developers can build a rich ecosystem — KOL publishing flows, image generation wrappers, milestone apps — without bloating the platform. Phase 0 generates the proprietary training signal that makes Phase 1 routing defensible.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">Step-by-step build path</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  phase: 'Phase 0',
                  when: 'Now → Q2 2026',
                  ships: 'Hook Intelligence + Content Execution',
                  target: '1,500+ users, 10K+ search events, 50 creator accounts, and first 10 paying teams.',
                  icon: <Rocket className="h-4 w-4 text-[color:var(--signal)]" aria-hidden="true" />,
                },
                {
                  phase: 'Phase 1–2',
                  when: 'Q3 2026 → Q4 2027',
                  ships: 'Agent API + Agent Marketplace',
                  target: '$100K MRR, 25+ agency customers, 500 creator accounts, and upmarket expansion.',
                  icon: <Server className="h-4 w-4 text-[color:var(--oxide)]" aria-hidden="true" />,
                },
                {
                  phase: 'Phase 3–4',
                  when: '2028+',
                  ships: 'On-Chain Trust + Vision Navigator',
                  target: '$50M+ ARR, 120+ enterprise customers, 5,000 creator accounts, and verified infrastructure.',
                  icon: <Activity className="h-4 w-4 text-[color:var(--ember)]" aria-hidden="true" />,
                },
              ].map((item) => (
                <article key={item.phase} className="relative rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">{item.phase}</span>
                    {item.icon}
                  </div>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--signal)]">{item.when}</p>
                  <p className="mt-1 font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">{item.ships}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">{item.target}</p>
                </article>
              ))}
            </div>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-5"
          index={5}
          title="The Ask"
          subtitle="Raising a focused pre-seed to convert product signal into revenue and seed readiness."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr,1.12fr]">
            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">Use of funds</p>
              <div className="mt-4 space-y-3">
                {[
                  { icon: <Target className="h-4 w-4 text-[color:var(--signal)]" />, allocation: '40% Engineering', use: 'Backend API, provider-agnostic model runtime, agent orchestration, and the Phase 2 intelligence pipeline' },
                  { icon: <Users className="h-4 w-4 text-[color:var(--oxide)]" />, allocation: '30% GTM', use: 'Enterprise pilot acquisition, creator onboarding, agency partnerships' },
                  { icon: <Server className="h-4 w-4 text-[color:var(--paper-dim)]" />, allocation: '20% Infrastructure', use: 'Multi-model API costs, cloud, data pipeline, and analytics infrastructure' },
                  { icon: <Activity className="h-4 w-4 text-[color:var(--ember)]" />, allocation: '10% Product Ops', use: 'Customer feedback loops, analytics instrumentation, onboarding, and operational systems to turn beta usage into repeatable retention' },
                ].map((row) => (
                  <div key={row.allocation} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {row.icon}
                      <p className="text-sm font-semibold text-[color:var(--paper)]">{row.allocation}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-[color:var(--paper-dim)]">{row.use}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">This round</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$1.25M', detail: 'SAFE round sized for 18 months of runway and disciplined hiring', icon: <Rocket className="h-4 w-4 text-[color:var(--signal)]" /> },
                  { title: 'Target cap', value: '$12M', detail: 'Priced to match current beta traction and leave room for seed step-up', icon: <Building2 className="h-4 w-4 text-[color:var(--oxide)]" /> },
                  { title: 'Unlocks', value: '$100K MRR', detail: 'Goal: 25+ paying customers and a clean seed story by late 2027', icon: <CheckCircle2 className="h-4 w-4 text-[color:var(--signal)]" /> },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2">{item.icon}</div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--paper-dim)]">{item.title}</p>
                    <p className="font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--paper)]">{item.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[color:var(--paper-dim)]">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(77,140,106,0.18),rgba(10,12,18,0.52))] p-5">
                <p className="text-sm leading-relaxed text-[color:var(--paper)]">
                  We are raising one round: $1.25M on a $12M cap. If we join an accelerator, it will be because it helps fill this same round with strategic capital, distribution, and follow-on access — not because we are changing the plan.
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  { label: 'Activation Rate', value: '74%' },
                  { label: 'Active Users', value: '340' },
                  { label: 'Search Events', value: '2,326' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                    <p className="font-['Fraunces_Variable'] text-2xl font-semibold text-[color:var(--signal)]">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--paper-dim)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-6"
          index={6}
          title="Team"
          subtitle="Engineering depth, product insight, and creator-aware distribution in one founding group."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="deck-card relative flex h-full flex-col rounded-[2.25rem] p-5">
                <div className="flex items-start gap-4">
                  <TeamAvatar member={member} />
                  <div>
                    <h3 className="font-['Fraunces_Variable'] text-2xl sm:text-3xl font-semibold text-[color:var(--paper)]">{member.name}</h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">{member.role}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusChip tone="signal" label="builder" />
                      <StatusChip tone="oxide" label="operator" />
                      <StatusChip tone="ember" label="distribution" />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--paper-dim)]">
                  {member.body}
                </p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="text-sm leading-relaxed text-[color:var(--paper)]">
              Most marketing AI startups have strong engineering or strong distribution. GeoCompanion has both,
              plus product-level content science.
            </p>
          </div>
        </SlideShell>
      </main>
    </div>
  );
};

export default PitchDeckPage;
