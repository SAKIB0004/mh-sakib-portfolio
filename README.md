# Mahmudul Haque Sakib Portfolio

> A modern AI/ML portfolio website showcasing research, projects, technical skills, achievements, and career-ready engineering work.

## Overview

This repository contains the source code for my personal portfolio website. It is designed to present my work as an AI/ML engineer in a clear, polished, and professional format.

The site highlights my technical background, featured projects, research publications, certifications, academic journey, achievements, and contact channels in a recruiter-friendly layout. It is built with a modern frontend stack and deployed on Vercel.

## Live Demo

* **Portfolio:** [mhsakib.vercel.app](https://mhsakib.vercel.app/)

## Tagline

**AI/ML engineering, research-driven experimentation, and production-minded system design.**

## Problem Statement

A resume alone often cannot fully show how an engineer thinks, builds, and communicates. This portfolio solves that by providing a structured online presence where visitors can quickly understand:

* who I am and what I specialize in
* the AI/ML systems I have built
* my research and academic work
* the technologies I use
* the roles I am actively looking for
* how to contact me professionally

## Features

* Modern, responsive portfolio design
* Dedicated sections for About, Skills, Projects, Research, Experience, Education, Achievements, Certifications, and Contact
* Featured AI/ML project showcase with GitHub links
* Research and publication highlights
* Recruiter-friendly presentation of skills and career focus
* Downloadable resume
* Contact form and direct contact channels
* Certification gallery and credential listing
* Smooth animations and polished UI interactions
* GitHub Actions based CI/CD workflow for Vercel deployment

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### UI and Developer Experience

* React
* Lucide Icons
* PostCSS

### Deployment and Automation

* Vercel
* GitHub Actions

## Workflow / Architecture

The project follows a component-based structure using the Next.js App Router.

* **`app/`** contains pages, layout, global styles, and API routes
* **`components/sections/`** contains portfolio sections such as Hero, Projects, Research, Contact, and more
* **`components/ui/`** contains reusable UI building blocks
* **`data/`** stores structured content used across the website
* **`public/`** stores static files such as certificates, inspirations, and resume assets
* **`.github/workflows/`** contains CI/CD workflows for preview and production deployments

## Main Sections

The portfolio includes the following major sections:

* Inspiration
* About / Engineering Profile
* Tech Stack
* Projects
* Research
* Experience
* Education
* Achievements
* Certifications
* Career Interests / Opportunities
* Contact

## Featured Project Areas

The website highlights work across several AI/ML domains, including:

* Retrieval-Augmented Generation (RAG)
* Agentic AI systems
* NLP and multilingual text processing
* Computer Vision and Explainable AI
* Streamlit and FastAPI based AI applications
* Production-minded deployment and CI/CD workflows

## Project Structure

```bash
.
├── .github/
│   └── workflows/
│       ├── preview.yml
│       └── production.yml
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── certifications/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Inspiration.tsx
│   │   ├── LookingFor.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Research.tsx
│   │   └── Skills.tsx
│   └── ui/
│       └── Section.tsx
├── data/
│   └── index.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── certificates/
│   ├── inspirations/
│   └── Mahmudul_Haque_Sakib_CV_ML.pdf
├── types/
│   └── index.ts
├── .env.local
├── .gitignore
├── LICENSE
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/SAKIB0004/mh-sakib-portfolio.git
cd mh-sakib-portfolio
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a local environment file:

```bash
.env.local
```

Add the required variables as needed. Example:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

> Update the variable names based on your actual contact form or deployment configuration.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```bash
http://localhost:3000
```

## Production Build

To create a production build locally:

```bash
npm run build
npm start
```

## Deployment Notes

This project is deployed on **Vercel**.

The repository also includes **GitHub Actions workflows** for automated deployment:

* **`preview.yml`** for preview deployments from non-main branches
* **`production.yml`** for production deployment from the `main` branch

Typical deployment flow:

1. Create a feature branch
2. Make changes and push to GitHub
3. Preview workflow runs
4. Merge to `main`
5. Production workflow deploys to Vercel

## API / Main Modules

### Contact API

* `app/api/contact/route.ts`
* Handles contact form submissions through a server-side route

### Section Components

* Portfolio content is organized into reusable section components inside `components/sections/`

### Shared Data Layer

* `data/index.ts` stores reusable content and configuration used across the site

## Demo

### Live Demo

* [Portfolio Website](https://mhsakib.vercel.app/)

This portfolio presents:

* a complete AI/ML-focused professional profile
* featured projects with technical summaries and GitHub links
* research publications and ongoing work
* academic achievements and certifications
* a polished contact and resume access experience

## Future Improvements

* Add project detail pages for each featured project
* Add dark/light theme toggle if needed
* Add blog or technical writing section
* Add analytics dashboard for visitor insights
* Improve SEO metadata and structured data
* Add downloadable case studies for major projects
* Add screenshot assets directly in the repository

## Contributing

This is a personal portfolio project, so external contributions are not expected at the moment.

If you would like to suggest improvements, feel free to open an issue or connect with me directly.

## License

This project is licensed under the terms of the **LICENSE** file included in this repository.

## Author

**Mahmudul Haque Sakib**

* **GitHub:** [SAKIB0004](https://github.com/SAKIB0004)
* **LinkedIn:** [mhsakib0004](https://www.linkedin.com/in/mhsakib0004/)
* **Portfolio:** [mhsakib.vercel.app](https://mhsakib.vercel.app/)
* **Location:** Dhaka, Bangladesh

---

If you find this project helpful or interesting, consider giving the repository a star.
