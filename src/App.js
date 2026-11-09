import { Component, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";
import { ContentProvider, useContent } from "@/content/ContentContext";
import { initLenis, lockScroll, scrollToId } from "@/lib/scroll";
import Landing from "@/components/Landing";
import Nav from "@/components/Nav";
import Timeline from "@/components/Timeline";
import Reasons from "@/components/Reasons";
import Gallery from "@/components/Gallery";
import LetterSection from "@/components/Letter";
import Finale from "@/components/Finale";
import MusicPlayer from "@/components/MusicPlayer";
import EditBar from "@/components/EditBar";
import { Backdrop, HeartIcon, Marquee } from "@/components/Decor";
import { EditableText } from "@/components/Editable";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { err: null };
    }
    static getDerivedStateFromError(err) {
        return { err };
    }
    render() {
        if (this.state.err) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 text-center bg-cream">
                    <p className="font-hand text-2xl text-ink">
                        Something went wrong — refresh the page to return to the celebration.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

function Greeting() {
    const { content, update } = useContent();
    const g = content.greeting;
    return (
        <header className="min-h-[86vh] flex flex-col items-center justify-center text-center px-6 relative" data-testid="greeting-section">
            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl sm:text-6xl font-semibold text-ink max-w-3xl leading-tight"
            >
                <EditableText as="span" testId="greeting-title" value={g.title} onChange={(v) => update((d) => { d.greeting.title = v; })} />
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 font-hand text-xl sm:text-2xl text-rose-deep"
            >
                <EditableText testId="greeting-sub" value={g.sub} onChange={(v) => update((d) => { d.greeting.sub = v; })} />
            </motion.p>
            <motion.button
                type="button"
                data-testid="scroll-cue"
                onClick={() => scrollToId("#journey")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-14 flex flex-col items-center gap-2 text-subtle hover:text-rose-deep transition-colors"
                aria-label="Scroll to our story"
            >
                <span className="font-hand text-lg">our story</span>
                <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
            </motion.button>
        </header>
    );
}

function Shell() {
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        initLenis();
        lockScroll(true);
    }, []);
    useEffect(() => {
        lockScroll(!opened);
    }, [opened]);
    return (
        <div className="grain relative min-h-screen bg-cream">
            <Backdrop />
            <AnimatePresence>
                {!opened && <Landing key="landing" onOpen={() => setOpened(true)} />}
            </AnimatePresence>
            <AnimatePresence>
                {opened && (
                    <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
                        <Nav />
                        <Greeting />
                        <Marquee />
                        <Timeline />
                        <Reasons />
                        <Gallery />
                        <LetterSection />
                        <Finale />
                        <footer className="py-10 text-center font-hand text-lg text-subtle" data-testid="site-footer">
                            made with love by Guddu, for Princess ❤
                        </footer>
                    </motion.main>
                )}
            </AnimatePresence>
            <MusicPlayer />
            <EditBar />
            <Toaster position="top-center" richColors toastOptions={{ style: { fontFamily: "'Plus Jakarta Sans', sans-serif" } }} />
        </div>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <ContentProvider>
                <Shell />
            </ContentProvider>
        </ErrorBoundary>
    );
}
