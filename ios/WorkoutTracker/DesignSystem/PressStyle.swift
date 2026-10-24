import SwiftUI
import UIKit

/// Tap feedback for every interactive element: scales down on press with the `tap` spring
/// (web `whileTap` + `springs.tap`). Replaces the system button highlight.
struct PressStyle: ButtonStyle {
    var scale: CGFloat = 0.96
    var pressedOpacity: Double = 1
    /// Fired on touch-down, so the buzz lands with the visual press.
    var haptic: UIImpactFeedbackGenerator.FeedbackStyle? = .light

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? scale : 1)
            .opacity(configuration.isPressed ? pressedOpacity : 1)
            .animation(Springs.tap, value: configuration.isPressed)
            .onChange(of: configuration.isPressed) { _, pressed in
                if pressed, let haptic { Haptics.impact(haptic) }
            }
    }
}

extension ButtonStyle where Self == PressStyle {
    /// Generic 0.96.
    static var press: PressStyle { PressStyle() }
    /// Exercise card: 0.98.
    static var card: PressStyle { PressStyle(scale: 0.98) }
    /// Start Workout / Next Set / Continue: 0.97 + 0.9 opacity.
    static var cta: PressStyle { PressStyle(scale: 0.97, pressedOpacity: 0.9, haptic: .medium) }
    /// Round glass buttons, day chips, category chips: 0.94.
    static var glassButton: PressStyle { PressStyle(scale: 0.94) }
    /// Header icon buttons: 0.92.
    static var icon: PressStyle { PressStyle(scale: 0.92) }
    /// Small pill buttons in day cards: 0.96 + 0.8 opacity.
    static var pill: PressStyle { PressStyle(scale: 0.96, pressedOpacity: 0.8) }
    /// Expand chevron: 0.88.
    static var chevron: PressStyle { PressStyle(scale: 0.88) }
}
