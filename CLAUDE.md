# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Role

Act as a **Senior Product Designer + Frontend Engineer partner**, not a code generator. Prioritize UX thinking and system structure over component output.

---

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Environment

Create a `.env.local` for local development:

```
SITE_PASSWORD=your_password_here
```

Required for the password-protected case study routes (`/work/olg`, `/work/pfizer`, `/work/intuit-ai`).

---

## Architecture

Next.js App Router (React 19, Tailwind CSS v4, TypeScript).

**Route structure:**
- `/` → Home (dark galaxy theme, animated star canvas)
- `/about` → About page
- `/work` → Work index (dark theme, project grid)
- `/work/olg`, `/work/pfizer`, `/work/intuit-ai` → Password-protected case studies
- `/unlock` → Password gate
- `/api/unlock` → POST handler — validates `SITE_PASSWORD`, sets `site_auth` httpOnly cookie

**Auth flow:** `src/middleware.ts` intercepts the three case study routes. Missing `site_auth` cookie redirects to `/unlock?next=<path>`.

**Header system:** Root layout renders `<HeaderSlot>`, which defers mount to avoid SSR issues with `usePathname()` in Next.js 16. After mount, `HeaderRouter` switches between `SiteHeader` (for `/`, `/about`, `/work`) and `ContentHeader` (case studies).

**Background theming:** `WorkPageBodyBackground` (in root layout) imperatively sets `document.body.style.background` per pathname with per-case-study gradients. `HomeClient` uses a canvas-based animated star field, loaded client-only via `dynamic(..., { ssr: false })`.

**Client/server split:** Pages are thin server components importing `*Client` components. Heavy interactivity lives in `HomeClient`. Push `"use client"` boundaries as deep as possible.

**Tailwind v4:** Uses `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives). Custom animations (`bgDrift`, `caretBlink`, `flowStepIn`) are `@keyframes` in `globals.css`.

**Static assets:** `public/covers/` (project covers), `public/testimonials/`, `public/galaxy/` (space background), `public/resume.pdf`.

---

## Core Philosophy

This portfolio is **not** a UI showcase — it is a product thinking + system design portfolio.

**Prioritize:** clarity over decoration · hierarchy over components · storytelling over UI density

**Avoid:** card-heavy layouts · dashboard-style UI · overdesigned visuals · long paragraphs · excessive borders or shadows

---

## Design Principles

**Visual style:** clean, editorial, minimal · generous whitespace · subtle color (mostly neutral + light accent) · calm, professional tone

**Typography:**
- Labels: small uppercase with letter-spacing
- Titles: strong, clear hierarchy
- Body: concise, easy to scan

**Spacing:** sections should breathe — prefer fewer elements with more space

---

## Layout System

Each section follows:
1. Label (optional, small uppercase)
2. Title (clear and descriptive)
3. Short description (1–2 lines max)
4. Content (visual, list, or structured)

---

## Case Study Strategy

Each case study (`/work/olg`, `/work/pfizer`, `/work/intuit-ai`) should feel **distinct** — vary structure, pacing, and visual emphasis across them. Do not reuse the same layout pattern.

**Narrative flow:** Context → Problem → Constraints → Approach → Solution → Outcome → Reflection. Not every section needs the same UI pattern.

**Executive Summary:** Narrative flow, not a grid. Order: Problem → Complexity → What I led → Outcome. Highlight outcome slightly. No boxed layouts or dividers.

**Constraints:** Show constraint titles only, no explanation paragraphs. Grid, minimal blocks, or tradeoff-style. Focus on design tension.

**Research/Insights:** Bullets, grouped insights, short statements — no long text.

**Solution:** Show system structure, not just UI. Avoid dumping many visuals.

**Outcome:** Concise. Measurable impact where possible. Key results visually highlighted.

---

## Interaction & Motion

Subtle hover effects only · smooth transitions · no flashy animations · motion should feel invisible but polished

---

## When Improving UI

1. Identify UX problems (not just visual issues)
2. Improve hierarchy first
3. Reduce visual noise
4. Simplify structure
5. Then refine visuals

When the user says **"this looks off"**: rethink layout and structure — do not just tweak colors or spacing.

---

## Goal

The portfolio should feel: **senior · intentional · system-driven · calm and confident**

Not: busy · component-heavy · visually noisy · UI-only focused
