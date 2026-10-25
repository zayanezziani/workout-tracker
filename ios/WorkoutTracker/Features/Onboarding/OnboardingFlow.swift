import SwiftUI

struct OnboardingFlow: View {
    enum Step { case days, plan }

    @Binding var selectedDays: [Day]
    let onFinish: () -> Void

    @Environment(\.screenInsets) private var insets
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var step: Step
    @State private var planByDay: [Day: [LibraryExercise]] = [:]
    @State private var activeDay: Day?
    @State private var sheetUp = false
    @State private var expandedDay: Day?

    init(selectedDays: Binding<[Day]>, initialStep: Step = .days, onFinish: @escaping () -> Void) {
        _selectedDays = selectedDays
        _step = State(initialValue: initialStep)
        self.onFinish = onFinish
    }

    private var planHasExercises: Bool {
        selectedDays.contains { !(planByDay[$0]?.isEmpty ?? true) }
    }

    private var canProceed: Bool {
        step == .plan ? planHasExercises : !selectedDays.isEmpty
    }

    var body: some View {
        ZStack {
            Theme.Palette.onboardingBackground

            ZStack {
                switch step {
                case .days:
                    ScheduleSetupScreen(selectedDays: selectedDays, onToggleDay: toggleDay)
                        .transition(.screen(enterX: 24, exitX: -24))
                case .plan:
                    PlanSetupScreen(
                        selectedDays: selectedDays,
                        planByDay: planByDay,
                        expandedDay: expandedDay,
                        onAddActivity: present,
                        onToggleExpanded: toggleExpanded,
                        onBack: { go(to: .days) }
                    )
                    .transition(.screen(enterX: 24, exitX: -24))
                }
            }

            VStack {
                Spacer()
                NextButton(enabled: canProceed, label: "Continue") {
                    if step == .plan { onFinish() } else { go(to: .plan) }
                }
                .screenHorizontalPadding(insets)
                .padding(.bottom, max(Theme.Layout.ctaBottomInset, insets.bottom + 6))
            }

            sheetLayer
        }
        .clipped()
    }

    // MARK: Sheet

    /// The sheet stays mounted while it animates away: `activeDay` is the content, `sheetUp` is the animation state.
    @ViewBuilder
    private var sheetLayer: some View {
        if let day = activeDay {
            Color.black.opacity(0.5)
                .opacity(sheetUp ? 1 : 0)
                // Web: fade in over 300 ms, out over 200 ms.
                .animation(sheetUp ? Ease.out(0.3) : Ease.out(0.2), value: sheetUp)
                .contentShape(Rectangle())
                .onTapGesture(perform: dismissSheet)
                .allowsHitTesting(sheetUp)

            VStack(spacing: 0) {
                Spacer(minLength: 0)
                AddActivitySheet(
                    day: day,
                    initialSelected: planByDay[day] ?? [],
                    onClose: dismissSheet,
                    onConfirm: { exercises in confirm(exercises, for: day) }
                )
            }
            .ignoresSafeArea(.keyboard)
            // Slides in and out on the same spring (web: y 100% → 0 → 100%); Reduce Motion fades instead.
            .offset(y: reduceMotion || sheetUp ? 0 : sheetHiddenOffset)
            .opacity(reduceMotion && !sheetUp ? 0 : 1)
            .allowsHitTesting(sheetUp)
        }
    }

    /// Far enough down to clear the 640 pt sheet plus the home indicator on any device.
    private var sheetHiddenOffset: CGFloat { 640 + 120 }

    private func present(_ day: Day) {
        Haptics.impact(.soft)
        // Mount hidden, then animate up on the next tick.
        activeDay = day
        sheetUp = false
        DispatchQueue.main.async {
            withAnimation(reduceMotion ? Ease.out(0.2) : Springs.sheet) { sheetUp = true }
        }
    }

    private func dismissSheet() {
        guard sheetUp else { return }
        withAnimation(reduceMotion ? Ease.out(0.2) : Springs.sheet, completionCriteria: .logicallyComplete) {
            sheetUp = false
        } completion: {
            if !sheetUp { activeDay = nil }
        }
    }

    private func confirm(_ exercises: [LibraryExercise], for day: Day) {
        planByDay[day] = exercises
        withAnimation(Ease.standard(0.4)) {
            if exercises.isEmpty {
                if expandedDay == day { expandedDay = nil }
            } else {
                expandedDay = day
            }
        }
    }

    // MARK: Actions

    private func toggleDay(_ day: Day) {
        Haptics.selection()
        if selectedDays.contains(day) {
            selectedDays.removeAll { $0 == day }
        } else {
            selectedDays = (selectedDays + [day]).sorted {
                (Day.allCases.firstIndex(of: $0) ?? 0) < (Day.allCases.firstIndex(of: $1) ?? 0)
            }
        }
    }

    private func toggleExpanded(_ day: Day) {
        withAnimation(Ease.standard(0.4)) {
            expandedDay = expandedDay == day ? nil : day
        }
    }

    private func go(to next: Step) {
        withAnimation(Ease.out(Duration.screen)) { step = next }
    }
}
