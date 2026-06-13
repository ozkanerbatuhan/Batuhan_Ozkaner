import { Project } from "@/lib/types";

/**
 * Canonical list of manually-curated projects.
 *
 * This array is the single source of truth for projects that are NOT public
 * GitHub repos. It is used as a graceful fallback for the public site when
 * Supabase is not configured, and it mirrors `supabase/seed.sql`.
 */
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "seed-harvestrolley",
    title: "Harvestrolley",
    description:
      "Trendyol-like grocery marketplace for the US market. Includes a customer app, Picker App, Delivery App, and admin panel. Built with React Native, Expo, and Node.js.",
    description_tr:
      "ABD pazarı için Trendyol benzeri market e-ticaret platformu. Müşteri uygulaması, Picker (toplayıcı) ve Delivery (teslimat) uygulamaları ile yönetim panelini içerir. React Native, Expo ve Node.js ile geliştirildi.",
    type: "github_private",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["React Native", "Expo", "Node.js", "React"],
    is_visible: true,
    display_order: 1,
  },
  {
    id: "seed-yourauc",
    title: "YouRauc",
    description:
      "Dutch-style live auction mobile application with real-time bidding over WebSockets. Built with React Native, Node.js, and Firebase.",
    description_tr:
      "Hollanda usulü, WebSocket üzerinden gerçek zamanlı teklif veren canlı açık artırma mobil uygulaması. React Native, Node.js ve Firebase ile geliştirildi.",
    type: "github_private",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["React Native", "Node.js", "Firebase", "WebSockets"],
    is_visible: true,
    display_order: 2,
  },
  {
    id: "seed-tattoo",
    title: "Tattoo Creator AI Generator",
    description:
      "AI-powered tattoo design app, built end-to-end from UI/UX design to backend integration and published on the App Store.",
    description_tr:
      "Yapay zeka destekli dövme tasarım uygulaması; UI/UX tasarımından backend entegrasyonuna kadar uçtan uca geliştirilip App Store'da yayınlandı.",
    type: "app_store",
    github_repo_url: null,
    app_store_url:
      "https://apps.apple.com/us/app/tattoo-creator-ai-generator/id6754667068",
    tech_stack: ["React Native", "Expo", "OpenAI", "Node.js"],
    is_visible: true,
    display_order: 3,
  },
  {
    id: "seed-funfacts",
    title: "Fun Facts Quiz: Brain Training",
    description:
      "Independently developed knowledge quiz and brain-training mobile app, live on the App Store.",
    description_tr:
      "Bağımsız olarak geliştirilen, App Store'da yayında olan bilgi yarışması ve beyin jimnastiği uygulaması.",
    type: "app_store",
    github_repo_url: null,
    app_store_url:
      "https://apps.apple.com/us/app/fun-facts-quiz-quiz-game/id6742404230",
    tech_stack: ["React Native", "Expo"],
    is_visible: true,
    display_order: 4,
  },
  {
    id: "seed-closet",
    title: "Digital Closet: Outfit Planner",
    description:
      "A digital wardrobe organizer that lets users catalog their clothes and plan outfits.",
    description_tr:
      "Kullanıcıların kıyafetlerini dijital ortamda organize ederek kombin planlamalarına olanak tanıyan dijital gardırop uygulaması.",
    type: "app_store",
    github_repo_url: null,
    app_store_url:
      "https://apps.apple.com/us/app/digital-closet-outfit-planner/id6742709623",
    tech_stack: ["React Native", "Expo"],
    is_visible: true,
    display_order: 5,
  },
  {
    id: "seed-fpga-nn",
    title: "FPGA-based Real-Time Neural Network Inference",
    description:
      "Ultra-low-latency (<50µs) neural network inference on Xilinx FPGAs for high-frequency trading. TensorFlow models are translated to VHDL and run over a direct PL Ethernet connection.",
    description_tr:
      "Yüksek frekanslı işlem (HFT) için Xilinx FPGA üzerinde 50µs altı ultra düşük gecikmeli sinir ağı çıkarımı. TensorFlow modelleri VHDL'e çevrilip doğrudan PL Ethernet bağlantısı üzerinden çalıştırılır.",
    type: "hardware",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["FPGA", "VHDL", "TensorFlow", "Vitis"],
    is_visible: true,
    display_order: 6,
  },
  {
    id: "seed-hyperloop",
    title: "Teknofest Hyperloop",
    description:
      "Two years as Team Leader & Software Lead, building a magnetic-levitation pod from scratch. ANSYS Maxwell, SolidWorks, custom PCB (DipTrace), and Raspberry Pi telemetry.",
    description_tr:
      "İki yıl Takım Lideri ve Yazılım Lideri olarak sıfırdan manyetik levitasyonlu pod üretimi. ANSYS Maxwell, SolidWorks, özel PCB (DipTrace) ve Raspberry Pi telemetri.",
    type: "hardware",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["ANSYS", "SolidWorks", "DipTrace", "Raspberry Pi", "Python"],
    is_visible: true,
    display_order: 7,
  },
  {
    id: "seed-solar-ml",
    title: "Solar Power Plants Power Output Predictions",
    description:
      "Full-stack ML system (Random Forest) for solar output forecasting, exposed as a FastAPI + Docker REST API with PostgreSQL job management.",
    description_tr:
      "Güneş enerjisi üretim tahmini için tam yığın ML sistemi (Random Forest); FastAPI + Docker REST API ve PostgreSQL iş yönetimi ile sunulur.",
    type: "github_private",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["Python", "scikit-learn", "FastAPI", "Docker", "PostgreSQL"],
    is_visible: true,
    display_order: 8,
  },
  {
    id: "seed-esp32-health",
    title: "ESP32 Health Wristband",
    description:
      "A wearable device that tracks daily health data and activity metrics, developed with a commercial product vision on ESP32 and embedded C.",
    description_tr:
      "Günlük sağlık verilerini ve aktivite metriklerini takip eden, ticari ürün vizyonuyla ESP32 ve gömülü C ile geliştirilen giyilebilir cihaz.",
    type: "hardware",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["ESP32", "Embedded C"],
    is_visible: true,
    display_order: 9,
  },
  {
    id: "seed-esp32-locate",
    title: "ESP32 Wi-Fi Positioning",
    description:
      "An ESP32-based project that determines location over Wi-Fi signals.",
    description_tr:
      "Wi-Fi sinyalleri üzerinden konum belirleyebilen ESP32 tabanlı proje.",
    type: "hardware",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["ESP32", "Embedded C", "Wi-Fi"],
    is_visible: true,
    display_order: 10,
  },
  {
    id: "seed-drone-mesh",
    title: "Drone & UGV Autonomous Mesh Network",
    description:
      "An autonomous mesh communication network for UAVs and UGVs in the field. Physical assembly and soldering of the aircraft done by hand.",
    description_tr:
      "İHA ve İKA'ların sahada kesintisiz haberleşmesini sağlayan otonom mesh ağı. Hava araçlarının fiziksel montaj ve lehimlemesi bizzat yapıldı.",
    type: "hardware",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["Mesh", "Embedded C", "Drones"],
    is_visible: true,
    display_order: 11,
  },
  {
    id: "seed-energy-agent",
    title: "Energy Direction Agent",
    description:
      "Open-source autonomous agent for optimizing energy data flow and management.",
    description_tr:
      "Enerji veri akışını ve yönetimini optimize etmek için geliştirilen açık kaynaklı otonom ajan.",
    type: "github_open",
    github_repo_url: "https://github.com/ozkanerbatuhan",
    app_store_url: null,
    tech_stack: ["Python", "AI Agent", "Energy"],
    is_visible: true,
    display_order: 12,
  },
  {
    id: "seed-data-annotation",
    title: "Data Annotation Tool",
    description:
      "A test-case tool for managing data-labeling workflows.",
    description_tr:
      "Veri etiketleme süreçlerini yönetmek için geliştirilen test amaçlı yazılım aracı.",
    type: "github_private",
    github_repo_url: null,
    app_store_url: null,
    tech_stack: ["TypeScript", "React", "Node.js"],
    is_visible: true,
    display_order: 13,
  },
];
