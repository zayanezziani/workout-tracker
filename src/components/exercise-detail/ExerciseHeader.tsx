import { motion } from 'framer-motion'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { springs } from '../../lib/motion'

type Props = {
  title: string
  onBack: () => void
}

export function ExerciseHeader({ title, onBack }: Props) {
  return (
    <div className="flex items-center justify-between">
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
      <h1 className="text-center text-[24px] font-medium leading-[22px] text-white">
        {title}
      </h1>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        transition={springs.tap}
        aria-label="Menu"
        className="flex h-12 w-12 items-center justify-center bg-transparent"
      >
        <MoreHorizontal size={24} strokeWidth={2} className="text-white" />
      </motion.button>
    </div>
  )
}
