import Navbar from "./components/Navbar";
import ScrollEffects from "./components/ScrollEffects";
import DroneScroll from "./components/DroneScroll";
import AnimatedSections from "./components/AnimatedSections";

export const EDUCATION = [
  {
    year: "2024 – 2028",
    degree: "B.Tech, Mechanical Engineering",
    institution: "Vellore Institute of Technology (VIT), Vellore",
    note: "CGPA: 8.56 / 10",
  },
  {
    year: "2022 – 2024",
    degree: "Pre-University — Physics, Chemistry & Mathematics",
    institution: "Base PU College, Bengaluru",
    note: "PCM",
  },
];

export const INTERESTS = [
  "Aerospace & UAVs",
  "Mechanical Design",
  "SolidWorks CAD",
  "ANSYS FEA",
  "CFD Simulation",
  "Composite Structures",
  "Design for Manufacturing",
  "Prototyping & Testing",
  "Flight Testing",
];

export const PROJECTS = [
  {
    id: "aerothon-drone",
    title: "Aerothon 2026 Competition Drone",
    description:
      "Designed and developed a competition UAV frame from scratch, incorporating a novel landing-gear mechanism and iterating the structure against simulation results and manufacturing constraints.",
    challenge:
      "Balance structural stiffness, weight, landing performance, and manufacturability.",
    tools: ["SolidWorks", "ANSYS", "FEA", "DFM", "UAV Design"],
    category: "AEROSPACE / UAV",
    dwg: "DWG-001",
    image: "/images/aerothon-drone.jpg",
    imageAlt: "Competition UAV frame designed for Aerothon 2026",
  },
  {
    id: "solar-cleaning-drone",
    title: "Autonomous Solar-Panel Cleaning Drone",
    description:
      "Designed lightweight structural members and modular equipment mounts for a UAV platform intended to support solar-panel cleaning operations and interchangeable payloads.",
    challenge:
      "Develop a modular payload architecture without compromising airframe weight and usability.",
    tools: ["SolidWorks", "Structural Design", "Modular Design", "Prototyping"],
    category: "AUTONOMOUS SYSTEMS",
    dwg: "DWG-002",
    image: "/images/solar-cleaning-drone.jpg",
    imageAlt: "Concept design of a solar-panel cleaning UAV",
  },
  {
    id: "modular-quadcopter",
    title: "Multipurpose Modular Quadcopter",
    description:
      "Designed and assembled a quadcopter frame with interchangeable payload sections, allowing the platform to be reconfigured for different applications without redesigning its core structure.",
    challenge:
      "Make payload changes practical while preserving a reusable central airframe.",
    tools: ["CAD", "UAV Assembly", "Mechanical Design", "Prototyping"],
    category: "MECHANICAL DESIGN",
    dwg: "DWG-003",
    image: "/images/modular-quadcopter.jpg",
    imageAlt: "Modular quadcopter frame with interchangeable payload sections",
  },
  {
    id: "esp32-pager",
    title: "ESP32 Wi-Fi Pager Enclosure",
    description:
      "Designed a 3D-printable enclosure for an ESP32-based Wi-Fi pager with USB-C charging and a rotating-tube opening mechanism.",
    challenge:
      "Integrate electronics, charging access, and a functional mechanical opening mechanism in a compact enclosure.",
    tools: ["CAD", "FDM 3D Printing", "Enclosure Design", "Prototyping"],
    category: "PRODUCT DEVELOPMENT",
    dwg: "DWG-004",
    image: "/images/esp32-pager.jpg",
    imageAlt: "3D-printed enclosure for an ESP32 Wi-Fi pager",
  },
];

export const EXPERIENCE = [
  {
    role: "Head of CAD & Simulations",
    organization: "Team Rotor FPV · VIT Vellore",
    period: "Mar 2025 – Present",
    description:
      "Promoted from Senior Core to lead CAD and simulation work for a student UAV design-and-build team.",
    highlights: [
      "Designed CFRP drone frames and lightweight load-bearing components.",
      "Performed static structural FEA, CFD, and free-free modal analysis using ANSYS and SpaceClaim.",
      "Evaluated natural frequencies to identify safe operating RPM ranges and reduce resonance risk.",
      "Created SolidWorks models, prepared BOMs, and supported component selection and procurement.",
      "Documented design reviews, prototypes, and flight-test results.",
      "Flight-tested self-designed airframes and completed 100+ hours on drone simulators, with hands-on LOS/FPV multirotor flying.",
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "1st Place",
    event: "International Space Drone Challenge 2026",
    detail: "Team Rotor FPV",
  },
  {
    title: "Second Runner-Up",
    event: "Sky Maneuver · Cognizance 2026, IIT Roorkee",
    detail: "Team Rotor FPV",
  },
  {
    title: "Special Achiever",
    event: "VIT · Academic Year 2025–26",
    detail: "Recognised for national/international-level achievement.",
  },
];

export const SKILL_GROUPS = [
  {
    group: "CAD & Mechanical Design",
    icon: "⚙",
    skills: [
      "SolidWorks",
      "ANSYS SpaceClaim",
      "Design for Manufacturing (DFM)",
      "GD&T Fundamentals",
    ],
  },
  {
    group: "Simulation & Analysis",
    icon: "◈",
    skills: [
      "ANSYS Static Structural FEA",
      "Free-Free Modal Analysis",
      "Computational Fluid Dynamics (CFD)",
      "Meshing Strategy",
      "Solver Optimisation",
    ],
  },
  {
    group: "Manufacturing & Testing",
    icon: "⬡",
    skills: [
      "CFRP Composite Components",
      "FDM 3D Printing",
      "Prototyping & Assembly",
      "UAV Flight Testing",
      "LOS / FPV Multirotor Flying",
    ],
  },
  {
    group: "Programming & Engineering",
    icon: "⌘",
    skills: [
      "Python",
      "MATLAB",
      "BOM Preparation",
      "Technical Documentation",
      "Component Selection & Procurement",
    ],
  },
];

export const CONTACT_LINKS = [
  {
    id: "contact-email",
    label: "Email",
    value: "taherhaidri76@gmail.com",
    href: "mailto:taherhaidri76@gmail.com",
    icon: "✉",
  },
  {
    id:    "contact-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/taherhaidri",
    href:  "https://www.linkedin.com/in/taher-haidri-18260b34b/?isSelfProfile=false",
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ScrollEffects />
      <DroneScroll />

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
              <p className="hero-description animate-in" style={{ animationDelay: "0.4s" }}>
                Designing lightweight UAV structures, validating engineering
                decisions through simulation, and turning CAD concepts into
                flight-tested hardware.
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

          </div>
        </div>
      </section>

      <AnimatedSections />

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

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
