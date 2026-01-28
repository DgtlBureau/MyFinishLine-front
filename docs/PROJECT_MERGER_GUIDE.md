# Next.js Project Merger Guide

## Overview

This guide documents best practices for merging two Next.js projects, based on the real-world merger of:
- **Main Project**: `MyFinishLine-front` - A full-stack application with authentication, dashboard, and existing landing page
- **Landing Project**: `mfl_project/src` - A new, standalone landing page

---

## Table of Contents

1. [Pre-Merger Checklist](#pre-merger-checklist)
2. [Project Analysis](#project-analysis)
3. [Step-by-Step Merger Process](#step-by-step-merger-process)
4. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
5. [Testing Strategy](#testing-strategy)
6. [Rollback Plan](#rollback-plan)
7. [Post-Merger Cleanup](#post-merger-cleanup)

---

## Pre-Merger Checklist

### 1. Version Control Preparation

- [ ] Create a dedicated branch for the merger (e.g., `feature/landing-page-merger`)
- [ ] Ensure the main branch is stable and all tests pass
- [ ] Tag the current stable version for easy rollback: `git tag pre-merger-v1.0`
- [ ] Document the current state of both projects

### 2. Dependency Audit

Compare `package.json` files for:

| Category | Main Project | Landing Project | Action Required |
|----------|-------------|-----------------|-----------------|
| Next.js | `^16.0.7` | `^16.1.4` | Use higher version |
| React | `^19.2.1` | `^19.0.0` | Compatible |
| lucide-react | `^0.555.0` | `^0.469.0` | Use higher version |
| Tailwind | `^4` | `^4` | Compatible |

**Key Findings from This Merger:**

The main project has many additional dependencies the landing project lacks:
- State management: `@reduxjs/toolkit`, `react-redux`, `redux-persist`
- UI libraries: `@radix-ui/*`, `vaul`, `swiper`, `embla-carousel-react`
- Animation: `motion`, `lottie-react`
- Forms/Validation: `formik`
- Maps: `leaflet`, `react-leaflet`
- Payment: `@stripe/*`, `@paddle/*`
- Internationalization: `i18next`, `next-intl`

**Recommendation**: The landing project's minimal dependencies mean it should integrate smoothly into the main project without conflicts.

### 3. TypeScript Configuration Check

Compare `tsconfig.json` path aliases:

```json
// Main Project
"paths": {
  "@/*": ["./*"]
}

// Landing Project
"paths": {
  "@/*": ["./src/*"]
}
```

**Action Required**: Update imports in landing components from `@/components/*` to `@/app/components/Landing/*` (or your chosen path).

### 4. CSS/Styling Analysis

**Main Project (`globals.css`):**
- Uses Tailwind v4 with `@import "tailwindcss"`
- Includes `tw-animate-css` plugin
- Uses `@tailwindcss/typography` plugin
- Defines extensive CSS custom properties (oklch color values)
- Has dark mode support
- Custom utilities: `container`, `bigger-container`, `navbar-container`
- Custom animations: `marquee`, `theme-mask`, `pulse-shimmer`

**Landing Project (`globals.css`):**
- Uses Tailwind v4 with `@import "tailwindcss"`
- Simpler CSS variables (hex colors)
- Custom classes: `.gradient-text`, `.scrollbar-hide`
- Custom animations: `marquee-left`, `marquee-right`, `raccoonBounce`, `mapReveal`, `bubblePop`, `fadeIn`

**Potential Conflicts:**
- Both define `:root` CSS variables with different color schemes
- Both have `html { scroll-behavior: smooth; }`
- Different animation names that may need namespacing

### 5. Component Name Conflicts

| Landing Component | Main Project Equivalent | Resolution |
|-------------------|------------------------|------------|
| `Navbar.tsx` | `ChallengeContent/Navbar/Navbar.tsx` | Rename to `LandingNavbar.tsx` |
| `Footer.tsx` | `Footer/Footer.tsx` | Rename to `LandingFooter.tsx` |
| `FAQ.tsx` | `Faq/Faq.tsx` | Rename to `LandingFAQ.tsx` |
| `Hero.tsx` | `ChallengeContent/Hero/Hero.tsx` | Rename to `LandingHero.tsx` |
| `Testimonials.tsx` | `ChallengeContent/Testimonials/Testimonials.tsx` | Rename to `LandingTestimonials.tsx` |

---

## Project Analysis

### Main Project Structure

```
MyFinishLine-front/
├── app/
│   ├── (application)/     # Logged-in user routes
│   ├── (with-header)/     # Public routes with shared layout
│   ├── (without-header)/  # Auth routes (login, signup, etc.)
│   ├── api/               # API routes
│   ├── components/        # Shared components
│   │   ├── Application/   # App-specific components
│   │   ├── ChallengeContent/  # Landing/marketing components
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Shared/
│   │   └── ui/           # shadcn/ui components
│   ├── data/             # Static data
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   └── globals.css
├── public/
│   ├── icons/
│   └── images/
└── package.json
```

### Landing Project Structure

```
mfl_project/src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CTA.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx      # Large component (56KB)
│   ├── LogoCloud.tsx
│   ├── MoneyBackBanner.tsx
│   ├── Navbar.tsx
│   ├── Participation.tsx
│   ├── QuestSelection.tsx
│   └── Testimonials.tsx
└── public/
    └── images/              # 80+ image assets
```

---

## Step-by-Step Merger Process

### Step 1: Create Component Directory

```bash
mkdir -p /Users/artiom/MyFinishLine-front/app/components/Landing
```

### Step 2: Copy Components with Renaming

```bash
# Copy each component with a clear naming convention
cp mfl_project/src/components/Navbar.tsx MyFinishLine-front/app/components/Landing/LandingNavbar.tsx
cp mfl_project/src/components/Hero.tsx MyFinishLine-front/app/components/Landing/LandingHero.tsx
cp mfl_project/src/components/LogoCloud.tsx MyFinishLine-front/app/components/Landing/LogoCloud.tsx
cp mfl_project/src/components/QuestSelection.tsx MyFinishLine-front/app/components/Landing/QuestSelection.tsx
cp mfl_project/src/components/HowItWorks.tsx MyFinishLine-front/app/components/Landing/HowItWorks.tsx
cp mfl_project/src/components/Participation.tsx MyFinishLine-front/app/components/Landing/Participation.tsx
cp mfl_project/src/components/FAQ.tsx MyFinishLine-front/app/components/Landing/LandingFAQ.tsx
cp mfl_project/src/components/CTA.tsx MyFinishLine-front/app/components/Landing/CTA.tsx
cp mfl_project/src/components/Testimonials.tsx MyFinishLine-front/app/components/Landing/LandingTestimonials.tsx
cp mfl_project/src/components/Footer.tsx MyFinishLine-front/app/components/Landing/LandingFooter.tsx
cp mfl_project/src/components/MoneyBackBanner.tsx MyFinishLine-front/app/components/Landing/MoneyBackBanner.tsx
```

### Step 3: Copy Static Assets

```bash
# Copy images (check for conflicts first)
cp -n mfl_project/public/images/* MyFinishLine-front/public/images/
# Note: -n flag prevents overwriting existing files
```

### Step 4: Update Import Paths

In each copied component, update imports:

**Before:**
```tsx
import Navbar from "@/components/Navbar";
```

**After:**
```tsx
import LandingNavbar from "@/app/components/Landing/LandingNavbar";
```

### Step 5: Merge CSS Styles

Add landing-specific styles to `globals.css`:

```css
/* ========================================
   LANDING PAGE STYLES
   ======================================== */

/* Gradient text for landing page */
.landing-gradient-text {
  background: linear-gradient(131deg, rgb(59, 85, 157) 47.5%, rgb(102, 175, 105) 64%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Landing testimonials marquee animations */
@keyframes landing-marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); }
}

@keyframes landing-marquee-right {
  0% { transform: translateX(calc(-50% - 12px)); }
  100% { transform: translateX(0); }
}

.landing-marquee-left {
  animation: landing-marquee-left 50s linear infinite;
  width: max-content;
}

.landing-marquee-right {
  animation: landing-marquee-right 50s linear infinite;
  width: max-content;
}

/* Pause animation on hover */
.landing-marquee-left:hover,
.landing-marquee-right:hover {
  animation-play-state: paused;
}

/* Landing hero raccoon animations */
@keyframes landing-raccoonBounce {
  0% { transform: translateY(30px) scale(0.8); opacity: 0; }
  50% { transform: translateY(-10px) scale(1.05); }
  70% { transform: translateY(5px) scale(0.98); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

@keyframes landing-mapReveal {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes landing-bubblePop {
  0% { opacity: 0; transform: scale(0.5) translateY(10px); }
  70% { transform: scale(1.1) translateY(-2px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* FAQ accordion fade in */
@keyframes landing-fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.landing-animate-fade-in {
  animation: landing-fadeIn 0.7s ease-in-out;
}
```

### Step 6: Update Internal Links

Replace all internal navigation links to use Next.js `Link` component:

**Before (in landing components):**
```tsx
<a href="https://dev.myfinishline.io/login">Sign in</a>
<a href="#level-up">Get Started</a>
```

**After:**
```tsx
import Link from "next/link";

<Link href="/login">Sign in</Link>
<a href="#level-up">Get Started</a>  // Anchor links stay as <a>
```

### Step 7: Create Landing Page Route

Create or update the main page to use new landing components:

```tsx
// app/(with-header)/page.tsx
import LandingNavbar from "@/app/components/Landing/LandingNavbar";
import LandingHero from "@/app/components/Landing/LandingHero";
import LogoCloud from "@/app/components/Landing/LogoCloud";
import QuestSelection from "@/app/components/Landing/QuestSelection";
import HowItWorks from "@/app/components/Landing/HowItWorks";
import Participation from "@/app/components/Landing/Participation";
import LandingFAQ from "@/app/components/Landing/LandingFAQ";
import CTA from "@/app/components/Landing/CTA";
import LandingTestimonials from "@/app/components/Landing/LandingTestimonials";
import LandingFooter from "@/app/components/Landing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LogoCloud />
      <QuestSelection />
      <HowItWorks />
      <Participation />
      <LandingFAQ />
      <CTA />
      <LandingTestimonials />
      <LandingFooter />
    </main>
  );
}
```

### Step 8: Handle Layout Integration

The main project uses route groups with layouts. Consider:

**Option A: Replace existing layout**
Update `app/(with-header)/layout.tsx` to conditionally use landing components for the home page.

**Option B: Create new route group**
```
app/
├── (landing)/           # New route group for landing
│   ├── layout.tsx      # Landing-specific layout
│   └── page.tsx        # Landing page
├── (with-header)/      # Keep existing for other pages
```

---

## Common Pitfalls and Solutions

### 1. Path Alias Mismatch

**Problem**: Landing project uses `@/components/*` while main uses `@/app/components/*`

**Solution**: After copying files, run a find-and-replace:
```bash
# In the Landing components directory
find . -name "*.tsx" -exec sed -i '' 's|@/components/|@/app/components/Landing/|g' {} \;
```

### 2. CSS Variable Conflicts

**Problem**: Both projects define same CSS variables with different values

**Solution**: Namespace landing-specific variables:
```css
/* Instead of */
:root {
  --background: #ffffff;
}

/* Use */
:root {
  --landing-background: #ffffff;
}
```

### 3. Animation Name Collisions

**Problem**: Both projects may define animations with the same name

**Solution**: Prefix all landing animations:
```css
/* Instead of */
@keyframes fadeIn { ... }

/* Use */
@keyframes landing-fadeIn { ... }
```

### 4. External Image URLs

**Problem**: Landing components use Figma API URLs for images

```tsx
const logoImg = "https://www.figma.com/api/mcp/asset/...";
```

**Solution**:
1. Download images locally
2. Place in `public/images/landing/`
3. Update references:
```tsx
const logoImg = "/images/landing/logo.png";
```

### 5. Missing Dependencies for Animations

**Problem**: Main project may not have all required animation utilities

**Solution**: Ensure landing animations work by:
1. Testing each component individually
2. Adding missing keyframe definitions
3. Verifying Tailwind classes are available

### 6. Server vs Client Components

**Problem**: Landing components use `"use client"` directive; may conflict with server-rendered pages

**Solution**:
- Keep `"use client"` directives in interactive components
- Wrapper components can be server components that import client components

### 7. Link vs Anchor Tags

**Problem**: Landing uses `<a href>` for navigation instead of Next.js `<Link>`

**Solution**: Replace navigation links but keep anchor links:
```tsx
// Navigation - use Link
<Link href="/login">Sign in</Link>

// Anchor links - keep as <a>
<a href="#features">Features</a>
```

### 8. Font Configuration Mismatch

**Problem**: Both layouts configure Inter font differently

**Main Project:**
```tsx
const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});
```

**Landing Project:**
```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

**Solution**: Use the main project's font configuration (includes `display: "swap"` for better performance).

### 9. Image Domain Configuration

**Problem**: Landing images from external domains need to be whitelisted

**Solution**: Add to `next.config.ts`:
```ts
images: {
  remotePatterns: [
    // ... existing patterns
    {
      protocol: "https",
      hostname: "www.figma.com",
      pathname: "/api/mcp/asset/**",
    },
  ],
}
```

### 10. State Management Isolation

**Problem**: Main project uses Redux; landing should not depend on it

**Solution**: Keep landing components self-contained with local state (useState, useReducer).

---

## Testing Strategy

### 1. Component-Level Testing

After copying each component:

```bash
npm run dev
```

Navigate to a test route and verify:
- Component renders without errors
- Styling appears correctly
- Animations work
- Interactive elements function

### 2. Visual Regression Testing

Create a checklist for each section:

| Section | Desktop | Tablet | Mobile | Animations |
|---------|---------|--------|--------|------------|
| Navbar | [ ] | [ ] | [ ] | [ ] Menu toggle |
| Hero | [ ] | [ ] | [ ] | [ ] Raccoon bounce |
| LogoCloud | [ ] | [ ] | [ ] | N/A |
| QuestSelection | [ ] | [ ] | [ ] | [ ] Card hover |
| HowItWorks | [ ] | [ ] | [ ] | [ ] Step reveal |
| Participation | [ ] | [ ] | [ ] | [ ] |
| FAQ | [ ] | [ ] | [ ] | [ ] Accordion |
| CTA | [ ] | [ ] | [ ] | [ ] |
| Testimonials | [ ] | [ ] | [ ] | [ ] Marquee |
| Footer | [ ] | [ ] | [ ] | N/A |

### 3. Link Verification

Test all links:
- [ ] Navigation links scroll to sections
- [ ] "Sign in" goes to `/login`
- [ ] "Get Started" scrolls to pricing/CTA
- [ ] Footer links work
- [ ] External links open in new tab

### 4. Performance Testing

Run Lighthouse audit:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### 5. Build Verification

```bash
npm run build
npm run start
```

Verify:
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No unused imports warnings
- [ ] Production build runs correctly

### 6. Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Rollback Plan

### Immediate Rollback (Within Same Session)

```bash
# Discard all changes
git checkout .
git clean -fd

# Or reset to specific commit
git reset --hard HEAD~1
```

### Rollback from Deployed Version

```bash
# Return to pre-merger tag
git checkout pre-merger-v1.0

# Create hotfix branch if needed
git checkout -b hotfix/revert-landing-merger

# Or revert the merge commit
git revert -m 1 <merge-commit-hash>
```

### Partial Rollback (Keep Some Changes)

```bash
# Interactive rebase to selectively remove commits
git rebase -i HEAD~<number-of-commits>

# Or cherry-pick only desired commits to a new branch
git checkout -b landing-partial pre-merger-v1.0
git cherry-pick <commit-hash-1> <commit-hash-2>
```

### File-Level Rollback

```bash
# Restore specific file from before merger
git checkout pre-merger-v1.0 -- path/to/file.tsx

# Restore specific directory
git checkout pre-merger-v1.0 -- app/components/Landing/
```

### Database/State Rollback

If the merger affected database schema or state:
1. Document all migrations applied
2. Prepare reverse migrations
3. Keep database backup before deploying

---

## Post-Merger Cleanup

### 1. Remove Duplicate Code

After successful merger, identify and remove:
- [ ] Old landing components no longer used
- [ ] Duplicate utility functions
- [ ] Redundant CSS classes

### 2. Consolidate Styling

- [ ] Merge similar CSS classes
- [ ] Remove unused keyframe animations
- [ ] Consolidate color variables

### 3. Update Documentation

- [ ] Update README with new structure
- [ ] Document new components in Storybook (if applicable)
- [ ] Update component library documentation

### 4. Performance Optimization

- [ ] Lazy load heavy components (HowItWorks is 56KB)
- [ ] Optimize images (convert to WebP)
- [ ] Review bundle size

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HowItWorks = dynamic(
  () => import('@/app/components/Landing/HowItWorks'),
  { loading: () => <div>Loading...</div> }
);
```

### 5. Archive Source Project

```bash
# Create archive of landing project
git archive --format=tar.gz -o landing-project-backup.tar.gz HEAD

# Or move to archived directory
mv mfl_project ../archived/mfl_project_$(date +%Y%m%d)
```

---

## Appendix: Quick Reference Commands

### Copy Commands
```bash
# Create landing components directory
mkdir -p app/components/Landing

# Copy all components
cp -r ../mfl_project/src/components/* app/components/Landing/

# Copy images (no overwrite)
cp -n ../mfl_project/public/images/* public/images/
```

### Find and Replace Import Paths
```bash
# Update imports in Landing directory
find app/components/Landing -name "*.tsx" -exec sed -i '' \
  's|from "@/components/|from "@/app/components/Landing/|g' {} \;
```

### Verify No TypeScript Errors
```bash
npx tsc --noEmit
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build && npm run start
```

---

## Summary

Merging Next.js projects requires careful attention to:

1. **Dependencies** - Audit and resolve version conflicts
2. **Path Aliases** - Ensure consistent import paths
3. **CSS** - Namespace styles to prevent conflicts
4. **Components** - Rename to avoid collisions
5. **Assets** - Copy without overwriting existing
6. **Links** - Convert to Next.js Link where appropriate
7. **Testing** - Comprehensive visual and functional testing
8. **Rollback** - Always have a clear rollback strategy

Following this guide will help ensure a smooth merger while maintaining the ability to revert if issues arise.
