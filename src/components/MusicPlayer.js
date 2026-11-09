import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Pause, Play, Upload, Volume2, VolumeX } from "lucide-react";
import { useContent } from "@/content/ContentContext";
import { EditableText } from "./Editable";
import { uploadFile } from "@/lib/media";
import { HeartIcon } from "./Decor";

let ytApiPromise = null;
function loadYouTubeApi() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (!ytApiPromise) {
        ytApiPromise = new Promise((resolve) => {
            window.onYouTubeIframeAPIReady = () => resolve(window.YT);
            const s = document.createElement("script");
            s.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(s);
        });
    }
    return ytApiPromise;
}

export default function MusicPlayer() {
    const { content, update, editMode } = useContent();
    const audioRef = useRef(null);
    const fileRef = useRef(null);
    const ytRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [busy, setBusy] = useState(false);
    const wantPlayRef = useRef(false);
    const ytId = content.music.youtubeId || "";

    useEffect(() => {
        if (!ytId) return;
        let dead = false;
        loadYouTubeApi().then((YT) => {
            if (dead) return;
            if (ytRef.current && ytRef.current.destroy) ytRef.current.destroy();
            ytRef.current = new YT.Player("yt-music-host", {
                videoId: ytId,
                playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0 },
                events: {
                    onReady: () => {
                        window.__ytDbg = { ...(window.__ytDbg || {}), ready: true };
                        if (ytRef.current.setVolume) ytRef.current.setVolume(65);
                        if (wantPlayRef.current) ytRef.current.playVideo();
                    },
                    onStateChange: (e) => {
                        window.__ytDbg = { ...(window.__ytDbg || {}), state: e.data };
                        setPlaying(e.data === YT.PlayerState.PLAYING);
                        if (e.data === YT.PlayerState.ENDED) {
                            ytRef.current.seekTo(0);
                            ytRef.current.playVideo();
                        }
                    },
                    onError: (e) => {
                        window.__ytDbg = { ...(window.__ytDbg || {}), error: e && e.data };
                        setPlaying(false);
                        toast.error("This song can't play right now — you can upload your own file instead");
                    },
                },
            });
        });
        return () => { dead = true; };
    }, [ytId]);

    const togglePlay = async () => {
        if (ytId) {
            const p = ytRef.current;
            if (!p || !p.playVideo) {
                wantPlayRef.current = true;
                toast.error("One sec — the song is still loading, tap again");
                return;
            }
            wantPlayRef.current = !playing;
            playing ? p.pauseVideo() : p.playVideo();
            return;
        }
        const el = audioRef.current;
        if (!el) return;
        if (playing) {
            el.pause();
            setPlaying(false);
        } else {
            try {
                await el.play();
                setPlaying(true);
            } catch {
                toast.error("Tap again to start the music");
            }
        }
    };

    const toggleMute = () => {
        if (ytId) {
            const p = ytRef.current;
            if (!p || !p.mute) return;
            if (muted) p.unMute(); else p.mute();
            setMuted(!muted);
            return;
        }
        const el = audioRef.current;
        if (!el) return;
        el.muted = !el.muted;
        setMuted(el.muted);
    };

    const handleUpload = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setBusy(true);
        try {
            const url = await uploadFile(f);
            update((d) => {
                d.music.url = url;
                d.music.youtubeId = "";
                d.music.label = f.name.replace(/\.[^.]+$/, "");
            });
            toast.success("Your song is set — press Save changes to keep it");
        } catch (err) {
            toast.error(err.message || "Upload failed");
        } finally {
            setBusy(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-[65]" data-testid="music-player-widget">
            {ytId ? (
                <div
                    id="yt-music-host"
                    data-testid="youtube-audio-host"
                    style={{ position: "absolute", width: "1px", height: "1px", left: "-9999px", overflow: "hidden" }}
                />
            ) : (
                <audio ref={audioRef} src={content.music.url} loop preload="none" />
            )}
            <div className="glass-pill rounded-full flex items-center gap-2 pl-2 pr-3 py-2">
                <span className={`w-9 h-9 rounded-full bg-blushdeep flex items-center justify-center ${playing ? "spin-slow" : ""}`}>
                    <HeartIcon className="w-5 h-5 text-rose-deep" />
                </span>
                <button
                    type="button"
                    data-testid="music-play-button"
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-rose-deep transition-colors"
                    aria-label={playing ? "Pause music" : "Play music"}
                >
                    {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                </button>
                <span className="flex items-end gap-[3px] h-4" data-testid="music-equalizer">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`eq-bar w-[3px] h-full rounded-full bg-rose ${playing ? "" : "opacity-30"}`}
                            style={{ animationDelay: `${i * 0.18}s`, animationPlayState: playing ? "running" : "paused" }}
                        />
                    ))}
                </span>
                <span className="hidden sm:block font-hand text-lg text-ink max-w-[130px] truncate">
                    <EditableText
                        testId="music-label"
                        value={content.music.label}
                        onChange={(v) => update((d) => { d.music.label = v; })}
                    />
                </span>
                <button
                    type="button"
                    data-testid="music-mute-button"
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-mutedink hover:bg-blushdeep hover:text-ink transition-colors"
                    aria-label={muted ? "Unmute music" : "Mute music"}
                >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                {editMode && (
                    <>
                        <button
                            type="button"
                            data-testid="music-upload-button"
                            onClick={() => fileRef.current?.click()}
                            className="px-3 py-1.5 rounded-full bg-rose-deep text-white text-xs font-semibold hover:bg-ink transition-colors whitespace-nowrap"
                        >
                            {busy ? "Uploading…" : "Upload song"}
                        </button>
                        <input ref={fileRef} type="file" accept="audio/*" hidden onChange={handleUpload} data-testid="music-upload-input" />
                    </>
                )}
            </div>
        </div>
    );
}
