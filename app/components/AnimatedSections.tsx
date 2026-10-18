"use client";

import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  EDUCATION,
  INTERESTS,
  PROJECTS,
  SKILL_GROUPS,
  CONTACT_LINKS,
  ArrowIcon,
} from "../page";

/* ══════════════════════════════════════════════════════════════
   Framer Motion variants
   Using named easing strings ("easeOut") so TS is happy.
   Delay is injected via the `custom` prop on each element.
   ══════════════════════════════════════════════════════════════ */

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: (delay: number = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Viewport reveal hook ───────────────────────────────────── */
function useReveal() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return { ref, inView };
}

/* ── Shared section header ──────────────────────────────────── */
function SectionHeader({
  number, label, title,
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
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="section-number">{number} / {label}</div>
      <h2 className="section-title">{title}</h2>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT
   ══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const bioRef    = useRef<HTMLDivElement>(null);
  const eduRef    = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, margin: "-60px 0px" });
  const eduInView = useInView(eduRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="about" className="section bp-border-top section-drone-left" aria-label="About section">
      <div className="container">
        <SectionHeader number="01" label="Profile" title={<>About <span>Me</span></>} />
        <div className="about-grid">

          {/* Bio */}
          <motion.div
            ref={bioRef}
            className="about-bio"
            variants={fadeLeft}
            custom={0.1}
            initial="hidden"
            animate={bioInView ? "visible" : "hidden"}
          >
            {/* TODO: Replace with student's own bio */}
            <p style={{ marginBottom: "1.25rem" }}>
              I am a final-year mechanical engineering student with a strong interest
              in unmanned aerial systems and precision manufacturing. My work spans the
              full product cycle — from concept sketches and CAD models to FEA
              validation, prototyping, and flight testing.
            </p>
            <p style={{ marginBottom: "1.25rem" }}>
              {/* TODO: Replace with personal statement */}
              I believe that the best engineering comes from deep curiosity and a
              willingness to iterate. Every failed prototype is a data point that
              brings you closer to a system that works reliably.
            </p>
            <p>
              {/* TODO: Adjust to match student's actual activities */}
              Outside the lab, I enjoy contributing to open-source hardware projects
              and competing in student design challenges.
            </p>

            {/* Interest tags */}
            <motion.div
              className="interest-tags"
              style={{ marginTop: "2rem" }}
              variants={stagger}
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
            >
              {INTERESTS.map(tag => (
                <motion.span key={tag} className="interest-tag" variants={fadeUp} custom={0}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div
            ref={eduRef}
            className="about-education"
            variants={fadeRight}
            custom={0.15}
            initial="hidden"
            animate={eduInView ? "visible" : "hidden"}
          >
            <h3 className="about-sub-heading">
              <span className="annotation" style={{ display: "block", marginBottom: "0.4rem" }}>— Education</span>
            </h3>
            <motion.div
              className="education-list"
              variants={stagger}
              initial="hidden"
              animate={eduInView ? "visible" : "hidden"}
            >
              {EDUCATION.map((e, i) => (
                <motion.div
                  key={e.degree}
                  className="education-item bp-bracket"
                  variants={fadeUp}
                  custom={i * 0.1}
                >
                  <div className="edu-year annotation">{e.year}</div>
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-institution">{e.institution}</div>
                  <div className="annotation" style={{ marginTop: "0.25rem", opacity: 0.7 }}>{e.note}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECTS
   ══════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  const { ref, inView } = useReveal();

  return (
    <section id="projects" className="section bp-border-top section-drone-right" aria-label="Projects section">
      <div className="container">
        <SectionHeader number="02" label="Portfolio" title={<>Featured <span>Projects</span></>} />
        <motion.div
          ref={ref}
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
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
  proj: typeof PROJECTS[number];
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
        <div className="project-card-category annotation">{proj.category}</div>
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{proj.title}</h3>
        <p className="project-card-desc">{proj.description}</p>
        <div className="project-challenge">
          <span className="annotation" style={{ color: "var(--bp-cyan)", display: "block", marginBottom: "0.3rem" }}>
            Key Challenge
          </span>
          <p style={{ fontSize: "0.83rem", fontStyle: "italic" }}>{proj.challenge}</p>
        </div>
        <div className="project-tools">
          {proj.tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════
   SKILLS
   ══════════════════════════════════════════════════════════════ */
function SkillsSection() {
  const { ref, inView } = useReveal();

  return (
    <section id="skills" className="section bp-border-top section-drone-left" aria-label="Skills section">
      <div className="container">
        <SectionHeader number="03" label="Capabilities" title={<>Technical <span>Skills</span></>} />
        <motion.div
          ref={ref}
          className="skills-grid"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.group}
              className="skill-group"
              variants={fadeUp}
              custom={gi * 0.1}
              whileHover={{
                borderColor: "rgba(0,212,255,0.35)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">{group.icon}</span>
                <h3 className="skill-group-title">{group.group}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((sk, si) => (
                  <div key={sk.name} className="skill-row">
                    <div className="skill-meta">
                      <span className="skill-name">{sk.name}</span>
                      <span className="annotation">{sk.level}%</span>
                    </div>
                    <div
                      className="skill-bar"
                      role="progressbar"
                      aria-valuenow={sk.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${sk.name} proficiency ${sk.level}%`}
                    >
                      <motion.div
                        className="skill-bar-fill-fm"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                          delay: gi * 0.1 + si * 0.07,
                        }}
                        style={{
                          transformOrigin: "left",
                          width: `${sk.level}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
   ══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const introRef    = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: "-60px 0px" });
  const linksInView = useInView(linksRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="contact" className="section bp-border-top section-drone-right" aria-label="Contact section">
      <div className="container">
        <SectionHeader number="04" label="Reach Out" title={<>Get In <span>Touch</span></>} />
        <div className="contact-layout">

          {/* Intro */}
          <motion.div
            ref={introRef}
            className="contact-intro"
            variants={fadeLeft}
            custom={0.1}
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
          >
            {/* TODO: Personalise the contact message */}
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Open to internship opportunities, collaborative research projects, and
              full-time positions. Feel free to reach out via any
              of the channels below.
            </p>
            <p className="annotation" style={{ opacity: 0.6 }}>Average response time: 24 hours</p>
            <div className="contact-box">
              <div className="annotation" style={{ marginBottom: "0.5rem" }}>LOCATION</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                Bengaluru, India
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            ref={linksRef}
            className="contact-links"
            variants={stagger}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
          >
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                id={link.id}
                href={link.href}
                className="contact-link-card"
                variants={fadeRight}
                custom={i * 0.08}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${link.label}: ${link.value}`}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
              >
                <span className="contact-link-icon" aria-hidden="true">{link.icon}</span>
                <div>
                  <div className="annotation" style={{ marginBottom: "0.2rem" }}>{link.label}</div>
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

/* ══════════════════════════════════════════════════════════════
   ROOT EXPORT
   ══════════════════════════════════════════════════════════════ */
export default function AnimatedSections() {
  return (
    <>
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
