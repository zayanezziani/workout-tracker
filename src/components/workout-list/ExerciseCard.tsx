import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { Exercise } from '../../data/workouts'
import { springs } from '../../lib/motion'

type Props = {
  exercise: Exercise
  onSelect: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(exercise)}
      whileTap={{ scale: 0.98, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      transition={springs.tap}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      className="flex h-[100px] w-full items-center gap-4 overflow-hidden rounded-[20px] bg-transparent pr-4 text-left backdrop-blur-[22px]"
    >
      <motion.div
        layoutId={`exercise-thumb-${exercise.id}`}
        className="h-[100px] w-[128px] shrink-0 overflow-hidden rounded-[20px] bg-white/5"
      >
        <img
          src={exercise.image}
          alt={exercise.name}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-sf text-[20px] font-semibold leading-[22px] text-white">
          {exercise.name}
        </span>
        <span className="font-sf text-[16px] font-normal leading-[18px] text-ink-tertiary">
          {exercise.sets} sets &middot; {exercise.reps} reps
        </span>
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full backdrop-blur-[8px]">
        <ChevronRight
          size={24}
          strokeWidth={2}
          className="text-white/50"
        />
      </div>
    </motion.button>
  )
}
