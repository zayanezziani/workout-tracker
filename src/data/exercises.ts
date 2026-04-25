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
  image?: string
}

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155003/ChatGPT_Image_Apr_25_2026_11_04_23_PM_2_tqw9dv.png',
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    equipment: 'Dumbbell',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155107/ChatGPT_Image_Apr_25_2026_10_01_59_PM_3_jlrxy4.png',
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    category: 'Chest',
    equipment: 'Bodyweight',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155105/ChatGPT_Image_Apr_25_2026_11_04_29_PM_8_jvwro3.png',
  },
  {
    id: 'cable-fly',
    name: 'Cable Fly',
    category: 'Chest',
    equipment: 'Cable',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155103/ChatGPT_Image_Apr_25_2026_11_04_29_PM_7_enhfxz.png',
  },

  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'Back',
    equipment: 'Bodyweight',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155089/ChatGPT_Image_Apr_25_2026_10_01_59_PM_4_h9bjvb.png',
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'Back',
    equipment: 'Barbell',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155061/ChatGPT_Image_Apr_25_2026_10_01_59_PM_7_gz0wmt.png',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    equipment: 'Cable',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_5_ja0urc.png',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Back',
    equipment: 'Barbell',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155043/ChatGPT_Image_Apr_25_2026_11_04_23_PM_1_lft9xo.png',
  },

  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    category: 'Arms',
    equipment: 'Dumbbell',
    image:
      'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155030/ChatGPT_Image_Apr_25_2026_11_04_29_PM_6_hlachf.png',
  },
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
