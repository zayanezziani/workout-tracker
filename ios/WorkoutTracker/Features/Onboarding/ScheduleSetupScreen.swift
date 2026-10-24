import SwiftUI

struct ScheduleSetupScreen: View {
    let selectedDays: [Day]
    let onToggleDay: (Day) -> Void

    @Environment(\.screenInsets) private var insets
    @State private var appeared = false

    var body: some View {
        VStack(alignment: .leading, spacing: 40) {
            Text("Set Your Training Days")
                .sf(32, .bold, lineHeight: 39, tracking: -0.5)
                .foregroundStyle(Theme.Palette.textPrimary)
                .staggeredEntrance(appeared, index: 0, step: Stagger.tight, delay: 0.15, animation: Ease.out(Duration.screen))

            FlowLayout(spacing: 12, lineSpacing: 12) {
                ForEach(Array(Day.allCases.enumerated()), id: \.element) { index, day in
                    DayChip(
                        day: day,
                        selected: selectedDays.contains(day),
                        appeared: appeared,
                        index: index,
                        onToggle: { onToggleDay(day) }
                    )
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
        .screenHorizontalPadding(insets)
        .padding(.top, insets.top)
        // Sits above the persistent Continue button.
        .padding(.bottom, 166)
        .onAppear { appeared = true }
    }
}
