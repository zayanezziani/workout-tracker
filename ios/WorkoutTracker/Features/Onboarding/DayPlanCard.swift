import SwiftUI

struct DayPlanCard: View {
    let day: Day
    let exercises: [LibraryExercise]
    let expanded: Bool
    let appeared: Bool
    let index: Int
    let onAddActivity: () -> Void
    let onToggleExpanded: () -> Void

    private var hasExercises: Bool { !exercises.isEmpty }
    private var isOpen: Bool { hasExercises && expanded }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(day.rawValue)
                    .sf(20, .semibold, lineHeight: 25, tracking: -0.45)
                    .foregroundStyle(.white)
                Spacer(minLength: 0)

                if hasExercises {
                    HStack(spacing: 16) {
                        PillButton(title: "Edit", action: onAddActivity)
                        Button(action: onToggleExpanded) {
                            Image(systemName: "chevron.down")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Color.white.opacity(0.8))
                                .rotationEffect(.degrees(isOpen ? 180 : 0))
                                .animation(Ease.standard(0.3), value: isOpen)
                                .frame(width: 32, height: 32)
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(.chevron)
                        .accessibilityLabel(isOpen ? "Collapse" : "Expand")
                    }
                } else {
                    PillButton(title: "Add exercises", action: onAddActivity)
                }
            }

            if isOpen {
                VStack(alignment: .leading, spacing: 16) {
                    ForEach(Array(exercises.enumerated()), id: \.element.id) { rowIndex, exercise in
                        PlanExerciseRow(exercise: exercise, index: rowIndex)
                    }
                }
                .padding(.top, 24)
                .transition(.opacity)
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: Theme.Radius.dayCard, style: .continuous)
                .fill(Color.white.opacity(0.1))
        )
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.dayCard, style: .continuous))
        // Outer: title (0), cards group (1) → each card staggers 60 ms after that.
        .staggeredEntrance(appeared, index: index, step: Stagger.list, delay: 0.15 + Stagger.list + 0.05, y: 16)
    }
}

private struct PillButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .sf(17, .regular, lineHeight: 22, tracking: -0.43)
                .foregroundStyle(.white)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(Capsule().fill(Color.white.opacity(0.2)))
        }
        .buttonStyle(.pill)
    }
}

private struct PlanExerciseRow: View {
    let exercise: LibraryExercise
    let index: Int

    @State private var appeared = false

    var body: some View {
        HStack(spacing: 16) {
            ExerciseThumb(image: exercise.image)
            Text(exercise.name)
                .sf(17, .semibold, lineHeight: 22, tracking: -0.43)
                .foregroundStyle(Color.white.opacity(0.96))
                .lineLimit(1)
        }
        .staggeredEntrance(appeared, index: index, step: Stagger.tight, delay: 0.05, y: 8)
        .onAppear { appeared = true }
    }
}

/// 64×64 rounded thumbnail with the `#252525` border; white-12% tile when there is no art.
struct ExerciseThumb: View {
    let image: String?

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: Theme.Radius.planThumb, style: .continuous)
        Group {
            if let image {
                ExerciseImage(name: image)
            } else {
                Color.white.opacity(0.12)
            }
        }
        .frame(width: 64, height: 64)
        .clipShape(shape)
        .overlay(shape.strokeBorder(Theme.Palette.planThumbBorder, lineWidth: 1))
    }
}
