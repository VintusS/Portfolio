"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "daily-swift",
    number: "01",
    label: "Active product · iPhone",
    title: "Daily Swift",
    headline: "Learn Swift from your own material.",
    description:
      "Daily Swift turns private source material into cited lessons and quizzes. The app keeps generation and progress on the user's iPhone instead of sending their curriculum to an external model.",
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
    headline: "Run a coaching session without fighting the app.",
    description:
      "FitKate works offline and covers the full session, from workout setup to timed exercise playback. It includes multilingual audio cues, encrypted backups, and a large timer that stays readable across the room.",
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
    headline: "Design an interface and run the SwiftUI prototype.",
    description:
      "SwiftBuilder is a macOS editor for assembling multi-screen interfaces. It exports SwiftUI and launches prototypes in the Simulator or on a connected iPhone through its companion app.",
    tags: ["SwiftUI", "AppKit", "Codable", "simctl", "devicectl"],
    github: "https://github.com/VintusS/SwiftBuilder",
    tone: "green",
    screenshots: [
      { src: "/projects/swiftbuilder/01.png", alt: "SwiftBuilder macOS workspace", label: "macOS workspace", kind: "desktop" },
      { src: "/projects/swiftbuilder/02.png", alt: "SwiftBuilder iPhone preview", label: "iPhone preview", kind: "phone", builtInIsland: true },
    ],
  },
  {
    id: "poschore",
    number: "04",
    label: "Active product · Sensors",
    title: "Poschore",
    headline: "A quiet reminder when posture starts to slip.",
    description:
      "Poschore calibrates against the user's natural upright position, then reads motion data from compatible Apple headphones. It notices sustained head and neck movement while keeping that data private.",
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
    period: "Jun 2026 to present",
    detail: "I work on customer account flows, telecom services, and Apple Wallet features.",
  },
  {
    company: "maib",
    role: "iOS Developer",
    period: "Dec 2025 to May 2026",
    detail: "I improved in-app feedback and customer flows in maibank.",
  },
  {
    company: "Extole",
    role: "Software Engineer",
    period: "May 2025 to May 2026",
    detail: "I built mobile referral products and reusable modules for delivery across platforms.",
  },
  {
    company: "Extole",
    role: "Frontend Technical Support Engineer",
    period: "Sep 2023 to May 2025",
    detail: "I supported enterprise integrations across JavaScript sites and mobile SDKs.",
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
  builtInIsland?: boolean;
};

function screenshotUrl(src: string, revision: number) {
  return revision ? `${src}?v=${revision}` : src;
}

function ScreenshotPlaceholder({ project, label, filename }: { project: string; label: string; filename: string }) {
  return (
    <div className="screenshot-placeholder" aria-hidden="true">
      <span>App screenshot</span>
      <strong>{project}</strong>
      <p>{label}</p>
      <code>{filename}</code>
      <small>Place the PNG at the path above</small>
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
      className={`project-screenshot-gallery is-ready count-${screenshots.length}`}
      aria-label={`${title} screenshots`}
    >
      {screenshots.map((screenshot) => (
        <figure
          className={`screenshot-frame screenshot-${screenshot.kind} ${screenshot.builtInIsland ? "has-built-in-island" : ""} ${loaded.includes(screenshot.src) ? "has-image" : ""}`}
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
            <h1 className="hero-enter delay-2">I build iOS apps for the whole <em>Apple ecosystem.</em></h1>
            <p className="hero-summary hero-enter delay-3">
              My work spans iPhone's, iPad's and Mac's on-device intelligence. I use each part of the platform when it makes the product better.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#work">See my work <span>↓</span></a>
              <a className="text-link" href="mailto:dmindrescu03@gmail.com">Get in touch <span>↗</span></a>
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
            <h2>Apps and tools I&apos;ve built.</h2>
            <p>These projects began with problems I wanted to solve: learning Swift from private material, running workouts offline, prototyping native interfaces, and improving posture with AirPods.</p>
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
            <div><p className="eyebrow"><span /> More work</p><h3>A few smaller<br />projects.</h3></div>
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
            <h2>The numbers so far.</h2>
          </div>
          <div className="stats-grid">
            <AnimatedStat value={23} prefix="'" label="working in software since" />
            <AnimatedStat value={5} label="products shipped to the App Store" />
            <AnimatedStat value={3} label="hackathon awards and recognitions" />
            <AnimatedStat value={33} label="public GitHub repositories" />
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading compact" data-reveal>
            <p className="eyebrow"><span /> Experience</p>
            <h2>How I got here.</h2>
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
                src="/dragomir-mindrescu.jpg"
                alt="Dragomir Mîndrescu"
                fill
                sizes="(max-width: 860px) calc(100vw - 40px), 42vw"
              />
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span /> About</p>
              <h2>The parts users<br />do not see still <em>matter.</em></h2>
              <p>
                I&apos;m Dragomir, an iOS engineer in Chișinău. I spend a lot of time on the work behind the interface: state that survives edge cases, failures that explain themselves, accessible controls, and code the next engineer can still follow.
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
            <p className="eyebrow light"><span /> Get in touch</p>
            <h2>Need an <em>iOS engineer?</em></h2>
            <p>I&apos;m interested in iOS work where the product problem is real and the details matter. If that sounds like your team, send me an email.</p>
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
        <div><span className="brand-mark">DM</span><p>Built in Chișinău.</p></div>
        <p>© 2026 Dragomir Mîndrescu</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
