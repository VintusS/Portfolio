"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "daily-swift",
    number: "01",
    label: "Active product · iPhone",
    title: "Daily Swift",
    headline: "Learning that can show its work.",
    description:
      "A local-first iOS learning companion that turns private source material into cited lessons and practice, without handing curriculum, correctness, or user privacy over to a model.",
    tags: ["Swift 6", "SwiftUI", "SwiftData", "Foundation Models", "PDFKit"],
    github: "https://github.com/VintusS/Daily-Swift",
    tone: "sky",
    screenshots: [
      { src: "/projects/daily-swift/01.png", alt: "Daily Swift Today screen", label: "Today screen", kind: "phone" },
      { src: "/projects/daily-swift/02.png", alt: "Daily Swift lesson screen", label: "Lesson screen", kind: "phone" },
      { src: "/projects/daily-swift/03.png", alt: "Daily Swift source citation screen", label: "Source citations", kind: "phone" },
    ],
  },
  {
    id: "fitkate",
    number: "02",
    label: "Shipped product · App Store",
    title: "FitKate",
    headline: "A coach’s entire session, in one calm flow.",
    description:
      "An offline-first coaching platform with a custom workout compiler, runtime session engine, multilingual audio cues, encrypted backups, and an accessible timer designed to be read across a room.",
    tags: ["SwiftUI", "SwiftData", "AVFoundation", "CryptoKit", "XCTest"],
    github: "https://github.com/VintusS/Fit-Kate",
    tone: "rose",
    screenshots: [
      { src: "/projects/fitkate/01.png", alt: "FitKate dashboard", label: "Dashboard", kind: "phone" },
      { src: "/projects/fitkate/02.png", alt: "FitKate workout editor", label: "Workout editor", kind: "phone" },
      { src: "/projects/fitkate/03.png", alt: "FitKate live session timer", label: "Live timer", kind: "phone" },
    ],
  },
  {
    id: "swiftbuilder",
    number: "03",
    label: "Bachelor thesis · macOS + iOS",
    title: "SwiftBuilder",
    headline: "From interface idea to native prototype.",
    description:
      "A visual macOS builder for composing multi-screen interfaces, exporting SwiftUI, and launching prototypes on simulators or connected iPhones through a companion runner.",
    tags: ["SwiftUI", "AppKit", "Codable", "simctl", "devicectl"],
    github: "https://github.com/VintusS/SwiftBuilder",
    tone: "green",
    screenshots: [
      { src: "/projects/swiftbuilder/01.png", alt: "SwiftBuilder macOS workspace", label: "macOS workspace", kind: "desktop" },
      { src: "/projects/swiftbuilder/02.png", alt: "SwiftBuilder iPhone preview", label: "iPhone preview", kind: "phone" },
    ],
  },
  {
    id: "poschore",
    number: "04",
    label: "Active product · Sensors",
    title: "Poschore",
    headline: "A gentler signal for better posture.",
    description:
      "A private posture companion that calibrates to the user’s natural upright position and uses compatible Apple headphone motion data to notice sustained head and neck deviation.",
    tags: ["Core Motion", "SwiftUI", "SwiftData", "AirPods", "Privacy"],
    github: "https://github.com/VintusS/Poschore",
    tone: "blue",
    screenshots: [
      { src: "/projects/poschore/01.png", alt: "Poschore calibration screen", label: "Calibration", kind: "phone" },
      { src: "/projects/poschore/02.png", alt: "Poschore active tracking screen", label: "Active tracking", kind: "phone" },
      { src: "/projects/poschore/03.png", alt: "Poschore aligned state", label: "Aligned state", kind: "phone" },
    ],
  },
];

const experience = [
  {
    company: "Moldcell",
    role: "Middle iOS Developer",
    period: "Jun 2026 — Present",
    detail: "Customer-facing telecom journeys, account experiences, and Apple Wallet functionality.",
  },
  {
    company: "maib",
    role: "iOS Developer",
    period: "Dec 2025 — May 2026",
    detail: "Product feedback flows and customer-experience improvements for maibank.",
  },
  {
    company: "Extole",
    role: "Software Engineer",
    period: "May 2025 — May 2026",
    detail: "Mobile referral products, reusable modules, and cross-platform delivery.",
  },
  {
    company: "Extole",
    role: "Frontend Technical Support Engineer",
    period: "Sep 2023 — May 2025",
    detail: "Enterprise integrations across JavaScript, web experiences, and mobile SDKs.",
  },
];

