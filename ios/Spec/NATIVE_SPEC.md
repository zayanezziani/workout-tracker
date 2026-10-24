# Native port spec (frozen from the web prototype)

Source of truth for the SwiftUI port. Derived from `tailwind.config.js`, `src/data/*`, `src/lib/motion.ts`,
the component code in `src/components/*`, and the motion rules in `CLAUDE.md`.
Where `CLAUDE.md` and the shipped component code disagree, **the component code wins** (noted below).
Reference screenshots (402×874 @3x, captured from the web build) are in `web-screens/`.

Design frame: 402×874 pt (iPhone 16 Pro). Native uses real safe areas: top inset on this device is 62pt
(= web `pt-[62px]`), bottom inset is 34pt (web uses 40pt from screen edge → 6pt on top of the safe area).

## Screens / flow

`onboarding-days` → `onboarding-plan` (+ bottom sheet "Add Exercises") → `workout-list` → `exercise-detail` (back → list).
Onboarding is one container (`OnboardingFlow`) holding the persistent **Continue** button; the two steps slide inside it.

| # | Screenshot |
|---|------------|
| 01 | onboarding days, none selected (Continue disabled) |
| 02 | days Mon/Wed/Fri selected |
| 03 | plan screen, empty day cards |
| 04 | add sheet open |
| 05 | add sheet, 3 selected |
| 06 | add sheet scrolled (compact header) |
| 07 | plan screen, Monday expanded |
| 08 | workout list |
| 09 | exercise detail, set 1 done, 8 reps |
| 10 | exercise detail after Next Set |

## Colors

| Token | Value |
|---|---|
| page bg (outside frame) | `#1a1a1a` (not needed natively) |
| phone | `#000000` |
| onboarding bg | `#161410` |
| sheet bg | `#1f1c18` |
| glass | white 8% |
| glass strong | white 40% (set pills inactive, round action buttons) |
| glass border | white 8% |
| text primary | `#fff` |
| text secondary | white 70% (reps label) |
| text tertiary | white 50% (card detail, date, sheet sub-labels) |
| text meta | white 60% (meta pills) |
| CTA | bg `#fff`, fg `#000` |
| list gradient | linear 149°, `rgb(56,51,46)` 7.7%, `rgb(0,0,0)` 41.5%, `rgb(26,26,26)` 92.3% |
| list glow 1 | radial ellipse @70% 10%, `rgba(118,100,75,.08)` → transparent at 60% |
| list glow 2 | radial ellipse @20% 80%, `rgba(182,136,116,.05)` → transparent at 50% |
| detail top scrim | 674×274 @ (-136, -100), linear `rgba(0,0,0,.64)` 55.83% → transparent, blur 27 |
| detail bottom scrim | 674×368 @ (-136, 506), `black 60%`, blur 27 |
| DayChip | off: white 20% / text white; on: white / text black; 1pt white 8% border |
| CategoryChip | off: white 16% / white; on: white / black; 1pt white 8% border; blur 18 |
| plan thumb border | `#252525` |
| sheet Done fg | `#1f1b17` enabled, `rgba(31,28,24,.6)` disabled; minus icon `#1f1c18` |

## Typography (SF Pro **Rounded** natively → `.fontDesign(.rounded)`)

| Use | Size / weight / line / tracking |
|---|---|
| welcome date | 16 / 500 / – / +1.5, uppercase, tertiary |
| welcome title | 28 / 700 / 39 / −0.5 |
| meta pill | 16 / 400 |
| card title | 20 / 600 / 22 |
| card detail | 16 / 400 / 18, tertiary |
| CTA (Start/Next Set/Continue) | 20 / 500 / 22 / −0.43 |
| detail header title | 24 / 500 / 22 |
| reps number | 40 / 600 / 40 |
| reps label | 24 / 400 / 40, secondary |
| set pill label | 16 / 400 / 22 |
| onboarding H1 (days, plan) | 32 / 700 / 39 / −0.5 |
| day chip | 18 / 400 |
| day card title | 20 / 590 / 25 / −0.45 |
| day card button | 17 / 400 / 22 / −0.43 |
| plan/library row title | 17 / 590 / 22 / −0.43, white 96% |
| library row sub | 17 / 400 / 22 / −0.43, white 50% |
| sheet title | 22 / 700 / 28 / −0.26 |
| sheet day sub | 17 / 400 / 22 / −0.43, white 50% |
| compact header title | 15 / 590 / 20 / −0.23; day 12 / 400 / 16 |
| category chip | 15 / 500 |
| search field | 16 / 400 / 20 |

