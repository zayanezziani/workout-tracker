import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import type { Day } from '../../data/days'
import type { LibraryExercise } from '../../data/exercises'
import { ease, springs } from '../../lib/motion'
import { DayPlanCard } from './DayPlanCard'
import { AddActivitySheet } from './AddActivitySheet'

type Props = {
  selectedDays: Day[]
  planByDay: Record<string, LibraryExercise[]>
  onSetExercisesForDay: (day: Day, exercises: LibraryExercise[]) => void
  onBack: () => void
}

export function PlanSetupScreen({
  selectedDays,
  planByDay,
  onSetExercisesForDay,
  onBack,
}: Props) {
  const [activeDay, setActiveDay] = useState<Day | null>(null)
  const [expandedDay, setExpandedDay] = useState<Day | null>(null)

  const setExercisesForDay = (day: Day, exercises: LibraryExercise[]) => {
    onSetExercisesForDay(day, exercises)
    if (exercises.length > 0) {
      setExpandedDay(day)
    } else if (expandedDay === day) {
      setExpandedDay(null)
    }
  }

  const toggleExpanded = (day: Day) => {
    setExpandedDay((prev) => (prev === day ? null : day))
  }

  return (
    <motion.div
      key="onboarding-plan"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="absolute inset-0 overflow-hidden bg-[#161410]"
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center">
          <motion.button
            type="button"
            onClick={onBack}
            whileTap={{ scale: 0.92 }}
            transition={springs.tap}
            aria-label="Go back"
            className="flex h-12 w-12 items-center justify-center bg-transparent"
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-white" />
          </motion.button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-[160px] pt-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.15 },
              },
            }}
            initial="hidden"
            animate="show"
            className="mt-auto flex flex-col gap-8"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: ease.out },
                },
              }}
              className="font-sf text-[32px] font-bold leading-[39px] tracking-[-0.5px] text-white"
            >
              Plan Your Week
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
              className="flex flex-col gap-6"
            >
              {selectedDays.map((day) => (
                <DayPlanCard
                  key={day}
                  day={day}
                  exercises={planByDay[day] ?? []}
                  expanded={expandedDay === day}
                  onAddActivity={() => setActiveDay(day)}
                  onEditActivity={() => setActiveDay(day)}
                  onToggleExpanded={() => toggleExpanded(day)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AddActivitySheet
        open={activeDay !== null}
        day={activeDay}
        initialSelected={activeDay ? planByDay[activeDay] ?? [] : []}
        onClose={() => setActiveDay(null)}
        onConfirm={(exercises) => {
          if (activeDay) setExercisesForDay(activeDay, exercises)
        }}
      />
    </motion.div>
  )
}
