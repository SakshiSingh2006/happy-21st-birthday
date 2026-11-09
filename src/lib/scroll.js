import Lenis from "lenis";

let lenis = null;

export function initLenis() {
    if (lenis) return lenis;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (t) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return lenis;
}

export function scrollToId(id) {
    if (lenis) {
        lenis.scrollTo(id, { offset: -70, duration: 1.4 });
    } else {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
}

export function lockScroll(locked) {
    if (lenis) {
        locked ? lenis.stop() : lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
}
