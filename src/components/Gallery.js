import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { EditableImage, EditableText } from "./Editable";
import { SectionHeader } from "./Decor";

const rotations = ["-2.5deg", "2deg", "-1.2deg", "2.6deg", "-2deg", "1.4deg", "-2.8deg", "2.2deg"];

export default function Gallery() {
    const { content, update } = useContent();
    const g = content.gallery;
    const [lb, setLb] = useState(null);
    const step = (d) => setLb((v) => (v + d + g.items.length) % g.items.length);

    return (
        <section id="memories" className="section" data-testid="memories-gallery-section">
            <SectionHeader eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} />
            <div className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {g.items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                    >
                        <div
                            role="button"
                            tabIndex={0}
                            data-testid={`gallery-photo-${i + 1}`}
                            className="polaroid text-left cursor-pointer gallery-card"
                            style={{ "--rot": rotations[i % 8] }}
                            onClick={() => setLb(i)}
                            onKeyDown={(e) => e.key === "Enter" && setLb(i)}
                        >
                            <EditableImage
                                testId={`gallery-img-${i + 1}`}
                                src={item.photo}
                                onChange={(v) => update((d) => { d.gallery.items[i].photo = v; })}
                                imgClassName="w-full aspect-square object-cover rounded-sm"
                            />
                            <p className="font-hand text-lg sm:text-xl mt-2.5 text-center text-ink">
                                <EditableText
                                    testId={`gallery-caption-${i + 1}`}
                                    value={item.caption}
                                    onChange={(v) => update((d) => { d.gallery.items[i].caption = v; })}
                                />
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {lb !== null && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10"
                        data-testid="gallery-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLb(null)}
                        style={{ background: "rgba(59,28,41,.55)", backdropFilter: "blur(8px)" }}
                    >
                        <motion.div
                            className="polaroid max-w-3xl w-full relative"
                            initial={{ scale: 0.9, rotate: 2 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={g.items[lb].photo}
                                alt={g.items[lb].caption}
                                className="w-full max-h-[68vh] object-contain rounded-sm"
                                data-testid="lightbox-image"
                            />
                            <p className="font-hand text-2xl text-center mt-4 text-ink">{g.items[lb].caption}</p>
                            <button
                                type="button"
                                data-testid="lightbox-close"
                                onClick={() => setLb(null)}
                                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-rose-deep transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <button
                                type="button"
                                data-testid="lightbox-prev"
                                onClick={(e) => { e.stopPropagation(); step(-1); }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-ink flex items-center justify-center hover:bg-white transition-colors shadow"
                                aria-label="Previous photo"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                data-testid="lightbox-next"
                                onClick={(e) => { e.stopPropagation(); step(1); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-ink flex items-center justify-center hover:bg-white transition-colors shadow"
                                aria-label="Next photo"
                            >
                                ›
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
