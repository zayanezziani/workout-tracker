import SwiftUI

struct WorkoutListScreen: View {
    let workout: Workout
    let hiddenThumbID: String?
    let onSelectExercise: (Exercise, CGRect) -> Void

    @Environment(\.screenInsets) private var insets
    @State private var appeared = false
    @State private var thumbFrames: [String: CGRect] = [:]

    var body: some View {
        ZStack {
            Theme.Palette.phone
            ListBackground()

            VStack(spacing: 0) {
                WelcomeHeader(
                    date: workout.date,
                    title: workout.title,
                    durationMin: workout.durationMin,
                    exerciseCount: workout.exercises.count
                )

                ScrollView {
                    VStack(spacing: 16) {
                        ForEach(Array(workout.exercises.enumerated()), id: \.element.id) { index, exercise in
                            ExerciseCard(
                                exercise: exercise,
                                thumbHidden: hiddenThumbID == exercise.id,
                                appeared: appeared,
                                index: index,
                                onFrameChange: { thumbFrames[exercise.id] = $0 },
                                onSelect: { onSelectExercise(exercise, $0) }
                            )
                        }
                    }
                    .padding(.vertical, 24)
                }
                .scrollIndicators(.hidden)

                StartButton {
                    guard let first = workout.exercises.first else { return }
                    onSelectExercise(first, thumbFrames[first.id] ?? .zero)
                }
                .padding(.bottom, max(Theme.Layout.ctaBottomInset, insets.bottom + 6))
            }
            .screenHorizontalPadding(insets)
            .padding(.top, insets.top)
        }
        .onAppear { appeared = true }
    }
}
