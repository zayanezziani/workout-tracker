# Workout Tracker — native iOS

SwiftUI port of the web prototype. iPhone only, iOS 18+, bundle ID `com.zayanezziani.workouttracker`.
The web app in `../src` and `../reference` remains the visual spec; frozen values and screenshots are in `Spec/`.

Open `WorkoutTracker.xcodeproj` in Xcode (synced folders: new files under `WorkoutTracker/` are picked up automatically).
For a physical iPhone, pick your Apple ID team under Signing & Capabilities.

## Layout

```
WorkoutTracker/
  App/            WorkoutTrackerApp, RootView (screen switching + hero transition)
  DesignSystem/   Theme, Motion (springs/easings), Glass, PressStyle, CSSGradients, FlowLayout, Haptics
  Data/           Workouts, Days, ExerciseLibrary
  Features/       WorkoutList, ExerciseDetail, Onboarding (+ AddActivitySheet)
  Assets.xcassets exercise images (JPEG), AppIcon
Spec/             NATIVE_SPEC.md + web-screens/ (402×874 reference screenshots)
run.sh            build + install + launch on a simulator
```

## Debug launch flags

```bash
./run.sh "<simulator name>" -screen workout-list      # onboarding-days | onboarding-plan | workout-list | exercise-detail
./run.sh "<simulator name>" -designFrame 1            # render on the 402×874 canvas, scaled to fit the device
```

`-screen` also pre-selects Mon/Wed/Fri. `-designFrame` exists so layouts can be compared against `Spec/web-screens`
on simulators that aren't 402×874.
