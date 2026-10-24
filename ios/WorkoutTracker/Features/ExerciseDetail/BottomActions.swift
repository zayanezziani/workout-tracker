import SwiftUI

struct BottomActions: View {
    let onNextSet: () -> Void

    var body: some View {
        HStack(spacing: 24) {
            GlassButton(systemName: "list.bullet", label: "List")

            Button(action: onNextSet) {
                Text("Next Set")
                    .sf(20, .medium, lineHeight: 22, tracking: -0.43)
                    .foregroundStyle(Theme.Palette.ctaText)
                    .frame(maxWidth: .infinity)
                    .frame(height: Theme.Layout.nextSetHeight)
                    .background(Capsule().fill(Theme.Palette.cta))
            }
            .buttonStyle(.cta)

            GlassButton(systemName: "square.and.arrow.up", label: "Share")
        }
    }
}

private struct GlassButton: View {
    let systemName: String
    let label: String

    var body: some View {
        Button {} label: {
            Image(systemName: systemName)
                .font(.system(size: 19, weight: .semibold))
                .foregroundStyle(.white)
                .frame(width: Theme.Layout.glassButtonSize, height: Theme.Layout.glassButtonSize)
                .glass(fill: Theme.Palette.glassStrongOverMaterial, blur: .light, in: Circle())
        }
        .buttonStyle(.glassButton)
        .accessibilityLabel(label)
    }
}
