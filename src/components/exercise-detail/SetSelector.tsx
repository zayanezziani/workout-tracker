import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { springs } from '../../lib/motion'

type Props = {
  totalSets: number
  completedSets: number
}

export function SetSelector({ totalSets, completedSets }: Props) {
  return (
    <div className="flex w-full gap-2">
      {Array.from({ length: totalSets }, (_, i) => {
        const isDone = i < completedSets
        return (
          <motion.div
            key={i}
            layout
            transition={springs.smooth}
            className={
              isDone
                ? 'flex h-10 flex-1 items-center justify-center rounded-[38px] bg-white'
                : 'flex h-10 flex-1 items-center justify-center rounded-[24px] bg-glass-strong font-sf text-[16px] font-normal leading-[22px] text-white backdrop-blur-[8px]'
            }
          >
            {isDone ? (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springs.bouncy}
                className="flex items-center justify-center"
              >
                <Check size={16} strokeWidth={2.5} className="text-black" />
              </motion.span>
            ) : (
              <span>Set {i + 1}</span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
