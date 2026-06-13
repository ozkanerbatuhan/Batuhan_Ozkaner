import { Lang } from "@/lib/i18n/dictionaries";

/** Personal / contact constants used across the site. */
export const PROFILE = {
  name: "Batuhan Özkaner",
  email: "ozkanerbatuhan@gmail.com",
  github: "https://github.com/ozkanerbatuhan",
  githubUser: "ozkanerbatuhan",
  // Replace with the real LinkedIn URL when available.
  linkedin: "https://www.linkedin.com/in/ozkanerbatuhan",
};

/** App Store apps shown in the hero. */
export const APPS: {
  name: string;
  url: string;
}[] = [
  {
    name: "Fun Facts Quiz",
    url: "https://apps.apple.com/us/app/fun-facts-quiz-quiz-game/id6742404230",
  },
  {
    name: "Tattoo Creator AI",
    url: "https://apps.apple.com/us/app/tattoo-creator-ai-generator/id6754667068",
  },
  {
    name: "Digital Closet",
    url: "https://apps.apple.com/us/app/digital-closet-outfit-planner/id6742709623",
  },
];

/** Skill groups. `group` keys map to dictionaries.skills.groups. */
export const SKILL_GROUPS: { group: keyof SkillGroupKeys; items: string[] }[] = [
  {
    group: "languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C / C++",
      "Embedded C",
      "VHDL",
      "SQL",
    ],
  },
  { group: "mobile", items: ["React Native", "Expo"] },
  { group: "web", items: ["React", "Next.js", "Node.js", "Express"] },
  {
    group: "hardware",
    items: ["VHDL", "Vitis", "Xilinx", "PLC (Siemens)", "PCB (DipTrace)"],
  },
  {
    group: "ml",
    items: ["TensorFlow", "scikit-learn", "FastAPI", "Docker", "PostgreSQL"],
  },
  {
    group: "tools",
    items: [
      "Git",
      "Jira",
      "Firebase",
      "Supabase",
      "SolidWorks",
      "ANSYS",
      "PVsyst",
    ],
  },
];

type SkillGroupKeys = {
  languages: string;
  mobile: string;
  web: string;
  hardware: string;
  ml: string;
  tools: string;
};

interface LocalizedText {
  tr: string;
  en: string;
}

export interface ExperienceEntry {
  role: LocalizedText;
  company: string;
  period: LocalizedText;
  description: LocalizedText;
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: { tr: "Sayısal Tasarım Stajyeri", en: "Digital Design Intern" },
    company: "IVEO Electronics",
    period: { tr: "Eyl 2025 – Eki 2025", en: "Sep 2025 – Oct 2025" },
    description: {
      tr: "FPGA devre tasarımı, VHDL/Verilog ile sentez ve hata ayıklama çalışmaları.",
      en: "FPGA circuit design, VHDL/Verilog, synthesis and debugging.",
    },
    tags: ["FPGA", "VHDL", "Verilog"],
  },
  {
    role: {
      tr: "İş Geliştirme Stajyeri",
      en: "Business Development Intern",
    },
    company: "Baltech Green Enerji Yatırımları",
    period: { tr: "Haz – Ağu 2025", en: "Jun – Aug 2025" },
    description: {
      tr: "Pazar araştırması, yenilenebilir enerji ve stratejik iş birlikleri.",
      en: "Market research, renewable energy, and strategic partnerships.",
    },
    tags: ["Renewable Energy", "Market Research"],
  },
  {
    role: { tr: "Araştırma Asistanı", en: "Research Assistant" },
    company: "İstanbul Bilgi Üniversitesi",
    period: { tr: "Ara 2024 – Nis 2025", en: "Dec 2024 – Apr 2025" },
    description: {
      tr: "Yansıtıcı yüzeylerle çift taraflı (bifacial) güneş paneli verimliliği üzerine deneysel veri toplama.",
      en: "Bifacial solar panel efficiency with reflective surfaces; experimental data collection.",
    },
    tags: ["Solar", "Research", "Data"],
  },
  {
    role: { tr: "Otomasyon Stajyeri", en: "Automation Intern" },
    company: "GRS Otomasyon Danışmanlık",
    period: { tr: "Tem – Eyl 2024", en: "Jul – Sep 2024" },
    description: {
      tr: "Endüstriyel otomasyon, Siemens PLC ve çimento fabrikasında Python betikleri.",
      en: "Industrial automation, Siemens PLC, and Python scripting at a cement factory.",
    },
    tags: ["PLC", "Siemens", "Python"],
  },
  {
    role: {
      tr: "Serbest Full-Stack & Mobil Geliştirici",
      en: "Freelance Full-Stack & Mobile Developer",
    },
    company: "Evde · Amphion · YouRauc · SuperApp Labs",
    period: { tr: "Oca 2023 – Oca 2025", en: "Jan 2023 – Jan 2025" },
    description: {
      tr: "React Native, Node.js, AR, OpenAI API, WebSockets, canlı açık artırmalar ve uygulama içi ödemeler.",
      en: "React Native, Node.js, AR, OpenAI API, WebSockets, live auctions, and in-app payments.",
    },
    tags: ["React Native", "Node.js", "WebSockets", "OpenAI"],
  },
  {
    role: {
      tr: "Mobil & Frontend Geliştirici",
      en: "Mobile & Frontend Developer",
    },
    company: "Harvestrolley",
    period: { tr: "Mar 2022 – Eyl 2023", en: "Mar 2022 – Sep 2023" },
    description: {
      tr: "ABD merkezli market e-ticaret platformu: müşteri, toplayıcı (picker) ve teslimat uygulamaları ile yönetim paneli.",
      en: "US-based grocery e-commerce: customer, picker, and delivery apps plus an admin panel.",
    },
    tags: ["React", "React Native", "Expo"],
  },
];

export interface EducationEntry {
  degree: LocalizedText;
  school: string;
  period: string;
  gpa: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    degree: {
      tr: "Enerji Sistemleri Mühendisliği",
      en: "Energy Systems Engineering",
    },
    school: "İstanbul Bilgi Üniversitesi",
    period: "2020 – 2025",
    gpa: "3.08",
  },
  {
    degree: {
      tr: "Elektrik-Elektronik Mühendisliği",
      en: "Electrical & Electronics Engineering",
    },
    school: "İstanbul Bilgi Üniversitesi",
    period: "2021 – 2026",
    gpa: "~3.01",
  },
];

/** Helper to read a localized field. */
export function pick(text: LocalizedText, lang: Lang): string {
  return text[lang];
}
