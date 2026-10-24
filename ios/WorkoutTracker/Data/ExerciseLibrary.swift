import Foundation

/// Filter chips in the add sheet. `Core` only exists as an exercise group.
enum ExerciseCategory: String, CaseIterable, Identifiable {
    case all = "All"
    case chest = "Chest"
    case back = "Back"
    case arms = "Arms"
    case legs = "Legs"
    case shoulders = "Shoulders"

    var id: String { rawValue }
}

enum ExerciseGroup: String {
    case chest = "Chest"
    case back = "Back"
    case arms = "Arms"
    case legs = "Legs"
    case shoulders = "Shoulders"
    case core = "Core"
}

struct LibraryExercise: Identifiable, Hashable {
    let id: String
    let name: String
    let category: ExerciseGroup
    let equipment: String
    /// Asset catalog name; `nil` shows the white-12% placeholder tile.
    let image: String?
}

enum ExerciseLibrary {
    /// Items surfaced first on the "All" tab.
    static let featuredIDs: Set<String> = [
        "incline-db-press", "push-up", "bench-press", "pull-up",
        "deadlift", "cable-crossover", "barbell-row", "lat-pulldown",
    ]

    // The web build reuses the bench-press art for items without their own picture.
    // `bicep-curl` only exists as a remote image there, so it shows the placeholder tile until we bundle it.
    static let all: [LibraryExercise] = [
        .init(id: "bench-press", name: "Bench Press", category: .chest, equipment: "Barbell", image: "Exercise-bench-press"),
        .init(id: "squat", name: "Squat", category: .legs, equipment: "Barbell", image: "Exercise-bench-press"),
        .init(id: "deadlift", name: "Deadlift", category: .back, equipment: "Barbell", image: "Exercise-deadlift"),
        .init(id: "overhead-press", name: "Overhead Press", category: .shoulders, equipment: "Barbell", image: "Exercise-bench-press"),
        .init(id: "pull-up", name: "Pull-Up", category: .back, equipment: "Bodyweight", image: "Exercise-pull-ups"),
        .init(id: "lunges", name: "Lunges", category: .legs, equipment: "Bodyweight", image: "Exercise-bench-press"),
        .init(id: "push-up", name: "Push-Up", category: .chest, equipment: "Bodyweight", image: "Exercise-push-ups"),
        .init(id: "plank", name: "Plank", category: .core, equipment: "Bodyweight", image: "Exercise-bench-press"),
        .init(id: "incline-db-press", name: "Incline Dumbbell Press", category: .chest, equipment: "Dumbbell", image: "Exercise-incline-dumbbell-press"),
        .init(id: "cable-crossover", name: "Cable Crossover", category: .chest, equipment: "Cable", image: "Exercise-cable-fly"),

        .init(id: "barbell-row", name: "Barbell Row", category: .back, equipment: "Barbell", image: "Exercise-barbell-row"),
        .init(id: "lat-pulldown", name: "Lat Pulldown", category: .back, equipment: "Cable", image: "Exercise-lat-pulldown"),
        .init(id: "bicep-curl", name: "Bicep Curl", category: .arms, equipment: "Dumbbell", image: nil),
        .init(id: "tricep-dips", name: "Tricep Dips", category: .arms, equipment: "Bodyweight", image: nil),
        .init(id: "hammer-curl", name: "Hammer Curl", category: .arms, equipment: "Dumbbell", image: nil),
        .init(id: "tricep-pushdown", name: "Tricep Pushdown", category: .arms, equipment: "Cable", image: nil),

        .init(id: "romanian-deadlift", name: "Romanian Deadlift", category: .legs, equipment: "Barbell", image: nil),
        .init(id: "leg-press", name: "Leg Press", category: .legs, equipment: "Machine", image: nil),

        .init(id: "lateral-raise", name: "Lateral Raise", category: .shoulders, equipment: "Dumbbell", image: nil),
        .init(id: "face-pull", name: "Face Pull", category: .shoulders, equipment: "Cable", image: nil),
        .init(id: "front-raise", name: "Front Raise", category: .shoulders, equipment: "Dumbbell", image: nil),
    ]

    /// Web `sortExercisesForSheet`: featured first on "All", then alphabetical.
    static func sorted(_ exercises: [LibraryExercise], for category: ExerciseCategory) -> [LibraryExercise] {
        exercises.sorted { a, b in
            if category == .all {
                let aFeatured = featuredIDs.contains(a.id)
                let bFeatured = featuredIDs.contains(b.id)
                if aFeatured != bFeatured { return aFeatured }
            }
            return a.name.localizedCaseInsensitiveCompare(b.name) == .orderedAscending
        }
    }
}
