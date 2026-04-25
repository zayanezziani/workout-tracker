import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { LibraryExercise } from '../../data/exercises'
import { springs } from '../../lib/motion'

type Props = {
  exercise: LibraryExercise
  onAdd: (exercise: LibraryExercise) => void
}

export function ExerciseLibraryRow({ exercise, onAdd }: Props) {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      className="flex w-full items-center gap-4 rounded-[24px] bg-white/[0.16] p-3"
    >
      <div className="h-[60px] w-[60px] shrink-0 rounded-[16px] bg-white/[0.12]" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-sf text-[17px] font-semibold leading-[20px] text-white">
          {exercise.name}
        </span>
        <span className="font-sf text-[14px] font-normal leading-[16px] text-ink-tertiary">
          {exercise.category} &middot; {exercise.equipment}
        </span>
      </div>
      <motion.button
        type="button"
        onClick={() => onAdd(exercise)}
        whileTap={{ scale: 0.88 }}
        transition={springs.tap}
        aria-label={`Add ${exercise.name}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.16]"
      >
        <Plus size={20} strokeWidth={2.2} className="text-white" />
      </motion.button>
    </motion.div>
  )
}
