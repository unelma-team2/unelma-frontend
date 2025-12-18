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
| **Deployment** | Frontend: Local (presentation) • Backend: Strapi deployed on Render (URL withheld) |
| **Version Control** | GitHub (Organization: `unelma-team2`) |
| **Design Tool** | Figma (Wireframes) |

---

## 👥 Contributors

- TJ — @TJsohn  
- Suganya — @SuganyaPrabagarane  
- Saara — @SaaraRi  
- Fizza — @Fizzaishfaq110

All team members contributed across design, development, testing and project coordination.

---

## 🏃‍♀️ Run the project (local demo)

You can run the frontend locally and point it either to the deployed Strapi backend (managed by the team) or to a local Strapi instance (if you have access to the backend repo).

1) Clone & install
```bash
git clone https://github.com/unelma-team2/unelma-frontend.git
cd unelma-frontend
npm install
```

2) Environment variables
Create a `.env.local` in the project root. Minimum required keys:

```env
# Use the deployed backend URL (ask maintainers for the Render URL)
NEXT_PUBLIC_API_URL=https://<your-strapi-render-url>

# If you need to test Supabase auth locally, set anon key (do NOT expose service_role)
NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Optional: if Strapi requires a read token for public API
NEXT_PUBLIC_STRAPI_API_TOKEN=<optional_read_token>
```

Notes:
- If you do NOT have the deployed backend URL, set NEXT_PUBLIC_API_URL=http://localhost:1337 and run a local Strapi instance (see step 4).
- Never commit `.env.local` or secret keys to version control.

3) Start the frontend
```bash
npm run dev
# open http://localhost:3000
```

4) (Optional) Run Strapi locally — only if you have backend repo access
- Clone the backend repo (private). Follow its README to install and create `.env` and database.
- Typical commands (may vary by repo):
```bash
git clone git@github.com:unelma-team2/unelma-backend.git
cd unelma-backend
npm install
cp .env.example .env   # update DB credentials
npm run develop
# Strapi typically runs at http://localhost:1337
```
- Then point frontend to `http://localhost:1337` in `.env.local`.

5) OAuth / Supabase notes (for local demo)
- Ensure Supabase redirect URLs include:
  - `http://localhost:3000/login`
- Use the anon key in the frontend. Keep the service_role key on the server only.

6) Quick test checklist
- Load home and product pages.
- Add items to cart (guest), refresh — guest cart persists.
- Click "Process to Checkout" while logged out → login → confirm you return to `/checkout`.
- Change item quantity and verify updates.

If you need the deployed Strapi URL or a demo user account, request it from the maintainers — do not post secrets in the repo.

## 📚 Credits

👩‍💻 Developed collaboratively by Team 2 — Unelma Platforms Redesign
Business College Helsinki, 2025