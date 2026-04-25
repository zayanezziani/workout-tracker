import { motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  onStart: () => void
}

export function StartButton({ onStart }: Props) {
  return (
    <div className="pb-10">
      <motion.button
        type="button"
        onClick={onStart}
        whileTap={{ scale: 0.97, opacity: 0.9 }}
        transition={springs.tap}
        className="w-full rounded-full bg-white px-9 py-8 font-sf text-[20px] font-medium leading-[22px] tracking-[-0.43px] text-black"
      >
        Start Workout
      </motion.button>
    </div>
  )
}
