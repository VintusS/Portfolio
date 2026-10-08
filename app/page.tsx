"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { githubUrl, linkedinUrl } from "@/lib/site";

const projects = [
  {
    id: "daily-swift",
    number: "01",
    label: "Active open-source project",
    title: "Daily Swift",
    headline: "Turn your own material into Swift practice.",
    description:
      "An open-source, local-first learning app with PDF, Markdown, and text imports, source-citation validation, versioned history, and automated accessibility and performance checks.",
    tags: ["Swift 6", "SwiftUI", "SwiftData", "PDFKit", "Swift Testing"],
    links: [{ label: "View on GitHub", href: "https://github.com/VintusS/Daily-Swift" }],
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
    label: "Shipped iOS app · App Store",
    title: "FitKate",
    headline: "Keep every coaching session moving.",
    description:
      "An offline-first coaching app with a session engine for HIIT, EMOM, circuits, rotations, participant assignments, and audio cues. Portable backups are encrypted, and the core session logic is covered by tests.",
    tags: ["SwiftUI", "SwiftData", "AVFoundation", "CryptoKit", "XCTest"],
    links: [
      { label: "Open in the App Store", href: "https://apps.apple.com/md/app/fit-kate/id6778141028" },
      { label: "View on GitHub", href: "https://github.com/VintusS/Fit-Kate" },
    ],
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
    label: "macOS/iOS prototyping tool",
    title: "SwiftBuilder",
    headline: "Build the interface, then run the prototype.",
    description:
      "A visual editor and iOS preview runner for multi-screen prototypes. It exports SwiftUI and automates build, installation, data transfer, and launch in the Simulator or on a connected device.",
    tags: ["Swift", "SwiftUI", "AppKit", "22 components", "Xcode CLI"],
    links: [{ label: "View on GitHub", href: "https://github.com/VintusS/SwiftBuilder" }],
    tone: "green",
    screenshots: [
      { src: "/projects/swiftbuilder/01.png", alt: "SwiftBuilder macOS workspace", label: "macOS workspace", kind: "desktop" },
      { src: "/projects/swiftbuilder/02.png", alt: "SwiftBuilder iPhone preview", label: "iPhone preview", kind: "phone", builtInIsland: true },
    ],
  },
  {
    id: "inpenso",
    number: "04",
    label: "Shipped iOS app · App Store",
    title: "Inpenso",
    headline: "Keep budgets close without giving up privacy.",
    description:
      "A shipped, on-device finance app for tracking budgets from the app, Home Screen widgets, and Siri shortcuts.",
    tags: ["iOS", "On-device", "Budgets", "WidgetKit", "Siri Shortcuts"],
    links: [{ label: "Open in the App Store", href: "https://apps.apple.com/md/app/inpenso/id6756283754" }],
    tone: "violet",
    screenshots: [
      { src: "/projects/inpenso/01.png", alt: "Inpenso budget overview", label: "Budget overview", kind: "phone" },
      { src: "/projects/inpenso/02.png", alt: "Inpenso transaction screen", label: "Transactions", kind: "phone" },
      { src: "/projects/inpenso/03.png", alt: "Inpenso widgets", label: "Widgets", kind: "phone" },
    ],
  },
];

const experience = [
  {
    company: "Moldcell",
    role: "iOS Developer",
    period: "Jun 2026 to present",
    details: [
      "Own the mobile eKYC implementation as the sole iOS developer.",
      "Collaborate on Apple Pay payment flows and improve navigation and animations.",
      "Reduced app launch time by approximately 80% and instrumented key user actions with Firebase Analytics.",
    ],
  },
  {
    company: "maib",
    role: "iOS Developer",
    period: "Dec 2025 to May 2026",
    details: [
      "Led the in-app feedback integration.",
      "Moved the customer AI chat from WebView to native UIKit and rewrote its networking layer.",
    ],
  },
  {
    company: "Extole",
    role: "Software Engineer",
    period: "Sep 2023 to May 2026",
    details: [
      "Contributed to Go Extole and the iOS SDK, including mobile referral integrations and production fixes.",
      "Improved CI/CD workflows and mentored student interns.",
    ],
  },
];

