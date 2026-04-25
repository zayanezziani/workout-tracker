# Fitness App Prototype — Claude Code Instructions

## Project Context

This is a **marketing/demo prototype** for a fitness app. The deliverable is a **screen-recorded video showcase** for a client, not a shipped product. This means:

- Animation quality and motion polish are the primary success metrics
- No backend, no database, no persistence required
- All interactions work on click/tap
- Target phone frame: **402×874** (matches existing reference HTML)
- Output must look indistinguishable from a native iOS app when recorded

## Stack

Starting fresh from the existing HTML/CSS reference files. Build as:

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (ported from the existing CSS — see migration notes below)
- **Framer Motion** for all animation
- **Lucide React** for any icons not already provided as assets
- **clsx** + **tailwind-merge** for conditional classes

Scaffold with:

```bash
npm create vite@latest . -- --template react-ts
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Do **not** add: React Router (use simple state-based screen switching), state management libraries, other animation libraries (GSAP, React Spring, etc.).

## Source of Truth

- **`/reference/main.html` + `/reference/main.css`** — the Workout List screen (warm gradient background, exercise cards, "Start Workout" button)
- **`/reference/index.html` + `/reference/styles.css`** — the Exercise Detail screen (full-bleed image background, reps counter, set pills, bottom action row)
- **This file** — tokens, motion, conventions

**Rule**: the reference HTML/CSS defines all visual values (colors, spacing, radii, typography). Match them exactly. If something is ambiguous, open the reference file and check — never guess.

## Migration Notes

When porting the reference HTML/CSS to React + Tailwind:

1. **Extract design tokens first** (see next section) and put them in `tailwind.config.js` before writing components
2. **Keep CSS custom properties or Tailwind classes — not both mixed**. If a value doesn't fit cleanly in Tailwind, use a CSS module or inline style, don't half-convert
3. **Preserve exact values** — `402px` frame width, `874px` height, `48px` border radius, etc. Don't "round to nicer numbers"
4. **Replace Figma CDN image URLs** with local assets in `/public/assets/` or placeholder SVGs for now
5. **SF Pro Rounded is the intended font** — the reference uses `-apple-system` stack which resolves to it on Apple devices. On non-Apple, fall back to **Inter** via `@fontsource/inter`

## Design Tokens

Extracted from the reference CSS. Use these everywhere.

### Colors

```
// Backgrounds
bg.page          #1a1a1a                                (outside phone frame)
bg.phone         #000000                                (phone base)
bg.gradient      linear-gradient(149deg,
                   rgb(56, 51, 46) 7.7%,               (warm brown top-right)
                   rgb(0, 0, 0) 41.5%,
                   rgb(26, 26, 26) 92.3%)              (list screen bg)

// Glow overlays (list screen)
glow.warm        radial-gradient at 70% 10%,
                   rgba(118, 100, 75, 0.08) → transparent
glow.rose        radial-gradient at 20% 80%,
                   rgba(182, 136, 116, 0.05) → transparent

// Surfaces
surface.glass            rgba(255, 255, 255, 0.08)     (exercise card bg, meta pills)
surface.glass-strong     rgba(255, 255, 255, 0.4)      (set pills inactive, action buttons)
border.glass             rgba(255, 255, 255, 0.08)

// Text
text.primary             #FFFFFF
text.secondary           rgba(255, 255, 255, 0.7)       (reps label)
text.tertiary            rgba(255, 255, 255, 0.5)       (exercise detail, welcome date)
text.meta                rgba(255, 255, 255, 0.6)       (meta pill text)

// Accents
accent.primary           #FFFFFF                        (CTAs — "Next Set", "Start Workout", active set pill)
accent.primary-text      #000000                        (text on white CTAs)

// Overlays (detail screen)
overlay.bottom           rgba(0, 0, 0, 0.6)             (blurred dark blob bottom)
overlay.top              linear-gradient(to bottom,
                           rgba(0,0,0,0.64) 55.83%,
                           transparent)
