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

type PlanExerciseRowProps = {
  day: string
  exercise: LibraryExercise
}

function PlanExerciseRow({ day, exercise }: PlanExerciseRowProps) {
  return (
    <motion.li
      key={exercise.id}
      layout
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      className="flex w-[330px] items-center"
    >
      <div className="flex shrink-0 items-center gap-4">
        {exercise.image ? (
          <motion.img
            layoutId={`plan-exercise-image-${day}-${exercise.id}`}
            src={exercise.image}
            alt=""
            className="size-16 shrink-0 rounded-[18px] border border-[#252525] object-cover"
          />
        ) : (
          <div className="size-16 shrink-0 rounded-[18px] border border-[#252525] bg-white/[0.12]" />
        )}
        <div className="flex shrink-0 flex-col items-start justify-center gap-1">
          <span className="whitespace-nowrap font-sf text-[17px] font-[590] leading-[22px] tracking-[-0.43px] text-white/[0.96]">
            {exercise.name}
          </span>
        </div>
      </div>
    </motion.li>
  )
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
      className="flex w-full flex-col items-start overflow-hidden rounded-[24px] bg-white/[0.1] px-5 py-6"
    >
      <motion.div
        layout="position"
        className="flex w-full items-center justify-between"
      >
        <span className="font-sf text-[20px] font-[590] leading-[25px] tracking-[-0.45px] text-white">
          {day}
        </span>

        {!hasExercises && (
          <motion.button
            type="button"
            onClick={onAddActivity}
            whileTap={{ scale: 0.96, opacity: 0.8 }}
            transition={springs.tap}
            className="rounded-full bg-white/[0.2] px-4 py-2 font-sf text-[17px] font-normal leading-[22px] tracking-[-0.43px] text-white"
          >
            Add exercises
          </motion.button>
        )}

        {hasExercises && (
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={onEditActivity}
              whileTap={{ scale: 0.96, opacity: 0.8 }}
              transition={springs.tap}
              className="rounded-full bg-white/[0.2] px-4 py-2 font-sf text-[17px] font-normal leading-[22px] tracking-[-0.43px] text-white"
            >
              Edit
            </motion.button>
            <motion.button
              type="button"
              onClick={onToggleExpanded}
              whileTap={{ scale: 0.88 }}
              transition={springs.tap}
              aria-label={isOpen ? 'Collapse' : 'Expand'}
              className="flex h-8 w-8 items-center justify-center bg-transparent"
            >
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: ease.standard }}
                className="flex"
              >
                <ChevronDown
                  size={24}
                  strokeWidth={2}
                  className="text-white/80"
                />
              </motion.span>
            </motion.button>
          </div>
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
                <PlanExerciseRow
                  key={exercise.id}
                  day={day}
                  exercise={exercise}
                />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
