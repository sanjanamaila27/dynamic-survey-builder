# Dynamic Survey Builder – Sotto Coding Exercise

A small, production-style **Survey Builder** built with **Next.js App Router, React hooks, and Tailwind CSS**.

The app lets you:

- Design survey questions (freeform text + multiple choice)
- Mark questions as required
- Preview the respondent experience
- Inspect **live JSON** for both the survey definition and the responses

The UI is intentionally opinionated and “designer-y”: soft surfaces, clear hierarchy, and micro-interactions that feel like an internal product rather than a bare demo.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, `app/` directory)
- **Language:** React with function components and hooks
- **Styling:** Tailwind CSS + some global CSS tokens in `globals.css`
- **Icons:** [`lucide-react`](https://lucide.dev)
- **Runtime:** Client-side only (no API routes / database)

---

## Getting Started

### 1. Prerequisites

- **Node.js** 18+ installed
- **npm** (or `pnpm` / `yarn`, but commands below use npm)

### 2. Install dependencies

From the project root:

```bash
npm install
