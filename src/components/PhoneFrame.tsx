import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-svh w-full overflow-hidden rounded-none bg-phone">
      {children}
    </div>
  )
}
