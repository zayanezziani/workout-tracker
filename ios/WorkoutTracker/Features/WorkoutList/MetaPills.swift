import SwiftUI

struct MetaPills: View {
    let durationMin: Int
    let exerciseCount: Int

    var body: some View {
        HStack(spacing: 8) {
            MetaPill(icon: "clock", text: "~\(durationMin) min")
            MetaPill(icon: "dumbbell", text: "\(exerciseCount) exercises")
        }
        // Web `mt-2` on top of the header's 8pt gap.
        .padding(.top, 8)
    }
}

private struct MetaPill: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .medium))
                .frame(width: 16, height: 16)
            Text(text)
                .sf(16, .regular, lineHeight: 22)
        }
        .foregroundStyle(Theme.Palette.textMeta)
        .padding(.horizontal, 14)
        .padding(.vertical, 7)
        .glass(fill: Theme.Palette.glass, blur: .none, border: Theme.Palette.glassBorder, in: Capsule())
    }
}
