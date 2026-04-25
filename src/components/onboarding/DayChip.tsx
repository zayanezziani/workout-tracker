import { motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  day: string
  selected: boolean
  onToggle: () => void
}

export function DayChip({ day, selected, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      layout
      whileTap={{ scale: 0.94 }}
      transition={springs.tap}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: springs.smooth },
      }}
      animate={{
        backgroundColor: selected
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.2)',
        color: selected ? '#000000' : '#FFFFFF',
      }}
      className="rounded-[32px] border border-white/[0.08] px-4 py-4 font-sf text-[18px] font-normal leading-none"
    >
      {day}
    </motion.button>
  )
}
