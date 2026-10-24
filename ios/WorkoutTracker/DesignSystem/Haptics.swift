import UIKit

/// Thin wrapper over UIKit feedback generators. Native-only polish: the web prototype has no haptics.
enum Haptics {
    static func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .light) {
        UIImpactFeedbackGenerator(style: style).impactOccurred()
    }

    /// Discrete value changes: toggling a chip, adding / removing an exercise.
    static func selection() {
        UISelectionFeedbackGenerator().selectionChanged()
    }

    /// Celebratory moments: a set is completed.
    static func notify(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        UINotificationFeedbackGenerator().notificationOccurred(type)
    }
}
