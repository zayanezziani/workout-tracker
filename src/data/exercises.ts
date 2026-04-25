export const EXERCISE_CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Arms',
  'Legs',
  'Shoulders',
] as const

export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number]

export type LibraryExercise = {
  id: string
  name: string
  category: Exclude<ExerciseCategory, 'All'>
  equipment: string
}

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  { id: 'bench-press', name: 'Bench Press', category: 'Chest', equipment: 'Barbell' },
  { id: 'incline-db-press', name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'Dumbbell' },
  { id: 'push-ups', name: 'Push-Ups', category: 'Chest', equipment: 'Bodyweight' },
  { id: 'cable-fly', name: 'Cable Fly', category: 'Chest', equipment: 'Cable' },

  { id: 'pull-ups', name: 'Pull-Ups', category: 'Back', equipment: 'Bodyweight' },
  { id: 'barbell-row', name: 'Barbell Row', category: 'Back', equipment: 'Barbell' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Back', equipment: 'Cable' },
  { id: 'deadlift', name: 'Deadlift', category: 'Back', equipment: 'Barbell' },

  { id: 'bicep-curl', name: 'Bicep Curl', category: 'Arms', equipment: 'Dumbbell' },
  { id: 'tricep-dips', name: 'Tricep Dips', category: 'Arms', equipment: 'Bodyweight' },
  { id: 'hammer-curl', name: 'Hammer Curl', category: 'Arms', equipment: 'Dumbbell' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Arms', equipment: 'Cable' },

  { id: 'back-squat', name: 'Back Squat', category: 'Legs', equipment: 'Barbell' },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'Legs', equipment: 'Barbell' },
  { id: 'leg-press', name: 'Leg Press', category: 'Legs', equipment: 'Machine' },
  { id: 'walking-lunge', name: 'Walking Lunge', category: 'Legs', equipment: 'Dumbbell' },

  { id: 'overhead-press', name: 'Overhead Press', category: 'Shoulders', equipment: 'Barbell' },
  { id: 'lateral-raise', name: 'Lateral Raise', category: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'face-pull', name: 'Face Pull', category: 'Shoulders', equipment: 'Cable' },
  { id: 'front-raise', name: 'Front Raise', category: 'Shoulders', equipment: 'Dumbbell' },
]
