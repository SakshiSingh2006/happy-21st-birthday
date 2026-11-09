import { useMemo } from "react";
import { motion } from "framer-motion";

function mulberry32(seed) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export const HeartIcon = ({ className = "", style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
        <path d="M12 21.35C6.4 17.03 2.5 13.19 2.5 8.97 2.5 6 4.86 3.5 7.75 3.5c1.7 0 3.24.85 4.25 2.2a5.22 5.22 0 0 1 4.25-2.2c2.89 0 5.25 2.5 5.25 5.47 0 4.22-3.9 8.06-9.5 12.38z" />
    </svg>
);

export const SparkleIcon = ({ className = "", style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
        <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
    </svg>
);

export function Backdrop() {
    const items = useMemo(() => {
        const rnd = mulberry32(7);
        return Array.from({ length: 22 }, (_, i) => ({
            id: i,
            left: rnd() * 100,
            size: 10 + rnd() * 18,
            delay: -rnd() * 30,
            dur: 16 + rnd() * 16,
            o: 0.18 + rnd() * 0.25,
            color: ["#E5B7C8", "#D8BFE8", "#F3D27C", "#F1D4DF"][i % 4],
            kind: i % 3,
            tw: 2.2 + rnd() * 2.5,
            top: rnd() * 100,
        }));
    }, []);
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" data-testid="floating-decor" aria-hidden="true">
            {items.map((it) => (
                <span
                    key={it.id}
                    className={it.kind === 2 ? "twinkle absolute" : "float-up absolute"}
                    style={{
                        left: `${it.left}%`,
                        top: it.kind === 2 ? `${it.top}%` : "100vh",
                        "--o": it.o,
                        animationDelay: `${it.delay}s`,
                        animationDuration: it.kind === 2 ? `${it.tw}s` : `${it.dur}s`,
                        color: it.color,
                        width: it.size,
                        height: it.size,
                    }}
                >
                    {it.kind === 0 ? (
                        <HeartIcon className="w-full h-full" />
                    ) : it.kind === 1 ? (
                        <span className="block w-full h-full bg-current opacity-70" style={{ borderRadius: "60% 40% 60% 40%" }} />
                    ) : (
                        <SparkleIcon className="w-full h-full" />
                    )}
                </span>
            ))}
        </div>
    );
}

export function Marquee() {
    const items = ["make a wish", "happy 21st birthday", "my favourite human", "best friends forever", "distance means nothing"];
    const chunk = (key) => (
        <div key={key} className="flex items-center shrink-0">
            {items.map((t, i) => (
                <span key={i} className="flex items-center">
                    <span className="font-script text-2xl sm:text-3xl text-rose-deep px-7 whitespace-nowrap">{t}</span>
                    <HeartIcon className="w-4 h-4 text-rose" />
                </span>
            ))}
        </div>
    );
    return (
        <div className="py-5 border-y border-rose-soft/70 bg-white/50 overflow-hidden" data-testid="editorial-marquee">
            <div className="marquee-track">{chunk("a")}{chunk("b")}</div>
        </div>
    );
}

export function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <div className="max-w-2xl mx-auto text-center px-6">
            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                    className="eyebrow-script text-2xl sm:text-3xl mb-3"
                >
                    {eyebrow}
                </motion.p>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.16 }}
                    className="mt-4 text-base sm:text-lg leading-relaxed text-mutedink"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
