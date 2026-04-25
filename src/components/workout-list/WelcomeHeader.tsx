import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { springs } from '../../lib/motion'
import { MetaPills } from './MetaPills'

type Props = {
  date: string
  title: string
  durationMin: number
  exerciseCount: number
}

export function WelcomeHeader({
  date,
  title,
  durationMin,
  exerciseCount,
}: Props) {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <p className="text-[16px] font-medium uppercase tracking-[1.5px] text-ink-tertiary">
        {date}
      </p>
      <div className="flex items-center gap-2">
        <h1 className="whitespace-nowrap text-[28px] font-bold leading-[39px] tracking-[-0.5px] text-white">
          {title}
        </h1>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          transition={springs.tap}
          aria-label="Change workout"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-[8px]"
        >
          <ChevronDown size={24} strokeWidth={2} className="text-white" />
        </motion.button>
      </div>
      <MetaPills durationMin={durationMin} exerciseCount={exerciseCount} />
    </div>
  )
}
