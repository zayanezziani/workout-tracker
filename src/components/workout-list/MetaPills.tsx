import { Clock, Dumbbell } from 'lucide-react'

type Props = {
  durationMin: number
  exerciseCount: number
}

export function MetaPills({ durationMin, exerciseCount }: Props) {
  return (
    <div className="mt-2 flex gap-2">
      <Pill icon={<Clock size={16} strokeWidth={1.8} />}>
        ~{durationMin} min
      </Pill>
      <Pill icon={<Dumbbell size={16} strokeWidth={1.8} />}>
        {exerciseCount} exercises
      </Pill>
    </div>
  )
}

function Pill({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-[14px] py-[7px] text-[16px] font-normal text-ink-meta">
      <span className="text-ink-meta">{icon}</span>
      {children}
    </span>
  )
}
