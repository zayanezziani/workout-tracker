import SwiftUI

/// Web `backdrop-filter: blur(Npx)`. SwiftUI has no variable-radius backdrop blur, so each web radius maps to
/// the closest system material. The fill (white 8% / 40%) sits on top, exactly as in the CSS.
enum GlassBlur {
    case none
    /// blur(8px) — pills, round buttons.
    case light
    /// blur(18–22px) — cards, chips, search field.
    case regular
    /// blur(24–28px) — sheet edge fades.
    case heavy

    var material: Material? {
        switch self {
        case .none: nil
        case .light: .ultraThinMaterial
        case .regular: .thinMaterial
        case .heavy: .regularMaterial
        }
    }
}

struct GlassBackground<S: InsettableShape>: ViewModifier {
    let fill: Color
    let blur: GlassBlur
    let border: Color?
    let shape: S

    func body(content: Content) -> some View {
        content.background {
            ZStack {
                if let material = blur.material {
                    shape.fill(material)
                }
                shape.fill(fill)
                if let border {
                    shape.strokeBorder(border, lineWidth: 1)
                }
            }
        }
    }
}

extension View {
    func glass<S: InsettableShape>(
        fill: Color = Theme.Palette.glass,
        blur: GlassBlur = .light,
        border: Color? = nil,
        in shape: S
    ) -> some View {
        modifier(GlassBackground(fill: fill, blur: blur, border: border, shape: shape))
    }
}
