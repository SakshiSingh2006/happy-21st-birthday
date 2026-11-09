import confetti from "canvas-confetti";

const COLORS = ["#F7D070", "#D88EA7", "#E5D9F2", "#C1708C", "#FFFFFF"];

function heartShape() {
    try {
        return confetti.shapeFromText({ text: "❤", scalar: 2 });
    } catch {
        return undefined;
    }
}

export function celebrate(options = {}) {
    confetti({
        particleCount: 110,
        spread: 80,
        startVelocity: 42,
        origin: { y: 0.7 },
        colors: COLORS,
        scalar: 1.05,
        zIndex: 200,
        ...options,
    });
}

export function heartBurst() {
    const shape = heartShape();
    confetti({
        particleCount: 60,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.6 },
        colors: ["#D88EA7", "#C1708C", "#F9E0E7"],
        shapes: shape ? [shape] : undefined,
        scalar: 1.6,
        zIndex: 200,
    });
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: COLORS,
        zIndex: 200,
    });
}

export function sideBursts() {
    const opts = { spread: 60, ticks: 220, gravity: 0.8, colors: COLORS, zIndex: 200, scalar: 1.1 };
    confetti({ ...opts, particleCount: 70, angle: 60, origin: { x: 0, y: 0.75 } });
    confetti({ ...opts, particleCount: 70, angle: 120, origin: { x: 1, y: 0.75 } });
}
