import SwiftUI

struct WelcomeHeader: View {
    let date: String
    let title: String
    let durationMin: Int
    let exerciseCount: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(date.uppercased())
                .sf(16, .medium, tracking: 1.5)
                .foregroundStyle(Theme.Palette.textTertiary)

            HStack(spacing: 8) {
                Text(title)
                    .sf(28, .bold, lineHeight: 39, tracking: -0.5)
                    .foregroundStyle(Theme.Palette.textPrimary)
                    .lineLimit(1)
                    .fixedSize()

                Button {} label: {
                    Image(systemName: "chevron.down")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(.white)
                        .frame(width: 32, height: 32)
                        .contentShape(Circle())
                }
                .buttonStyle(.icon)
                .accessibilityLabel("Change workout")
            }

            MetaPills(durationMin: durationMin, exerciseCount: exerciseCount)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.top, 8)
    }
}