## Geometry

**Workout list** — top pad 62 (safe area); H-pad 16; header: date, 8 gap, title row (title + 32×32 chevron-down button, 8 gap), meta pills (8 gap, 8 top margin); header top pad 8.
List: gap 16, vertical pad 24, scrollable. Card 100 high, radius 20, gap 16, trailing pad 16; thumb 128×100 radius 20; text column gap 4; chevron 40×40 (24 icon, white 50%).
Start Workout: full width, radius capsule, padding 32/36 (→ ~86 high), bottom pad 40. Meta pill: pad 7/14, gap 8, 16 icons, capsule, glass fill + 1pt glass border.

**Exercise detail** — full-bleed image (aspect fill). Header: 48×48 back / menu buttons, 24 icons, title centered. Spacer. Reps (gap 32 to pills) → set pills row (gap 8, each flex-1, 40 high; done radius 38 white with 16pt check, 2.5 stroke; todo radius 24, glass-strong, blur 8) → actions row, pt 56, pb 40, gap 24: round 56×56 glass-strong buttons (List, Share) either side of Next Set (86 high capsule, flex).

**Onboarding days** — H-pad 16, bottom pad 166 (above Continue), content bottom aligned; title then 40 gap, chips wrap with 12 gap; chip padding 16/16, radius 32.
**Continue** — H-pad 16, bottom 40, capsule white, padding 24/36 (→ ~70 high), disabled = opacity .3.
**Plan** — back button 48×48 at top; content bottom aligned (top pad 50 below back, bottom pad 160), title + 32 gap + day cards (24 gap). Day card: radius 24, white 10%, padding 24/20; header row title / [Add exercises | Edit + chevron]; expanded list pt 24, row gap 16, rows: 64×64 thumb radius 18 + 16 gap + name.
**Sheet** — height 640, radius top 32, bg `#1f1c18`; grabber 40×5 white 20% at top 12; close 44×44 circle white 20% at (16, 29); Done capsule 44 high, padding-x 16 at right 16; compact title centered at top 33; list top pad 100 (title block), rows gap 12 height 64 (thumb 64, radius 18, 1pt `#252525`; add button 36×36 circle); bottom: category chips (pad-x 20, gap 8) + search field (capsule, white 12%, blur 18, pad 12/16) bottom pad 32; bottom fade 156 high (blur 24 + black gradient). Top progressive blur 96 high.

## Motion (mapped 1:1 to SwiftUI)

Framer springs are physical (stiffness / damping / mass) → `Animation.interpolatingSpring(mass:stiffness:damping:)` which is the same model.

| Name | stiffness | damping | mass | Use |
|---|---|---|---|---|
| snappy | 400 | 30 | 0.8 | default UI |
| smooth | 260 | 28 | 1 | large elements, list entrances, set pills |
| bouncy | 500 | 18 | 0.9 | reps number, check mark |
| tap | 600 | 35 | 0.6 | press feedback |

| Easing | cubic-bezier |
|---|---|
| standard | 0.25, 0.1, 0.25, 1 |
| out | 0.16, 1, 0.3, 1 |
| in | 0.7, 0, 0.84, 0 |
| inOut | 0.65, 0, 0.35, 1 |

Durations: micro 150–200 ms, standard 300–400, screen 500–600, hero 800–1200. Nothing < 150 ms or > 1200 ms.
Stagger 40–80 ms. No hover. No `@keyframes`.

