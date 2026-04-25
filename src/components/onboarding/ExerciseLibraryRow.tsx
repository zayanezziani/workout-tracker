import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import type { LibraryExercise } from '../../data/exercises'
import { ease, springs } from '../../lib/motion'

type Props = {
  exercise: LibraryExercise
  selected: boolean
  onToggle: (exercise: LibraryExercise) => void
}

export function ExerciseLibraryRow({ exercise, selected, onToggle }: Props) {
  const stateTransition = { duration: 0.18, ease: ease.inOut }

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      className="flex w-full items-center gap-4"
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
        onClick={() => onToggle(exercise)}
        whileTap={{ scale: 0.97 }}
        initial={false}
        animate={{
          backgroundColor: selected
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.16)',
        }}
        transition={stateTransition}
        aria-label={selected ? `Remove ${exercise.name}` : `Add ${exercise.name}`}
        aria-pressed={selected}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      >
        <AnimatePresence initial={false}>
          {selected ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={stateTransition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={20} strokeWidth={2.6} className="text-[#1f1c18]" />
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={stateTransition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Plus size={20} strokeWidth={2.2} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
