export type Exercise = {
  id: string
  name: string
  sets: number
  reps: number
  image: string
}

export type Workout = {
  date: string
  title: string
  durationMin: number
  exercises: Exercise[]
}

export const exerciseImages = {
  'bench-press':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155003/ChatGPT_Image_Apr_25_2026_11_04_23_PM_2_tqw9dv.png',
  'incline-dumbbell-press':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155107/ChatGPT_Image_Apr_25_2026_10_01_59_PM_3_jlrxy4.png',
  'push-ups':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155105/ChatGPT_Image_Apr_25_2026_11_04_29_PM_8_jvwro3.png',
  'cable-fly':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155103/ChatGPT_Image_Apr_25_2026_11_04_29_PM_7_enhfxz.png',
  'pull-ups':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155089/ChatGPT_Image_Apr_25_2026_10_01_59_PM_4_h9bjvb.png',
  'barbell-row':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155061/ChatGPT_Image_Apr_25_2026_10_01_59_PM_7_gz0wmt.png',
  'lat-pulldown':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_5_ja0urc.png',
  deadlift:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155043/ChatGPT_Image_Apr_25_2026_11_04_23_PM_1_lft9xo.png',
} as const

export const todaysWorkout: Workout = {
  date: 'Sunday, March 8',
  title: "It's Chest Day",
  durationMin: 30,
  exercises: [
    {
      id: 'push-ups',
      name: 'Push-Ups',
      sets: 3,
      reps: 12,
      image: exerciseImages['push-ups'],
    },
    {
      id: 'incline-dumbbell-press',
      name: 'Incline Dumbbell Press',
      sets: 3,
      reps: 12,
      image: exerciseImages['incline-dumbbell-press'],
    },
    {
      id: 'bench-press',
      name: 'Bench Press',
      sets: 3,
      reps: 12,
      image: exerciseImages['bench-press'],
    },
    {
      id: 'cable-fly',
      name: 'Cable Fly',
      sets: 3,
      reps: 12,
      image: exerciseImages['cable-fly'],
    },
  ],
}
