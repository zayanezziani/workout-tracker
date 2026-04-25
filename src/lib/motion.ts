export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  smooth: { type: 'spring', stiffness: 260, damping: 28, mass: 1 },
  bouncy: { type: 'spring', stiffness: 500, damping: 18, mass: 0.9 },
  tap: { type: 'spring', stiffness: 600, damping: 35, mass: 0.6 },
} as const

export const ease = {
  standard: [0.25, 0.1, 0.25, 1],
  out: [0.16, 1, 0.3, 1],
  in: [0.7, 0, 0.84, 0],
  inOut: [0.65, 0, 0.35, 1],
} as const