const skills = [
  "SwiftData",
  "Foundation Models",
  "PDFKit",
  "Core Motion",
  "CMHeadphoneMotionManager",
  "Background Tasks",
  "AVFoundation",
  "CryptoKit",
  "PassKit",
  "WidgetKit",
  "AppKit",
  "Foundation",
  "Codable",
  "Swift Concurrency",
  "Swift Testing",
  "XCTest / XCUITest",
  "Swift Package Manager",
  "SwiftLint",
  "simctl",
  "devicectl",
  "Xcode Command Line Tools",
  "JSON Persistence",
];

type ProjectScreenshot = {
  src: string;
  alt: string;
  label: string;
  kind: string;
};

function screenshotUrl(src: string, revision: number) {
  return revision ? `${src}?v=${revision}` : src;
}

function ScreenshotPlaceholder({ project, label, filename }: { project: string; label: string; filename: string }) {
  return (
    <div className="screenshot-placeholder" aria-hidden="true">
      <span>Actual app screenshot</span>
      <strong>{project}</strong>
      <p>{label}</p>
      <code>{filename}</code>
      <small>Replace this placeholder with the PNG above</small>
    </div>
  );
}

function ProjectScreenshotGallery({ screenshots, title, revision }: { screenshots: ProjectScreenshot[]; title: string; revision: number }) {
  const [loaded, setLoaded] = useState<string[]>([]);

  const markLoaded = (src: string) => {
    setLoaded((current) => current.includes(src) ? current : [...current, src]);
  };

  return (
    <div
      className={`project-screenshot-gallery is-ready count-${screenshots.length} ${title === "Daily Swift" ? "daily-swift-gallery" : ""}`}
      aria-label={`${title} screenshots`}
    >
      {screenshots.map((screenshot) => (
        <figure
          className={`screenshot-frame screenshot-${screenshot.kind} ${loaded.includes(screenshot.src) ? "has-image" : ""}`}
          key={screenshot.src}
        >
          <ScreenshotPlaceholder
            project={title}
            label={screenshot.label}
            filename={screenshot.src.replace("/projects/", "")}
          />
          <Image
            className="screenshot-image"
            src={screenshotUrl(screenshot.src, revision)}
            alt={screenshot.alt}
            fill
            sizes={screenshot.kind === "desktop" ? "(max-width: 600px) 80vw, 40vw" : "(max-width: 600px) 38vw, 16vw"}
            unoptimized
            loading="lazy"
            onLoad={() => markLoaded(screenshot.src)}
          />
        </figure>
      ))}
    </div>
  );
}

