import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Link2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Terminal,
  Briefcase,
  GraduationCap,
  Code2,
  ChevronRight,
  Sun,
  Moon,
  Command,
  Download,
  Search,
  CornerDownLeft,
  Boxes,
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

const SKILLS = [
  { category: "languages", items: ["JavaScript (ES6+)", "PHP"] },
  { category: "frameworks", items: ["React.js", "Node.js", "Express.js"] },
  { category: "databases", items: ["MongoDB", "MySQL"] },
  { category: "frontend", items: ["HTML5", "CSS3", "Bootstrap 5", "Vite"] },
  { category: "tools", items: ["Git & GitHub", "Postman", "Chrome DevTools"] },
  {
    category: "concepts",
    items: ["RESTful APIs", "OOP", "CRUD Architecture", "PHP Mailer", "Payment Gateways"],
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Web Developer",
    company: "High Digi Tech",
    location: "New Delhi, India",
    period: "Jan 2026 — Present",
    points: [
      "Delivered end-to-end full stack development for live client projects using PHP, MySQL, and the MERN stack.",
      "Designed custom CMS and CRUD-based architectures giving clients independent control over dynamic content.",
      "Built responsive, mobile-first interfaces paired with optimized backend logic, improving performance across projects.",
      "Applied OOP principles and modular code structures for long-term maintainability and faster iteration.",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    company: "High Digi Tech",
    location: "New Delhi, India",
    period: "Jan 2026 — April 2026",
    points: [
      "Architected and deployed high-performance static sites and dynamic web applications.",
      "Built PHP & MySQL projects with robust CRUD operations and custom CMS panels.",
      "Developed full-stack MERN applications with secure RESTful APIs.",
      "Collaborated with cross-functional teams using Git & GitHub for version control and iterative delivery.",
    ],
  },
  {
    role: "Digital Marketing Assistant",
    company: "Emuaj Digital Marketing",
    location: "New Delhi, India",
    period: "Aug 2024 — Dec 2025",
    points: [
      "Generated MIS reports using Excel (VLOOKUP, Pivot Tables, Conditional Formatting) for data-driven decisions.",
      "Executed off-page SEO strategies, boosting online visibility through backlinks and listings.",
      "Improved data accuracy by 20% through systematic validation processes.",
    ],
  },
  {
    role: "Data Entry & MIS Executive",
    company: "Jarvis Consultant",
    location: "New Delhi, India",
    period: "Mar 2022 — Mar 2023",
    points: [
      "Entered and validated large volumes of business data, maintaining accuracy across records.",
      "Prepared MIS reports delivering actionable insights to management.",
      "Coordinated across departments to streamline reporting workflows.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Welcome India Holidays",
    tag: "live client project",
    stack: ["PHP", "MySQL", "Custom CMS", "PHP Mailer"],
    desc: "Dynamic travel website with a custom CMS, database-driven package management, and a blog system that lets non-technical staff publish content independently.",
    link: "https://www.welcomeindiaholidays.com",
    live: true,
  },
  {
    name: "Nutriafghan",
    tag: "live client project",
    stack: ["PHP", "MySQL", "Payment Gateway"],
    desc: "Full-featured e-commerce platform with secure auth, cart & buy-now flow, COD + online payments, and automated order confirmation emails.",
    link: "https://nutriafghan.com",
    live: true,
  },
  {
    name: "Office CRM System",
    tag: "ongoing",
    stack: ["React 18", "Node.js", "MongoDB", "Redis", "Socket.io"],
    desc: "Role-based internal CRM with dashboards for CEO, Manager, Team Lead, HR & Employees — attendance, leave, tasks, and lead tracking with JWT auth and RBAC.",
    link: null,
    live: false,
  },
  {
    name: "Custom CMS Platform",
    tag: "project",
    stack: ["PHP", "MySQL", "Bootstrap 5"],
    desc: "Full-featured CMS with admin panel, authentication, and MVC-inspired architecture reducing code redundancy.",
    link: null,
    live: false,
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Indira Gandhi National Open University (IGNOU)",
    period: "Aug 2020 — Jun 2023",
  },
  {
    degree: "12th Grade (Science)",
    school: "Ram Roop Memorial Public School",
    period: "Jun 2016 — Apr 2018",
  },
];

const TERMINAL_LINES = [
  "$ whoami",
  "saurabh_yadav",
  "$ cat role.txt",
  "Full Stack Web Developer (MERN | PHP | MySQL)",
  "$ ls skills/",
  "react  node  express  mongodb  mysql  php",
  "$ status --current",
  "open to full-time opportunities ✓",
];

const THEME = {
  dark: {
    page: "bg-[#0A0E14] text-[#E4E7EB]",
    header: "bg-[#0A0E14]/90",
    hairline: "border-white/5",
    surfaceBorder: "border-white/10",
    surface: "bg-[#12171F]",
    muted: "text-[#9CA3AF]",
    mutedDark: "text-[#6B7684]",
    accent: "text-[#5EEAD4]",
    accentBorder: "border-[#5EEAD4]/30",
    accent2: "text-[#F59E0B]",
    accent2Bg: "bg-[#F59E0B]/10 border-[#F59E0B]/30",
    tag: "bg-white/5 text-[#D1D5DB]",
    tagMono: "bg-white/5 text-[#6B7684]",
    btnPrimary: "bg-[#5EEAD4] text-[#0A0E14] hover:bg-[#5EEAD4]/90",
    btnGhost: "border-white/10 hover:bg-white/5 text-[#E4E7EB]",
    navInactive: "text-[#6B7684] hover:text-[#E4E7EB]",
    overlay: "bg-black/60",
    kbd: "bg-white/10 text-[#9CA3AF] border-white/10",
  },
  light: {
    page: "bg-[#F5F6F8] text-[#12141A]",
    header: "bg-[#F5F6F8]/90",
    hairline: "border-black/5",
    surfaceBorder: "border-black/10",
    surface: "bg-white",
    muted: "text-[#4B5563]",
    mutedDark: "text-[#6B7280]",
    accent: "text-[#0D9488]",
    accentBorder: "border-[#0D9488]/30",
    accent2: "text-[#B45309]",
    accent2Bg: "bg-[#B45309]/10 border-[#B45309]/30",
    tag: "bg-black/5 text-[#374151]",
    tagMono: "bg-black/5 text-[#6B7280]",
    btnPrimary: "bg-[#0D9488] text-white hover:bg-[#0D9488]/90",
    btnGhost: "border-black/10 hover:bg-black/5 text-[#12141A]",
    navInactive: "text-[#6B7280] hover:text-[#12141A]",
    overlay: "bg-black/30",
    kbd: "bg-black/5 text-[#4B5563] border-black/10",
  },
};

function useTypedLines(lines, speed = 28, pause = 900) {
  const [rendered, setRendered] = useState([""]);
  const idxRef = useRef({ line: 0, char: 0 });
  useEffect(() => {
    let timeout;
    const tick = () => {
      const { line, char } = idxRef.current;
      if (line >= lines.length) return;
      const currentLine = lines[line];
      if (char <= currentLine.length) {
        setRendered((prev) => {
          const copy = [...prev];
          copy[line] = currentLine.slice(0, char);
          return copy;
        });
        idxRef.current = { line, char: char + 1 };
        timeout = setTimeout(tick, speed);
      } else if (line + 1 < lines.length) {
        setRendered((prev) => [...prev, ""]);
        idxRef.current = { line: line + 1, char: 0 };
        timeout = setTimeout(tick, pause / 4);
      }
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);
  return rendered;
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const typed = useTypedLines(TERMINAL_LINES);
  const t = THEME[dark ? "dark" : "light"];

  const scrollTo = (id) => {
    setNavOpen(false);
    setPaletteOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("saurabhyaduvanshi2018@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setPaletteOpen(false);
  };

  const actions = useMemo(
    () => [
      ...NAV_LINKS.map((l) => ({
        label: `go to ${l.label}`,
        run: () => scrollTo(l.id),
      })),
      {
        label: dark ? "switch to light mode" : "switch to dark mode",
        run: () => {
          setDark((d) => !d);
          setPaletteOpen(false);
        },
      },
      {
        label: "download resume (pdf)",
        run: () => {
          document.getElementById("resume-download-link")?.click();
          setPaletteOpen(false);
        },
      },
      { label: "copy email address", run: copyEmail },
      {
        label: "open github profile",
        run: () => window.open("https://github.com/SaurabhYaduvanshi2025", "_blank"),
      },
      {
        label: "open linkedin profile",
        run: () => window.open("https://linkedin.com/in/saurabh-yadav-merndev", "_blank"),
      },
    ],
    [dark]
  );

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 140) current = link.id;
      }
      setActiveSection(current);
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        setQuery("");
        setSelectedIdx(0);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (paletteOpen) setTimeout(() => inputRef.current?.focus(), 10);
  }, [paletteOpen]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const handlePaletteKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      filtered[selectedIdx]?.run();
    }
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className={`min-h-screen transition-colors duration-300 ${t.page}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* hidden real download link - swap href for your actual hosted resume.pdf */}
      <a
        id="resume-download-link"
        href="/resume.pdf"
        download="Saurabh_Yadav_Resume.pdf"
        className="hidden"
      >
        download
      </a>

      {/* SCROLL PROGRESS */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#5EEAD4] z-[60] transition-[width]"
        style={{ width: `${progress}%` }}
      />

      {/* NAV */}
      <header
        className={`fixed top-0.5 left-0 right-0 z-50 backdrop-blur border-b ${t.header} ${t.hairline}`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className={`mono text-sm font-medium ${t.accent}`}>
            saurabh<span className={t.page.includes("0A0E14") ? "text-[#E4E7EB]" : "text-[#12141A]"}>.dev</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`mono text-xs px-3 py-2 rounded transition-colors ${
                  activeSection === link.id ? t.accent : t.navInactive
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setPaletteOpen(true);
                setQuery("");
              }}
              className={`ml-2 mono text-[11px] flex items-center gap-1 px-2.5 py-1.5 rounded border ${t.surfaceBorder} ${t.mutedDark} hover:${t.accent}`}
            >
              <Search size={12} /> <span className={`px-1 rounded border ${t.kbd}`}>⌘K</span>
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className={`ml-1 p-2 rounded border ${t.surfaceBorder} ${t.mutedDark}`}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle theme" className={t.mutedDark}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={t.text} onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className={`md:hidden border-t px-6 py-3 flex flex-col gap-1 ${t.hairline}`}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`mono text-xs text-left py-2 ${t.muted}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* COMMAND PALETTE */}
      {paletteOpen && (
        <div
          className={`fixed inset-0 z-[70] flex items-start justify-center pt-28 px-4 ${t.overlay}`}
          onClick={() => setPaletteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-lg border shadow-2xl overflow-hidden ${t.surface} ${t.surfaceBorder}`}
          >
            <div className={`flex items-center gap-2 px-4 border-b ${t.hairline}`}>
              <Command size={15} className={t.mutedDark} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handlePaletteKey}
                placeholder="type a command..."
                className={`mono text-sm bg-transparent outline-none py-3 flex-1 ${t.text}`}
              />
              <span className={`mono text-[10px] px-1.5 py-0.5 rounded border ${t.kbd}`}>esc</span>
            </div>
            <div className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <p className={`mono text-xs px-4 py-4 ${t.mutedDark}`}>no matching command</p>
              )}
              {filtered.map((a, i) => (
                <button
                  key={a.label}
                  onClick={a.run}
                  onMouseEnter={() => setSelectedIdx(i)}
                  className={`w-full flex items-center justify-between text-left px-4 py-2.5 mono text-sm ${
                    i === selectedIdx ? t.tag : ""
                  } ${t.text}`}
                >
                  {a.label}
                  {i === selectedIdx && <CornerDownLeft size={13} className={t.mutedDark} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="max-w-5xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className={`mono text-xs mb-4 tracking-wide ${t.accent2}`}>available for full-time roles</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">Saurabh Yadav</h1>
          <p className={`text-lg mb-6 ${t.muted}`}>
            Full Stack Web Developer building production-ready apps with the MERN stack and PHP/MySQL — from
            client CMS platforms to e-commerce checkouts.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {["React.js", "Node.js", "MongoDB", "PHP", "MySQL"].map((tag) => (
              <span key={tag} className={`mono text-xs px-3 py-1 rounded-full border ${t.accentBorder} ${t.accent}`}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => document.getElementById("resume-download-link")?.click()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${t.btnPrimary}`}
            >
              <Download size={15} /> download resume
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${t.btnGhost}`}
            >
              view projects
            </button>
          </div>
          <div className={`flex flex-wrap gap-4 text-sm ${t.muted}`}>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> New Delhi, India
            </span>
            <a href="mailto:saurabhyaduvanshi2018@gmail.com" className={`flex items-center gap-1.5 hover:${t.accent}`}>
              <Mail size={14} /> Email
            </a>
            <a
              href="https://github.com/SaurabhYaduvanshi2025"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 hover:${t.accent}`}
            >
              <Link2 size={14} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/saurabh-yadav-merndev"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 hover:${t.accent}`}
            >
              <Link2 size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Terminal - stays dark always, like a real code editor window */}
        <div className="rounded-lg bg-[#12171F] border border-white/10 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#151B23] border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#5EEAD4]" />
            <span className="mono text-[11px] text-[#6B7684] ml-2">zsh — saurabh</span>
          </div>
          <div className="p-5 mono text-[13px] leading-7 min-h-[220px]">
            {typed.map((line, i) => (
              <div key={i} className={i % 2 === 0 ? "text-[#5EEAD4]" : "text-[#E4E7EB]"}>
                {line}
                {i === typed.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-[#5EEAD4] ml-1 align-middle animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading icon={<Terminal size={16} />} label="about" t={t} />
        <p className={`text-base leading-relaxed max-w-3xl ${t.muted}`}>
          Results-driven Full Stack Web Developer with hands-on experience building high-performance static
          sites and dynamic web applications using the MERN stack and PHP/MySQL. Proficient in architecting
          RESTful APIs, implementing secure authentication, and applying Object-Oriented Programming principles
          to deliver clean, scalable code. I've shipped live client projects including dynamic CMS platforms and
          full-featured e-commerce websites, and I'm actively seeking a role to deepen my expertise and
          contribute to a collaborative engineering team.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading icon={<Code2 size={16} />} label="skills" t={t} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group) => (
            <div key={group.category} className={`rounded-lg border p-5 ${t.surface} ${t.surfaceBorder}`}>
              <p className={`mono text-xs mb-3 ${t.accent2}`}>{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className={`text-xs px-2.5 py-1 rounded ${t.tag}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading icon={<Briefcase size={16} />} label="experience" t={t} />
        <div className="space-y-8">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className={`relative pl-6 border-l ${t.surfaceBorder}`}>
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#5EEAD4]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-base font-medium">
                  {job.role} <span className={t.accent}>· {job.company}</span>
                </h3>
                <span className={`mono text-xs ${t.mutedDark}`}>{job.period}</span>
              </div>
              <p className={`text-xs mb-3 ${t.mutedDark}`}>{job.location}</p>
              <ul className="space-y-1.5">
                {job.points.map((p, j) => (
                  <li key={j} className={`text-sm flex gap-2 leading-relaxed ${t.muted}`}>
                    <ChevronRight size={14} className={`mt-1 shrink-0 ${t.mutedDark}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading icon={<Boxes size={16} />} label="projects" t={t} />
        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((proj) => (
            <div key={proj.name} className={`rounded-lg border p-5 flex flex-col ${t.surface} ${t.surfaceBorder}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{proj.name}</h3>
                {proj.live && (
                  <span className={`mono text-[10px] px-2 py-0.5 rounded-full border ${t.accent2Bg} ${t.accent2}`}>
                    live
                  </span>
                )}
              </div>
              <p className={`text-sm leading-relaxed mb-4 flex-1 ${t.muted}`}>{proj.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.stack.map((s) => (
                  <span key={s} className={`mono text-[10px] px-2 py-1 rounded ${t.tagMono}`}>
                    {s}
                  </span>
                ))}
              </div>
              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`mono text-xs flex items-center gap-1.5 hover:underline ${t.accent}`}
                >
                  visit site <ExternalLink size={12} />
                </a>
              ) : (
                <span className={`mono text-xs ${t.mutedDark}`}>{proj.tag}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading icon={<GraduationCap size={16} />} label="education" t={t} />
        <div className="space-y-4">
          {EDUCATION.map((ed, i) => (
            <div key={i} className={`flex flex-wrap items-baseline justify-between gap-2 border-b pb-4 ${t.hairline}`}>
              <div>
                <p className="font-medium text-sm">{ed.degree}</p>
                <p className={`text-xs mt-0.5 ${t.mutedDark}`}>{ed.school}</p>
              </div>
              <span className={`mono text-xs ${t.mutedDark}`}>{ed.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className={`rounded-lg border p-8 text-center ${t.surface} ${t.surfaceBorder}`}>
          <p className={`mono text-xs mb-3 ${t.accent2}`}>$ contact --me</p>
          <h2 className="text-2xl font-semibold mb-4">Let's build something together</h2>
          <p className={`mb-6 max-w-lg mx-auto ${t.muted}`}>
            Open to full-time Full Stack Developer roles. Reach out — happy to walk through any project on this
            page.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={copyEmail}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${t.btnPrimary}`}
            >
              <Mail size={16} /> {copied ? "copied!" : "saurabhyaduvanshi2018@gmail.com"}
            </button>
            <a
              href="tel:+917011608210"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${t.btnGhost}`}
            >
              <Phone size={16} /> +91 7011608210
            </a>
          </div>
          <div className={`flex justify-center gap-5 mt-6 ${t.mutedDark}`}>
            <a
              href="https://github.com/SaurabhYaduvanshi2025"
              target="_blank"
              rel="noreferrer"
              className={`mono text-xs underline hover:${t.accent}`}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/saurabh-yadav-merndev"
              target="_blank"
              rel="noreferrer"
              className={`mono text-xs underline hover:${t.accent}`}
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className={`text-center text-xs mono mt-10 ${t.mutedDark}`}>
          built with react · saurabh yadav © 2026 · press ⌘K to try the command menu
        </p>
      </section>
    </div>
  );
}

function SectionHeading({ icon, label, t }) {
  return (
    <div className={`flex items-center gap-2 mb-8 ${t.accent}`}>
      {icon}
      <span className="mono text-sm tracking-wide">// {label}</span>
    </div>
  );
}
