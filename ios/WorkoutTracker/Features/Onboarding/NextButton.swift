import SwiftUI

struct NextButton: View {
    let enabled: Bool
    var label: String = "Next"
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .sf(20, .medium, lineHeight: 22, tracking: -0.43)
                .foregroundStyle(enabled ? Color.black : Color.black.opacity(0.6))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 24)
                .padding(.horizontal, 36)
                .background(Capsule().fill(Theme.Palette.cta))
        }
        .buttonStyle(.cta)
        .disabled(!enabled)
        .opacity(enabled ? 1 : 0.3)
        .animation(Springs.tap, value: enabled)
    }
}