const skillGroups = [
  {
    title: "iOS development",
    skills: ["Swift", "SwiftUI", "UIKit", "Swift concurrency", "SwiftData", "AppKit", "AVFoundation", "PassKit", "WidgetKit", "CryptoKit"],
  },
  {
    title: "Architecture and quality",
    skills: ["MVVM", "Offline-first persistence", "REST APIs", "XCTest", "Swift Testing", "Accessibility", "Reusable UI components"],
  },
  {
    title: "Firebase and delivery",
    skills: ["Firebase Analytics", "Performance Monitoring", "Remote Config", "CI/CD", "App Store Connect", "Xcode command-line tools"],
  },
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

function AnimatedStat({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) {
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
      <strong aria-label={`${prefix}${value}${suffix}`}>{prefix}{displayValue}{suffix}</strong>
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
        <a className="header-cta" href="/Dragomir-Mindrescu-Resume.pdf" download>
          Download résumé <span>↓</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-copy">
            <p className="eyebrow hero-enter delay-1"><span /> Senior iOS Engineer · Chișinău</p>
            <h1 className="hero-enter delay-2">I build reliable products for <em>Apple platforms.</em></h1>
            <p className="hero-summary hero-enter delay-3">
              I ship production iOS apps in SwiftUI and UIKit, from onboarding and payments to offline-first tools. I&apos;m open to remote roles and relocation.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#work">View projects <span>↓</span></a>
              <a className="text-link" href="/Dragomir-Mindrescu-Resume.pdf" download>Download résumé <span>↓</span></a>
            </div>
          </div>

          <div className="hero-product hero-enter delay-3">
            <div className="hero-device-shadow" />
            <div className="hero-device">
              <HeroScreenshot revision={screenshotRevision} />
            </div>
          </div>

          <div className="hero-foot hero-enter delay-4">
            <p>Currently building at <strong>Moldcell</strong></p>
            <div><span>Previously</span><strong>maib</strong><strong>Extole</strong></div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading" data-reveal>
            <p className="eyebrow"><span /> Selected work</p>
            <h2>Products I&apos;ve shipped and tools I&apos;m building.</h2>
            <p>Open-source work, App Store releases, and a prototyping tool built around practical iOS problems.</p>
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
                  <div className="project-links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                      <a className="project-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                        {link.label} <span>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className={`project-visual tone-${project.tone}`}>
                  <ProjectScreenshotGallery screenshots={project.screenshots} title={project.title} revision={screenshotRevision} />
                </div>
              </article>
            ))}
          </div>

          <div className="more-work" data-reveal>
            <div><p className="eyebrow"><span /> More work</p><h3>A few smaller<br />projects.</h3></div>
            <a href="https://github.com/VintusS/Poschore" target="_blank" rel="noreferrer">
              <span>Poschore</span><small>Motion sensing · Open source</small><b>↗</b>
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
            <AnimatedStat value={80} prefix="~" suffix="%" label="faster app launch at Moldcell" />
            <AnimatedStat value={2} label="independently shipped App Store apps" />
            <AnimatedStat value={22} label="components built for SwiftBuilder" />
            <AnimatedStat value={3} label="companies in production experience" />
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading compact" data-reveal>
            <p className="eyebrow"><span /> Experience</p>
            <h2>Production iOS experience.</h2>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item" data-reveal key={`${item.company}-${item.role}`}>
                <span className="timeline-index">0{index + 1}</span>
                <div><h3>{item.company}</h3><p>{item.role}</p></div>
                <ul className="timeline-details">
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
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
              <h2>Product-minded.<br />Careful with the <em>details.</em></h2>
              <p>
                I&apos;m Dragomir, a Senior iOS Engineer based in Chișinău. I work across SwiftUI and UIKit, with a focus on architecture, testing, accessibility, and the production details that keep an app dependable.
              </p>
            </div>
          </div>
          <div className="skills-groups" data-reveal aria-label="Technical skills">
            {skillGroups.map((group) => (
              <section className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </section>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orb orb-left" /><div className="contact-orb orb-right" />
          <div className="contact-inner" data-reveal>
            <p className="eyebrow light"><span /> Get in touch</p>
            <h2>Looking for a <em>Senior iOS Engineer?</em></h2>
            <p>I&apos;m open to remote roles and relocation opportunities where I can own meaningful iOS work and help ship a dependable product.</p>
            <a className="contact-email" href="mailto:dmindrescu03@gmail.com">dmindrescu03@gmail.com <span>↗</span></a>
            <div className="contact-links">
              <a href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="/Dragomir-Mindrescu-Resume.pdf" download>Download résumé ↓</a>
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
