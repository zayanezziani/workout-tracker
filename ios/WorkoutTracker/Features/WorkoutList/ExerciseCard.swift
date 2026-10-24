import SwiftUI

struct ExerciseCard: View {
    let exercise: Exercise
    /// True while the hero image is standing in for this card's thumbnail.
    let thumbHidden: Bool
    let appeared: Bool
    let index: Int
    /// Fires with the thumbnail's frame in screen coordinates so the hero can start from it.
    let onFrameChange: (CGRect) -> Void
    let onSelect: (CGRect) -> Void

    @State private var thumbFrame: CGRect = .zero

    var body: some View {
        Button {
            onSelect(thumbFrame)
        } label: {
            HStack(spacing: 16) {
                ExerciseImage(name: exercise.image)
                    .frame(width: Theme.Layout.thumbSize.width, height: Theme.Layout.thumbSize.height)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.thumbnail, style: .continuous))
                    .opacity(thumbHidden ? 0 : 1)
                    .onGeometryChange(for: CGRect.self) { $0.frame(in: .named(Theme.rootSpace)) } action: { frame in
                        thumbFrame = frame
                        onFrameChange(frame)
                    }

                VStack(alignment: .leading, spacing: 4) {
                    Text(exercise.name)
                        .sf(20, .semibold, lineHeight: 22, multiline: true)
                        .foregroundStyle(Theme.Palette.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                    Text("\(exercise.sets) sets · \(exercise.reps) reps")
                        .sf(16, .regular, lineHeight: 18)
                        .foregroundStyle(Theme.Palette.textTertiary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                Image(systemName: "chevron.right")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Theme.Palette.textTertiary)
                    .frame(width: 40, height: 40)
            }
            .padding(.trailing, 16)
            .frame(height: Theme.Layout.cardHeight)
            .contentShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
        }
        .buttonStyle(CardPressStyle())
        .staggeredEntrance(appeared, index: index, step: Stagger.list, delay: 0.1)
    }
}

/// Card press: scale 0.98 and a white-8% wash (web `whileTap`).
private struct CardPressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .background {
                RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                    .fill(Theme.Palette.glass)
                    .opacity(configuration.isPressed ? 1 : 0)
            }
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(Springs.tap, value: configuration.isPressed)
            .onChange(of: configuration.isPressed) { _, pressed in
                if pressed { Haptics.impact(.light) }
            }
    }
}