```

### Typography

- **Font stack**: `-apple-system, 'SF Pro Rounded', 'SF Pro', system-ui, sans-serif`
- **Fallback**: Inter (via `@fontsource/inter`)
- **Sizes observed**: 16px, 17px, 20px, 24px, 28px, 40px
- **Weights**: 400 (regular body), 500 (titles, CTA), 600 (exercise names, reps number, status bar), 700 (welcome title)
- **Letter-spacing**: `-0.5px` on welcome title, `-0.43px` on CTAs, `1.5px uppercase` on welcome date
- **Line-heights**: 18px, 22px, 39px, 40px (use these exact values — not "relaxed"/"tight")

### Spacing

Reference uses a mix of 4/8/16/24/32/40/56px increments. Use Tailwind's default scale which matches this.

- Phone frame padding: `16px` horizontal (`px-4`)
- Welcome header top padding: `8px`
- Exercise card gap: `16px` (`gap-4`)
- Reps section internal gap: `32px` (`gap-8`)
- Bottom actions gap: `24px` (`gap-6`)

### Radii

- Phone frame: **48px** (`rounded-[48px]`)
- Exercise cards: **20px** (`rounded-[20px]`)
- Exercise thumbnail: **20px**
- Meta pills: **100px** (`rounded-full`)
- Set pills active: **38px**
- Set pills inactive: **24px**
- Action buttons (glass circles): **40px**
- CTA buttons ("Next Set", "Start Workout"): **1000px** (`rounded-full`)
- Chevron button: **40px**

### Effects

- **Glass blur**: `backdrop-filter: blur(22px)` on exercise cards, `blur(8px)` on pills and action buttons
- **Blurred overlays** on detail screen: `filter: blur(27px)` on the dark ellipses

### Dimensions (exact)

- Phone frame: **402×874**
- Exercise card height: **100px**
- Exercise thumbnail: **128×100**
- Exercise check circle: **40×40**
- Next Set button height: **86px**
- Start Workout button padding: **32px 36px**
- Action buttons (side of Next Set): **56×56**
- Chevron button: **32×32**
- Icon buttons in header (back, menu): **48×48** with 24×24 icon
- Reps number font size: **40px**
- Reps label font size: **24px**

## Motion System

**Apply globally. Do not invent new spring values.**

### Named Springs (create `src/lib/motion.ts`)

```ts
export const springs = {
  snappy:  { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },  // Default UI
  smooth:  { type: "spring", stiffness: 260, damping: 28, mass: 1 },    // Large elements, sheets, screens
  bouncy:  { type: "spring", stiffness: 500, damping: 18, mass: 0.9 },  // Celebratory — set complete
  tap:     { type: "spring", stiffness: 600, damping: 35, mass: 0.6 },  // Micro — taps, toggles
} as const;
```

### Named Easings

```ts
export const ease = {
  standard: [0.25, 0.1, 0.25, 1],   // Apple standard
  out:      [0.16, 1, 0.3, 1],      // Decelerate — entering
  in:       [0.7, 0, 0.84, 0],      // Accelerate — exiting
  inOut:    [0.65, 0, 0.35, 1],     // Crossfades
} as const;
```

**Never use `ease: "easeInOut"` or Framer Motion's string easings.** Always the cubic-beziers above.

### Durations

- Micro (tap, toggle): **150–200ms**
- Standard (enter/exit): **300–400ms**
- Screen transitions: **500–600ms**
- Hero moments: **800–1200ms**

### Stagger

Multiple items animating in together must stagger. **40–80ms between items.**

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: springs.smooth }
      }}
    />
  ))}
</motion.div>
```

### Interaction Patterns

