import { scrollToId } from "@/lib/scroll";

const LINKS = [
    ["#journey", "Journey"],
    ["#reasons", "21 Reasons"],
    ["#memories", "Memories"],
    ["#letter", "Letter"],
    ["#finale", "Finale"],
];

export default function Nav() {
    return (
        <nav className="fixed top-3 inset-x-0 z-40 flex justify-center px-3" data-testid="site-nav">
            <div className="glass-pill rounded-full px-2 py-1.5 flex items-center gap-0.5 sm:gap-1 max-w-full overflow-x-auto">
                {LINKS.map(([id, label]) => (
                    <button
                        key={id}
                        type="button"
                        data-testid={`nav-${id.slice(1)}`}
                        onClick={() => scrollToId(id)}
                        className="font-hand text-[15px] sm:text-xl px-2 sm:px-4 py-1.5 rounded-full text-mutedink hover:text-ink hover:bg-blushdeep transition-colors whitespace-nowrap"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </nav>
    );
}
