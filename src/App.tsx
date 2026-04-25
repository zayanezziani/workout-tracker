import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { ScheduleSetupScreen } from './components/onboarding/ScheduleSetupScreen'
import { PlanSetupScreen } from './components/onboarding/PlanSetupScreen'
import { WorkoutListScreen } from './components/workout-list/WorkoutListScreen'
import { ExerciseDetailScreen } from './components/exercise-detail/ExerciseDetailScreen'
import { todaysWorkout, type Exercise } from './data/workouts'
import { WEEK_DAYS, type Day } from './data/days'

type Screen =
  | 'onboarding-days'
  | 'onboarding-plan'
  | 'workout-list'
  | 'exercise-detail'

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding-days')
  const [selectedDays, setSelectedDays] = useState<Day[]>([])
  const [activeExercise, setActiveExercise] = useState<Exercise>(
    todaysWorkout.exercises[0],
  )

  const toggleDay = (day: Day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day].sort(
            (a, b) => WEEK_DAYS.indexOf(a) - WEEK_DAYS.indexOf(b),
          ),
    )
  }

  const goToDetail = (exercise: Exercise) => {
    setActiveExercise(exercise)
    setScreen('exercise-detail')
  }

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {screen === 'onboarding-days' && (
          <ScheduleSetupScreen
            key="onboarding-days"
            selectedDays={selectedDays}
            onToggleDay={toggleDay}
            onNext={() => setScreen('onboarding-plan')}
          />
        )}
        {screen === 'onboarding-plan' && (
          <PlanSetupScreen
            key="onboarding-plan"
            selectedDays={selectedDays}
            onBack={() => setScreen('onboarding-days')}
            onNext={() => setScreen('workout-list')}
          />
        )}
        {screen === 'workout-list' && (
          <WorkoutListScreen
            key="workout-list"
            workout={todaysWorkout}
            onSelectExercise={goToDetail}
            onStart={() => goToDetail(todaysWorkout.exercises[0])}
          />
        )}
        {screen === 'exercise-detail' && (
          <ExerciseDetailScreen
            key="exercise-detail"
            exercise={activeExercise}
            onBack={() => setScreen('workout-list')}
          />
        )}
      </AnimatePresence>
    </PhoneFrame>
  )
}
