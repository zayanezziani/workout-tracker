import SwiftUI

/// Everything on the detail screen except the full-bleed hero image, which lives in `RootView`
/// so it can travel from the list card's thumbnail.
struct ExerciseDetailScreen: View {
    let exercise: Exercise
    let onBack: () -> Void

    @Environment(\.screenInsets) private var insets
    @State private var completedSets = 1
    @State private var reps = 8

    var body: some View {
        ZStack {
            scrims

            VStack(spacing: 0) {
                ExerciseHeader(title: exercise.name, onBack: onBack)
                Spacer(minLength: 0)
                VStack(spacing: 32) {
                    RepsCounter(reps: reps)
                    SetSelector(totalSets: exercise.sets, completedSets: completedSets)
                }
                BottomActions(onNextSet: handleNextSet)
                    .padding(.top, 56)
                    .padding(.bottom, max(Theme.Layout.ctaBottomInset, insets.bottom + 6))
            }
            .screenHorizontalPadding(insets)
            .padding(.top, insets.top)
        }
    }

    /// Two blurred dark blobs from the reference, top and bottom, for text legibility over the photo.
    private var scrims: some View {
        ZStack {
            Rectangle()
                .fill(
                    LinearGradient(
                        stops: [
                            .init(color: .black.opacity(0.64), location: 0),
                            .init(color: .black.opacity(0.64), location: 0.5583),
                            // CSS stop at 157.82% fades to transparent; at 100% it has reached ~57% of the way.
                            .init(color: .black.opacity(0.363), location: 1),
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 674, height: 274)
                .blur(radius: 27)
                .position(x: -136 + 674 / 2, y: -100 + 274 / 2)

            Rectangle()
                .fill(Color.black.opacity(0.6))
                .frame(width: 674, height: 368)
                .blur(radius: 27)
                .position(x: -136 + 674 / 2, y: 506 + 368 / 2)
        }
        .allowsHitTesting(false)
    }

    private func handleNextSet() {
        withAnimation(Springs.smooth) {
            if completedSets < exercise.sets {
                completedSets += 1
                reps = reps == 8 ? 10 : reps == 10 ? 12 : 8
                Haptics.notify(.success)
            } else {
                completedSets = 0
                reps = 8
                Haptics.impact(.soft)
            }
        }
    }
}
