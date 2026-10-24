import SwiftUI

// Frozen from tailwind.config.js + the component code. See ios/Spec/NATIVE_SPEC.md.

extension Color {
    init(hex: UInt32, opacity: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: opacity
        )
    }
}

enum Theme {
    enum Palette {
        static let phone = Color.black
        static let onboardingBackground = Color(hex: 0x161410)
        static let sheetBackground = Color(hex: 0x1F1C18)

        static let glass = Color.white.opacity(0.08)
        static let glassStrong = Color.white.opacity(0.4)
        /// `glassStrong` over a system material: the material lifts dark photos by ~19/255, so the fill is lowered
        /// to land on the same grey as CSS white-40% over a plain backdrop blur.
        static let glassStrongOverMaterial = Color.white.opacity(0.33)
        static let glassBorder = Color.white.opacity(0.08)

        static let textPrimary = Color.white
        static let textSecondary = Color.white.opacity(0.7)
        static let textTertiary = Color.white.opacity(0.5)
        static let textMeta = Color.white.opacity(0.6)

        static let cta = Color.white
        static let ctaText = Color.black

        static let planThumbBorder = Color(hex: 0x252525)
        static let sheetDoneText = Color(hex: 0x1F1B17)
        static let sheetDoneTextDisabled = Color(hex: 0x1F1C18, opacity: 0.6)
        static let sheetMinusIcon = Color(hex: 0x1F1C18)

        // List screen background
        static let listGradientStops: [Gradient.Stop] = [
            .init(color: Color(.sRGB, red: 56 / 255, green: 51 / 255, blue: 46 / 255), location: 0.077),
            .init(color: .black, location: 0.415),
            .init(color: Color(.sRGB, red: 26 / 255, green: 26 / 255, blue: 26 / 255), location: 0.923),
        ]
        static let glowWarm = Color(.sRGB, red: 118 / 255, green: 100 / 255, blue: 75 / 255, opacity: 0.08)
        static let glowRose = Color(.sRGB, red: 182 / 255, green: 136 / 255, blue: 116 / 255, opacity: 0.05)
    }

    enum Radius {
        static let card: CGFloat = 20
        static let thumbnail: CGFloat = 20
        static let setPillActive: CGFloat = 38
        static let setPillInactive: CGFloat = 24
        static let dayCard: CGFloat = 24
        static let dayChip: CGFloat = 32
        static let planThumb: CGFloat = 18
        static let sheetTop: CGFloat = 32
    }

    enum Layout {
        /// Web `px-4`.
        static let horizontalPadding: CGFloat = 16
        /// Web bottom padding of CTAs, measured from the screen edge.
        static let ctaBottomInset: CGFloat = 40
        static let cardHeight: CGFloat = 100
        static let thumbSize = CGSize(width: 128, height: 100)
        static let nextSetHeight: CGFloat = 86
        static let glassButtonSize: CGFloat = 56
        static let headerButtonSize: CGFloat = 48
    }
}

// MARK: - Typography

extension View {
    /// SF Pro Rounded at an exact size/weight. `lineHeight` pins the line box (web `leading-[…]`) for single-line text;
    /// pass `multiline: true` to use line spacing instead so wrapped text keeps the same rhythm.
    func sf(
        _ size: CGFloat,
        _ weight: Font.Weight = .regular,
        lineHeight: CGFloat? = nil,
        tracking: CGFloat = 0,
        multiline: Bool = false
    ) -> some View {
        modifier(SFText(size: size, weight: weight, lineHeight: lineHeight, tracking: tracking, multiline: multiline))
    }
}

private struct SFText: ViewModifier {
    let size: CGFloat
    let weight: Font.Weight
    let lineHeight: CGFloat?
    let tracking: CGFloat
    let multiline: Bool

    func body(content: Content) -> some View {
        let styled = content
            .font(.system(size: size, weight: weight, design: .rounded))
            .tracking(tracking)
        if let lineHeight {
            if multiline {
                let natural = UIFont.systemFont(ofSize: size, weight: weight.uiKit).lineHeight
                styled.lineSpacing(lineHeight - natural)
            } else {
                styled.frame(height: lineHeight)
            }
        } else {
            styled
        }
    }
}

private extension Font.Weight {
    var uiKit: UIFont.Weight {
        switch self {
        case .ultraLight: .ultraLight
        case .thin: .thin
        case .light: .light
        case .medium: .medium
        case .semibold: .semibold
        case .bold: .bold
        case .heavy: .heavy
        case .black: .black
        default: .regular
        }
    }
}

// MARK: - Safe areas

private struct ScreenInsetsKey: EnvironmentKey {
    static let defaultValue = EdgeInsets(top: 62, leading: 0, bottom: 34, trailing: 0)
}

extension EnvironmentValues {
    /// Real device safe-area insets. The root view draws edge to edge and every screen
    /// applies these itself, so backgrounds bleed under the status bar and home indicator.
    var screenInsets: EdgeInsets {
        get { self[ScreenInsetsKey.self] }
        set { self[ScreenInsetsKey.self] = newValue }
    }
}

extension View {
    /// Web `px-4`, pushed in by any side safe-area inset.
    func screenHorizontalPadding(_ insets: EdgeInsets) -> some View {
        padding(.leading, Theme.Layout.horizontalPadding + insets.leading)
            .padding(.trailing, Theme.Layout.horizontalPadding + insets.trailing)
    }
}

extension Theme {
    /// Coordinate space of the root canvas. Hero frames are measured in it, so they stay correct
    /// when the canvas is scaled (design-frame mode).
    static let rootSpace = "root"
}
