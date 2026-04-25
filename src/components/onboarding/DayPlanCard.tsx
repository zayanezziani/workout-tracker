import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { LibraryExercise } from '../../data/exercises'
import { ease, springs } from '../../lib/motion'

type Props = {
  day: string
  exercises: LibraryExercise[]
  expanded: boolean
  onAddActivity: () => void
  onEditActivity: () => void
  onToggleExpanded: () => void
}

export function DayPlanCard({
  day,
  exercises,
  expanded,
  onAddActivity,
  onEditActivity,
  onToggleExpanded,
}: Props) {
  const hasExercises = exercises.length > 0
  const isOpen = hasExercises && expanded

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      transition={springs.smooth}
      className="flex w-full flex-col overflow-hidden rounded-[24px] bg-white/[0.16] px-5 py-6"
    >
      <motion.div
        layout="position"
        className="flex w-full items-center justify-between"
      >
        <span className="font-sf text-[20px] font-semibold leading-none text-white">
          {day}
        </span>

        {!hasExercises && (
          <motion.button
            type="button"
            onClick={onAddActivity}
            whileTap={{ scale: 0.96, opacity: 0.8 }}
            transition={springs.tap}
            className="font-sf text-[16px] font-normal leading-[21px] tracking-[-0.31px] text-white underline decoration-solid underline-offset-[3px]"
          >
            Add Activity
          </motion.button>
        )}

        {hasExercises && (
          <motion.button
            type="button"
            onClick={onToggleExpanded}
            whileTap={{ scale: 0.88 }}
            transition={springs.tap}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: ease.standard }}
              className="flex"
            >
              <ChevronDown size={20} strokeWidth={2.2} className="text-white" />
            </motion.span>
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: ease.standard }}
            className="overflow-hidden"
          >
            <motion.ul
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-4 pt-6"
            >
              {exercises.map((exercise) => (
                <motion.li
                  key={exercise.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: springs.smooth },
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="h-[60px] w-[60px] shrink-0 rounded-[18px] bg-white/[0.12]" />
                  <span className="font-sf text-[16px] font-semibold leading-[22px] text-white/[0.96]">
                    {exercise.name}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 0.15 } },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center pt-6"
            >
              <motion.button
                type="button"
                onClick={onEditActivity}
                whileTap={{ scale: 0.96, opacity: 0.8 }}
                transition={springs.tap}
                className="font-sf text-[16px] font-normal leading-[21px] tracking-[-0.31px] text-white underline decoration-solid underline-offset-[3px]"
              >
                Edit Activity
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
