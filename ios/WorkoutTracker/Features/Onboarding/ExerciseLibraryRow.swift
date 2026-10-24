import SwiftUI

struct ExerciseLibraryRow: View {
    let exercise: LibraryExercise
    let selected: Bool
    let appeared: Bool
    let index: Int
    let onToggle: () -> Void

    var body: some View {
        HStack(spacing: 16) {
            ExerciseThumb(image: exercise.image)

            VStack(alignment: .leading, spacing: 4) {
                Text(exercise.name)
                    .sf(17, .semibold, lineHeight: 22, tracking: -0.43)
                    .foregroundStyle(Color.white.opacity(0.96))
                    .lineLimit(1)
                Text("\(exercise.category.rawValue) · \(exercise.equipment)")
                    .sf(17, .regular, lineHeight: 22, tracking: -0.43)
                    .foregroundStyle(Color.white.opacity(0.5))
                    .lineLimit(1)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            Button(action: onToggle) {
                ZStack {
                    Image(systemName: "plus")
                        .foregroundStyle(.white)
                        .opacity(selected ? 0 : 1)
                        .blur(radius: selected ? 2 : 0)
                    Image(systemName: "minus")
                        .foregroundStyle(Theme.Palette.sheetMinusIcon)
                        .opacity(selected ? 1 : 0)
                        .blur(radius: selected ? 0 : 2)
                }
                .font(.system(size: 16, weight: .bold))
                .frame(width: 36, height: 36)
                .background(Circle().fill(selected ? Color.white : Color.white.opacity(0.2)))
                .animation(Ease.inOut(Duration.micro), value: selected)
            }
            .buttonStyle(PressStyle(scale: 0.97))
            .accessibilityLabel(selected ? "Remove \(exercise.name)" : "Add \(exercise.name)")
            .accessibilityAddTraits(selected ? .isSelected : [])
        }
        .frame(height: 64)
        .staggeredEntrance(appeared, index: index, step: Stagger.tight, delay: 0.06)
    }
}
