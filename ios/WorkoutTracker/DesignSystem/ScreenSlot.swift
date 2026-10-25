import SwiftUI

/// Hosts one screen and choreographs its enter and exit explicitly (slide + fade), the way web
/// `AnimatePresence` does. It keeps the content mounted until the exit animation has finished.
///
/// SwiftUI's built-in removal transitions did not run reliably when several screens swap in one
/// `ZStack` (the outgoing screen vanished in a single frame), so exits are driven by state instead.
struct ScreenSlot<Content: View>: View {
    let isActive: Bool
    /// Starting x offset when entering.
    var enterX: CGFloat = 0
    /// Ending x offset when leaving.
    var exitX: CGFloat = -24
    /// Web `AnimatePresence mode="wait"`: the incoming screen is mounted only after the outgoing one has left.
    var enterDelay: Double = 0
    var exitCurve: (Double) -> Animation = Ease.out
    @ViewBuilder var content: () -> Content

    @State private var mounted: Bool
    @State private var x: CGFloat = 0
    @State private var opacity: Double = 1
    /// Invalidates in-flight enter/exit work when the screen flips again.
    @State private var generation = 0

    init(
        isActive: Bool,
        enterX: CGFloat = 0,
        exitX: CGFloat = -24,
        enterDelay: Double = 0,
        exitCurve: @escaping (Double) -> Animation = Ease.out,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.isActive = isActive
        self.enterX = enterX
        self.exitX = exitX
        self.enterDelay = enterDelay
        self.exitCurve = exitCurve
        self.content = content
        _mounted = State(initialValue: isActive)
    }

    var body: some View {
        Group {
            if mounted {
                content()
                    .modifier(SlideFade(x: x, opacity: opacity))
                    .allowsHitTesting(isActive)
            }
        }
        .onChange(of: isActive) { _, active in
            if active { enter() } else { exit() }
        }
    }

    private func enter() {
        generation += 1
        let current = generation
        DispatchQueue.main.asyncAfter(deadline: .now() + enterDelay) {
            guard current == generation else { return }
            // Mount hidden first, so the content's own entrance (stagger) starts with the fade.
            var hidden = Transaction()
            hidden.disablesAnimations = true
            withTransaction(hidden) {
                x = enterX
                opacity = 0
                mounted = true
            }
            DispatchQueue.main.async {
                guard current == generation else { return }
                withAnimation(Ease.out(Duration.screen)) {
                    x = 0
                    opacity = 1
                }
            }
        }
    }

    private func exit() {
        generation += 1
        let current = generation
        withAnimation(exitCurve(Duration.screen), completionCriteria: .logicallyComplete) {
            x = exitX
            opacity = 0
        } completion: {
            if current == generation { mounted = false }
        }
    }
}
