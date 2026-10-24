# Workout Tracker — Claude Code Instructions

## Project status

- **Web app** (`src/`, `reference/`, Vite + React + Framer Motion) is the **visual spec**. It is no longer the deliverable; don't extend it.
- **Native app** (`ios/`, SwiftUI) is the deliverable: iPhone only, iOS 18+, bundle ID `com.zayanezziani.workouttracker`.
- Purpose: client demo, recorded on video. Motion polish and fidelity matter more than features.
- Frozen values and reference screenshots: `ios/Spec/NATIVE_SPEC.md`, `ios/Spec/web-screens/` (402×874, 10 states).

## Screens and flow

`onboarding-days` → `onboarding-plan` (+ "Add Exercises" bottom sheet) → `workout-list` → `exercise-detail` (back → list).
Switched by state in `ios/WorkoutTracker/App/RootView.swift`; no router. The list→detail hero is a custom overlay in `RootView`.
Features live in `Features/{Onboarding,WorkoutList,ExerciseDetail}`. Data is mocked in `Data/` (no backend, no persistence).

## Fidelity rules

- Design frame is **402×874**. Never round or "tidy" values (e.g. `1000px` radii, 86pt Next Set); if unsure, read the web component or the spec. Don't guess.
- Colors, radii, sizes, type: `DesignSystem/Theme.swift`. Motion: `DesignSystem/Motion.swift`. **No magic numbers in views.**
- Font is the system rounded design (`.sf(...)` helper), not Inter.
- Springs (framer-motion physics, via `interpolatingSpring`): `snappy` 400/30/0.8, `smooth` 260/28/1, `bouncy` 500/18/0.9, `tap` 600/35/0.6 (stiffness/damping/mass).
  `Springs.sheet` (250/30/1) is the only extra, copied from the web sheet. Don't add more.
- Apple's built-in `.snappy`, `.smooth`, `.bouncy` are **not** ours. Never use them, nor `.easeIn/.easeOut/.easeInOut`; use `Springs.*` and `Ease.*` (cubic-beziers).
- Every interactive element uses `PressStyle` (`.cta`, `.card`, `.glassButton`, …) for tap feedback.
- Lists and groups stagger, 40–80 ms per item (`Stagger`, `.staggeredEntrance`).
- Durations 150–1200 ms: micro ≈180, standard ≈400, screen 500, hero 800 (`Duration`). Nothing outside that range.
- Exits are choreographed (slide + fade via `.screen(...)` transition), not bare fades. Respect Reduce Motion where the web did.

## Build and run

```bash
ios/run.sh "iPhone 16 Pro" [-screen workout-list] [-designFrame 1]
```

Builds, installs and launches. `-screen onboarding-days|onboarding-plan|workout-list|exercise-detail` jumps to a screen (and preselects Mon/Wed/Fri).
`-designFrame 1` renders a 402×874 canvas scaled to fit; use only on simulators of a different shape. Open `ios/WorkoutTracker.xcodeproj` in Xcode; it uses synced folders, so new files are picked up automatically.

## Test devices

- **iPhone 16 Pro** (402×874): main device and the layout of record.
- **iPhone 15 Pro Max**: second layout check (wider screen, different safe areas).
- Currently only the iOS 27.1 runtime (iPhone Duo only) is installed; the older runtime is the user's to install.

## Verification rule

After any UI change: build, launch, screenshot the affected screen(s), compare with `ios/Spec/web-screens/`, and **list the differences** (even if "none visible"). Never claim a match without comparing. State what was not verified (e.g. motion mid-animation, haptics).

## Workflow

- **One commit per screen** (foundations, list, detail, onboarding, sheet each get their own).
- **Ask before downloading anything** (runtimes, assets, packages, images), and say what, from where, and how big.
- Don't add dependencies or other animation approaches without asking.

## Known approximations

- System materials stand in for CSS `backdrop-filter`; they tint slightly, so fills are compensated (`glassStrongOverMaterial`). The sheet's progressive blur is per-row (`visualEffect`), not a true backdrop blur.
- Hero transition is a custom overlay, not `matchedGeometryEffect`.
- Bicep Curl has no bundled image (remote-only in the web build); it shows a placeholder tile.
- SF Symbols replace Lucide icons; corners use continuous (squircle) rounding.
