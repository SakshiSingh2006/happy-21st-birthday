const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

function readBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(new Error("Couldn't read that file"));
        reader.readAsDataURL(file);
    });
}

async function compressImage(file, maxDim = 1600, quality = 0.85) {
    const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Couldn't read that image"));
        reader.readAsDataURL(file);
    });
    const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error("That image couldn't be opened"));
        i.src = dataUrl;
    });
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const out = canvas.toDataURL("image/jpeg", quality);
    return out.split(",")[1];
}

export async function uploadFile(file) {
    const isAudio = file.type.startsWith("audio/");
    if (isAudio && file.size > 8 * 1024 * 1024) {
        throw new Error("Song must be under 8 MB — try an mp3 clip of it");
    }
    if (!isAudio && !file.type.startsWith("image/")) {
        throw new Error("Please pick a photo or an audio file");
    }
    let data, contentType;
    if (isAudio) {
        data = await readBase64(file);
        contentType = file.type;
    } else {
        data = await compressImage(file);
        contentType = "image/jpeg";
    }
    const res = await fetch(`${API_URL}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: isAudio ? "audio" : "image", content_type: contentType, data }),
    });
    if (!res.ok) throw new Error("Upload failed — try again in a moment");
    const json = await res.json();
    return json.url;
}
