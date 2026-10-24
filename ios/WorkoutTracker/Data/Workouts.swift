import SwiftUI

struct Exercise: Identifiable, Hashable {
    let id: String
    let name: String
    let sets: Int
    let reps: Int
    /// Asset catalog image name.
    let image: String
}

struct Workout {
    let date: String
    let title: String
    let durationMin: Int
    let exercises: [Exercise]
}

enum Workouts {
    static let today = Workout(
        date: "Sunday, March 8",
        title: "It's Chest Day",
        durationMin: 30,
        exercises: [
            Exercise(id: "push-ups", name: "Push-Ups", sets: 3, reps: 12, image: "Exercise-push-ups"),
            Exercise(id: "incline-dumbbell-press", name: "Incline Dumbbell Press", sets: 3, reps: 12, image: "Exercise-incline-dumbbell-press"),
            Exercise(id: "bench-press", name: "Bench Press", sets: 3, reps: 12, image: "Exercise-bench-press"),
            Exercise(id: "cable-fly", name: "Cable Crossover", sets: 3, reps: 12, image: "Exercise-cable-fly"),
        ]
    )
}

/// Aspect-fill asset image. Pass the frame at the call site.
struct ExerciseImage: View {
    let name: String

    var body: some View {
        Image(name)
            .resizable()
            .scaledToFill()
    }
}
