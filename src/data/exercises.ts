export const EXERCISE_CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Arms',
  'Legs',
  'Shoulders',
] as const

export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number]
export type ExerciseGroup = Exclude<ExerciseCategory, 'All'> | 'Core'

export type LibraryExercise = {
  id: string
  name: string
  category: ExerciseGroup
  equipment: string
  image?: string
}

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`

const benchPressImage = assetPath('assets/exercises/bench-press.png')

const exerciseImages = {
  benchPress:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_1_ykqhdw.png',
  inclineDumbbellPress:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155108/ChatGPT_Image_Apr_25_2026_10_01_59_PM_2_yj9oyr.png',
  pushUp:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155107/ChatGPT_Image_Apr_25_2026_10_01_59_PM_3_jlrxy4.png',
  cableCrossover:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155089/ChatGPT_Image_Apr_25_2026_10_01_59_PM_4_h9bjvb.png',
  pullUp:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_5_ja0urc.png',
  barbellRow:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155019/ChatGPT_Image_Apr_25_2026_10_01_59_PM_6_yqktnp.png',
  latPulldown:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155061/ChatGPT_Image_Apr_25_2026_10_01_59_PM_7_gz0wmt.png',
  deadlift:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155033/ChatGPT_Image_Apr_25_2026_10_01_59_PM_8_zzh6hv.png',
} as const

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    image: exerciseImages.benchPress,
  },
  {
    id: 'squat',
    name: 'Squat',
    category: 'Legs',
    equipment: 'Barbell',
    image: benchPressImage,
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Back',
    equipment: 'Barbell',
    image: exerciseImages.deadlift,
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'Shoulders',
    equipment: 'Barbell',
    image: benchPressImage,
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'Back',
    equipment: 'Bodyweight',
    image: exerciseImages.pullUp,
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'Legs',
    equipment: 'Bodyweight',
    image: benchPressImage,
  },
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'Chest',
    equipment: 'Bodyweight',
    image: exerciseImages.pushUp,
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    equipment: 'Bodyweight',
    image: benchPressImage,
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    equipment: 'Dumbbell',
    image: exerciseImages.inclineDumbbellPress,
  },
  {
    id: 'cable-crossover',
    name: 'Cable Crossover',
    category: 'Chest',
    equipment: 'Cable',
    image: exerciseImages.cableCrossover,
  },

  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'Back',
    equipment: 'Barbell',
    image: exerciseImages.barbellRow,
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    equipment: 'Cable',
    image: exerciseImages.latPulldown,
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

  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'Legs', equipment: 'Barbell' },
  { id: 'leg-press', name: 'Leg Press', category: 'Legs', equipment: 'Machine' },

  { id: 'lateral-raise', name: 'Lateral Raise', category: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'face-pull', name: 'Face Pull', category: 'Shoulders', equipment: 'Cable' },
  { id: 'front-raise', name: 'Front Raise', category: 'Shoulders', equipment: 'Dumbbell' },
]
