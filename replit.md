# PayMail - Invoice Management Interface

## Overview
A Gmail-style invoice management interface built with Next.js (App Router). Replicates Gmail's visual design and interaction patterns for managing invoices.

## Recent Changes
- **Feb 2026**: Migrated from React/Vite + Express to Next.js App Router
- Custom server entry at `server/index.ts` runs Next.js via `tsx`

## Project Architecture
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React

### Directory Structure
```
src/
  app/
    layout.tsx      - Root layout with Inter font and dark theme
    page.tsx        - Main invoice inbox page (client component)
    globals.css     - Global styles and CSS variables
    not-found.tsx   - 404 page
  components/
    ui/             - shadcn/ui components
    invoices/       - InvoiceList.tsx, InvoiceDetail.tsx
    layout/         - Header.tsx, Sidebar.tsx
  lib/
    mock-data.ts    - Invoice types and mock data
    utils.ts        - cn() utility
  hooks/
    use-mobile.tsx  - Mobile breakpoint hook
    use-toast.ts    - Toast notification hook
server/
  index.ts          - Custom Next.js server entry point
public/
  favicon.png
```

### Key Features
- Inbox view with read/unread states (white bg + bold vs gray bg)
- Invoice detail panel with document preview
- Vendor status badges (Top, Regular, Periodical, Known, Unknown, Caution)
- Filtering tabs: Primary, Regular, Urgent, Caution
- Bulk selection with checkbox operations
- Dark/light theme toggle
- Gmail-style hover effects and action menus

### Dev Server
- Runs via: `npm run dev` → `tsx server/index.ts` (custom Next.js server)
- Port: 5000 (bound to 0.0.0.0)

## User Preferences
- Dark theme by default
- Gmail-inspired visual design
- Hover-only visibility for secondary information
