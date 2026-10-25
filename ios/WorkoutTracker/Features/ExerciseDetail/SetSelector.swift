import SwiftUI

struct SetSelector: View {
    let totalSets: Int
    let completedSets: Int

    var body: some View {
        HStack(spacing: 8) {
            ForEach(0..<totalSets, id: \.self) { index in
                SetPill(index: index, isDone: index < completedSets)
            }
        }
        .frame(maxWidth: .infinity)
        .animation(Springs.smooth, value: completedSets)
    }
}

private struct SetPill: View {
    let index: Int
    let isDone: Bool

    var body: some View {
        ZStack {
            if isDone {
                Image(systemName: "checkmark")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundStyle(.black)
                    .transition(.scale(scale: 0.01).combined(with: .opacity).animation(Springs.bouncy))
            } else {
                Text("Set \(index + 1)")
                    .sf(16, .regular, lineHeight: 22)
                    .foregroundStyle(.white)
                    .transition(.opacity)
            }
        }
        .frame(maxWidth: .infinity)
        .frame(height: 40)
        .glass(
            fill: isDone ? .white : Theme.Palette.glassStrongOverMaterial,
            blur: isDone ? .none : .light,
            in: RoundedRectangle(
                cornerRadius: isDone ? Theme.Radius.setPillActive : Theme.Radius.setPillInactive,
                style: .continuous
            )
        )
    }
}