function HeroScreenshot({ revision }: { revision: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`hero-screenshot ${loaded ? "has-image" : ""}`}>
      <ScreenshotPlaceholder project="Daily Swift" label="Hero / Today screen" filename="daily-swift/hero.png" />
      <Image
        className="screenshot-image"
        src={screenshotUrl("/projects/daily-swift/hero.png", revision)}
        alt="Daily Swift hero screen"
        fill
        sizes="310px"
        unoptimized
        priority
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function AnimatedStat({ value, label, prefix = "" }: { value: number; label: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const stat = statRef.current;
    if (!stat) return;

    const revealValue = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(value);
        return;
      }

      const duration = 1050;
      let frame = 0;
      let startTime: number | undefined;

      const tick = (timestamp: number) => {
        if (startTime === undefined) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(value * eased));

        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frame);
    };

    let cancelAnimation: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cancelAnimation = revealValue();
        observer.disconnect();
      }
    }, { threshold: 0.45 });

    observer.observe(stat);
    return () => {
      observer.disconnect();
      cancelAnimation?.();
    };
  }, [value]);

  return (
    <div ref={statRef} data-reveal>
      <strong aria-label={`${prefix}${value}`}>{prefix}{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [screenshotRevision, setScreenshotRevision] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const refreshScreenshots = () => setScreenshotRevision(Date.now());
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refreshScreenshots();
    };

    refreshScreenshots();
    window.addEventListener("focus", refreshScreenshots);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.removeEventListener("focus", refreshScreenshots);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const page = document.documentElement;
      const available = page.scrollHeight - page.clientHeight;
      setScrolled(window.scrollY > 24);
      setProgress(available > 0 ? window.scrollY / available : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Dragomir Mîndrescu, home">
          <span className="brand-mark">DM</span>
          <span className="brand-name">Dragomir Mîndrescu</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="/Dragomir-Mindrescu-CV.pdf" download>
          Download CV <span>↓</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-copy">
            <p className="eyebrow hero-enter delay-1"><span /> iOS engineer · Chișinău</p>
            <h1 className="hero-enter delay-2">Extending what’s possible across <em>Apple platforms.</em></h1>
            <p className="hero-summary hero-enter delay-3">
              I build native experiences that connect the strengths of iPhone, Mac, AirPods, Wallet, widgets, voice, and on-device intelligence, turning platform capabilities into products people can rely on.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#work">Explore selected work <span>↓</span></a>
              <a className="text-link" href="mailto:dmindrescu03@gmail.com">Let’s work together <span>↗</span></a>
            </div>
          </div>

          <div className="hero-product hero-enter delay-3">
            <div className="hero-device-shadow" />
            <div className="hero-device">
              <HeroScreenshot revision={screenshotRevision} />
            </div>
          </div>

          <div className="hero-foot hero-enter delay-4">
            <p>Currently building at <strong>Moldcell Technology</strong></p>
            <div><span>Previously</span><strong>maib</strong><strong>Extole</strong></div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading" data-reveal>
            <p className="eyebrow"><span /> Selected work</p>
            <h2>Products with a point of view.</h2>
            <p>Independent products, experiments, and tools built around privacy, accessibility, and useful complexity.</p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-card ${index % 2 ? "is-reversed" : ""}`} key={project.id} data-reveal>
                <div className="project-copy">
                  <div className="project-meta"><span>{project.number}</span><p>{project.label}</p></div>
                  <p className="project-title">{project.title}</p>
                  <h3>{project.headline}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                    View project on GitHub <span>↗</span>
                  </a>
                </div>
                <div className={`project-visual tone-${project.tone}`}>
                  <ProjectScreenshotGallery screenshots={project.screenshots} title={project.title} revision={screenshotRevision} />
                </div>
              </article>
            ))}
          </div>

          <div className="more-work" data-reveal>
            <div><p className="eyebrow"><span /> More work</p><h3>Small products.<br />Real lessons.</h3></div>
            <a href="https://github.com/VintusS/Inpenso" target="_blank" rel="noreferrer">
              <span>Inpenso</span><small>Personal finance · App Store</small><b>↗</b>
            </a>
            <a href="https://github.com/VintusS/SilverLink" target="_blank" rel="noreferrer">
              <span>SilverLink</span><small>Accessibility · Hackathon winner</small><b>↗</b>
            </a>
          </div>
        </section>

        <section className="stats-section" aria-label="Career statistics">
          <div className="stat-intro" data-reveal>
            <p className="eyebrow light"><span /> In numbers</p>
            <h2>Evidence over adjectives.</h2>
          </div>
          <div className="stats-grid">
            <AnimatedStat value={23} prefix="’" label="building software professionally since" />
            <AnimatedStat value={5} label="products shipped to the App Store" />
            <AnimatedStat value={3} label="hackathon recognitions" />
            <AnimatedStat value={33} label="Open-source GitHub repositories" />
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading compact" data-reveal>
            <p className="eyebrow"><span /> Experience</p>
            <h2>From support to product ownership.</h2>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item" data-reveal key={`${item.company}-${item.role}`}>
                <span className="timeline-index">0{index + 1}</span>
                <div><h3>{item.company}</h3><p>{item.role}</p></div>
                <p className="timeline-detail">{item.detail}</p>
                <time>{item.period}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-card" data-reveal>
            <div className="about-portrait">
              <Image
                src="/dragomir-mindrescu.png"
                alt="Dragomir Mîndrescu"
                fill
                sizes="(max-width: 860px) calc(100vw - 40px), 42vw"
              />
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span /> About</p>
              <h2>Product-minded.<br />Detail-obsessed.<br />Privacy-conscious.<br /><em>User-first.</em></h2>
              <p>
                I’m Dragomir, an iOS engineer based in Chișinău. I care about the hidden work behind simple interfaces: reliable state, honest failure modes, accessible interaction, and architecture that stays understandable after launch day.
              </p>
            </div>
          </div>
          <ul className="skills-cloud" data-reveal aria-label="Technical skills">
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orb orb-left" /><div className="contact-orb orb-right" />
          <div className="contact-inner" data-reveal>
            <p className="eyebrow light"><span /> Start a conversation</p>
            <h2>Have a product that should feel <em>simpler?</em></h2>
            <p>I’m always interested in thoughtful iOS work, ambitious product problems, and people who care about the details.</p>
            <a className="contact-email" href="mailto:dmindrescu03@gmail.com">dmindrescu03@gmail.com <span>↗</span></a>
            <div className="contact-links">
              <a href="https://github.com/VintusS" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/%EF%A3%BF-dragomir-m%C3%AEndrescu-34236227b/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="/Dragomir-Mindrescu-CV.pdf" download>Download CV ↓</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><span className="brand-mark">DM</span><p>Designed and built with care in Chișinău.</p></div>
        <p>© 2026 Dragomir Mîndrescu</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
