import { motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  enabled: boolean
  label?: string
  onClick: () => void
}

export function NextButton({ enabled, label = 'Next', onClick }: Props) {
  return (
    <motion.button
      type="button"
      disabled={!enabled}
      onClick={enabled ? onClick : undefined}
      whileTap={enabled ? { scale: 0.97, opacity: 0.9 } : undefined}
      animate={{ opacity: enabled ? 1 : 0.3 }}
      transition={springs.tap}
      aria-disabled={!enabled}
      className="w-full rounded-full bg-white px-9 py-6 font-sf text-[20px] font-medium leading-[22px] tracking-[-0.43px] focus:outline-none disabled:pointer-events-none"
      style={{ color: enabled ? '#000000' : 'rgba(0, 0, 0, 0.6)' }}
    >
      {label}
    </motion.button>
  )
}
