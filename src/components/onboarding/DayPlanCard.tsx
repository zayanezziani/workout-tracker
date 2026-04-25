import { motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  day: string
  onAddActivity: () => void
}

export function DayPlanCard({ day, onAddActivity }: Props) {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      className="flex w-full items-center justify-between rounded-[24px] bg-white/[0.16] px-5 py-6"
    >
      <span className="font-sf text-[20px] font-semibold leading-none text-white">
        {day}
      </span>
      <motion.button
        type="button"
        onClick={onAddActivity}
        whileTap={{ scale: 0.96, opacity: 0.8 }}
        transition={springs.tap}
        className="font-sf text-[16px] font-normal leading-[21px] tracking-[-0.31px] text-white underline decoration-solid underline-offset-[3px]"
      >
        Add Activity
      </motion.button>
    </motion.div>
  )
}
