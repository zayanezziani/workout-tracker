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
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_1_ykqhdw.png',
  'incline-dumbbell-press':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155108/ChatGPT_Image_Apr_25_2026_10_01_59_PM_2_yj9oyr.png',
  'push-ups':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155107/ChatGPT_Image_Apr_25_2026_10_01_59_PM_3_jlrxy4.png',
  'cable-fly':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155089/ChatGPT_Image_Apr_25_2026_10_01_59_PM_4_h9bjvb.png',
  'pull-ups':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155102/ChatGPT_Image_Apr_25_2026_10_01_59_PM_5_ja0urc.png',
  'barbell-row':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155019/ChatGPT_Image_Apr_25_2026_10_01_59_PM_6_yqktnp.png',
  'lat-pulldown':
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155061/ChatGPT_Image_Apr_25_2026_10_01_59_PM_7_gz0wmt.png',
  deadlift:
    'https://res.cloudinary.com/dk6ygi5j6/image/upload/v1777155033/ChatGPT_Image_Apr_25_2026_10_01_59_PM_8_zzh6hv.png',
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
      name: 'Cable Crossover',
      sets: 3,
      reps: 12,
      image: exerciseImages['cable-fly'],
    },
  ],
}