- **Tap feedback**: `whileTap={{ scale: 0.96 }}` + `transition={springs.tap}` on every interactive element. The existing CSS uses `transform: scale(0.97)` / `scale(0.98)` on `:active` — replace with motion equivalents
- **Hover**: none (mobile demo)
- **Screen transitions**: `AnimatePresence` with `mode="wait"`, combine slide + fade
- **Shared element: exercise card → detail hero**: wrap the exercise image in `motion.img` with matching `layoutId` on both screens. This is the hero moment — tune it carefully (use `springs.smooth`, ~500ms)
- **Modal/sheet**: slide up from bottom with `springs.smooth`, backdrop fades in parallel
- **Reps counter change**: `key` prop on the number span tied to the value; scale + fade in with `springs.bouncy`
- **Set pill activation**: width change via `layout` prop, color crossfade

### The "Apple Feel" Checklist

1. No default easing anywhere
2. Multiple-element entrances staggered
3. Interactive elements have tap feedback
4. Exits are choreographed, not just fades
5. Nothing animates shorter than 150ms or longer than 1200ms
6. Spring configs come from the named presets only

## Screen Architecture

Two screens, switched via React state (not a router):

```tsx
type Screen = "workout-list" | "exercise-detail";
const [screen, setScreen] = useState<Screen>("workout-list");
const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
```

Wrap the switcher in `<AnimatePresence mode="wait">` so transitions animate properly.

## Project Structure (to create)

```
/src
  /components
    PhoneFrame.tsx         (402×874 container, status bar, dark page backdrop)
    StatusBar.tsx          (9:41 + icons)
    /workout-list
      WorkoutListScreen.tsx
      WelcomeHeader.tsx
      MetaPills.tsx
      ExerciseCard.tsx
      StartButton.tsx
    /exercise-detail
      ExerciseDetailScreen.tsx
      ExerciseHeader.tsx   (back, title, menu)
      RepsCounter.tsx
      SetSelector.tsx
      BottomActions.tsx    (glass btn, Next Set, glass btn)
  /lib
    motion.ts              (springs, easings)
    cn.ts                  (clsx + tailwind-merge)
  /data
    workouts.ts            (mocked exercise data)
  /assets                  (exported images — replace Figma CDN URLs)
  App.tsx                  (screen switcher)
  main.tsx
  index.css                (Tailwind directives, font imports, any residual CSS)

/reference
  main.html
  main.css
  index.html
  styles.css

tailwind.config.js         (with extracted tokens)
vite.config.ts
```

## PhoneFrame Component

- Fixed 402×874, border-radius 48px, black background
- Centered on page over `#1a1a1a` backdrop
- Status bar (9:41 + signal/wifi/battery) absolutely positioned at top inside the frame
- Safe-area padding handled per screen

## Known Image Asset Handling

The reference HTML uses `https://www.figma.com/api/mcp/asset/...` URLs — these will not work in the prototype. Before first build:

1. Either replace with local images in `/public/assets/` (ideal)
2. Or substitute with placeholder image URLs from `picsum.photos` or similar for now
3. Ask me for actual asset files before the final polish pass

Status bar icons (signal, wifi, battery) can be reproduced as inline SVGs — they're simple. Don't block on missing assets.

## What NOT to Do

- ❌ `transition={{ duration: X }}` without an easing specified
- ❌ Animating `width`/`height` directly — use `scale` or `layout`
- ❌ CSS `@keyframes` — everything via Framer Motion
- ❌ Adding libraries without asking
- ❌ `useEffect` for animation triggers — use Framer Motion's declarative API
- ❌ Hardcoded colors/spacing — use tokens from Tailwind config
- ❌ Skipping stagger on lists
- ❌ Placeholder / lorem content — the reference already has real copy; use it
- ❌ Rewriting CSS values you don't understand — if a value in the reference looks odd (like `1000px` radius), it's intentional; keep it
- ❌ Simplifying the glass blur effects — the backdrop filters are part of the design language

## When in Doubt

Ask. Reference first, prompt second, guess never.
