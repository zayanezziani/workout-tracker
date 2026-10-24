import SwiftUI

struct ExerciseHeader: View {
    let title: String
    let onBack: () -> Void

    var body: some View {
        HStack {
            HeaderIconButton(systemName: "chevron.left", label: "Go back", action: onBack)
            Spacer(minLength: 0)
            Text(title)
                .sf(24, .medium, lineHeight: 22)
                .foregroundStyle(Theme.Palette.textPrimary)
                .lineLimit(1)
            Spacer(minLength: 0)
            HeaderIconButton(systemName: "ellipsis", label: "Menu", action: {})
        }
    }
}

struct HeaderIconButton: View {
    let systemName: String
    let label: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(.white)
                .frame(width: Theme.Layout.headerButtonSize, height: Theme.Layout.headerButtonSize)
                .contentShape(Rectangle())
        }
        .buttonStyle(.icon)
        .accessibilityLabel(label)
    }
}
