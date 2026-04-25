import { motion } from 'framer-motion'
import { List, Share } from 'lucide-react'
import { springs } from '../../lib/motion'

type Props = {
  onNextSet: () => void
}

export function BottomActions({ onNextSet }: Props) {
  return (
    <div className="flex items-center gap-6 pb-10 pt-14">
      <GlassBtn label="List">
        <List size={24} strokeWidth={2} className="text-white" />
      </GlassBtn>
      <motion.button
        type="button"
        onClick={onNextSet}
        whileTap={{ scale: 0.97, opacity: 0.9 }}
        transition={springs.tap}
        className="h-[86px] flex-1 rounded-full bg-white font-sf text-[20px] font-medium leading-[22px] tracking-[-0.43px] text-black"
      >
        Next Set
      </motion.button>
      <GlassBtn label="Share">
        <Share size={24} strokeWidth={2} className="text-white" />
      </GlassBtn>
    </div>
  )
}

function GlassBtn({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      transition={springs.tap}
      aria-label={label}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-glass-strong backdrop-blur-[8px]"
    >
      {children}
    </motion.button>
  )
}