### Per-interaction table (from the shipped components)

| Interaction | Behavior |
|---|---|
| Press (generic) | scale 0.96 w/ `tap` spring |
| Exercise card press | scale 0.98 + bg white 8% |
| Start / Next Set / Continue press | scale 0.97, opacity 0.9 |
| Round glass buttons press | scale 0.94 |
| Header icon buttons (back, menu, chevron) | scale 0.92 |
| Day chip press | scale 0.94 |
| Day card small buttons | scale 0.96, opacity 0.8 |
| Expand chevron | scale 0.88 |
| Screen enter (list) | from opacity 0, x −24 → 0; 500 ms `out` |
| Screen exit (list, detail, onboarding) | opacity 0, x −24; 500 ms (`out`; onboarding uses `in`) |
| Detail enter | opacity 0→1, 500 ms `out`; hero image shared via `layoutId` `exercise-thumb-<id>` using `smooth` |
| List stagger | children 0.06, delay 0.1; card from opacity 0, y 12, `smooth` |
| Onboarding days stagger | outer 0.05 / delay 0.15 (title y 12, 500 ms `out`); chips 0.04 / delay 0.05, y 12 `smooth` |
| Plan stagger | outer 0.06 / delay 0.15; cards 0.06 / delay 0.05, y 16 `smooth` |
| Onboarding step switch | incoming x +24→0 opacity, outgoing x −24, 500 ms `out` |
| Day chip select | bg + text color crossfade (tap spring) |
| Continue enable | opacity .3 ↔ 1 |
| Reps change | number `key`ed: in scale .6→1 + fade, out scale 1.3 + fade, `bouncy` |
| Set pill complete | width/radius layout change `smooth`; check scale 0→1 + fade `bouncy` |
| Next Set | sets 1→3 then wraps to 0; reps cycle 8 → 10 → 12 → 8 (wrap resets reps to 8) |
| Day card expand | height 0→auto, opacity, 400 ms `standard`; chevron rotates 180° 300 ms `standard`; rows stagger 0.05 / delay 0.05, y 8 `smooth` |
| Sheet present | slide from bottom, spring stiffness 250 damping 30 mass 1 (≈400 ms); backdrop black 50% fade 300 ms in / 200 ms out (`out`) |
| Sheet reduce-motion | opacity fade 200 ms instead of slide |
| Sheet title ↔ compact header | crossfade + blur 300 ms `out`, threshold scrollTop ≥ 60 |
| Library row +/− | bg white 20% ↔ white, icon crossfade + blur 2, 180 ms `inOut` |
| Sheet Done | opacity .3 ↔ 1 (180 ms `inOut`); press 0.96 |
| Category chip | bg/text color animate; press 0.94 |

## Data

`todaysWorkout`: date "Sunday, March 8", title "It's Chest Day", ~30 min, exercises (3 sets × 12 reps each):
Push-Ups (`push-ups`), Incline Dumbbell Press (`incline-dumbbell-press`), Bench Press (`bench-press`), Cable Crossover (`cable-fly`).

Days: Monday … Sunday. Categories: All, Chest, Back, Arms, Legs, Shoulders (+ `Core` as an exercise group only).

Library (id · name · category · equipment · image): see `src/data/exercises.ts` — 20 items. In the "All" tab the featured set
(incline-db-press, push-up, bench-press, pull-up, deadlift, cable-crossover, barbell-row, lat-pulldown) sorts first, then alphabetical.
Items with no dedicated art (squat, overhead press, lunges, plank) reuse the bench-press image in the web build; those without an image show a white-12% tile.

Local art (bundled): bench-press, incline-dumbbell-press, pull-ups, lat-pulldown, cable-fly, push-ups, barbell-row, deadlift.
`bicep-curl` only exists as a remote URL in the web build.

## Known web-only things dropped natively

Fake status bar / phone frame (real status bar and safe areas instead); `#1a1a1a` page backdrop; Inter fallback (system rounded).
