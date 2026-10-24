import SwiftUI

// Port of src/lib/motion.ts. Do not invent new spring values.
// Framer Motion springs are physical (stiffness / damping / mass); `interpolatingSpring` is the same model.

enum Springs {
    /// Default UI.
    static let snappy = Animation.interpolatingSpring(mass: 0.8, stiffness: 400, damping: 30)
    /// Large elements, sheets, screens.
    static let smooth = Animation.interpolatingSpring(mass: 1, stiffness: 260, damping: 28)
    /// Celebratory — set complete, reps change.
    static let bouncy = Animation.interpolatingSpring(mass: 0.9, stiffness: 500, damping: 18)
    /// Micro — taps, toggles.
    static let tap = Animation.interpolatingSpring(mass: 0.6, stiffness: 600, damping: 35)
    /// Bottom sheet presentation (stiffness 250 / damping 30 / mass 1 in the web build).
    static let sheet = Animation.interpolatingSpring(mass: 1, stiffness: 250, damping: 30)
}

/// Cubic-bezier easings. Never use the system `.easeInOut` etc.
enum Ease {
    static func standard(_ duration: Double) -> Animation { .timingCurve(0.25, 0.1, 0.25, 1, duration: duration) }
    static func out(_ duration: Double) -> Animation { .timingCurve(0.16, 1, 0.3, 1, duration: duration) }
    static func `in`(_ duration: Double) -> Animation { .timingCurve(0.7, 0, 0.84, 0, duration: duration) }
    static func inOut(_ duration: Double) -> Animation { .timingCurve(0.65, 0, 0.35, 1, duration: duration) }
}

enum Duration {
    /// Micro (tap, toggle): 150–200 ms.
    static let micro = 0.18
    /// Standard enter/exit: 300–400 ms.
    static let standard = 0.4
    /// Screen transitions: 500–600 ms.
    static let screen = 0.5
    /// Hero moments: 800–1200 ms.
    static let hero = 0.8
}

/// Stagger spacing, 40–80 ms between items.
enum Stagger {
    static let list = 0.06
    static let chips = 0.04
    static let tight = 0.05
}

// MARK: - Entrance stagger

extension View {
    /// Fade + rise entrance, staggered by index. Flip `appeared` to true in `onAppear`.
    func staggeredEntrance(
        _ appeared: Bool,
        index: Int,
        step: Double = Stagger.list,
        delay: Double = 0,
        y: CGFloat = 12,
        animation: Animation = Springs.smooth
    ) -> some View {
        self
            .opacity(appeared ? 1 : 0)
            .offset(y: appeared ? 0 : y)
            .animation(animation.delay(delay + Double(index) * step), value: appeared)
    }
}

// MARK: - Screen transitions

/// Slide + fade used by every screen change (web: initial/exit `x: ±24`, opacity 0).
struct SlideFade: ViewModifier {
    var x: CGFloat
    var opacity: Double

    func body(content: Content) -> some View {
        content.offset(x: x).opacity(opacity)
    }
}

extension AnyTransition {
    /// - Parameters:
    ///   - enterX: starting x offset when entering.
    ///   - exitX: ending x offset when leaving.
    ///   - enterDelay: web uses `AnimatePresence mode="wait"`, so incoming screens wait for the outgoing one.
    static func screen(
        enterX: CGFloat = 0,
        exitX: CGFloat = -24,
        enterDelay: Double = 0,
        exitCurve: @escaping (Double) -> Animation = Ease.out
    ) -> AnyTransition {
        .asymmetric(
            insertion: .modifier(
                active: SlideFade(x: enterX, opacity: 0),
                identity: SlideFade(x: 0, opacity: 1)
            )
            .animation(Ease.out(Duration.screen).delay(enterDelay)),
            removal: .modifier(
                active: SlideFade(x: exitX, opacity: 0),
                identity: SlideFade(x: 0, opacity: 1)
            )
            .animation(exitCurve(Duration.screen))
        )
    }
}
