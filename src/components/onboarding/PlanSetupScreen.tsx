import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import type { Day } from '../../data/days'
import { ease, springs } from '../../lib/motion'
import { DayPlanCard } from './DayPlanCard'
import { NextButton } from './NextButton'
import { AddActivitySheet } from './AddActivitySheet'

type Props = {
  selectedDays: Day[]
  onBack: () => void
  onNext: () => void
}

export function PlanSetupScreen({ selectedDays, onBack, onNext }: Props) {
  const [activeDay, setActiveDay] = useState<Day | null>(null)

  return (
    <motion.div
      key="onboarding-plan"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="absolute inset-0 overflow-hidden bg-[#161410]"
    >
      <div className="relative z-10 flex h-full flex-col pt-[62px]">
        <div className="flex items-center px-4">
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

        <div className="flex flex-1 flex-col justify-end px-4 pb-14">
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
            className="flex flex-col gap-10"
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
              Add to your plan
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
                  onAddActivity={() => setActiveDay(day)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="px-4 pb-10">
          <NextButton enabled onClick={onNext} />
        </div>
      </div>

      <AddActivitySheet
        open={activeDay !== null}
        day={activeDay}
        onClose={() => setActiveDay(null)}
        onAdd={() => setActiveDay(null)}
      />
    </motion.div>
  )
}
