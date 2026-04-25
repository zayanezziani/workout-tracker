import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Exercise } from '../../data/workouts'
import { ease, springs } from '../../lib/motion'
import { ExerciseHeader } from './ExerciseHeader'
import { RepsCounter } from './RepsCounter'
import { SetSelector } from './SetSelector'
import { BottomActions } from './BottomActions'

type Props = {
  exercise: Exercise
  onBack: () => void
}

export function ExerciseDetailScreen({ exercise, onBack }: Props) {
  const [completedSets, setCompletedSets] = useState(1)
  const [reps, setReps] = useState(8)

  const handleNextSet = () => {
    if (completedSets < exercise.sets) {
      setCompletedSets((n) => n + 1)
      setReps((r) => (r === 8 ? 10 : r === 10 ? 12 : 8))
    } else {
      setCompletedSets(0)
      setReps(8)
    }
  }

  return (
    <motion.div
      key="exercise-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="absolute inset-0"
    >
      <motion.img
        layoutId={`exercise-thumb-${exercise.id}`}
        src={exercise.image.replace(/\/\d+\/\d+$/, '/482/874')}
        alt={exercise.name}
        transition={springs.smooth}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute -left-[136px] top-[-100px] h-[274px] w-[674px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.64)_55.83%,rgba(102,102,102,0)_157.82%)] [filter:blur(27px)]" />
      <div className="pointer-events-none absolute -left-[136px] top-[506px] h-[368px] w-[674px] bg-black/60 [filter:blur(27px)]" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-[62px]">
        <ExerciseHeader title={exercise.name} onBack={onBack} />
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-8">
          <RepsCounter reps={reps} />
          <SetSelector
            totalSets={exercise.sets}
            completedSets={completedSets}
          />
        </div>
        <BottomActions onNextSet={handleNextSet} />
      </div>
    </motion.div>
  )
}
