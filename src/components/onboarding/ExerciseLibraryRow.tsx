import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
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
      className="flex h-16 w-full items-center gap-4"
    >
      {exercise.image ? (
        <img
          src={exercise.image}
          alt=""
          className="h-16 w-16 shrink-0 rounded-[18px] border border-[#252525] object-cover"
        />
      ) : (
        <div className="h-16 w-16 shrink-0 rounded-[18px] border border-[#252525] bg-white/[0.12]" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-sf text-[17px] font-[590] leading-[22px] tracking-[-0.43px] text-white/[0.96]">
          {exercise.name}
        </span>
        <span className="truncate font-sf text-[17px] font-normal leading-[22px] tracking-[-0.43px] text-white/50">
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
            ? '#ffffff'
            : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={stateTransition}
        aria-label={selected ? `Remove ${exercise.name}` : `Add ${exercise.name}`}
        aria-pressed={selected}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:outline-none"
      >
        <AnimatePresence initial={false}>
          {selected ? (
            <motion.span
              key="minus"
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={stateTransition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Minus size={20} strokeWidth={2.6} className="text-[#1f1c18]" />
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
              <Plus size={20} strokeWidth={2.6} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
