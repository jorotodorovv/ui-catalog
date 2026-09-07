# `joro-ui` (Personal Component Catalog & Custom shadcn Registry)

A personal React component catalog and custom [shadcn](https://ui.shadcn.com) registry built with **Next.js**, **Bun**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
bun install

# Run the showcase catalog locally
bun run dev

# Build registry static JSON files
bun run build:registry

# Build production bundle + registry
bun run build
```

---

## 📦 How to Import Components into Your Projects

### 1. One-Time Setup in Any Consumer Project
Add your registry to `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "registries": {
    "@joro-ui": "https://joro-ui.vercel.app/r"
  }
}
```

### 2. Install Components & Companion Logic
```bash
npx shadcn add @joro-ui/theme-toggle
```

Or directly via URL (no config needed):
```bash
npx shadcn add https://joro-ui.vercel.app/r/theme-toggle.json
```

**What happens automatically:**
- Places `theme-toggle.tsx` into `src/components/ui/custom/theme-toggle.tsx`
- Places `use-view-transition-theme.ts` into `src/hooks/use-view-transition-theme.ts`
- Installs npm packages: `lucide-react`, `framer-motion`, `next-themes`
- Installs prerequisite shadcn primitives: `button` (if not already installed)

---

## 🤖 In-Repo Antigravity AI Skill

This repository includes a dedicated AI skill in:
```
.agent/skills/registry-publish/SKILL.md
```

You can copy this folder to any project's `.agent/skills/` directory. Once included, you can simply tell the AI in that project:

> *"Publish my theme toggle component to my registry"*

The AI will autonomously trace all imports, companion hooks, and npm dependencies, package them into `ui-catalog`, compile the registry JSON, and update the catalog showcase!
