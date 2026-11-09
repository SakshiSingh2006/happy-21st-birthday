import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { EditableText } from "./Editable";
import { SectionHeader } from "./Decor";

export default function LetterSection() {
    const { content, update } = useContent();
    const l = content.letter;
    const [state, setState] = useState("sealed"); // sealed | opening | open

    const openLetter = () => {
        if (state !== "sealed") return;
        setState("opening");
        setTimeout(() => setState("open"), 1250);
    };

    return (
        <section
            id="letter"
            className="section bg-blush/60"
            style={{ borderTop: "1px solid #F1D4DF", borderBottom: "1px solid #F1D4DF" }}
            data-testid="special-letter-section"
        >
            <SectionHeader eyebrow={l.eyebrow} title={l.title} subtitle={l.hint} />
            <div className="max-w-2xl mx-auto mt-14 px-6">
                <AnimatePresence mode="wait">
                    {state !== "open" ? (
                        <motion.div
                            key="env"
                            className="relative mx-auto w-[320px] h-[215px] sm:w-[380px] sm:h-[250px]"
                            style={{ perspective: 1000 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            exit={{ opacity: 0, y: -24, scale: 0.96 }}
                            transition={{ duration: 0.5 }}
                            data-testid="letter-envelope"
                        >
                            <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(180deg,#EFC3D3,#E5AFC4)" }} />
                            <motion.div
                                className="absolute left-3 right-3 top-2 bottom-3 bg-cream rounded-md p-3"
                                animate={state === "opening" ? { y: -150 } : { y: 0 }}
                                transition={state === "opening" ? { delay: 0.55, duration: 0.7, ease: "easeOut" } : { duration: 0.3 }}
                                style={{ zIndex: 10 }}
                            >
                                <div className="lined-paper w-full h-full rounded-md" />
                            </motion.div>
                            <div
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    zIndex: 20,
                                    background: "linear-gradient(180deg,#F6D3DE,#EFBFCE)",
                                    clipPath: "polygon(0 18%, 50% 62%, 100% 18%, 100% 100%, 0 100%)",
                                }}
                            />
                            <motion.div
                                className="absolute top-0 inset-x-0 h-[52%] origin-top"
                                style={{
                                    zIndex: state === "opening" ? 5 : 40,
                                    background: "linear-gradient(180deg,#E8AEC2,#E2A2BA)",
                                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                }}
                                animate={state === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                            {state === "sealed" && (
                                <motion.button
                                    type="button"
                                    data-testid="letter-wax-seal"
                                    onClick={openLetter}
                                    className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-50 w-[74px] h-[74px] rounded-full flex items-center justify-center text-white font-script text-3xl shadow-lg cursor-pointer"
                                    style={{
                                        background: "radial-gradient(circle at 35% 30%, #F7D070, #E2A93F)",
                                        border: "3px solid rgba(255,255,255,.5)",
                                    }}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.94 }}
                                    aria-label="Open your letter"
                                >
                                    21
                                </motion.button>
                            )}
                            <p className="absolute -bottom-12 inset-x-0 text-center font-hand text-xl text-rose-deep" data-testid="letter-status">
                                {state === "sealed" ? "tap the seal (or the button below) to open" : "opening…"}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.article
                            key="letter"
                            data-testid="letter-card"
                            className="lined-paper rounded-xl shadow-2xl p-7 sm:p-12 relative"
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="tape -top-3 left-8 -rotate-6" />
                            <div className="font-hand text-[1.45rem] sm:text-2xl leading-[34px] text-ink">
                                <EditableText
                                    as="p"
                                    testId="letter-salutation"
                                    value={l.salutation}
                                    onChange={(v) => update((d) => { d.letter.salutation = v; })}
                                    className="block"
                                />
                                {l.body.split("\n\n").map((p, i) => (
                                    <p key={i} className="mt-4">
                                        <EditableText
                                            multiline
                                            testId={`letter-body-${i + 1}`}
                                            value={p}
                                            onChange={(v) => {
                                                const parts = l.body.split("\n\n").slice();
                                                parts[i] = v;
                                                update((d) => { d.letter.body = parts.join("\n\n"); });
                                            }}
                                        />
                                    </p>
                                ))}
                                <div className="mt-4">
                                    <EditableText
                                        as="p"
                                        testId="letter-closing"
                                        value={l.closing}
                                        onChange={(v) => update((d) => { d.letter.closing = v; })}
                                        className="block"
                                    />
                                </div>
                                <p className="mt-6 font-script text-4xl text-rose-deep whitespace-pre-line">
                                    <EditableText
                                        multiline
                                        testId="letter-signature"
                                        value={l.signature}
                                        onChange={(v) => update((d) => { d.letter.signature = v; })}
                                        className="block text-rose-deep"
                                    />
                                </p>
                            </div>
                        </motion.article>
                    )}
                </AnimatePresence>
                {state === "sealed" && (
                    <div className="text-center mt-16">
                        <button
                            type="button"
                            data-testid="open-letter-button"
                            onClick={openLetter}
                            className="px-8 py-3.5 rounded-full bg-ink text-white font-semibold hover:bg-rose-deep transition-colors"
                        >
                            {l.buttonLabel}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
