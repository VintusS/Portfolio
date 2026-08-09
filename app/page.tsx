"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    id: "daily-swift",
    number: "01",
    label: "Active product · iPhone",
    title: "Daily Swift",
    headline: "Learning that can show its work.",
    description:
      "A local-first iOS learning companion that turns private source material into cited lessons and practice—without handing curriculum, correctness, or user privacy over to a model.",
    tags: ["Swift 6", "SwiftUI", "SwiftData", "Foundation Models", "PDFKit"],
    github: "https://github.com/VintusS/Daily-Swift",
    tone: "violet",
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
    tone: "orange",
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
    tone: "blue",
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
    tone: "mint",
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
    period: "Jan 2024 — May 2025",
    detail: "Enterprise integrations across JavaScript, web experiences, and mobile SDKs.",
  },
];

const skills = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "SwiftData",
  "AppKit",
  "AVFoundation",
  "Core Motion",
  "PassKit",
  "WidgetKit",
  "Accessibility",
  "XCTest",
  "Product Engineering",
];

function ProjectVisual({ id }: { id: string }) {
  if (id === "daily-swift") {
    return (
      <div className="visual-shell daily-visual" aria-hidden="true">
        <div className="phone-frame daily-phone">
          <div className="phone-island" />
          <div className="app-topline"><span>9:41</span><span>•••</span></div>
          <p className="mini-kicker">TODAY</p>
          <h3>Good afternoon, Dragomir.</h3>
          <div className="lesson-card">
            <div className="lesson-icon">S</div>
            <div><span>20 min lesson</span><strong>Concurrency without the mystery</strong></div>
          </div>
          <div className="progress-row"><span>Weekly rhythm</span><strong>4 / 5</strong></div>
          <div className="progress-track"><i /></div>
          <div className="daily-tabs"><span>Today</span><span>Challenges</span><span>Library</span></div>
        </div>
        <div className="citation-float">
          <span className="status-dot" />
          <div><small>Source verified</small><strong>3 citations resolved</strong></div>
        </div>
      </div>
    );
  }

  if (id === "fitkate") {
    return (
      <div className="visual-shell fit-visual" aria-hidden="true">
        <div className="timer-orbit orbit-one" />
        <div className="timer-orbit orbit-two" />
        <div className="fit-watch">
          <span>ROUND 04 · WORK</span>
          <strong>00:42</strong>
          <div className="timer-progress"><i /></div>
          <p>Station rotation · 6 athletes</p>
        </div>
        <div className="fit-chip chip-top">HIIT</div>
        <div className="fit-chip chip-bottom">Voice cues · RO</div>
      </div>
    );
  }

  if (id === "swiftbuilder") {
    return (
      <div className="visual-shell builder-visual" aria-hidden="true">
        <div className="builder-window">
          <div className="window-bar"><i /><i /><i /><span>SwiftBuilder</span></div>
          <div className="builder-body">
            <div className="builder-sidebar">
              <span>COMPONENTS</span>
              <b>Text</b><b>Button</b><b>Card</b><b>Image</b>
            </div>
            <div className="builder-canvas">
              <div className="canvas-phone">
                <small>Welcome</small>
                <strong>Move ideas<br />forward.</strong>
                <i />
              </div>
            </div>
            <div className="builder-inspector"><span>INSPECTOR</span><i /><i /><i /><i /></div>
          </div>
        </div>
        <div className="code-float"><span>SwiftUI</span><code>VStack {'{'} … {'}'}</code></div>
      </div>
    );
  }

  return (
    <div className="visual-shell posture-visual" aria-hidden="true">
      <div className="posture-halo halo-a" />
      <div className="posture-halo halo-b" />
      <div className="posture-card">
        <span className="airpods-pill">● AirPods connected</span>
        <div className="posture-ring"><i /><strong>Aligned</strong><small>12:48</small></div>
        <p>Head and neck alignment</p>
      </div>
      <div className="motion-float"><small>Live motion</small><span><i /><i /><i /><i /><i /></span></div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

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
            <p className="eyebrow hero-enter delay-1"><span /> iOS product engineer · Chișinău</p>
            <h1 className="hero-enter delay-2">Building calm software for <em>complex lives.</em></h1>
            <p className="hero-summary hero-enter delay-3">
              I turn complicated workflows into thoughtful Apple-platform products—from production telecom and banking experiences to ambitious local-first apps of my own.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#work">Explore selected work <span>↓</span></a>
              <a className="text-link" href="mailto:dmindrescu03@gmail.com">Let’s work together <span>↗</span></a>
            </div>
          </div>

          <div className="hero-product hero-enter delay-3" aria-hidden="true">
            <div className="hero-device-shadow" />
            <div className="hero-device">
              <div className="phone-island" />
              <div className="hero-device-top"><span>9:41</span><span>◖ ◗</span></div>
              <div className="hero-app-icon">D</div>
              <p>DAILY SWIFT</p>
              <h2>Today’s practice is ready.</h2>
              <div className="hero-lesson">
                <small>SWIFT CONCURRENCY</small>
                <strong>Actor isolation,<br />made practical.</strong>
                <span>Begin lesson →</span>
              </div>
              <div className="hero-streak"><i>7</i><span>day rhythm</span><b>•••••••</b></div>
            </div>
            <div className="floating-card floating-card-a"><span>✓</span><div><small>Local-first</small><strong>Your sources stay yours</strong></div></div>
            <div className="floating-card floating-card-b"><span>↗</span><div><small>Active build</small><strong>August 2026</strong></div></div>
          </div>

          <div className="hero-foot hero-enter delay-4">
            <p>Currently building at <strong>Moldcell</strong></p>
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
                  <ProjectVisual id={project.id} />
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
            <div data-reveal><strong>3<sup>+</sup></strong><span>years building software</span></div>
            <div data-reveal><strong>2</strong><span>products shipped to the App Store</span></div>
            <div data-reveal><strong>2</strong><span>hackathon recognitions</span></div>
            <div data-reveal><strong>33</strong><span>public GitHub repositories</span></div>
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
            <div className="about-monogram" aria-hidden="true"><span>D</span><i /></div>
            <div className="about-copy">
              <p className="eyebrow"><span /> About</p>
              <h2>Product-minded.<br />Detail-obsessed.<br /><em>User-first.</em></h2>
              <p>
                I’m Dragomir, an iOS engineer based in Chișinău. I care about the hidden work behind simple interfaces: reliable state, honest failure modes, accessible interaction, and architecture that stays understandable after launch day.
              </p>
              <p>
                I earned my Software Engineering degree from the Technical University of Moldova, where my bachelor thesis became SwiftBuilder—a native visual prototyping environment for iOS.
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
