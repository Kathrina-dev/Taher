import Image from "next/image";
import Navbar from "./components/Navbar";
import ScrollEffects from "./components/ScrollEffects";
import DroneScroll from "./components/DroneScroll";
import AnimatedSections from "./components/AnimatedSections";

export const EDUCATION = [
  {
    degree: "B.Eng. Mechanical Engineering",
    institution: "Vellore Institute of Technology",
    year: "2024 – 2028",
    note: "",
  },
  {
    degree: "HSC — Pre-Engineering",
    institution: "Federal Board of Intermediate Education", // TODO: Replace
    year: "2019 – 2021",
    note: "Distinction",
  },
];

export const INTERESTS = [
  "UAV Airframe Design",
  "Computational Fluid Dynamics",
  "Advanced Manufacturing",
  "Structural FEA",
  "Robotics & Automation",
  "Propulsion Systems",
];

export const PROJECTS = [
  {
    id:          "proj-uav-airframe",
    dwg:         "DWG-2024-002",
    title:       "Quadcopter Airframe — Q-450 X1",
    category:    "UAV Design",
    description:
      "Designed and fabricated a high-performance carbon-fibre quadcopter frame from scratch. Optimised arm geometry for torsional stiffness while minimising weight. Integrated motor mounts, flight-controller stack, and battery bay in a single tooled assembly.",
    challenge:
      "Balancing structural rigidity against weight budget under a 500 g frame constraint with 4×M3 fastener pattern spacing.",
    tools:       ["SolidWorks", "ANSYS FEA", "CNC Milling", "Carbon Fibre Layup"],
    image:       "/project-uav-airframe.png",
    imageAlt:    "Blueprint top-view of Q-450 X1 quadcopter airframe with dimension annotations",
  },
  {
    id:          "proj-cfd",
    dwg:         "DWG-2024-003",
    title:       "NACA 2412 Wing — CFD Analysis",
    category:    "Aerodynamics",
    description:
      "Conducted a full 2-D and 3-D CFD study on a NACA 2412 aerofoil at varying angles of attack. Generated pressure coefficient distributions and drag polars used to select the optimal cruise operating point for a fixed-wing UAV application.",
    challenge:
      "Achieving mesh independence below 1% residual error at Re = 1.2M while maintaining manageable computational cost on a single workstation.",
    tools:       ["ANSYS Fluent", "MATLAB", "Pointwise Meshing", "Python"],
    image:       "/project-cfd-sim.png",
    imageAlt:    "CFD streamline visualisation of NACA 2412 airfoil at 6° angle of attack",
  },
  {
    id:          "proj-robotic-arm",
    dwg:         "DWG-2024-004",
    title:       "6-DOF Robotic Arm — Mechanical Design",
    category:    "Robotics",
    description:
      "Designed the full mechanical assembly of a desktop 6-DOF robotic arm for a university automation lab. Includes harmonic-drive joints, integrated servo housings, and a quick-release parallel-jaw gripper. Kinematic workspace was verified in simulation before fabrication.",
    challenge:
      "Minimising backlash across all six joints with off-the-shelf harmonic drive modules while maintaining a 750 mm maximum reach.",
    tools:       ["CATIA V5", "MATLAB Robotics Toolbox", "3-D Printing", "Laser Cutting"],
    image:       "/project-robotic-arm.png",
    imageAlt:    "Blueprint isometric view of 6-DOF robotic arm assembly with joint callouts",
  },
];

export const SKILL_GROUPS = [
  {
    group: "CAD & Design",
    icon:  "✦",
    skills: [
      { name: "SolidWorks",  level: 92 },
      { name: "CATIA V5",    level: 80 },
      { name: "AutoCAD",     level: 88 },
      { name: "Fusion 360",  level: 75 },
    ],
  },
  {
    group: "Simulation & Analysis",
    icon:  "◈",
    skills: [
      { name: "ANSYS Mechanical",       level: 85 },
      { name: "ANSYS Fluent",           level: 78 },
      { name: "MATLAB / Simulink",      level: 82 },
      { name: "Python (NumPy / SciPy)", level: 70 },
    ],
  },
  {
    group: "Manufacturing",
    icon:  "⬡",
    skills: [
      { name: "CNC Milling & Turning",   level: 80 },
      { name: "FDM / SLA 3-D Printing",  level: 90 },
      { name: "Carbon Fibre Layup",      level: 75 },
      { name: "Laser Cutting",           level: 88 },
    ],
  },
  {
    group: "Engineering Tools",
    icon:  "⊕",
    skills: [
      { name: "GD&T / Technical Drawing",  level: 85 },
      { name: "FEA / Structural Analysis", level: 82 },
      { name: "Git / Version Control",     level: 68 },
      { name: "MS Office / LaTeX",         level: 90 },
    ],
  },
];

