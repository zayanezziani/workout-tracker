import { motion } from 'framer-motion'
import { WEEK_DAYS, type Day } from '../../data/days'
import { ease } from '../../lib/motion'
import { DayChip } from './DayChip'

type Props = {
  selectedDays: Day[]
  onToggleDay: (day: Day) => void
}

export function ScheduleSetupScreen({
  selectedDays,
  onToggleDay,
}: Props) {
  return (
    <motion.div
      key="onboarding-days"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="absolute inset-0"
    >
      <div className="relative z-10 flex h-full flex-col pt-[62px]">
        <div className="flex flex-1 flex-col justify-end px-4 pb-[166px]">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.15 },
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
              Set Your Training Days
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                },
              }}
              className="flex flex-wrap gap-3"
            >
              {WEEK_DAYS.map((day) => (
                <DayChip
                  key={day}
                  day={day}
                  selected={selectedDays.includes(day)}
                  onToggle={() => onToggleDay(day)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
