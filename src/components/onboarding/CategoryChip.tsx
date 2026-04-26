import { motion } from 'framer-motion'
import { springs } from '../../lib/motion'

type Props = {
  label: string
  selected: boolean
  onSelect: () => void
}

export function CategoryChip({ label, selected, onSelect }: Props) {
  const backgroundColor = selected
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(255, 255, 255, 0.16)'
  const color = selected ? '#000000' : '#FFFFFF'

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.94 }}
      transition={springs.tap}
      initial={false}
      style={{
        backgroundColor,
        color,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        willChange: 'transform, background-color, color, backdrop-filter',
      }}
      animate={{
        backgroundColor,
        color,
      }}
      className="shrink-0 transform-gpu rounded-full border border-white/[0.08] px-5 py-[10px] font-sf text-[15px] font-medium leading-none backdrop-blur-[18px]"
    >
      {label}
    </motion.button>
  )
}
