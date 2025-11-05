# 🧭 Unelma Platforms Redesign

> **Final Project — Business College Helsinki (Full Stack Web Developer Program)**  
> Duration: Oct–Dec 2025  
> Team: 4 members

---

## 🌐 Overview

This project is a **redesign of Unelma Platforms** (https://www.unelmaplatforms.com/), focusing on:

- ⚡ **Performance Optimization** (Target load time < 3s)
- 🎨 **Visual & Brand Alignment** (Modern, clean design)
- 🔍 **SEO & Accessibility Compliance**
- 📱 **Mobile-First Responsive Design**
- 🔗 **Newsletter API Integration (Unelma Mail)**
- 🧩 **Headless Architecture (Next.js + Strapi)**

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (React) |
| **Styling** | MUI + Custom CSS |
| **Backend** | Strapi (Headless CMS) + Supabase (Database) |
| **Deployment** | Vercel (Frontend) + Render (Backend) |
| **Version Control** | GitHub (Organization: `unelma-team2`) |
| **Design Tool** | Figma (Mobile & Desktop wireframes) |

---

## ⚙️ Getting Started (Frontend)

**Step 1: Clone the repository**
```bash
git clone https://github.com/unelma-team2/unelma-frontend.git
cd unelma-frontend
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Set up environment variables**
Create a .env.local file in the project root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:1337
```
(Update this URL to the deployed backend once available.)

**Step 4: Run the development server**
```bash
npm run dev
```

**Step 5: Visit the local site**
http://localhost:3000

## 🧱 Project Structure

## 🧱 Project Structure

```text
app/
├── products/      # Products & Services showcase page
├── blog/          # Blog list and single blog pages
├── case-studies/  # “Coming Soon” placeholder
├── about/         # About page
├── careers/       # “Coming Soon” placeholder
├── contact/       # Contact page
└── page.js        # Home page
```

## 🧩 Environment Files

| File | Purpose |
|------|----------|
| `.env.local` | Local development (ignored by Git) |
| `.env.example` | Example template for teammates |

## 🚀 Deployment Notes
	•	Frontend: Deployed on Vercel￼
	•	Backend: To be deployed on Strapi Cloud / Render
	•	Update NEXT_PUBLIC_API_URL in .env.local when backend is live.

## 📚 Team Focus (Sprint 1)

*(Roles may rotate each sprint based on workload and interest.)*

| Member | Focus This Sprint |
|---------|------------------|
| **TJ** | Frontend setup, documentation |
| **Suganya** | Backend setup, Supabase integration |
| **Fizza** | Mobile wireframes |
| **Saara** | Desktop wireframes |

## 🧪 Current Sprint Focus (Sprint 1)
	•	✅ Frontend & backend repo setup
	•	✅ Blog connected with local Strapi
	•	✅ .env.example and README created
	•	🚧 Supabase + backend deployment in progress
	•	🚧 Mobile-first and desktop wireframes in Figma

## ✅ Next Steps (Sprint 2 Preview)
	•	Implement Figma UI design in frontend
	•	Deploy backend & connect to Supabase
	•	Add full navigation and “Coming soon” pages
	•	Integrate Unelma Mail newsletter signup

## 📚 Credits

👩‍💻 Developed collaboratively by Team 2 — Unelma Platforms Redesign
Business College Helsinki, 2025