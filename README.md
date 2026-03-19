# 🏡 PrimeEstate India

> Tricity's most trusted premium real estate platform — built with React & Vite

[![MIT License](https://img.shields.io/badge/License-MIT-C9A84C.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

![PrimeEstate India — Hero Screenshot](./screenshots/hero.png)

## 📌 About

**PrimeEstate India** is a full-featured real estate web application focused on the **Chandigarh Tricity region** (Chandigarh · Mohali · Panchkula · New Chandigarh). It showcases luxury properties, facilitates property enquiries, and provides a rich browsing experience for buyers, renters, and NRI investors.

Built entirely with React 18 and Vite — zero CSS frameworks, no UI libraries. Every design token, animation, and component is hand-crafted.

---

## ✨ Features

| Category        | Details |
|-----------------|---------|
| 🏠 **Listings**   | Grid & list view, advanced sidebar filters (city, type, BHK, max budget) |
| 🔍 **Search**     | Real-time full-text search across properties, sectors, and cities |
| ❤️ **Favourites** | Save properties with `localStorage` persistence across sessions |
| 🏢 **Agents**     | Rich agent profiles with specialties, stats, call & email CTAs |
| 📝 **Enquiry**    | Contact forms on property detail pages with field validation |
| 🔐 **Auth**       | Sign In / Register modal with client-side validation |
| 📊 **Dashboard**  | User portal for saved listings, enquiries, and profile editing |
| 📋 **List Property** | 3-step validated wizard for submitting a new listing |
| 📰 **Blog**       | Market intelligence articles and investment guides |
| 📱 **Responsive** | Mobile-first, fully responsive across all breakpoints |
| 🇮🇳 **India-first** | INR formatting (Cr/L notation), RERA badges, WhatsApp CTA, tricolour accents |

---

## 🛠 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | React 18 (functional components + hooks) |
| Bundler     | Vite 5 |
| Styling     | CSS custom properties (design tokens) — no external CSS library |
| Icons       | Custom inline SVG library (`src/components/Icon.jsx`) |
| Fonts       | Cormorant Garamond (display) + DM Sans (body) via Google Fonts |
| State       | `useState`, `useCallback`, custom hooks |
| Persistence | `localStorage` (favourites) |
| Routing     | Custom page switcher (no React Router — suitable for SPA with this complexity) |

---

## 📂 Project Structure

```
primeestate-india/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable UI primitives
│   │   ├── AuthModal.jsx    # Login / Register modal with validation
│   │   ├── EnquiryForm.jsx  # Property enquiry form
│   │   ├── Footer.jsx       # Site footer with link columns
│   │   ├── Icon.jsx         # Inline SVG icon library
│   │   ├── Navbar.jsx       # Sticky nav with scroll transition
│   │   ├── PropertyCard.jsx # Listing card with favourite toggle
│   │   └── Toast.jsx        # Auto-dismiss notification
│   │
│   ├── pages/               # Page-level components (one per route)
│   │   ├── HomePage.jsx
│   │   ├── ListingsPage.jsx
│   │   ├── PropertyDetailPage.jsx
│   │   ├── AgentsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── FavouritesPage.jsx
│   │   ├── ListPropertyPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── UserDashboard.jsx
│   │
│   ├── data/
│   │   └── index.js         # Static seed data (properties, agents, blog posts)
│   │
│   ├── hooks/
│   │   ├── useFavorites.js  # localStorage-backed favourites state
│   │   └── useToast.js      # Toast notification state
│   │
│   ├── utils/
│   │   └── formatters.js    # formatPrice, formatPricePerSqft, clipboard
│   │
│   ├── styles.css           # Global design tokens + utility classes
│   ├── App.jsx              # Root component — routing & global state
│   └── main.jsx             # React DOM entry point
│
├── .env.example             # Environment variable template
├── .gitignore
├── index.html               # HTML shell with SEO + OG tags
├── vite.config.js
├── package.json
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18  
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/primeestate-india.git
cd primeestate-india

# 2. Install dependencies
npm install

# 3. Copy environment variables template
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command         | Description |
|-----------------|-------------|
| `npm run dev`   | Start development server (HMR enabled) |
| `npm run build` | Build optimised production bundle → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`  | Run ESLint across all JS/JSX files |

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Home / Hero with search | `screenshots/home.png` |
| Property Listings + Filters | `screenshots/listings.png` |
| Property Detail Page | `screenshots/detail.png` |
| Agent Profiles | `screenshots/agents.png` |
| User Dashboard | `screenshots/dashboard.png` |
| List Property Wizard | `screenshots/list-property.png` |
| Mobile Navigation | `screenshots/mobile.png` |

> 📸 To add screenshots: run `npm run dev`, take full-page screenshots, and place them in a `screenshots/` folder.

---

## 🔮 Roadmap & Future Improvements

### High Priority
- [ ] **Supabase backend** — Real auth (JWT), live properties database, storage for photos
- [ ] **Google Maps / Mapbox** — Interactive property pin map replacing the placeholder
- [ ] **Image uploads** — Cloudinary integration for property photo management

### Medium Priority
- [ ] **EMI Calculator** — In-page home loan calculator using RBI base rates
- [ ] **WhatsApp Live Chat** — Per-property deep-link to agent WhatsApp
- [ ] **React Router** — URL-based routing for shareable deep links (e.g. `/listings/sector-9-chandigarh`)
- [ ] **Unit tests** — Vitest + React Testing Library for utility functions and components

### Nice to Have
- [ ] **PWA** — Service workers for offline browsing and push notifications
- [ ] **i18n** — Hindi / Punjabi language support via `react-i18next`
- [ ] **3D Property Tours** — Matterport embed integration on detail pages
- [ ] **AI Property Matcher** — "Tell us what you need" → AI-powered property recommendations

---

## 🌟 What Makes This Project Stand Out

### 1. No CSS Framework
The entire design system is hand-built with CSS custom properties (`var(--gold)`, `var(--obsidian)`, etc.). This demonstrates genuine CSS architecture knowledge — not just the ability to use Bootstrap or Tailwind.

### 2. India-Specific Financial Formatting
The `formatPrice()` utility correctly converts rupee values to Crore (Cr) and Lakh (L) notation, the standard for Indian real estate. Per-sqft pricing is also displayed — how professionals evaluate property value in India.

### 3. Production-Quality Folder Architecture
Modular separation of `data/`, `hooks/`, `utils/`, `components/`, and `pages/` mirrors how real teams structure React codebases. Every file has a JSDoc header, single responsibility, and is independently importable.

---

## 🚀 Deploying

### Vercel (Recommended — free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the dist/ folder to app.netlify.com/drop
```

### GitHub Pages
```bash
# In vite.config.js, set base: '/your-repo-name/'
npm run build
# Push dist/ to the gh-pages branch
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

### Commit Message Convention
```
feat:     New feature
fix:      Bug fix
refactor: Code restructuring (no behaviour change)
style:    Formatting, CSS changes
docs:     README or comment updates
chore:    Dependency updates, config changes
```

---

## 📄 License

MIT © 2026 PrimeEstate India — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with ❤️ for the Chandigarh Tricity</strong><br/>
  <sub>Chandigarh · Mohali · Panchkula · New Chandigarh</sub>
</div>
