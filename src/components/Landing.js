import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { celebrate, sideBursts } from "@/lib/confetti";
import Cake from "./Cake";
import { HeartIcon } from "./Decor";

export default function Landing({ onOpen }) {
    const { content } = useContent();
    const hero = content.hero;
    const [blown, setBlown] = useState(() => Array(21).fill(false));
    const remaining = blown.filter((b) => !b).length;
    const allBlown = remaining === 0;

    const blow = (i) =>
        setBlown((b) => {
            if (b[i]) return b;
            const n = [...b];
            n[i] = true;
            return n;
        });

    useEffect(() => {
        if (allBlown) celebrate({ particleCount: 70, spread: 70, origin: { y: 0.55 } });
    }, [allBlown]);

    const open = () => {
        sideBursts();
        onOpen();
    };

    const line = (text, delay) => (
        <span className="block overflow-hidden pb-1">
            <motion.span className="block" initial={{ y: "112%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
                {text}
            </motion.span>
        </span>
    );

    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-cream overflow-y-auto overscroll-contain"
            data-testid="welcome-landing-section"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(60% 45% at 50% 8%, #F9E0E7 0%, rgba(249,224,231,0) 70%), radial-gradient(45% 40% at 85% 90%, #E5D9F2 0%, rgba(229,217,242,0) 70%)",
                }}
            />
            <div className="relative min-h-full flex flex-col items-center justify-center px-6 py-12 text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="eyebrow-script text-2xl sm:text-3xl">
                    {hero.eyebrow}
                </motion.p>
                <h1 className="mt-4 font-serif font-bold tracking-tight leading-[1.08] text-4xl sm:text-6xl lg:text-7xl text-ink" data-testid="landing-headline">
                    {line(hero.titleLine1, 0.35)}
                    {line(hero.titleLine2, 0.55)}
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="mt-5 max-w-xl text-base sm:text-lg text-mutedink leading-relaxed"
                    data-testid="landing-subtitle"
                >
                    {hero.subtitle}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }} className="mt-10">
                    <Cake count={21} blown={blown} onBlow={blow} className={allBlown ? "glow-pulse rounded-full" : ""} />
                </motion.div>
                <motion.p
                    key={allBlown ? "done" : "hint"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 font-hand text-xl sm:text-2xl text-rose-deep"
                    data-testid="wish-hint"
                >
                    {allBlown ? hero.wishDone : `${hero.wishHint} · ${remaining} candles left`}
                </motion.p>
                <motion.button
                    type="button"
                    data-testid="open-surprise-button"
                    onClick={open}
                    disabled={!allBlown}
                    whileHover={allBlown ? { scale: 1.05 } : {}}
                    whileTap={allBlown ? { scale: 0.96 } : {}}
                    className={`mt-7 px-9 py-4 rounded-full text-base font-semibold shadow-xl transition-all ${
                        allBlown
                            ? "bg-ink text-white hover:bg-rose-deep cursor-pointer glow-pulse rounded-full"
                            : "bg-ink/40 text-white/70 cursor-not-allowed"
                    }`}
                >
                    {allBlown ? hero.buttonLabel : "Blow all the candles first…"}
                </motion.button>
                <motion.div className="mt-8 flex items-center gap-2 text-subtle text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                    <HeartIcon className="w-3.5 h-3.5" /> made with love, for you
                </motion.div>
            </div>
        </motion.div>
    );
}
