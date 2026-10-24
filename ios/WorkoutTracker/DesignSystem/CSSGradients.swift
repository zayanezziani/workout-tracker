import SwiftUI

/// `linear-gradient(<angle>deg, …)` with CSS semantics: the angle is clockwise from "up" and the gradient line is sized
/// so the corners land exactly on 0% / 100%.
struct CSSLinearGradient: View {
    let angle: Double
    let stops: [Gradient.Stop]

    var body: some View {
        GeometryReader { geo in
            let size = geo.size
            let radians = angle * .pi / 180
            let dx = sin(radians)
            let dy = -cos(radians)
            let length = abs(size.width * dx) + abs(size.height * dy)
            let center = CGPoint(x: size.width / 2, y: size.height / 2)
            let start = UnitPoint(
                x: (center.x - dx * length / 2) / size.width,
                y: (center.y - dy * length / 2) / size.height
            )
            let end = UnitPoint(
                x: (center.x + dx * length / 2) / size.width,
                y: (center.y + dy * length / 2) / size.height
            )
            Rectangle().fill(LinearGradient(stops: stops, startPoint: start, endPoint: end))
        }
    }
}

/// `radial-gradient(ellipse at X% Y%, …)` — CSS default size is `farthest-corner`.
struct CSSEllipseGradient: View {
    let center: UnitPoint
    let stops: [Gradient.Stop]

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let cx = center.x * w
            let cy = center.y * h
            // Farthest-corner ellipse keeps the farthest-side aspect and passes through the corner: scale by √2.
            let rx = max(cx, w - cx) * 2.0.squareRoot()
            let ry = max(cy, h - cy) * 2.0.squareRoot()
            Rectangle()
                .fill(RadialGradient(stops: stops, center: .center, startRadius: 0, endRadius: rx))
                .frame(width: rx * 2, height: rx * 2)
                .scaleEffect(x: 1, y: ry / rx)
                .position(x: cx, y: cy)
        }
        .clipped()
    }
}

/// The warm list-screen background: 149° gradient plus two soft glows.
struct ListBackground: View {
    var body: some View {
        ZStack {
            CSSLinearGradient(angle: 149, stops: Theme.Palette.listGradientStops)
            CSSEllipseGradient(
                center: UnitPoint(x: 0.7, y: 0.1),
                stops: [
                    .init(color: Theme.Palette.glowWarm, location: 0),
                    .init(color: Theme.Palette.glowWarm.opacity(0), location: 0.6),
                ]
            )
            CSSEllipseGradient(
                center: UnitPoint(x: 0.2, y: 0.8),
                stops: [
                    .init(color: Theme.Palette.glowRose, location: 0),
                    .init(color: Theme.Palette.glowRose.opacity(0), location: 0.5),
                ]
            )
        }
        .allowsHitTesting(false)
    }
}
