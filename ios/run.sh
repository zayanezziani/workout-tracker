#!/bin/zsh
# Build, install and launch on a simulator. Usage: ./run.sh [device name] [launch args...]
# e.g. ./run.sh "iPhone Duo" -designFrame 1 -screen workout-list
cd "$(dirname "$0")"
DEVICE="${1:-iPhone Duo}"; shift 2>/dev/null
xcodebuild -project WorkoutTracker.xcodeproj -scheme WorkoutTracker -sdk iphonesimulator \
  -destination "platform=iOS Simulator,name=$DEVICE" -derivedDataPath build build 2>&1 | grep -E "error:|BUILD" || exit 1
xcrun simctl boot "$DEVICE" 2>/dev/null
xcrun simctl terminate "$DEVICE" com.zayanezziani.workouttracker 2>/dev/null
xcrun simctl install "$DEVICE" build/Build/Products/Debug-iphonesimulator/WorkoutTracker.app
xcrun simctl launch "$DEVICE" com.zayanezziani.workouttracker "$@"
