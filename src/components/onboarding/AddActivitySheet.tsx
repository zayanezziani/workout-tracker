import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Check, Search, X } from 'lucide-react'
import {
  EXERCISE_CATEGORIES,
  EXERCISE_LIBRARY,
  type ExerciseCategory,
  type LibraryExercise,
} from '../../data/exercises'
import { ease, springs } from '../../lib/motion'
import { CategoryChip } from './CategoryChip'
import { ExerciseLibraryRow } from './ExerciseLibraryRow'

type Props = {
  open: boolean
  day: string | null
  initialSelected?: LibraryExercise[]
  onClose: () => void
  onConfirm: (exercises: LibraryExercise[]) => void
}

export function AddActivitySheet({
  open,
  day,
  initialSelected = [],
  onClose,
  onConfirm,
}: Props) {
  const [category, setCategory] = useState<ExerciseCategory>('All')
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: scrollRef })

  useEffect(() => {
    if (open) {
      setSelectedIds(new Set(initialSelected.map((e) => e.id)))
      setQuery('')
      setCategory('All')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const toggleSelected = (exercise: LibraryExercise) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(exercise.id)) next.delete(exercise.id)
      else next.add(exercise.id)
      return next
    })
  }

  const handleConfirm = () => {
    const picked = EXERCISE_LIBRARY.filter((e) => selectedIds.has(e.id))
    onConfirm(picked)
    onClose()
  }

  const largeTitleOpacity = useTransform(scrollY, [16, 44], [1, 0])

  const smallTitleOpacity = useTransform(scrollY, [20, 48], [0, 1])
  const smallTitleBlur = useTransform(
    scrollY,
    [20, 48],
    ['blur(10px)', 'blur(0px)'],
  )
  const smallTitleY = useTransform(scrollY, [20, 48], [6, 0])

  const topTintOpacity = useTransform(scrollY, [4, 32], [0, 1])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return EXERCISE_LIBRARY.filter((e) => {
      if (category !== 'All' && e.category !== category) return false
      if (q && !e.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [category, query])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            onClick={onClose}
            className="absolute inset-0 z-20 bg-black/50"
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={springs.smooth}
            className="absolute inset-x-0 bottom-0 z-30 flex h-[640px] flex-col overflow-hidden rounded-t-[32px] bg-[#1f1c18]"
          >
            <motion.div
              ref={scrollRef}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.08 },
                },
              }}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col overflow-y-auto pt-[64px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <motion.div
                style={{ opacity: largeTitleOpacity }}
                className="flex items-center justify-between px-5 pb-4 pt-2"
              >
                <h2 className="font-sf text-[22px] font-bold leading-[26px] tracking-[-0.4px] text-white">
                  Add Activity
                </h2>
                {day && (
                  <span className="font-sf text-[14px] font-normal uppercase tracking-[1.2px] text-ink-tertiary">
                    {day}
                  </span>
                )}
              </motion.div>

              <div className="flex flex-col gap-3 px-5 pb-[180px]">
                {filtered.map((exercise) => (
                  <ExerciseLibraryRow
                    key={exercise.id}
                    exercise={exercise}
                    selected={selectedIds.has(exercise.id)}
                    onToggle={toggleSelected}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="pt-6 text-center font-sf text-[15px] text-ink-tertiary">
                    No exercises match.
                  </p>
                )}
              </div>
            </motion.div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[80px]"
            >
              <div
                className="absolute inset-0 backdrop-blur-[2px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[6px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 55%, transparent 95%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 55%, transparent 95%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[14px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 30%, transparent 80%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 30%, transparent 80%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[28px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, transparent 60%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, transparent 60%)',
                }}
              />
              <motion.div
                style={{ opacity: topTintOpacity }}
                className="absolute inset-0 bg-gradient-to-b from-[#1f1c18]/55 via-[#1f1c18]/20 to-transparent"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 pt-3">
              <div className="mx-auto h-[5px] w-[40px] rounded-full bg-white/20" />
              <motion.div
                style={{
                  opacity: smallTitleOpacity,
                  filter: smallTitleBlur,
                  y: smallTitleY,
                }}
                className="flex items-center justify-center px-5 pb-2 pt-3"
              >
                <h2 className="font-sf text-[15px] font-semibold leading-[18px] tracking-[-0.2px] text-white">
                  Add Activity
                </h2>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.88 }}
              transition={springs.tap}
              aria-label="Close"
              className="pointer-events-auto absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.16]"
            >
              <X size={20} strokeWidth={2.2} className="text-white" />
            </motion.button>

            <AnimatePresence>
              {selectedIds.size > 0 && (
                <motion.button
                  key="confirm"
                  type="button"
                  onClick={handleConfirm}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  whileTap={{ scale: 0.88 }}
                  transition={springs.bouncy}
                  aria-label={`Add ${selectedIds.size} exercise${
                    selectedIds.size === 1 ? '' : 's'
                  }`}
                  className="pointer-events-auto absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                >
                  <Check size={20} strokeWidth={2.6} className="text-[#1f1c18]" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]">
              <div
                className="absolute inset-0 backdrop-blur-[24px]"
                style={{
                  maskImage:
                    'linear-gradient(to top, black 0%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to top, black 0%, transparent 100%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
            </div>

            <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 flex flex-col">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                  },
                }}
                initial="hidden"
                animate="show"
                className="flex gap-2 overflow-x-auto px-5 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {EXERCISE_CATEGORIES.map((c) => (
                  <motion.div
                    key={c}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0, transition: springs.smooth },
                    }}
                  >
                    <CategoryChip
                      label={c}
                      selected={category === c}
                      onSelect={() => setCategory(c)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="px-5 pb-8 pt-1">
                <div className="flex items-center gap-3 rounded-full bg-white/[0.12] px-4 py-3 backdrop-blur-[18px]">
                  <Search size={18} strokeWidth={2} className="text-white/60" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search exercises"
                    className="flex-1 bg-transparent font-sf text-[16px] font-normal leading-[20px] text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
