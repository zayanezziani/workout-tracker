import SwiftUI

struct RepsCounter: View {
    let reps: Int

    var body: some View {
        VStack(spacing: 0) {
            // The number is keyed on its value: the old one scales up and fades out while the new one pops in.
            ZStack {
                Text("\(reps)")
                    .sf(40, .semibold, lineHeight: 40)
                    .foregroundStyle(Theme.Palette.textPrimary)
                    .id(reps)
                    .transition(
                        .asymmetric(
                            insertion: .scale(scale: 0.6).combined(with: .opacity),
                            removal: .scale(scale: 1.3).combined(with: .opacity)
                        )
                    )
            }
            .frame(height: 40)
            .animation(Springs.bouncy, value: reps)

            Text("Reps")
                .sf(24, .regular, lineHeight: 40)
                .foregroundStyle(Theme.Palette.textSecondary)
        }
    }
}
