import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Check, HelpCircle, Pencil, RotateCcw, Save, X } from "lucide-react";
import { useContent } from "@/content/ContentContext";

export default function EditBar() {
    const { editMode, setEditMode, dirty, save, reset, saving } = useContent();
    const [help, setHelp] = useState(false);

    return (
        <>
            <div className="fixed bottom-4 right-4 z-[65] flex flex-col items-end gap-2" data-testid="edit-mode-section">
                <AnimatePresence>
                    {editMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="glass-pill rounded-full flex items-center gap-1 p-1.5"
                            data-testid="edit-toolbar"
                        >
                            <button
                                type="button"
                                data-testid="edit-save-button"
                                onClick={save}
                                disabled={!dirty || saving}
                                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                                    dirty
                                        ? "bg-rose-deep text-white hover:bg-ink"
                                        : "bg-white text-subtle border border-rose-soft cursor-not-allowed"
                                }`}
                            >
                                {saving ? "Saving…" : dirty ? (
                                    <><Save size={14} /> Save changes</>
                                ) : (
                                    <><Check size={14} /> Saved</>
                                )}
                            </button>
                            <button
                                type="button"
                                data-testid="edit-reset-button"
                                onClick={reset}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-mutedink hover:bg-blushdeep hover:text-ink transition-colors"
                                title="Reset to sample content"
                                aria-label="Reset to sample content"
                            >
                                <RotateCcw size={15} />
                            </button>
                            <button
                                type="button"
                                data-testid="edit-help-button"
                                onClick={() => setHelp(true)}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-mutedink hover:bg-blushdeep hover:text-ink transition-colors"
                                title="How to personalize"
                                aria-label="How to personalize"
                            >
                                <HelpCircle size={15} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    type="button"
                    data-testid="edit-mode-toggle"
                    onClick={() => {
                        setEditMode(!editMode);
                        if (editMode && dirty) {
                            toast.info("You have unsaved changes — press Save before leaving edit mode");
                        }
                    }}
                    className={`relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                        editMode ? "bg-rose-deep text-white" : "bg-white text-ink border border-rose-soft"
                    }`}
                    title="Edit mode"
                    aria-label="Toggle edit mode"
                >
                    <Pencil size={17} />
                    {dirty && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" data-testid="edit-dirty-dot" />}
                </button>
            </div>

            <AnimatePresence>
                {help && (
                    <motion.div
                        className="fixed inset-0 z-[75] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ background: "rgba(59,28,41,.5)", backdropFilter: "blur(6px)" }}
                        onClick={() => setHelp(false)}
                    >
                        <motion.div
                            className="bg-cream rounded-2xl max-w-md w-full p-7 shadow-2xl relative"
                            initial={{ scale: 0.92, y: 16 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            data-testid="edit-help-modal"
                        >
                            <button
                                type="button"
                                data-testid="edit-help-close"
                                onClick={() => setHelp(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-blushdeep flex items-center justify-center"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                            <h3 className="font-serif text-2xl font-semibold text-ink">How to personalize</h3>
                            <ol className="mt-4 space-y-3 text-sm text-mutedink leading-relaxed list-decimal pl-5">
                                <li>Tap the <b>pencil button</b> to start editing — tap it again to stop.</li>
                                <li><b>Any text</b> with a dashed outline can be changed: headings, captions, the timeline, all 21 reasons and the letter.</li>
                                <li>Tap <b>"Replace photo"</b> on any polaroid to upload your own picture.</li>
                                <li>In the <b>music player</b> (bottom-left), use "Upload song" to add your own track.</li>
                                <li>Press <b>"Save changes"</b> — edits save to the website itself, so she'll see your final version on the shared link.</li>
                                <li>"Reset" brings back the original sample content anytime.</li>
                            </ol>
                            <button
                                type="button"
                                data-testid="edit-help-got-it"
                                onClick={() => setHelp(false)}
                                className="mt-6 w-full py-3 rounded-full bg-ink text-white font-semibold hover:bg-rose-deep transition-colors"
                            >
                                Got it ❤️
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
