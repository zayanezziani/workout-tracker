import { AnimatePresence, motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  reps: number
}

export function RepsCounter({ reps }: Props) {
  return (
    <div className="flex flex-col items-center leading-[40px]">
      <div className="relative h-[40px]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={reps}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={springs.bouncy}
            className="block font-sf text-[40px] font-semibold text-white"
          >
            {reps}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sf text-[24px] font-normal leading-[40px] text-ink-secondary">
        Reps
      </span>
    </div>
  )
}
