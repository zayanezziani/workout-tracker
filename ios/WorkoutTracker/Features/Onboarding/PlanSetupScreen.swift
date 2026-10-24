import SwiftUI

struct PlanSetupScreen: View {
    let selectedDays: [Day]
    let planByDay: [Day: [LibraryExercise]]
    let expandedDay: Day?
    let onAddActivity: (Day) -> Void
    let onToggleExpanded: (Day) -> Void
    let onBack: () -> Void

    @Environment(\.screenInsets) private var insets
    @State private var appeared = false

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                HeaderIconButton(systemName: "chevron.left", label: "Go back", action: onBack)
                Spacer()
            }
            // The web row has no horizontal padding: the 48pt button's chevron sits at x = 24.
            .padding(.leading, insets.leading)

            GeometryReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 32) {
                        Text("Plan Your Week")
                            .sf(32, .bold, lineHeight: 39, tracking: -0.5)
                            .foregroundStyle(Theme.Palette.textPrimary)
                            .staggeredEntrance(appeared, index: 0, step: Stagger.list, delay: 0.15, animation: Ease.out(Duration.screen))

                        VStack(spacing: 24) {
                            ForEach(Array(selectedDays.enumerated()), id: \.element) { index, day in
                                DayPlanCard(
                                    day: day,
                                    exercises: planByDay[day] ?? [],
                                    expanded: expandedDay == day,
                                    appeared: appeared,
                                    index: index,
                                    onAddActivity: { onAddActivity(day) },
                                    onToggleExpanded: { onToggleExpanded(day) }
                                )
                            }
                        }
                    }
                    .screenHorizontalPadding(insets)
                    .padding(.top, 50)
                    .padding(.bottom, 160)
                    // Short content hugs the bottom (web `mt-auto`); long content scrolls.
                    .frame(minHeight: proxy.size.height, alignment: .bottom)
                }
                .scrollIndicators(.hidden)
            }
        }
        .padding(.top, insets.top)
        .onAppear { appeared = true }
    }
}
