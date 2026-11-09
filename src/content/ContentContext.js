import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DEFAULTS, deepMerge } from "./defaults";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ContentCtx = createContext(null);

export function ContentProvider({ children }) {
    const [content, setContent] = useState(DEFAULTS);
    const [editMode, setEditMode] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch(`${API_URL}/content`);
                if (!res.ok) return;
                const data = await res.json();
                if (alive) setContent(deepMerge(DEFAULTS, data));
            } catch {
                /* offline-safe: keep bundled defaults */
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const update = useCallback((fn) => {
        setContent((c) => {
            const draft = structuredClone(c);
            fn(draft);
            return draft;
        });
        setDirty(true);
    }, []);

    const save = useCallback(async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/content`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            if (!res.ok) throw new Error("Save failed");
            setDirty(false);
            toast.success("Saved! She'll see this on the shared link ❤️");
            return true;
        } catch (e) {
            toast.error("Couldn't save — check your connection and try again.");
            return false;
        } finally {
            setSaving(false);
        }
    }, [content]);

    const reset = useCallback(async () => {
        if (!window.confirm("Restore the original sample content? Your edits will be lost.")) return;
        try {
            const res = await fetch(`${API_URL}/content/reset`, { method: "POST" });
            if (!res.ok) throw new Error();
            setContent(deepMerge(DEFAULTS, await res.json()));
            setDirty(false);
            toast.success("Back to the original sample content.");
        } catch {
            toast.error("Reset failed — try again in a moment.");
        }
    }, []);

    const value = useMemo(
        () => ({ content, update, editMode, setEditMode, dirty, saving, save, reset }),
        [content, update, editMode, dirty, saving, save, reset]
    );

    return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>;
}

export function useContent() {
    const ctx = useContext(ContentCtx);
    if (!ctx) throw new Error("useContent must be used inside ContentProvider");
    return ctx;
}
