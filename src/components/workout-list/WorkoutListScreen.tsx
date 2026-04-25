import { motion } from 'framer-motion'
import { WelcomeHeader } from './WelcomeHeader'
import { ExerciseCard } from './ExerciseCard'
import { StartButton } from './StartButton'
import type { Exercise, Workout } from '../../data/workouts'
import { ease } from '../../lib/motion'

type Props = {
  workout: Workout
  onSelectExercise: (exercise: Exercise) => void
  onStart: () => void
}

export function WorkoutListScreen({ workout, onSelectExercise, onStart }: Props) {
  return (
    <motion.div
      key="workout-list"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-phone-gradient" />
      <div className="absolute inset-0 bg-phone-glow" />

      <div className="relative z-10 flex h-full flex-col pt-[62px]">
        <div className="flex flex-1 flex-col px-4">
          <WelcomeHeader
            date={workout.date}
            title={workout.title}
            durationMin={workout.durationMin}
            exerciseCount={workout.exercises.length}
          />

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col gap-4 overflow-y-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {workout.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onSelect={onSelectExercise}
              />
            ))}
          </motion.div>

          <StartButton onStart={onStart} />
        </div>
      </div>
    </motion.div>
  )
}
