import { useEffect, useMemo, useRef, useState, type UIEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { Search, X } from 'lucide-react'
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

const FEATURED_ALL_EXERCISE_IDS = new Set([
  'incline-db-press',
  'push-up',
  'bench-press',
  'pull-up',
  'deadlift',
  'cable-crossover',
  'barbell-row',
  'lat-pulldown',
])

const sortExercisesForSheet = (
  exercises: LibraryExercise[],
  category: ExerciseCategory,
) =>
  [...exercises].sort((a, b) => {
    if (category === 'All') {
      const aFeatured = FEATURED_ALL_EXERCISE_IDS.has(a.id)
      const bFeatured = FEATURED_ALL_EXERCISE_IDS.has(b.id)

      if (aFeatured !== bFeatured) return aFeatured ? -1 : 1
    }

    return a.name.localeCompare(b.name)
  })

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
  const [compactHeaderVisible, setCompactHeaderVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const setCompactHeaderFromScroll = (scrollTop: number) => {
    const shouldShowCompactHeader = scrollTop >= 60

    setCompactHeaderVisible((visible) =>
      visible === shouldShowCompactHeader ? visible : shouldShowCompactHeader,
    )
  }

  useEffect(() => {
    if (!open) return

    const resetScroll = () => {
      scrollRef.current?.scrollTo({ top: 0 })
      setCompactHeaderVisible(false)
    }

    setSelectedIds(new Set(initialSelected.map((e) => e.id)))
    setQuery('')
    setCategory('All')
    resetScroll()

    const resetFrame = window.requestAnimationFrame(resetScroll)
    const resetTimer = window.setTimeout(resetScroll, 50)

    return () => {
      window.cancelAnimationFrame(resetFrame)
      window.clearTimeout(resetTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setCompactHeaderFromScroll(event.currentTarget.scrollTop)
  }

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

  const sheetMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2, ease: ease.out },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: {
          type: 'spring' as const,
          duration: 0.4,
          stiffness: 250,
          damping: 30,
          mass: 1,
        },
      }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = EXERCISE_LIBRARY.filter((e) => {
      if (category !== 'All' && e.category !== category) return false
      if (q && !e.name.toLowerCase().includes(q)) return false
      return true
    })

    return sortExercisesForSheet(matches, category)
  }, [category, query])

  const canConfirm = selectedIds.size > 0
  const titleTransition = { duration: 0.3, ease: ease.out }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={{
              hidden: {
                opacity: 0,
                transition: { duration: 0.2, ease: ease.out },
              },
              show: {
                opacity: 1,
                transition: { duration: 0.3, ease: ease.out },
              },
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 z-20 bg-black/50"
          />
          <motion.div
            key="sheet"
            {...sheetMotion}
            className="absolute inset-x-0 bottom-0 z-30 flex h-[640px] flex-col overflow-hidden rounded-t-[32px] bg-[#1f1c18]"
          >
            <motion.div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex flex-1 flex-col overflow-y-auto pt-[100px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 10, filter: 'blur(8px)' }
                }
                animate={{
                  opacity: compactHeaderVisible ? 0 : 1,
                  y: 0,
                  filter: compactHeaderVisible ? 'blur(10px)' : 'blur(0px)',
                }}
                transition={titleTransition}
                className="flex flex-col gap-1 px-4 text-white"
              >
                <h2 className="font-sf text-[22px] font-bold leading-[28px] tracking-[-0.26px]">
                  Add Exercises
                </h2>
                {day && (
                  <span className="font-sf text-[17px] font-normal leading-[22px] tracking-[-0.43px] text-white/50">
                    {day}
                  </span>
                )}
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
                  },
                }}
                initial={reduceMotion ? { opacity: 0 } : 'hidden'}
                animate={reduceMotion ? { opacity: 1 } : 'show'}
                className="flex flex-col gap-3 px-4 pb-[180px] pt-5"
              >
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
              </motion.div>
            </motion.div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[96px]"
            >
              <div
                className="absolute inset-0 backdrop-blur-[2px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 62%, transparent 86%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 62%, transparent 86%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[6px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 44%, transparent 78%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 44%, transparent 78%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[14px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 22%, transparent 68%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 22%, transparent 68%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[28px]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, transparent 56%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, transparent 56%, transparent 100%)',
                }}
              />
              <motion.div
                animate={{ opacity: compactHeaderVisible ? 1 : 0 }}
                transition={titleTransition}
                className="absolute inset-0 bg-gradient-to-b from-[#1f1c18]/55 via-[#1f1c18]/20 to-transparent"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
              <div className="mx-auto mt-3 h-[5px] w-[40px] rounded-full bg-white/20" />
              <motion.div
                animate={{
                  opacity: compactHeaderVisible ? 1 : 0,
                  filter: compactHeaderVisible ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={titleTransition}
                className="absolute left-1/2 top-[33px] flex w-[136px] -translate-x-1/2 flex-col items-center"
              >
                <h2 className="font-sf text-[15px] font-[590] leading-[20px] tracking-[-0.23px] text-white">
                  Add Exercises
                </h2>
                {day && (
                  <span className="font-sf text-[12px] font-normal leading-[16px] text-white">
                    {day}
                  </span>
                )}
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              transition={springs.tap}
              aria-label="Close"
              className="pointer-events-auto absolute left-4 top-[29px] z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-[8px] focus:outline-none focus-visible:outline-none"
            >
              <X size={20} strokeWidth={2.2} className="text-white" />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleConfirm}
              disabled={!canConfirm}
              whileTap={
                !canConfirm || reduceMotion
                  ? undefined
                  : { scale: 0.96, transition: springs.tap }
              }
              animate={{
                backgroundColor: '#ffffff',
                opacity: canConfirm ? 1 : 0.3,
              }}
              transition={{ duration: 0.18, ease: ease.inOut }}
              className="pointer-events-auto absolute right-4 top-[29px] z-30 flex h-11 items-center justify-center rounded-full px-4 font-sf text-[17px] font-normal leading-[22px] tracking-[-0.43px] disabled:cursor-default focus:outline-none focus-visible:outline-none"
            >
              <motion.span
                animate={{
                  color: canConfirm ? '#1f1b17' : 'rgba(31, 28, 24, 0.6)',
                }}
                transition={{ duration: 0.18, ease: ease.inOut }}
              >
                Done
              </motion.span>
            </motion.button>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[156px]">
              <div
                className="absolute inset-0 backdrop-blur-[24px]"
                style={{
                  maskImage:
                    'linear-gradient(to top, black 0%, black 68%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to top, black 0%, black 68%, transparent 100%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
            </div>

            <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 flex flex-col">
              <div className="flex gap-2 overflow-x-auto px-5 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {EXERCISE_CATEGORIES.map((c) => (
                  <div key={c}>
                    <CategoryChip
                      label={c}
                      selected={category === c}
                      onSelect={() => setCategory(c)}
                    />
                  </div>
                ))}
              </div>

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
