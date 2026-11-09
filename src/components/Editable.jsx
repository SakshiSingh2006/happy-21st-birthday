import { useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useContent } from "@/content/ContentContext";
import { uploadFile } from "@/lib/media";

export function EditableText({ value, onChange, multiline = false, as: Tag = "span", className = "", testId }) {
    const { editMode } = useContent();
    if (!editMode) {
        return <Tag data-testid={testId} className={className}>{value}</Tag>;
    }
    if (multiline) {
        return <AutoTextarea value={value} onChange={onChange} className={className} testId={testId} />;
    }
    return (
        <input
            data-testid={testId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${className} edit-input`}
            aria-label="Editable text"
        />
    );
}

export function AutoTextarea({ value, onChange, className = "", testId }) {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);
    return (
        <textarea
            ref={ref}
            rows={2}
            data-testid={testId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`edit-input ${className}`}
            aria-label="Editable text"
        />
    );
}

export function EditableImage({ src, onChange, alt = "", className = "", imgClassName = "", testId }) {
    const { editMode } = useContent();
    const ref = useRef(null);
    const [busy, setBusy] = useState(false);

    const handle = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setBusy(true);
        try {
            const url = await uploadFile(f);
            onChange(url);
            toast.success("Photo updated — press Save changes to keep it");
        } catch (err) {
            toast.error(err.message || "Upload failed");
        } finally {
            setBusy(false);
            if (ref.current) ref.current.value = "";
        }
    };

    return (
        <div className={`relative ${className}`}>
            <img data-testid={testId} src={src} alt={alt} className={imgClassName} draggable={false} loading="lazy" />
            {editMode && (
                <>
                    <button
                        type="button"
                        data-testid={`${testId}-replace`}
                        onClick={(e) => {
                            e.stopPropagation();
                            ref.current?.click();
                        }}
                        className="replace-chip"
                    >
                        {busy ? "Uploading…" : "Replace photo"}
                    </button>
                    <input ref={ref} type="file" accept="image/*" hidden onChange={handle} />
                </>
            )}
        </div>
    );
}
