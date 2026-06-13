# Batuhan Özkaner — Portfolio

Çift anadal mühendis (Enerji Sistemleri + Elektrik-Elektronik) ve full-stack
geliştirici için kişisel portfolyo sitesi. Türkçe/İngilizce dil desteği, koyu/açık
tema ve proje görünürlüğünü yöneten bir admin paneli içerir.

> **EN:** Personal portfolio for a double-major engineer and full-stack developer,
> with TR/EN i18n, dark/light theme, and an admin dashboard for project visibility.

## Teknoloji Yığını

| Katman      | Teknoloji                                            |
| ----------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + TypeScript                 |
| Stil        | Tailwind CSS v4 + el yapımı shadcn tarzı bileşenler  |
| Veritabanı  | Supabase (Postgres) — proje verileri + admin auth    |
| Kimlik      | Supabase Auth (e-posta/parola, tek admin)            |
| Entegrasyon | GitHub REST API (public repolar) + ISR cache         |
| Animasyon   | Framer Motion                                        |
| Dağıtım     | Vercel (ücretsiz katman)                             |

## Özellikler

- **Hero / Hakkımda** — isim, başlık, biyografi, GitHub/e-posta linkleri ve App
  Store uygulama rozetleri.
- **Yetenekler** — kategorilere ayrılmış teknoloji etiketleri.
- **Deneyim** — dikey zaman çizelgesi (timeline).
- **Projeler (ana özellik)** — `Tümü | Mobil | Donanım | AI/ML | Web | Açık Kaynak`
  filtre sekmeleri. GitHub public repoları canlı çekilir (yıldız/dil/güncelleme),
  manuel projeler Supabase'ten gelir. `is_visible=false` olanlar herkese açık
  görünümde **tamamen gizlenir**.
- **Eğitim** ve **İletişim** bölümleri.
- **Admin paneli** (`/admin`) — görünürlük toggle'ı, ekle/düzenle/sil ve tek
  tıkla **GitHub Senkronizasyonu**.
- **TR/EN dil değiştirici** ve **koyu/açık tema**.

> **Demo modu:** Supabase ortam değişkenleri tanımlı değilse site otomatik olarak
> `src/lib/data/fallback-projects.ts` içindeki seçili proje listesini gösterir —
> yani kredensiyal girmeden bile build alınıp deploy edilebilir.

## Kurulum

### 1. Bağımlılıklar

```bash
npm install
```

### 2. Supabase Projesi

1. [supabase.com](https://supabase.com) üzerinde ücretsiz bir proje oluşturun.
2. **SQL Editor**'da sırasıyla şu dosyaları çalıştırın:
   - `supabase/schema.sql` — `projects` tablosu, indeksler, RLS politikaları.
   - `supabase/seed.sql` — public GitHub repo'su olmayan manuel projeler.
3. **Authentication → Users → Add user** ile admin kullanıcıyı oluşturun:
   - E-posta: `ozkanerbatuhan@gmail.com`
   - Bir parola belirleyin ("Auto Confirm User" işaretli olsun).

### 3. Ortam Değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın ve doldurun:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=        # Supabase → Project Settings → API → Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # API → Project API keys → anon public
SUPABASE_SERVICE_ROLE_KEY=       # API → service_role (SADECE SUNUCU — gizli tutun)
GITHUB_TOKEN=                    # opsiyonel — rate limit'i 60→5000/saat çıkarır
```

> `GITHUB_TOKEN`: GitHub → Settings → Developer settings → Personal access tokens
> üzerinden public repo okuma yetkili bir token. Boş bırakılabilir.

### 4. Geliştirme

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Admin Paneli Kullanımı

| İşlem               | Açıklama                                                            |
| ------------------- | ------------------------------------------------------------------ |
| Görünürlük toggle'ı | Projeyi sitede anında gösterir/gizler (`is_visible` günceller).     |
| Düzenle             | Başlık, açıklama (EN/TR), tür, teknolojiler, linkler, sıra, görünürlük. |
| Sil                 | Projeyi kalıcı olarak siler (onay ister).                          |
| Yeni Proje          | Manuel proje ekler.                                                 |
| GitHub Senkronize   | Public repoları çekip `github_open` olarak tabloya işler. Mevcut    |
|                     | repoların `is_visible` ve `display_order` değerleri korunur.        |

## Vercel'e Dağıtım

1. Projeyi bir GitHub reposuna push'layın.
2. [vercel.com](https://vercel.com) → **New Project** → repoyu seçin.
3. **Environment Variables** bölümüne `.env.local`'daki dört değişkeni ekleyin.
4. **Deploy**. Vercel `next build` çalıştırır; ek yapılandırma gerekmez.

> Supabase **Authentication → URL Configuration** içinde Vercel domain'inizi
> (örn. `https://siteniz.vercel.app`) Site URL / Redirect URLs olarak eklemeyi
> unutmayın.

## Proje Yapısı

```
src/
├─ app/
│  ├─ page.tsx                 # Public ana sayfa (tüm bölümler)
│  ├─ admin/login/             # Giriş sayfası
│  ├─ admin/dashboard/         # Korumalı yönetim paneli
│  └─ api/github/sync/         # GitHub senkronizasyon route'u (service role)
├─ components/
│  ├─ ui/                      # Button, Card, Input, Switch, Modal, Badge...
│  ├─ sections/                # Hero, Skills, Experience, Projects, Education, Contact
│  ├─ admin/                   # Dashboard tablosu + proje formu
│  └─ layout/                  # Navbar, Footer
├─ lib/
│  ├─ i18n/                    # TR/EN sözlükler + dil context'i
│  ├─ data/                    # Statik içerik + fallback projeler
│  ├─ supabase/                # Browser/server/admin client'ları + proxy oturumu
│  ├─ github.ts                # Public repo fetch (ISR 3600s)
│  └─ projects.ts              # DB + GitHub birleştirme/filtreleme
└─ proxy.ts                    # Admin route koruması (Next 16 "proxy")

supabase/
├─ schema.sql                  # Tablo + RLS
└─ seed.sql                    # Manuel projeler
```

## İçeriği Güncelleme

- **Deneyim / Eğitim / Yetenekler / Hero:** `src/lib/data/content.ts`
- **Manuel projeler (DB yokken / seed):** `src/lib/data/fallback-projects.ts`
  ve `supabase/seed.sql`
- **Arayüz metinleri (TR/EN):** `src/lib/i18n/dictionaries.ts`
- **Renk / tema:** `src/app/globals.css`

## Lisans

Kişisel kullanım. © Batuhan Özkaner
