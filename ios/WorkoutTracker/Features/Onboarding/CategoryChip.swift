import SwiftUI

struct CategoryChip: View {
    let label: String
    let selected: Bool
    let onSelect: () -> Void

    var body: some View {
        Button(action: onSelect) {
            Text(label)
                .sf(15, .medium)
                .foregroundStyle(selected ? Color.black : Color.white)
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                .glass(
                    fill: selected ? Color.white : Color.white.opacity(0.16),
                    blur: .regular,
                    border: Theme.Palette.glassBorder,
                    in: Capsule()
                )
        }
        .buttonStyle(.glassButton)
        .animation(Ease.inOut(Duration.micro), value: selected)
    }
}
