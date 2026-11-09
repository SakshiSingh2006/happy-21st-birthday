import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { EditableImage, EditableText } from "./Editable";
import { SectionHeader } from "./Decor";

const rotations = ["-3deg", "2.5deg", "-2deg", "3deg"];

export default function Timeline() {
    const { content, update } = useContent();
    const j = content.journey;
    return (
        <section id="journey" className="section" data-testid="timeline-section">
            <SectionHeader eyebrow={j.eyebrow} title={j.title} subtitle={j.subtitle} />
            <div className="relative max-w-5xl mx-auto mt-16 px-6">
                <div
                    className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 rounded-full"
                    style={{ background: "linear-gradient(180deg,#D88EA7,#E5D9F2 55%,#F7D070)" }}
                />
                <div className="space-y-14 md:space-y-20">
                    {j.items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative flex flex-col md:flex-row gap-6 md:gap-10 ${i % 2 ? "md:flex-row-reverse" : ""} items-start pl-14 md:pl-0`}
                            data-testid={`timeline-item-${i + 1}`}
                        >
                            <span className="absolute left-8 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-rose shadow z-10" />
                            <div className="md:w-1/2 w-full flex justify-center md:justify-end md:pr-4">
                                <div className="polaroid relative w-full max-w-[320px]" style={{ transform: `rotate(${rotations[i % 4]})` }}>
                                    <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
                                    <EditableImage
                                        testId={`timeline-photo-${i + 1}`}
                                        src={item.photo}
                                        onChange={(v) => update((d) => { d.journey.items[i].photo = v; })}
                                        imgClassName="w-full aspect-[4/3] object-cover rounded-sm"
                                    />
                                    <p className="font-hand text-xl mt-3 text-center text-ink">
                                        <EditableText
                                            testId={`timeline-caption-${i + 1}`}
                                            value={item.caption}
                                            onChange={(v) => update((d) => { d.journey.items[i].caption = v; })}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center md:py-6">
                                <span className="font-script text-4xl sm:text-5xl text-rose-deep leading-none">{item.year}</span>
                                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-2 text-ink">
                                    <EditableText
                                        testId={`timeline-title-${i + 1}`}
                                        value={item.title}
                                        onChange={(v) => update((d) => { d.journey.items[i].title = v; })}
                                    />
                                </h3>
                                <p className="mt-3 text-mutedink leading-relaxed text-base">
                                    <EditableText
                                        multiline
                                        testId={`timeline-text-${i + 1}`}
                                        value={item.text}
                                        onChange={(v) => update((d) => { d.journey.items[i].text = v; })}
                                    />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
