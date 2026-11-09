export const DEFAULTS = {
    hero: {
        eyebrow: "a little corner of the internet, made just for you, Princess",
        titleLine1: "Happy 21st Birthday,",
        titleLine2: "My Favourite Human!",
        subtitle: "To 21 beautiful years of you, and a lifetime of our friendship.",
        buttonLabel: "Open Your Surprise ❤️",
        wishHint: "Psst… tap the candle flames to make a wish",
        wishDone: "Wish made. It's already coming true ✨",
    },
    greeting: {
        title: "Twenty-one looks so good on you, Princess.",
        sub: "Scroll slowly, beautiful — I made every bit of this for you.",
    },
    journey: {
        eyebrow: "chapter one · 2023 — 2026",
        title: "Our Friendship Journey",
        subtitle: "From first-year classmates to forever souls — four years of us, in four little chapters.",
        items: [
            {
                year: "2023",
                title: "Where It All Began",
                text: "First year, first hellos. One random conversation in the college corridors turned into sitting together every single day. I still remember thinking — I hope this one stays.",
                caption: "day one, year one",
                photo: "/images/timeline-2023.jpg",
            },
            {
                year: "2024",
                title: "Partners in Crime",
                text: "Late-night maggi runs, exam-week chaos, dancing in hostel corridors and laughing till our stomachs hurt. Somewhere in those tiny moments, you stopped being a friend and became home.",
                caption: "adventures & belly laughs",
                photo: "/images/timeline-2024.jpg",
            },
            {
                year: "2025",
                title: "The Distance Chapter",
                text: "Different cities, same hearts. Video calls that stretched way past midnight, voice notes that fixed my worst days. Miles apart — never once apart.",
                caption: "miles apart, still us",
                photo: "/images/timeline-2025.jpg",
            },
            {
                year: "2026",
                title: "Forever Loading…",
                text: "This year, we close the distance and start a brand-new chapter. New cities, new dreams, and the same unbreakable us. The best parts are still unwritten.",
                caption: "forever loading…",
                photo: "/images/timeline-2026.jpg",
            },
        ],
    },
    reasons: {
        eyebrow: "twenty-one little things",
        title: "21 Reasons Why You're My Favourite Person",
        subtitle: "Tap every card — I wrote one for each year of you.",
        items: [
            "You laugh at my worst jokes like they're the best ones in the world.",
            "You remember the tiniest things I mention once — and never forget them.",
            "Talking to you can fix a day I thought was ruined.",
            "You tell me the truth — kindly, even when I don't want to hear it.",
            "You've seen me at my worst and stayed for my best.",
            "Your voice notes are better than any playlist.",
            "You believe in me louder than my doubts ever could.",
            "You make ordinary days feel like little celebrations.",
            "You send me reels that are so us.",
            "You never let me sleep upset.",
            "You celebrate my wins like they're your own.",
            "You know what I'm feeling before I even say it.",
            "You give the warmest hugs in this entire world.",
            "You make me braver than I actually am.",
            "Your heart is the softest place I know.",
            "You keep every promise you make me.",
            "You're my 2 AM emergency contact and my 2 PM random thought.",
            "Distance tested us — and you made it look easy.",
            "You love with your whole heart, always.",
            "You're the first person I want to tell everything to.",
            "Because in a world of billions, you feel like home.",
        ],
    },
    gallery: {
        eyebrow: "chapter two",
        title: "Our Memories Gallery",
        subtitle: "Little frozen moments of us — tap any photo to hold it a little longer.",
        items: [
            { photo: "/images/gallery-1.jpg", caption: "you & the sea — both endless" },
            { photo: "/images/gallery-2.jpg", caption: "golden hour, golden company" },
            { photo: "/images/gallery-3.jpg", caption: "caffeine, chaos & us" },
            { photo: "/images/gallery-4.jpg", caption: "the sky in your city, saved for me" },
            { photo: "/images/gallery-5.jpg", caption: "sky candy on our long calls" },
            { photo: "/images/gallery-6.jpg", caption: "same moon, different cities" },
            { photo: "/images/gallery-7.jpg", caption: "chasing sunsets & daydreams" },
            { photo: "/images/gallery-8.jpg", caption: "bloom slowly, bloom softly" },
        ],
    },
    letter: {
        eyebrow: "chapter three",
        title: "A Letter For You",
        hint: "sealed with love (and a little glitter)",
        buttonLabel: "Open Your Letter",
        salutation: "My dearest Princess,",
        body: "There are people you meet who slowly become part of your whole world. That's you. One ordinary day back in 2023, in our very first year of college, we started talking — and quietly, without either of us realising, you became my favourite hello and my hardest goodbye.\n\nThank you for every 2 AM conversation, every laugh that made my stomach hurt, every time you believed in me when I couldn't believe in myself. You have this way of making everything feel survivable — exams, bad days, even long distances.\n\nTwenty-one. I hope this year hands you everything you've been too kind to ask for. I hope you laugh until your cheeks ache, collect moments that feel like magic, and never doubt for a second how deeply you are loved.\n\nThe kilometres between us are just geography. You live right here, in the softest part of my life, and nothing — no city, no timezone, no distance — will ever change that.\n\nSo make a wish tonight, my love. And when you blow out your candles, know that I'm wishing right along with you.",
        closing: "Happy 21st, my favourite human. Here's to you — always.",
        signature: "Forever yours,\nGuddu ❤️",
    },
    music: {
        label: "Jaan Ho Meri",
        url: "/audio/our-song.wav",
        youtubeId: "O7mbB3gSmuo",
    },
    finale: {
        eyebrow: "one last thing…",
        heading: "Distance Means Nothing When Someone Means Everything.",
        message: "Every kilometre between us has never once made me feel far from you. Happy 21st, my love — I'm so proud of the human you're becoming, and luckier than words can say to be doing life beside you.",
        buttonLabel: "One Last Hug From Me ❤️",
        hugTitle: "Sending you the biggest hug",
        hugMessage: "Wrap your arms around yourself — that's me, holding you across the miles. I'm so proud of you, and I love you endlessly. Happy 21st, Princess. ❤️",
        closeLabel: "Back to the celebration",
    },
};

export function deepMerge(base, saved) {
    if (!saved || typeof saved !== 'object') return structuredClone(base);
    const out = structuredClone(base);
    for (const key of Object.keys(saved)) {
        const sv = saved[key];
        const bv = out[key];
        if (Array.isArray(sv)) {
            out[key] = sv;
        } else if (sv && typeof sv === 'object' && bv && typeof bv === 'object' && !Array.isArray(bv)) {
            out[key] = deepMerge(bv, sv);
        } else if (sv !== undefined && sv !== null) {
            out[key] = sv;
        }
    }
    return out;
}
