# Windows 98 Retro Portfolio

An interactive, retro Windows 98-themed personal portfolio web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **98.css**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

- **Retro Windows 98 Interface**: Authentic desktop aesthetic powered by `98.css` and custom Windows retro cursors (`.cur`).
- **Window Management System**:
  - Open, close, minimize, restore, and maximize desktop windows.
  - Interactive window dragging (movement) and 8-way border resizing.
  - Z-index management for dynamic window focusing and depth handling.
- **Desktop Icons**: Double-click shortcuts for opening application windows (*About*, *Projects*, *Contact*).
- **Page Loader**: Nostalgic loading screen experience before launching into the desktop workspace.
- **Modern Web Stack**: Built on React 19, TypeScript, Vite 8, Tailwind CSS v4, and Oxlint for ultra-fast performance and type safety.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Frontend UI Library |
| **[TypeScript](https://www.typescriptlang.org/)** | Type Safety & Developer Experience |
| **[Vite 8](https://vitejs.dev/)** | Next Generation Frontend Tooling |
| **[98.css](https://jdan.github.io/98.css/)** | Design system for building faithful Windows 95/98 UIs |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first CSS framework |
| **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** | High-performance JavaScript/TypeScript linter |

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── cursors/          # Retro Windows cursor assets (.cur)
│   ├── desktopIcons/     # Application icon assets (.ico)
│   └── images/           # Wallpaper and media assets
├── src/
│   ├── components/
│   │   ├── windowContent/# Individual window application views (About, Projects, Contact)
│   │   └── Window.tsx    # Reusable draggable & resizable window wrapper component
│   ├── hooks/
│   │   └── useWindowManager.ts  # Custom state manager for desktop windows
│   ├── lib/
│   │   └── enums.ts      # Window type definitions and constants
│   ├── Desktop.tsx       # Main desktop workspace component
│   ├── PageLoader.tsx    # Boot/loader component
│   ├── index.css         # Global styles & Tailwind imports
│   └── main.tsx          # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hkayrad/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server with HMR.
- `npm run build` - Runs TypeScript checks (`tsc -b`) and builds the production bundle.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs `oxlint` for fast code linting.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
