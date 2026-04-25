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

export const todaysWorkout: Workout = {
  date: 'Sunday, March 8',
  title: "It's Chest & Triceps Day",
  durationMin: 30,
  exercises: [
    {
      id: 'push-ups',
      name: 'Push-Ups',
      sets: 3,
      reps: 12,
      image: 'https://picsum.photos/seed/pushups/256/200',
    },
    {
      id: 'tricep-dips',
      name: 'Tricep Dips',
      sets: 3,
      reps: 12,
      image: 'https://picsum.photos/seed/tricepdips/256/200',
    },
    {
      id: 'bench-press',
      name: 'Bench Press',
      sets: 3,
      reps: 12,
      image: 'https://picsum.photos/seed/benchpress/256/200',
    },
    {
      id: 'dumbbell-flyes',
      name: 'Dumbbell Flyes',
      sets: 3,
      reps: 12,
      image: 'https://picsum.photos/seed/dumbbellflyes/256/200',
    },
  ],
}