export const CONTACT_LINKS = [
  {
    id:    "contact-email",
    label: "Email",
    value: "taher.haidri@university.edu", // TODO: Replace
    href:  "mailto:taher.haidri@university.edu",
    icon:  "✉",
  },
  {
    id:    "contact-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/taherhaidri", // TODO: Replace
    href:  "https://linkedin.com/in/taherhaidri",
    icon:  "◈",
  },
  {
    id:    "contact-github",
    label: "GitHub",
    value: "github.com/taherhaidri", // TODO: Replace
    href:  "https://github.com/taherhaidri",
    icon:  "⌥",
  },
  {
    id:    "contact-resume",
    label: "Résumé",
    value: "Download PDF",
    href:  "/resume.pdf", // TODO: Add resume.pdf to /public/
    icon:  "↓",
  },
];

/* ══════════════════════════════════════════════════════════════
   PAGE — Server component shell; animated content is in
   AnimatedSections (client component with Framer Motion)
   ══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <ScrollEffects />
      <DroneScroll />

      {/* ══════════════════════
          HERO (server-rendered)
      ══════════════════════ */}
      <section id="home" className="hero" aria-label="Hero — Introduction">
        <div className="container">
          <div className="hero-grid">
            {/* Text */}
            <div className="hero-content">
              <div className="hero-eyebrow animate-in" style={{ animationDelay:"0.1s" }}>
                <div className="hero-eyebrow-line" aria-hidden="true" />
                <span className="annotation">Mechanical Engineering · UAV Systems</span>
              </div>
              <h1 className="hero-name animate-in" style={{ animationDelay:"0.2s" }}>
                Taher Haidri
              </h1>
              <p className="hero-title animate-in cursor-blink" style={{ animationDelay:"0.3s" }}>
                B.Eng. Mechanical Engineering — Class of 2028
              </p>
              <p className="hero-description animate-in" style={{ animationDelay:"0.4s" }}>
                {/* TODO: Replace with student's own introduction */}
                Designing systems where precision meets innovation. Focused on UAV airframe
                development, computational fluid dynamics, and advanced manufacturing.
                Building machines that push the boundary between the drawing board and the sky.
              </p>
              <div className="hero-cta-group animate-in" style={{ animationDelay:"0.5s" }}>
                <a href="#projects" id="hero-cta-projects" className="btn-primary">
                  <ArrowIcon /> Explore Projects
                </a>
                <a href="#contact" id="hero-cta-contact" className="btn-outline">
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Drone visual */}
            <div className="hero-visual animate-in" style={{ animationDelay:"0.25s" }}>
                <div className="drone-glow" aria-hidden="true" />
                <Image
                  src="/drone-blueprint.png"
                  alt="Technical blueprint illustration of a quadcopter drone — carbon fibre propellers, brushless motors, LiPo battery, and flight controller labelled."
                  width={560}
                  height={560}
                  className="drone-image"
                  priority
                  sizes="(max-width:768px) 90vw, 50vw"
                />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          All sections below use Framer Motion (client component)
      ══════════════════════ */}
      <AnimatedSections />

      {/* Landing zone — car parked at the bottom, drone flies in here */}
      <div className="landing-zone" aria-hidden="true">
        <div className="landing-zone-inner">
          <div className="drone-glow" aria-hidden="true" />
          <Image
            src="/car-blueprint.png"
            alt=""
            width={960}
            height={540}
            style={{ width:"100%", height:"auto", filter:"drop-shadow(0 0 18px rgba(0,212,255,0.35))", opacity:0.7, display:"block" }}
            loading="lazy"
          />
        </div>
      </div>

      <footer role="contentinfo" className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <span className="annotation" style={{ opacity:0.8 }}>
              © 2026 Taher Haidri · Mechanical Engineering Portfolio
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── Shared small SVG components ─────────────────────────── */
export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
