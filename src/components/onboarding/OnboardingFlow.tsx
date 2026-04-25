import { AnimatePresence, motion } from 'framer-motion'
import type { Day } from '../../data/days'
import { ease } from '../../lib/motion'
import { NextButton } from './NextButton'
import { PlanSetupScreen } from './PlanSetupScreen'
import { ScheduleSetupScreen } from './ScheduleSetupScreen'

type OnboardingStep = 'days' | 'plan'

type Props = {
  step: OnboardingStep
  selectedDays: Day[]
  onToggleDay: (day: Day) => void
  onBack: () => void
  onNextSchedule: () => void
  onNextPlan: () => void
}

export function OnboardingFlow({
  step,
  selectedDays,
  onToggleDay,
  onBack,
  onNextSchedule,
  onNextPlan,
}: Props) {
  const isPlanStep = step === 'plan'
  const canProceed = isPlanStep || selectedDays.length > 0

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.in }}
      className="absolute inset-0 overflow-hidden bg-[#161410]"
    >
      <AnimatePresence initial={false} mode="popLayout" custom={isPlanStep ? 1 : -1}>
        {step === 'days' && (
          <ScheduleSetupScreen
            key="onboarding-days"
            selectedDays={selectedDays}
            onToggleDay={onToggleDay}
          />
        )}

        {step === 'plan' && (
          <PlanSetupScreen
            key="onboarding-plan"
            selectedDays={selectedDays}
            onBack={onBack}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-10">
        <NextButton
          enabled={canProceed}
          onClick={isPlanStep ? onNextPlan : onNextSchedule}
        />
      </div>
    </motion.div>
  )
}
