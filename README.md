# Mahmudul Haque Sakib — Portfolio

A premium, dark-themed personal portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Syne (display) + DM Sans (body) + JetBrains Mono (code)
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Design system, fonts, animations
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Main page — assembles all sections
├── components/
│   ├── ui/
│   │   └── Section.tsx      # Reusable animated section wrapper
│   └── sections/
│       ├── Navbar.tsx        # Sticky navbar with active section tracking
│       ├── Hero.tsx          # Hero with animated gradient orbs
│       ├── About.tsx         # Bio + trait cards
│       ├── Skills.tsx        # Tech stack grouped by category
│       ├── Projects.tsx      # Expandable project cards
│       ├── Research.tsx      # Publications with abstract toggles
│       ├── Experience.tsx    # Timeline work history
│       ├── Education.tsx     # Education cards with GPA
│       ├── Achievements.tsx  # Awards, scholarships, certifications
│       ├── LookingFor.tsx    # Career interests section
│       ├── Contact.tsx       # Contact with email copy + social links
│       └── Footer.tsx        # Footer with back-to-top
├── data/
│   └── index.ts             # ✏️ ALL editable portfolio content lives here
├── lib/
│   └── utils.ts             # Utility functions (cn)
├── types/
│   └── index.ts             # TypeScript interfaces
└── public/
    └── Mahmudul_Haque_Sakib_CV_ML.pdf   # ← Place your resume PDF here
```

## ⚙️ Local Setup

### 1. Install dependencies

```bash
cd portfolio
npm install
```

### 2. Add your resume PDF

Place your resume at:
```
public/Mahmudul_Haque_Sakib_CV_ML.pdf
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## ✏️ Customizing Content

**All portfolio content lives in `data/index.ts`.**

Edit that single file to update:
- Personal info (`siteConfig`)
- Projects
- Experience
- Education
- Achievements
- Publications
- Skills

No component code changes needed for content updates.

## 🌐 Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option B — GitHub + Vercel Dashboard

1. Push to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click **Deploy** — zero configuration needed

### Option C — One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🎨 Design Customization

### Colors

Edit `tailwind.config.ts` → `theme.extend.colors`:

```ts
accent: {
  cyan: '#00D4FF',    // Primary accent — change this for a different vibe
  blue: '#0066FF',
  teal: '#00B4A6',
}
```

### Fonts

Edit `app/globals.css` → change the Google Fonts `@import` URL and update the CSS variables.

### Sections

To hide a section, simply remove its import and JSX tag from `app/page.tsx`.

## 📋 Sections

| # | Section | ID |
|---|---------|-----|
| 1 | Navbar | — |
| 2 | Hero | `#hero` |
| 3 | About | `#about` |
| 4 | Skills | `#skills` |
| 5 | Projects | `#projects` |
| 6 | Research | `#research` |
| 7 | Experience | `#experience` |
| 8 | Education | `#education` |
| 9 | Achievements | `#achievements` |
| 10 | Looking For | `#looking-for` |
| 11 | Contact | `#contact` |

## 📄 License

Personal use. Please don't distribute as a template without permission.
