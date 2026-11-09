import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { AutoTextarea, EditableText } from "./Editable";
import { HeartIcon, SectionHeader } from "./Decor";
import { celebrate } from "@/lib/confetti";

const spanFor = (i) => (i % 8 === 0 || i % 8 === 5 ? "sm:col-span-2" : "");

export default function Reasons() {
    const { content, update, editMode } = useContent();
    const r = content.reasons;
    const [opened, setOpened] = useState({});
    const count = Object.values(opened).filter(Boolean).length;

    useEffect(() => {
        if (count === 21) celebrate({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
    }, [count]);

    const toggle = (i) => setOpened((o) => ({ ...o, [i]: !o[i] }));

    return (
        <section
            id="reasons"
            className="section bg-blush/60"
            style={{ borderTop: "1px solid #F1D4DF", borderBottom: "1px solid #F1D4DF" }}
            data-testid="reasons-grid-section"
        >
            <SectionHeader eyebrow={r.eyebrow} title={r.title} subtitle={r.subtitle} />
            <div className="max-w-3xl mx-auto mt-10 px-6" data-testid="reasons-progress">
                <div className="flex items-center justify-between font-hand text-xl text-rose-deep">
                    <span data-testid="reasons-progress-label">{count} of 21 opened</span>
                    <HeartIcon className="w-5 h-5" />
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-white shadow-inner overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#D88EA7,#F7D070)" }}
                        animate={{ width: `${(count / 21) * 100}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    />
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-10 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {r.items.map((text, i) =>
                    editMode ? (
                        <label
                            key={i}
                            className={`min-h-[170px] rounded-2xl bg-white border border-rose-soft p-4 flex flex-col gap-2 ${spanFor(i)}`}
                            data-testid={`reason-edit-${i + 1}`}
                        >
                            <span className="font-script text-2xl text-rose-deep">#{i + 1}</span>
                            <AutoTextarea
                                value={text}
                                onChange={(v) => update((d) => { d.reasons.items[i] = v; })}
                                testId={`reason-text-${i + 1}`}
                                className="font-hand text-lg"
                            />
                        </label>
                    ) : (
                        <motion.button
                            key={i}
                            type="button"
                            data-testid={`reason-card-${i + 1}`}
                            onClick={() => toggle(i)}
                            className={`preserve-3d relative min-h-[170px] cursor-pointer grid ${spanFor(i)}`}
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                            animate={{ rotateY: opened[i] ? 180 : 0 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <span className="backface-hidden [grid-area:1/1] rounded-2xl bg-gradient-to-br from-white to-blushdeep border border-rose-soft shadow-sm flex flex-col items-center justify-center gap-2 p-4">
                                <span className="font-script text-4xl sm:text-5xl text-rose-deep">{String(i + 1).padStart(2, "0")}</span>
                                <span className="font-hand text-lg text-mutedink">tap to open</span>
                                <HeartIcon className="w-4 h-4 text-rose" />
                            </span>
                            <span
                                className="backface-hidden [grid-area:1/1] rounded-2xl bg-white border border-rose-soft shadow-md p-4 flex items-center justify-center"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <span className="font-hand text-xl sm:text-[1.35rem] leading-snug text-ink text-center">{text}</span>
                            </span>
                        </motion.button>
                    )
                )}
            </div>
            {!editMode && <p className="text-center font-hand text-lg text-subtle mt-8">one for every year of you ❤</p>}
        </section>
    );
}
