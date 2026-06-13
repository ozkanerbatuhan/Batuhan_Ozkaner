-- ============================================================================
-- Portfolio — seed data (manually-curated projects)
-- Run AFTER schema.sql. Safe to re-run: existing titles are skipped.
-- ============================================================================

insert into public.projects
  (title, description, description_tr, type, github_repo_url, app_store_url, tech_stack, is_visible, display_order)
values
  ('Harvestrolley',
   'Trendyol-like grocery marketplace for the US market. Includes a customer app, Picker App, Delivery App, and admin panel. Built with React Native, Expo, and Node.js.',
   'ABD pazarı için Trendyol benzeri market e-ticaret platformu. Müşteri uygulaması, Picker (toplayıcı) ve Delivery (teslimat) uygulamaları ile yönetim panelini içerir. React Native, Expo ve Node.js ile geliştirildi.',
   'github_private', null, null,
   array['React Native','Expo','Node.js','React'], true, 1),

  ('YouRauc',
   'Dutch-style live auction mobile application with real-time bidding over WebSockets. Built with React Native, Node.js, and Firebase.',
   'Hollanda usulü, WebSocket üzerinden gerçek zamanlı teklif veren canlı açık artırma mobil uygulaması. React Native, Node.js ve Firebase ile geliştirildi.',
   'github_private', null, null,
   array['React Native','Node.js','Firebase','WebSockets'], true, 2),

  ('Tattoo Creator AI Generator',
   'AI-powered tattoo design app, built end-to-end from UI/UX design to backend integration and published on the App Store.',
   'Yapay zeka destekli dövme tasarım uygulaması; UI/UX tasarımından backend entegrasyonuna kadar uçtan uca geliştirilip App Store''da yayınlandı.',
   'app_store', null, 'https://apps.apple.com/us/app/tattoo-creator-ai-generator/id6754667068',
   array['Swift','SwiftUI','OpenAI'], true, 3),

  ('Fun Facts Quiz: Brain Training',
   'Independently developed knowledge quiz and brain-training mobile app, live on the App Store.',
   'Bağımsız olarak geliştirilen, App Store''da yayında olan bilgi yarışması ve beyin jimnastiği uygulaması.',
   'app_store', null, 'https://apps.apple.com/us/app/fun-facts-quiz-quiz-game/id6742404230',
   array['React Native','Expo'], true, 4),

  ('Digital Closet: Outfit Planner',
   'A digital wardrobe organizer that lets users catalog their clothes and plan outfits.',
   'Kullanıcıların kıyafetlerini dijital ortamda organize ederek kombin planlamalarına olanak tanıyan dijital gardırop uygulaması.',
   'app_store', null, 'https://apps.apple.com/us/app/digital-closet-outfit-planner/id6742709623',
   array['React Native','Expo'], true, 5),

  ('FPGA-based Real-Time Neural Network Inference',
   'Ultra-low-latency (<50us) neural network inference on Xilinx FPGAs for high-frequency trading. TensorFlow models are translated to VHDL and run over a direct PL Ethernet connection.',
   'Yüksek frekanslı işlem (HFT) için Xilinx FPGA üzerinde 50us altı ultra düşük gecikmeli sinir ağı çıkarımı. TensorFlow modelleri VHDL''e çevrilip doğrudan PL Ethernet bağlantısı üzerinden çalıştırılır.',
   'hardware', null, null,
   array['FPGA','VHDL','TensorFlow','Vitis'], true, 6),

  ('Teknofest Hyperloop',
   'Two years as Team Leader & Software Lead, building a magnetic-levitation pod from scratch. ANSYS Maxwell, SolidWorks, custom PCB (DipTrace), and Raspberry Pi telemetry.',
   'İki yıl Takım Lideri ve Yazılım Lideri olarak sıfırdan manyetik levitasyonlu pod üretimi. ANSYS Maxwell, SolidWorks, özel PCB (DipTrace) ve Raspberry Pi telemetri.',
   'hardware', null, null,
   array['ANSYS','SolidWorks','DipTrace','Raspberry Pi','Python'], true, 7),

  ('Solar Power Plants Power Output Predictions',
   'Full-stack ML system (Random Forest) for solar output forecasting, exposed as a FastAPI + Docker REST API with PostgreSQL job management.',
   'Güneş enerjisi üretim tahmini için tam yığın ML sistemi (Random Forest); FastAPI + Docker REST API ve PostgreSQL iş yönetimi ile sunulur.',
   'github_private', null, null,
   array['Python','scikit-learn','FastAPI','Docker','PostgreSQL'], true, 8),

  ('ESP32 Health Wristband',
   'A wearable device that tracks daily health data and activity metrics, developed with a commercial product vision on ESP32 and embedded C.',
   'Günlük sağlık verilerini ve aktivite metriklerini takip eden, ticari ürün vizyonuyla ESP32 ve gömülü C ile geliştirilen giyilebilir cihaz.',
   'hardware', null, null,
   array['ESP32','Embedded C'], true, 9),

  ('ESP32 Wi-Fi Positioning',
   'An ESP32-based project that determines location over Wi-Fi signals.',
   'Wi-Fi sinyalleri üzerinden konum belirleyebilen ESP32 tabanlı proje.',
   'hardware', null, null,
   array['ESP32','Embedded C','Wi-Fi'], true, 10),

  ('Drone & UGV Autonomous Mesh Network',
   'An autonomous mesh communication network for UAVs and UGVs in the field. Physical assembly and soldering of the aircraft done by hand.',
   'İHA ve İKA''ların sahada kesintisiz haberleşmesini sağlayan otonom mesh ağı. Hava araçlarının fiziksel montaj ve lehimlemesi bizzat yapıldı.',
   'hardware', null, null,
   array['Mesh','Embedded C','Drones'], true, 11),

  ('Energy Direction Agent',
   'Open-source autonomous agent for optimizing energy data flow and management.',
   'Enerji veri akışını ve yönetimini optimize etmek için geliştirilen açık kaynaklı otonom ajan.',
   'github_open', 'https://github.com/ozkanerbatuhan', null,
   array['Python','AI Agent','Energy'], true, 12),

  ('Data Annotation Tool',
   'A test-case tool for managing data-labeling workflows.',
   'Veri etiketleme süreçlerini yönetmek için geliştirilen test amaçlı yazılım aracı.',
   'github_private', null, null,
   array['TypeScript','React','Node.js'], true, 13)
on conflict do nothing;
