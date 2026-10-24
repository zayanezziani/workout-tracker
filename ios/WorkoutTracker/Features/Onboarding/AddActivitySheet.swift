import SwiftUI
import UIKit

/// "Add Exercises" bottom sheet. Presented by `OnboardingFlow`; slides up with the sheet spring while the backdrop fades.
struct AddActivitySheet: View {
    let day: Day
    let initialSelected: [LibraryExercise]
    let onClose: () -> Void
    let onConfirm: ([LibraryExercise]) -> Void

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.screenInsets) private var insets

    @State private var category: ExerciseCategory = .all
    @State private var query = ""
    @State private var selectedIDs: Set<String>
    @State private var compactHeader = false
    @State private var appeared = false
    @State private var keyboardHeight: CGFloat = 0

    private let sheetHeight: CGFloat = 640
    private static let space = "sheet"
    private var titleAnimation: Animation { Ease.out(0.3) }

    init(
        day: Day,
        initialSelected: [LibraryExercise],
        onClose: @escaping () -> Void,
        onConfirm: @escaping ([LibraryExercise]) -> Void
    ) {
        self.day = day
        self.initialSelected = initialSelected
        self.onClose = onClose
        self.onConfirm = onConfirm
        _selectedIDs = State(initialValue: Set(initialSelected.map(\.id)))
    }

    private var filtered: [LibraryExercise] {
        let q = query.trimmingCharacters(in: .whitespaces).lowercased()
        let matches = ExerciseLibrary.all.filter { exercise in
            if category != .all && exercise.category.rawValue != category.rawValue { return false }
            if !q.isEmpty && !exercise.name.lowercased().contains(q) { return false }
            return true
        }
        return ExerciseLibrary.sorted(matches, for: category)
    }

    private var canConfirm: Bool { !selectedIDs.isEmpty }

    var body: some View {
        ZStack(alignment: .top) {
            list
            topFade
            grabberAndCompactTitle
            closeButton
            doneButton
            bottomBar
        }
        .frame(maxWidth: .infinity)
        .frame(height: sheetHeight)
        .coordinateSpace(name: Self.space)
        .background(Theme.Palette.sheetBackground)
        .clipShape(
            UnevenRoundedRectangle(
                topLeadingRadius: Theme.Radius.sheetTop,
                bottomLeadingRadius: 0,
                bottomTrailingRadius: 0,
                topTrailingRadius: Theme.Radius.sheetTop,
                style: .continuous
            )
        )
        .padding(.bottom, keyboardHeight)
        .animation(Ease.out(0.3), value: keyboardHeight)
        .onAppear { appeared = true }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillChangeFrameNotification)) { note in
            guard let frame = note.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
            let screenHeight = UIScreen.main.bounds.height
            keyboardHeight = frame.minY >= screenHeight ? 0 : frame.height
        }
    }

    // MARK: Scrolling list

    private var list: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Add Exercises")
                        .sf(22, .bold, lineHeight: 28, tracking: -0.26)
                    Text(day.rawValue)
                        .sf(17, .regular, lineHeight: 22, tracking: -0.43)
                        .foregroundStyle(Theme.Palette.textTertiary)
                }
                .foregroundStyle(.white)
                .padding(.horizontal, 16)
                .opacity(compactHeader ? 0 : (appeared ? 1 : 0))
                .blur(radius: compactHeader ? 10 : (appeared ? 0 : 8))
                .offset(y: appeared ? 0 : 10)
                .animation(titleAnimation, value: compactHeader)
                .animation(titleAnimation, value: appeared)
                .progressiveEdgeBlur(in: Self.space, sheetHeight: sheetHeight)

                VStack(spacing: 12) {
                    ForEach(Array(filtered.enumerated()), id: \.element.id) { index, exercise in
                        ExerciseLibraryRow(
                            exercise: exercise,
                            selected: selectedIDs.contains(exercise.id),
                            appeared: appeared,
                            index: index,
                            onToggle: { toggle(exercise) }
                        )
                        .progressiveEdgeBlur(in: Self.space, sheetHeight: sheetHeight)
                    }
                    if filtered.isEmpty {
                        Text("No exercises match.")
                            .sf(15, .regular)
                            .foregroundStyle(Theme.Palette.textTertiary)
                            .frame(maxWidth: .infinity)
                            .padding(.top, 24)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 20)
                .padding(.bottom, 180)
                .animation(Springs.smooth, value: filtered.map(\.id))
            }
            .padding(.top, 100)
        }
        .scrollIndicators(.hidden)
        .scrollDismissesKeyboard(.interactively)
        .onScrollGeometryChange(for: Bool.self) { $0.contentOffset.y >= 60 } action: { _, isCompact in
            compactHeader = isCompact
        }
    }

    // MARK: Chrome

    /// Tint that fades in once the header is compact. The blur itself is applied per row (see `progressiveEdgeBlur`),
    /// because system materials add a grey wash on this flat background that web backdrop-blur does not.
    private var topFade: some View {
        LinearGradient(
            colors: [
                Theme.Palette.sheetBackground.opacity(0.55),
                Theme.Palette.sheetBackground.opacity(0.2),
                .clear,
            ],
            startPoint: .top,
            endPoint: .bottom
        )
        .frame(height: 96)
        .opacity(compactHeader ? 1 : 0)
        .animation(titleAnimation, value: compactHeader)
        .frame(maxHeight: .infinity, alignment: .top)
        .allowsHitTesting(false)
    }

    private var grabberAndCompactTitle: some View {
        ZStack(alignment: .top) {
            Capsule()
                .fill(Color.white.opacity(0.2))
                .frame(width: 40, height: 5)
                .padding(.top, 12)

            VStack(spacing: 0) {
                Text("Add Exercises")
                    .sf(15, .semibold, lineHeight: 20, tracking: -0.23)
                Text(day.rawValue)
                    .sf(12, .regular, lineHeight: 16)
            }
            .foregroundStyle(.white)
            .frame(width: 136)
            .padding(.top, 33)
            .opacity(compactHeader ? 1 : 0)
            .blur(radius: compactHeader ? 0 : 10)
            .animation(titleAnimation, value: compactHeader)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .allowsHitTesting(false)
    }

    private var closeButton: some View {
        Button(action: onClose) {
            Image(systemName: "xmark")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(.white)
                .frame(width: 44, height: 44)
                .glass(fill: Color.white.opacity(0.2), blur: .none, in: Circle())
        }
        .buttonStyle(.glassButton)
        .accessibilityLabel("Close")
        .padding(.leading, 16)
        .padding(.top, 29)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }

    private var doneButton: some View {
        Button(action: confirm) {
            Text("Done")
                .sf(17, .regular, lineHeight: 22, tracking: -0.43)
                .foregroundStyle(canConfirm ? Theme.Palette.sheetDoneText : Theme.Palette.sheetDoneTextDisabled)
                .padding(.horizontal, 16)
                .frame(height: 44)
                .background(Capsule().fill(Color.white))
        }
        .buttonStyle(PressStyle(scale: 0.96))
        .disabled(!canConfirm)
        .opacity(canConfirm ? 1 : 0.3)
        .animation(Ease.inOut(Duration.micro), value: canConfirm)
        .padding(.trailing, 16)
        .padding(.top, 29)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
    }

    private var bottomBar: some View {
        VStack(spacing: 0) {
            Spacer(minLength: 0)
            ZStack(alignment: .bottom) {
                // Darkening so rows dissolve behind the controls (web: black 55% → 25% → clear).
                LinearGradient(
                    colors: [.black.opacity(0.55), .black.opacity(0.25), .clear],
                    startPoint: .bottom,
                    endPoint: .top
                )
                .frame(height: 156)
                .allowsHitTesting(false)

                VStack(spacing: 0) {
                    ScrollView(.horizontal) {
                        HStack(spacing: 8) {
                            ForEach(ExerciseCategory.allCases) { chip in
                                CategoryChip(label: chip.rawValue, selected: category == chip) {
                                    Haptics.selection()
                                    withAnimation(Springs.smooth) { category = chip }
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                        .padding(.bottom, 12)
                        .padding(.top, 8)
                    }
                    .scrollIndicators(.hidden)

                    searchField
                        .padding(.horizontal, 20)
                        .padding(.top, 4)
                        .padding(.bottom, keyboardHeight > 0 ? 12 : 32)
                }
            }
        }
    }

    private var searchField: some View {
        HStack(spacing: 12) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 15, weight: .semibold))
                .foregroundStyle(Color.white.opacity(0.6))
            TextField(
                "",
                text: $query,
                prompt: Text("Search exercises").foregroundStyle(Color.white.opacity(0.4))
            )
            .font(.system(size: 16, weight: .regular, design: .rounded))
            .foregroundStyle(.white)
            .tint(.white)
            .submitLabel(.search)
            .autocorrectionDisabled()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .glass(fill: Color.white.opacity(0.12), blur: .none, in: Capsule())
    }

    // MARK: Actions

    private func toggle(_ exercise: LibraryExercise) {
        Haptics.selection()
        if selectedIDs.contains(exercise.id) {
            selectedIDs.remove(exercise.id)
        } else {
            selectedIDs.insert(exercise.id)
        }
    }

    private func confirm() {
        let picked = ExerciseLibrary.all.filter { selectedIDs.contains($0.id) }
        Haptics.notify(.success)
        onConfirm(picked)
        onClose()
    }
}

// MARK: - Progressive edge blur

private struct ProgressiveEdgeBlur: ViewModifier {
    let space: String
    let sheetHeight: CGFloat

    func body(content: Content) -> some View {
        content.visualEffect { view, proxy in
            let y = proxy.frame(in: .named(space)).midY
            // Top zone (web: four masked blurs 28/14/6/2px over 96pt): strongest at the very top edge.
            let top = 30 * pow(1 - min(max(y / 82, 0), 1), 1.6)
            // Bottom zone (web: 24px blur, solid for 68% of 156pt, then fading out).
            let fromBottom = sheetHeight - y
            let bottom = 24 * (1 - min(max((fromBottom - 106) / 50, 0), 1))
            return view.blur(radius: max(top, bottom))
        }
    }
}

extension View {
    fileprivate func progressiveEdgeBlur(in space: String, sheetHeight: CGFloat) -> some View {
        modifier(ProgressiveEdgeBlur(space: space, sheetHeight: sheetHeight))
    }
}
