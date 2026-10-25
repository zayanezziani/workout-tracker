import SwiftUI

struct DayChip: View {
    let day: Day
    let selected: Bool
    let appeared: Bool
    let index: Int
    let onToggle: () -> Void

    var body: some View {
        Button(action: onToggle) {
            Text(day.rawValue)
                // Web: 18px text with `leading-none`, 16px padding and a 1px border → a 52pt chip.
                .sf(18, .regular, lineHeight: 18)
                .foregroundStyle(selected ? Color.black : Color.white)
                .padding(17)
                .background(
                    RoundedRectangle(cornerRadius: Theme.Radius.dayChip, style: .continuous)
                        .fill(selected ? Color.white : Color.white.opacity(0.2))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: Theme.Radius.dayChip, style: .continuous)
                        .strokeBorder(Color.white.opacity(0.08), lineWidth: 1)
                )
        }
        .buttonStyle(.glassButton)
        .animation(Springs.tap, value: selected)
        // Outer stagger: title (0) then chip group (1), then 40 ms between chips.
        .staggeredEntrance(appeared, index: index, step: Stagger.chips, delay: 0.15 + Stagger.tight + 0.05)
    }
}
