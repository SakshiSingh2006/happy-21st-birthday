import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { EditableText } from "./Editable";
import Cake from "./Cake";
import { HeartIcon } from "./Decor";
import { heartBurst } from "@/lib/confetti";

export default function Finale() {
    const { content, update } = useContent();
    const f = content.finale;
    const [hug, setHug] = useState(false);

    const openHug = () => {
        setHug(true);
        heartBurst();
    };

    return (
        <section
            id="finale"
            className="section"
            data-testid="finale-section"
            style={{ background: "linear-gradient(180deg,#FDF2F4 0%,#F3EAF9 55%,#FDF2F4 100%)" }}
        >
            <div className="max-w-3xl mx-auto text-center px-6">
                <p className="eyebrow-script text-3xl" data-testid="finale-eyebrow">{f.eyebrow}</p>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-semibold leading-tight text-ink">
                    <EditableText
                        as="span"
                        testId="finale-heading"
                        value={f.heading}
                        onChange={(v) => update((d) => { d.finale.heading = v; })}
                    />
                </h2>
                <p className="mt-5 text-mutedink text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                    <EditableText
                        multiline
                        testId="finale-message"
                        value={f.message}
                        onChange={(v) => update((d) => { d.finale.message = v; })}
                    />
                </p>
                <div className="mt-12">
                    <Cake count={5} className="glow-pulse rounded-full" />
                </div>
                <motion.button
                    type="button"
                    data-testid="final-hug-button"
                    onClick={openHug}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-12 px-9 py-4 rounded-full bg-rose-deep text-white font-semibold shadow-xl hover:bg-ink transition-colors"
                >
                    {f.buttonLabel}
                </motion.button>
            </div>

            <AnimatePresence>
                {hug && (
                    <motion.div
                        className="fixed inset-0 z-[85] flex items-center justify-center px-6 text-center overflow-hidden"
                        data-testid="hug-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ background: "radial-gradient(60% 50% at 50% 45%, #FBE7A8 0%, #F9E0E7 45%, #FDF2F4 100%)" }}
                    >
                        {Array.from({ length: 16 }).map((_, i) => (
                            <span
                                key={i}
                                className="float-up absolute"
                                style={{
                                    left: `${(i * 61) % 100}%`,
                                    top: "100vh",
                                    "--o": 0.5,
                                    animationDuration: `${9 + (i % 5) * 2}s`,
                                    animationDelay: `${-i * 1.3}s`,
                                    color: i % 2 ? "#D88EA7" : "#CBB8E8",
                                }}
                            >
                                <HeartIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                            </span>
                        ))}
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.1 }}
                                className="flex items-center justify-center gap-4"
                                data-testid="hug-hearts"
                            >
                                <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                    <HeartIcon className="w-16 h-16 sm:w-24 sm:h-24 text-rose-deep" />
                                </motion.span>
                                <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}>
                                    <HeartIcon className="w-24 h-24 sm:w-36 sm:h-36 text-rose" />
                                </motion.span>
                                <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}>
                                    <HeartIcon className="w-16 h-16 sm:w-24 sm:h-24 text-lavender-deep" />
                                </motion.span>
                            </motion.div>
                            <h3 className="mt-8 font-serif text-3xl sm:text-4xl font-semibold text-ink" data-testid="hug-title">
                                <EditableText
                                    as="span"
                                    testId="hug-title-text"
                                    value={f.hugTitle}
                                    onChange={(v) => update((d) => { d.finale.hugTitle = v; })}
                                />
                            </h3>
                            <p className="mt-4 font-hand text-xl sm:text-2xl text-mutedink max-w-md mx-auto leading-relaxed">
                                <EditableText
                                    multiline
                                    testId="hug-message"
                                    value={f.hugMessage}
                                    onChange={(v) => update((d) => { d.finale.hugMessage = v; })}
                                />
                            </p>
                            <button
                                type="button"
                                data-testid="hug-close"
                                onClick={() => setHug(false)}
                                className="mt-8 px-7 py-3 rounded-full bg-white/80 border border-rose-soft text-ink font-semibold hover:bg-white transition-colors"
                            >
                                {f.closeLabel}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
