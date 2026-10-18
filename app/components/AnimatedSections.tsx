
"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  EXPERIENCE,
  ACHIEVEMENTS,
  PROJECTS,
  SKILL_GROUPS,
  CONTACT_LINKS,
  ArrowIcon,
} from "../page";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px 0px",
  });

  return { ref, inView };
}

function SectionHeader({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
}) {
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      className="section-header"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="section-number">
        {number} / {label}
      </div>
      <h2 className="section-title">{title}</h2>
    </motion.div>
  );
}

/* ── Experience & achievements timeline ───────────────────── */

function TimelineAccordion({
  label,
  title,
  subtitle,
  children,
  index,
}: {
  label: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      className="timeline-item"
      variants={fadeRight}
      custom={index * 0.08}
    >
      <span className="timeline-dot" aria-hidden="true" />

      <details className="timeline-accordion">
        <summary className="timeline-summary">
          <span className="timeline-item-label annotation">{label}</span>
          <span className="timeline-item-title">{title}</span>
          <span className="timeline-item-subtitle">{subtitle}</span>
          <span className="timeline-chevron" aria-hidden="true">
            +
          </span>
        </summary>

        <div className="timeline-details">{children}</div>
      </details>
    </motion.div>
  );
}


function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 55%"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="section bp-border-top"
      aria-label="Experience and achievements"
    >
      <div className="container">
        <div className="timeline-layout">
          {/* LEFT COLUMN: heading and full-width timeline cards */}
          <div className="timeline-left">
            <SectionHeader
              number="01"
              label="Experience"
              title={
                <>
                  Experience <span>&amp; Achievements</span>
                </>
              }
            />

            <motion.div
              ref={timelineRef}
              className="timeline-content"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
            >
              <div className="timeline-rail" aria-hidden="true">
                <div className="timeline-rail-track" />
                <motion.div
                  className="timeline-rail-progress"
                  style={{
                    scaleY: lineProgress,
                    transformOrigin: "top",
                  }}
                />
              </div>

              <div className="timeline-group-label annotation">
                — PROFESSIONAL EXPERIENCE
              </div>

              {EXPERIENCE.map((item, index) => (
                <TimelineAccordion
                  key={item.role}
                  index={index}
                  label={item.period}
                  title={item.role}
                  subtitle={item.organization}
                >
                  <p className="timeline-description">
                    {item.description}
                  </p>

                  <ul className="timeline-bullets">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </TimelineAccordion>
              ))}

              <div className="timeline-group-label annotation timeline-achievements-label">
                — COMPETITIONS &amp; RECOGNITION
              </div>

              {ACHIEVEMENTS.map((achievement, index) => (
                <TimelineAccordion
                  key={achievement.event}
                  index={EXPERIENCE.length + index}
                  label={`ACHIEVEMENT 0${index + 1}`}
                  title={achievement.title}
                  subtitle={achievement.event}
                >
                  <p className="timeline-description">
                    {achievement.detail}
                  </p>
                </TimelineAccordion>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: reserved space for the drone */}
          <div className="timeline-drone-space" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}


/* ── Projects ─────────────────────────────────────────────── */

function ProjectsSection() {
  const { ref, inView } = useReveal();

  return (
    <section
      id="projects"
      className="section bp-border-top"
      aria-label="Projects section"
    >
      <div className="container">
        <SectionHeader
          number="02"
          label="Portfolio"
          title={
            <>
              Featured <span>Projects</span>
            </>
          }
        />

        <motion.div
          ref={ref}
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PROJECTS.map((proj, index) => (
            <ProjectCard key={proj.id} proj={proj} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  proj,
  index,
}: {
  proj: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.article
      id={proj.id}
      className="project-card"
      variants={scaleIn}
      custom={index * 0.08}
      aria-label={proj.title}
      whileHover={{
        y: -6,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
    >
      <div className="project-card-image-wrap">
        <Image
          src={proj.image}
          alt={proj.imageAlt}
          width={800}
          height={500}
          className="project-card-image"
          loading="lazy"
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="project-card-overlay" aria-hidden="true" />
        <div className="project-card-dwg drawing-no">{proj.dwg}</div>
        <div className="project-card-category annotation">
          {proj.category}
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{proj.title}</h3>
        <p className="project-card-desc">{proj.description}</p>

        <div className="project-challenge">
          <span
            className="annotation"
            style={{
              color: "var(--bp-cyan)",
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            Key Challenge
          </span>
          <p style={{ fontSize: "0.83rem", fontStyle: "italic" }}>
            {proj.challenge}
          </p>
        </div>

        <div className="project-tools">
          {proj.tools.map((tool) => (
            <span key={tool} className="tool-tag">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Skills: tags, not proficiency bars ────────────────────── */

function SkillsSection() {
  const { ref, inView } = useReveal();

  return (
    <section
      id="skills"
      className="section bp-border-top"
      aria-label="Technical skills"
    >
      <div className="container">
        <SectionHeader
          number="03"
          label="Capabilities"
          title={
            <>
              Technical <span>Skills</span>
            </>
          }
        />

        <motion.div
          ref={ref}
          className="skills-grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {SKILL_GROUPS.map((group, index) => (
            <motion.div
              key={group.group}
              className="skill-group"
              variants={fadeUp}
              custom={index * 0.1}
              whileHover={{
                borderColor: "rgba(0,212,255,0.35)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">
                  {group.icon}
                </span>
                <h3 className="skill-group-title">{group.group}</h3>
              </div>

              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────── */

function ContactSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const introInView = useInView(introRef, {
    once: true,
    margin: "-60px 0px",
  });
  const linksInView = useInView(linksRef, {
    once: true,
    margin: "-60px 0px",
  });

  return (
    <section
      id="contact"
      className="section bp-border-top"
      aria-label="Contact section"
    >
      <div className="container">
        <SectionHeader
          number="04"
          label="Reach Out"
          title={
            <>
              Get In <span>Touch</span>
            </>
          }
        />

        <div className="contact-layout">
          <motion.div
            ref={introRef}
            className="contact-intro"
            variants={fadeLeft}
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
          >
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              I’m looking for Summer 2027 internship opportunities in
              aerospace, UAV development, mechanical design, product
              development, and simulation engineering. If you’re building
              something challenging, I’d love to connect.
            </p>

            <div className="contact-box">
              <div
                className="annotation"
                style={{ marginBottom: "0.5rem" }}
              >
                LOCATION
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                }}
              >
                Bengaluru, India
              </div>
              <div
                className="annotation"
                style={{ marginTop: "0.75rem" }}
              >
                AVAILABLE MAY – JULY 2027
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={linksRef}
            className="contact-links"
            variants={stagger}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
          >
            {CONTACT_LINKS.map((link, index) => (
              <motion.a
                key={link.id}
                id={link.id}
                href={link.href}
                className="contact-link-card"
                variants={fadeRight}
                custom={index * 0.08}
                target={
                  link.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={`${link.label}: ${link.value}`}
                whileHover={{
                  x: 6,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="contact-link-icon" aria-hidden="true">
                  {link.icon}
                </span>
                <div>
                  <div
                    className="annotation"
                    style={{ marginBottom: "0.2rem" }}
                  >
                    {link.label}
                  </div>
                  <div className="contact-link-value">{link.value}</div>
                </div>
                <ArrowIcon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AnimatedSections() {
  return (
    <>
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
