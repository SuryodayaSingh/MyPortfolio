"use client";

import { useEffect, useState } from "react";
import ThreeBackground from "./ThreeBackground";
import TerminalCard from "./TerminalCard";

import {
  projects,
  frontendStack,
  backendStack,
  databaseStack,
  toolsStack,
  skills,
  interests,
} from "@/app/lib/data";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Mouse tilt for tech stack and interest cards.
    // Project cards have their own flip animation.
    const cards = document.querySelectorAll<HTMLElement>(
      ".tile.tilt, .interestCard.tilt"
    );

    const handlers: {
      element: HTMLElement;
      move: (event: MouseEvent) => void;
      leave: () => void;
    }[] = [];

    cards.forEach((card) => {
      const move = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
          rotateY(${x * 12}deg)
          rotateX(${-y * 12}deg)
        `;
      };

      const leave = () => {
        card.style.transform = "";
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);

      handlers.push({ element: card, move, leave });
    });

    return () => {
      handlers.forEach(({ element, move, leave }) => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <ThreeBackground />

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <a href="#top" className="logo" onClick={closeMenu}>
          Suryodaya Singh
        </a>

        <button
          type="button"
          className={`menuButton ${menuOpen ? "active" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navLinks ${menuOpen ? "navOpen" : ""}`}>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>

          <a href="#terminal" onClick={closeMenu}>
            Workspace
          </a>

          <a href="#stack" onClick={closeMenu}>
            Tech Stack
          </a>

          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>

          <a href="#interests" onClick={closeMenu}>
            Interests
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </nav>

      <main id="top">
        {/* ================= HERO ================= */}

        <section className="hero">
          <div className="heroContent">
            <div className="eyebrow">
              B.Tech IT · GGSIPU · New Delhi
            </div>

            <h1>
              Suryodaya Singh
              <span>builds full-stack web apps.</span>
            </h1>

            <p className="lead">
              B.Tech IT student at GGSIPU, New Delhi.
              I build MERN applications, practise DSA
              daily, and am exploring AI &amp; ML.
              Looking for a software development internship.
            </p>

            <div className="btns">
              <a className="btn primary" href="#work">
                See my projects
              </a>

              <a
                className="btn"
                href="mailto:surya945514@gmail.com"
              >
                Email me
              </a>
            </div>

            <div className="stats">
              <div>
                <b>2</b>
                <span>full-stack projects</span>
              </div>

              <div>
                <b>MERN</b>
                <span>primary stack</span>
              </div>

              <div>
                <b>2028</b>
                <span>B.Tech graduation</span>
              </div>

              <div>
                <b>Open</b>
                <span>to internships</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section id="work">
          <SectionHeader number="01" title="Projects" />

          <p className="sectionDescription">
            Click a project to explore the details.
          </p>

          <div className="projectsGrid">
            {projects.map((project) => (
              <ProjectFlipCard
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </section>

        {/* ================= DEVELOPER WORKSPACE ================= */}

        <section id="terminal" className="terminalSection">
          <SectionHeader
            number="02"
            title="Inside my workspace"
          />

          <p className="sectionDescription">
            A glimpse into my development workflow and technical mindset.
          </p>

          <div className="terminalShowcase">
            {/* LEFT: INTRODUCTION */}

            <div className="terminalIntro">
              <span className="eyebrow">
                DEVELOPER WORKSPACE
              </span>

              <h3>
                Building ideas
                <span> one line at a time.</span>
              </h3>

              <p>
                From full-stack applications to algorithmic
                problem-solving, I enjoy turning ideas into
                functional products and exploring new
                technologies along the way.
              </p>

              <div className="terminalTags">
                <span>Full-stack development</span>
                <span>DSA &amp; Problem Solving</span>
                <span>AI Exploration</span>
              </div>

              <a
                className="btn"
                href="https://github.com/SuryodayaSingh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore my GitHub ↗
              </a>
            </div>

            {/* RIGHT: TERMINAL */}

            <div className="terminalWindow">
              <TerminalCard />
            </div>
          </div>
        </section>

        {/* ================= TECH STACK ================= */}

        <section id="stack">
          <SectionHeader number="03" title="Tech stack" />

          <StackGroup
            title="Frontend"
            items={frontendStack}
          />

          <StackGroup
            title="Backend"
            items={backendStack}
          />

          <StackGroup
            title="Database"
            items={databaseStack}
          />

          <StackGroup
            title="Tools & languages"
            items={toolsStack}
          />
        </section>

        {/* ================= SKILLS ================= */}

        <section id="skills">
          <SectionHeader number="04" title="Skills" />

          <div className="skills">
            {skills.map((skill) => (
              <div key={skill.title}>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>

          <div className="chips">
            <span>Currently learning: DSA</span>
            <span>Machine Learning</span>
            <span>Artificial Intelligence</span>
          </div>
        </section>

        {/* ================= INTERESTS ================= */}

        <section id="interests">
          <SectionHeader number="05" title="What I'm into" />

          <div className="grid">
            {interests.map((interest) => (
              <div
                className="card interestCard tilt"
                key={interest.title}
              >
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section id="about">
          <SectionHeader number="06" title="About" />

          <p className="edu">
            I'm an enthusiastic, detail-oriented B.Tech
            Information Technology student with hands-on
            experience in full-stack development using the
            MERN stack. I like building scalable web
            applications and translating complex requirements
            into clean, efficient code.
          </p>

          <div className="timeline">
            <TimelineItem
              title="B.Tech, Information Technology"
              when="Guru Gobind Singh Indraprastha University, New Delhi · 2024–2028"
              description="Currently in second year, while building projects and practising DSA alongside coursework."
            />

            <TimelineItem
              title="Open source contributor"
              when="Ongoing"
              description="Contributing to personal and collaborative projects on GitHub."
            />

            <TimelineItem
              title="DSA practice"
              when="Ongoing"
              description="Regularly solving algorithmic problems on competitive programming platforms."
            />
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer id="contact">
        <div className="footerInner">
          <div className="footerLabel">
            GET IN TOUCH
          </div>

          <h2>Let's work together</h2>

          <p>
            I'm looking for a software development internship.
            If you have a role or a project, send me a message.
          </p>

          <div className="footerLinks">
            <a href="mailto:surya945514@gmail.com">
              Email
            </a>

            <a
              href="https://github.com/SuryodayaSingh"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/suryodaya-singh"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <a href="tel:+919335342664">
              +91 9335342664
            </a>
          </div>

          <div className="copyright">
            © 2026 Suryodaya Singh
          </div>
        </div>
      </footer>
    </>
  );
}

/* =====================================================
   PROJECT FLIP CARD
===================================================== */

function ProjectFlipCard({
  project,
}: {
  project: {
    title: string;
    tech: string;
    hot?: boolean;
    points: string[];
    link: string;
    linkText: string;
  };
}) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((previous) => !previous);
  };

  return (
    <div
      className={`projectFlipCard ${flipped ? "isFlipped" : ""}`}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      aria-pressed={flipped}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleFlip();
        }
      }}
    >
      <div className="projectFlipInner">
        {/* FRONT */}

        <div
          className={`projectFace projectFront ${
            project.hot ? "hot" : ""
          }`}
          aria-hidden={flipped}
          inert={flipped}
        >
          <div className="projectNumber">
            PROJECT
          </div>

          <div className="frontContent">
            <h3>{project.title}</h3>
            <div className="tech">{project.tech}</div>
          </div>

          <div className="flipHint">
            <span>Click to explore</span>
            <strong>↗</strong>
          </div>
        </div>

        {/* BACK */}

        <div
          className={`projectFace projectBack ${
            project.hot ? "hot" : ""
          }`}
          aria-hidden={!flipped}
          inert={!flipped}
        >
          <div className="backHeader">
            <div>
              <div className="projectNumber">
                PROJECT
              </div>

              <h3>{project.title}</h3>
            </div>

            <button
              type="button"
              className="closeFlip"
              onClick={(event) => {
                event.stopPropagation();
                setFlipped(false);
              }}
              aria-label="Flip project card back"
              tabIndex={flipped ? 0 : -1}
            >
              ×
            </button>
          </div>

          <div className="tech">{project.tech}</div>

          <ul>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="projectLink"
            tabIndex={flipped ? 0 : -1}
            onClick={(event) => event.stopPropagation()}
          >
            {project.linkText} →
          </a>

          <div className="flipHint">
            Click anywhere to flip back
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="sectionHeader">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

/* =====================================================
   STACK GROUP
===================================================== */

function StackGroup({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="stackGroup">
      <p className="layer">{title}</p>

      <div className="stack">
        {items.map((item) => (
          <div className="tile tilt" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   TIMELINE
===================================================== */

function TimelineItem({
  title,
  when,
  description,
}: {
  title: string;
  when: string;
  description: string;
}) {
  return (
    <div className="timelineItem">
      <span className="timelineDot" />

      <h3>{title}</h3>

      <div className="when">{when}</div>

      <p>{description}</p>
    </div>
  );
}