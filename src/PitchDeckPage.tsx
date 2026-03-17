import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bot,
  ChevronDown,
  Download,
  PenTool,
  Radar,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
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
    body: 'Serial technical founder with two exits. Raised $1.3M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired) and Senior Software Architect at Mastodon.',
  },
  {
    name: 'Huan',
    role: 'Co-Founder & Product',
    photo: huanImage,
    photoAlt: 'Portrait of Huan',
    photoPosition: 'center 20%',
    body: 'Product leader spanning Web3, AI, and traditional finance. Owns the loop between GEO signal and content execution, and turns technical capability into workflows marketing teams can actually adopt.',
  },
  {
    name: 'Austin',
    role: 'Co-Founder & GTM',
    photo: austinImage,
    photoAlt: 'Portrait of Austin',
    photoPosition: 'center 16%',
    body: 'Enterprise distribution leader with relationship-led access and creator-native instincts. Built and scaled media distribution to 100M+ organic streams and understands creator economics from both the operator and platform side.',
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
    category: 'Hook-based campaign system',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Vision Navigator / intelligence layer',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Next',
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
];

const slideIds = Array.from({ length: 5 }, (_, idx) => `slide-${idx + 1}`);
const PDF_EXPORT_BG = '#070913';
const slideLabels = ['Thesis', 'Live', 'Proof', 'Roadmap', 'Team'];

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
          title="AI now decides who gets found. Most businesses have no system to change that."
          subtitle="Discovery and execution have both shifted. GeoCompanion starts by fixing both and becomes the intelligence layer that tells businesses where to go next."
        >
          <div className="relative grid gap-6 lg:grid-cols-[1.25fr,1fr]">
            <div className="deck-card relative overflow-hidden rounded-[2.25rem] p-7 sm:p-9">
              <div className="absolute -right-10 -top-6 rotate-[9deg]">
                <ExperimentTag tone="paper" icon={<LabGlyph variant="orbit" />} className="opacity-95">
                  Prototype pass
                </ExperimentTag>
              </div>
              <div className="absolute -left-6 top-16 -rotate-[8deg]">
                <StatusChip tone="signal" label="Live system" />
              </div>

              <div className="mb-5 inline-flex items-center gap-3">
                <GeoCompanionMark size={28} />
                <ExperimentTag tone="paper" icon={<LabGlyph variant="bracket" />} className="-rotate-[1.25deg]">
                  Strategic intelligence deck
                </ExperimentTag>
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Who we are</p>
              <p className="mt-4 font-['Fraunces_Variable'] text-2xl leading-[1.22] text-[color:var(--paper)] sm:text-3xl">
                GeoCompanion starts by helping businesses get cited by AI search engines and build platform-native content that wins attention.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--paper-dim)] sm:text-lg">
                Over time, it becomes the Enterprise Strategic Intelligence Platform that tells businesses where their market is going, what to build next, and which verified agents can execute that vision. One workflow from diagnosis to execution, built for an AI-shaped world.
              </p>
            </div>

            <div className="space-y-4">
              <TagCluster className="justify-start">
                <ExperimentTag tone="paper" icon={<LabGlyph variant="pin" />} className="rotate-[2deg]">
                  Cite-share obsessed
                </ExperimentTag>
                <ExperimentTag tone="oxide" icon={<LabGlyph variant="orbit" />} className="-rotate-[3deg]">
                  Hook patterns
                </ExperimentTag>
                <ExperimentTag tone="ember" icon={<LabGlyph variant="wave" />} className="rotate-[1deg]">
                  Platform-native
                </ExperimentTag>
              </TagCluster>

              <div className="deck-card relative overflow-hidden rounded-3xl p-5">
                <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[0.2px]" />
                <div className="absolute -right-8 -bottom-10 h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[0.2px]" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">The short version</p>
                <div className="mt-4 grid gap-2 text-sm text-[color:var(--paper)]">
                  <p className="flex items-center gap-2">
                    <Radar className="h-4 w-4 text-[color:var(--oxide)]" /> What is live right now
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[color:var(--signal)]" /> How we fill the GEO + creator gap
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[color:var(--paper)] opacity-80" /> What we are building next
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-[color:var(--signal)]" />, label: 'Today', value: 'GEO + Vibe Marketing' },
                  { icon: <BarChart3 className="h-4 w-4 text-[color:var(--oxide)]" />, label: 'Tomorrow', value: 'Vision Navigator' },
                  { icon: <Bot className="h-4 w-4 text-[color:var(--ember)]" />, label: 'Later', value: 'Agents + Trust' },
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
          title="What’s Live Right Now"
          subtitle="Two engines are live today, and together they make GeoCompanion the only product closing the workflow gap between GEO and creator-style execution."
        >
          <div className="relative grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <div className="pointer-events-none absolute -right-2 -top-6 hidden lg:block">
              <AnnotationTag tone="paper" icon={<LabGlyph variant="pin" />}>
                This is the working product.
              </AnnotationTag>
            </div>

            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">Left side: Inputs and processing</p>
              <div className="mt-4 space-y-3">
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute -right-6 -top-5 rotate-[6deg]">
                    <ExperimentTag tone="oxide" icon={<LabGlyph variant="orbit" />}>
                      Engine A
                    </ExperimentTag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-[color:var(--signal)]" aria-hidden="true" />
                    <p className="font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">GEO Audit Engine</p>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                    <li>- Input: website URL plus optional competitors</li>
                    <li>- Processing: GEO score, EEAT, ranking of deployable fixes</li>
                    <li>- Speed: initial output in about 15 seconds</li>
                  </ul>
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute -left-6 -top-5 -rotate-[6deg]">
                    <ExperimentTag tone="signal" icon={<LabGlyph variant="wave" />}>
                      Engine B
                    </ExperimentTag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[color:var(--oxide)]" aria-hidden="true" />
                    <p className="font-['Fraunces_Variable'] text-xl font-semibold text-[color:var(--paper)]">Vibe Marketing Engine</p>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                    <li>- Input: brand page or creator profile</li>
                    <li>- Processing: platform and voice detection, hook-based campaign generation</li>
                    <li>- Output format: 30/60/90-day multi-platform content system</li>
                  </ul>
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(77,140,106,0.18),rgba(10,12,18,0.52))] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">Fusion layer</p>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--paper)]">
                    GeoCompanion combines both engines into one prioritized execution backlog.
                  </p>
                </div>
              </div>
            </article>

            <article className="deck-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Right side: What users receive</p>
              <div className="mt-4 grid gap-3">
                {[
                  { source: 'From GEO Audit', title: 'Visibility Package', bullets: ['GEO scorecard + EEAT breakdown', 'Citation-share competitor view', 'Schema + CTA rewrite suggestions'] },
                  { source: 'From Vibe Engine', title: 'Content Package', bullets: ['9 hook-pattern campaign planning', 'Platform-native formatting', 'Voice-consistent generation'] },
                  { source: 'Combined Output', title: 'Action Package', bullets: ['One prioritized backlog to execute now', 'Clear ownership across marketing workflows', 'Built for both brands and creators'] },
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
            </article>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="deck-card rounded-3xl p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">The market gap</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                GEO tools measure visibility but do not create content. Content tools generate posts but do not optimize AI citation share. GeoCompanion is the product that connects both.
              </p>
            </article>

            <article className="deck-card rounded-3xl p-5">
              <div className="flex items-center gap-2">
                <PenTool className="h-4 w-4 text-[color:var(--signal)]" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">What is a hook?</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                A hook is the first framing move that earns attention. It creates curiosity or tension fast enough for a normal person’s content to feel more like a creator post and less like generic AI copy.
              </p>
            </article>

            <article className="deck-card relative rounded-3xl p-5">
              <div className="absolute -right-6 -top-5 rotate-[7deg]">
                <ExperimentTag tone="ember" icon={<LabGlyph variant="bracket" />}>
                  sample
                </ExperimentTag>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ember)]">Contrast hook example</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper-dim)]">
                Plain line: “GeoCompanion helps teams write better marketing content.”
              </p>
              <p className="mt-2 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(217,139,90,0.18),rgba(10,12,18,0.52))] p-3 text-sm leading-relaxed text-[color:var(--paper)]">
                “I hated AI-written marketing material until I found GeoCompanion.”
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[color:var(--paper-dim)]">
                That works because contrast creates tension and sounds closer to TikTok-style creator language than brand copy.
              </p>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
              The combination is what matters: <span className="font-semibold text-[color:var(--paper)]">GEO tells you what AI search needs.</span>{' '}
              <span className="font-semibold text-[color:var(--paper)]">Vibe Marketing produces it in a way normal people can actually use.</span>
            </p>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-3"
          index={3}
          title="Why We’re Different"
          subtitle="Others either diagnose or create. GeoCompanion is the only product here that closes the GEO + creator execution gap in one workflow."
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
                    <td className="font-medium text-[color:var(--paper)]">{row.category}</td>
                    <td>{row.brightedge}</td>
                    <td>{row.evertune}</td>
                    <td>{row.athena}</td>
                    <td>{row.surfer}</td>
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
              'GEO + content execution in one product.',
              'Hook-based creator-style writing system, not generic AI copy.',
              'The workflow today becomes the intelligence product tomorrow.',
            ].map((gap, idx) => (
              <div key={gap} className="deck-card relative rounded-3xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">Gap {idx + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--paper)]">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
              Others either diagnose or create. We do both, and connect the loop.
            </p>
          </div>
        </SlideShell>

        <SlideShell
          id="slide-4"
          index={4}
          title="What We’re Building Next"
          subtitle="Start with diagnosis and execution. Expand into intelligence tomorrow, then agents and verified trust later."
        >
          <div className="deck-card relative rounded-3xl p-6">
            <div className="absolute -right-8 -top-6 rotate-[8deg]">
              <ExperimentTag tone="paper" icon={<LabGlyph variant="orbit" />}>
                Roadmap logic
              </ExperimentTag>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--signal)]">Why today’s product matters tomorrow</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="relative rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(77,140,106,0.18),rgba(10,12,18,0.52))] p-5">
                <p className="font-['Fraunces_Variable'] text-2xl leading-[1.2] text-[color:var(--paper)]">
                  Every GEO audit tells us what AI engines are citing and why. Every campaign tells us which content
                  patterns drive real results by platform and industry. That outcome data is the training signal for
                  the intelligence layer we build next.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-[color:var(--paper)]">
                  Vision Navigator is the strategic center of this roadmap: a system that helps companies answer whether
                  they are running in the right direction before they spend more money scaling execution. The marketplace
                  matters later, but the intelligence layer is the category-defining product.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--oxide)]">Build path</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  phase: 'Today',
                  ships: 'GEO Audit + Vibe Marketing',
                  target: 'Own the diagnosis-to-execution workflow and make the product useful immediately.',
                  icon: <Rocket className="h-4 w-4 text-[color:var(--signal)]" aria-hidden="true" />,
                },
                {
                  phase: 'Tomorrow',
                  ships: 'Vision Navigator',
                  target: 'Turn repeated usage into strategic guidance on where the market is going and what to build next.',
                  icon: <Server className="h-4 w-4 text-[color:var(--oxide)]" aria-hidden="true" />,
                },
                {
                  phase: 'Later',
                  ships: 'Agent Marketplace + Trust',
                  target: 'Open the intelligence loop to agent/API traffic and verifiable performance history.',
                  icon: <Activity className="h-4 w-4 text-[color:var(--ember)]" aria-hidden="true" />,
                },
              ].map((item) => (
                <article key={item.phase} className="relative rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--paper-dim)]">{item.phase}</span>
                    {item.icon}
                  </div>
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
