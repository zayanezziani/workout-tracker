import SwiftUI

enum Screen: Equatable {
    case onboardingDays
    case onboardingPlan
    case workoutList
    case exerciseDetail

    /// `-screen workout-list` on the launch command line jumps straight to a screen (used for verification).
    static var launchOverride: Screen? {
        switch UserDefaults.standard.string(forKey: "screen") {
        case "onboarding-days": .onboardingDays
        case "onboarding-plan": .onboardingPlan
        case "workout-list": .workoutList
        case "exercise-detail": .exerciseDetail
        default: nil
        }
    }

    var isOnboarding: Bool { self == .onboardingDays || self == .onboardingPlan }
}

/// The 402×874 canvas the design was made on (iPhone 16 Pro), with its real safe areas.
enum DesignFrame {
    static let size = CGSize(width: 402, height: 874)
    static let insets = EdgeInsets(top: 62, leading: 0, bottom: 34, trailing: 0)

    /// `-designFrame 1` renders the app on the 402×874 canvas, scaled to fit whatever simulator is booted,
    /// so layouts can be compared with the web screenshots on devices of a different shape.
    static var isEnabled: Bool { UserDefaults.standard.bool(forKey: "designFrame") }
}

struct RootView: View {
    var body: some View {
        // The reader must *respect* the safe area: a reader that ignores it reports zero insets.
        // Only the keyboard region is ignored, so a visible keyboard never leaks into the bottom inset.
        GeometryReader { proxy in
            let insets = proxy.safeAreaInsets
            let screen = CGSize(
                width: proxy.size.width + insets.leading + insets.trailing,
                height: proxy.size.height + insets.top + insets.bottom
            )

            Group {
                if DesignFrame.isEnabled {
                    let scale = min(screen.width / DesignFrame.size.width, screen.height / DesignFrame.size.height)
                    AppCanvas(size: DesignFrame.size, insets: DesignFrame.insets)
                        .frame(width: DesignFrame.size.width, height: DesignFrame.size.height)
                        .clipShape(RoundedRectangle(cornerRadius: 48, style: .continuous))
                        .scaleEffect(scale)
                        .frame(width: screen.width, height: screen.height)
                } else {
                    AppCanvas(size: screen, insets: insets)
                }
            }
            .frame(width: screen.width, height: screen.height)
            // The reader's origin is the safe area's corner; shift back to the physical screen corner.
            .offset(x: -insets.leading, y: -insets.top)
        }
        .ignoresSafeArea(.keyboard)
        .background(Theme.Palette.phone.ignoresSafeArea())
    }
}

/// The hero image that grows from a card thumbnail into the full-bleed detail background.
private struct Hero {
    let exercise: Exercise
    let source: CGRect
}

private struct AppCanvas: View {
    let size: CGSize
    let insets: EdgeInsets

    @State private var screen: Screen = Screen.launchOverride ?? .onboardingDays
    @State private var selectedDays: [Day] = Screen.launchOverride == nil ? [] : [.monday, .wednesday, .friday]
    @State private var listEnterDelay = 0.1
    @State private var activeExercise: Exercise = Workouts.today.exercises[0]
    @State private var hero: Hero?
    @State private var heroExpanded = false

    var body: some View {
        ZStack {
            Theme.Palette.phone

            if screen.isOnboarding {
                OnboardingFlow(
                    selectedDays: $selectedDays,
                    initialStep: Screen.launchOverride == .onboardingPlan ? .plan : .days,
                    onFinish: finishOnboarding
                )
                .transition(.screen(enterX: 0, exitX: -24, exitCurve: Ease.in))
            }

            if screen == .workoutList {
                WorkoutListScreen(
                    workout: Workouts.today,
                    hiddenThumbID: hero?.exercise.id,
                    onSelectExercise: openDetail
                )
                .transition(.screen(enterX: -24, exitX: -24, enterDelay: listEnterDelay))
            }

            if let hero {
                HeroImage(
                    name: hero.exercise.image,
                    source: hero.source,
                    expanded: heroExpanded,
                    canvas: size
                )
            }

            if screen == .exerciseDetail {
                ExerciseDetailScreen(exercise: activeExercise, onBack: closeDetail)
                    .transition(.screen(enterX: 0, exitX: -24, enterDelay: 0.15))
            }
        }
        .frame(width: size.width, height: size.height)
        .coordinateSpace(name: Theme.rootSpace)
        .environment(\.screenInsets, insets)
        .onAppear(perform: seedLaunchOverride)
    }

    // MARK: Navigation

    private func finishOnboarding() {
        // Web `AnimatePresence mode="wait"`: the list waits for onboarding to finish leaving.
        listEnterDelay = Duration.screen
        withAnimation(Ease.out(Duration.screen)) { screen = .workoutList }
    }

    private func openDetail(_ exercise: Exercise, from frame: CGRect) {
        activeExercise = exercise
        hero = Hero(exercise: exercise, source: frame)
        heroExpanded = false

        // One frame for the hero to render at the thumbnail before it starts to move.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.02) {
            withAnimation(Ease.out(Duration.screen)) { screen = .exerciseDetail }
            withAnimation(Springs.smooth) { heroExpanded = true }
        }
    }

    private func closeDetail() {
        listEnterDelay = 0.1
        withAnimation(Ease.out(Duration.screen)) { screen = .workoutList }
        withAnimation(Springs.smooth, completionCriteria: .logicallyComplete) {
            heroExpanded = false
        } completion: {
            hero = nil
        }
    }

    private func seedLaunchOverride() {
        guard screen == .exerciseDetail else { return }
        hero = Hero(exercise: activeExercise, source: .zero)
        heroExpanded = true
    }
}

private struct HeroImage: View {
    let name: String
    let source: CGRect
    let expanded: Bool
    let canvas: CGSize

    var body: some View {
        let rect = expanded ? CGRect(origin: .zero, size: canvas) : source
        ExerciseImage(name: name)
            .frame(width: rect.width, height: rect.height)
            .clipShape(RoundedRectangle(cornerRadius: expanded ? 0 : Theme.Radius.thumbnail, style: .continuous))
            .position(x: rect.midX, y: rect.midY)
            .allowsHitTesting(false)
    }
}
