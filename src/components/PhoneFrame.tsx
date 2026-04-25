import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[874px] w-[402px] overflow-hidden rounded-[48px] bg-phone">
      {children}
    </div>
  )
}
