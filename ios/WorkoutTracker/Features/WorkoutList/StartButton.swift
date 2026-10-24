import SwiftUI

struct StartButton: View {
    let onStart: () -> Void

    var body: some View {
        Button(action: onStart) {
            Text("Start Workout")
                .sf(20, .medium, lineHeight: 22, tracking: -0.43)
                .foregroundStyle(Theme.Palette.ctaText)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 32)
                .padding(.horizontal, 36)
                .background(Capsule().fill(Theme.Palette.cta))
        }
        .buttonStyle(.cta)
    }
}
