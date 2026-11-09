function Candle({ lit, onClick, index, interactive }) {
    return (
        <div className="flex flex-col items-center relative" style={{ width: 8 }} data-testid={`candle-${index}`}>
            {lit ? (
                <button
                    type="button"
                    onClick={onClick}
                    disabled={!interactive}
                    aria-label={`Blow out candle ${index + 1}`}
                    data-testid={`candle-flame-${index}`}
                    className="relative p-2 -m-2 disabled:cursor-default cursor-pointer"
                >
                    <span className="flame block w-[11px] h-[15px]" />
                </button>
            ) : (
                <span className="smoke block w-[7px] h-[10px] rounded-full bg-ink/25 mb-[1px]" />
            )}
            <span className="w-[1.5px] h-[3px] bg-ink/50" />
            <span
                className="w-[7px] h-9 rounded-full"
                style={{
                    background: "repeating-linear-gradient(45deg,#fff 0 3px,#F3C1D3 3px 6px)",
                    boxShadow: "inset 0 -2px 3px rgba(59,28,41,.12)",
                }}
            />
        </div>
    );
}

export default function Cake({ count = 21, blown = null, onBlow = null, className = "" }) {
    const interactive = typeof onBlow === "function" && blown;
    const rows = [];
    const per = count > 12 ? Math.ceil(count / 2) : count;
    for (let i = 0; i < count; i += per) {
        rows.push(Array.from({ length: Math.min(per, count - i) }, (_, j) => i + j));
    }
    const lit = (i) => (interactive ? !blown[i] : true);
    return (
        <div className={`relative mx-auto w-[290px] sm:w-[330px] ${className}`} data-testid="birthday-cake">
            <div className="relative z-20 flex justify-center gap-[7px]">
                {rows[0].map((i) => (
                    <Candle key={i} index={i} lit={lit(i)} interactive={interactive} onClick={() => onBlow(i)} />
                ))}
            </div>
            {rows.length > 1 && (
                <div className="relative z-20 flex justify-center gap-[7px] -mt-[13px]">
                    {rows[1].map((i) => (
                        <Candle key={i} index={i} lit={lit(i)} interactive={interactive} onClick={() => onBlow(i)} />
                    ))}
                </div>
            )}
            <div
                className="relative z-10 h-16 sm:h-[76px] rounded-[16px] -mt-[6px]"
                style={{ background: "linear-gradient(180deg,#FBE4EC 0%,#F4CBD9 100%)", boxShadow: "inset 0 -6px 10px rgba(193,112,140,.18)" }}
            >
                <div className="absolute -bottom-[7px] left-0 right-0 flex justify-between px-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <span key={i} className="block w-[16px] h-[14px] rounded-b-full" style={{ background: "#F4CBD9" }} />
                    ))}
                </div>
                {Array.from({ length: 14 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-[5px] h-[2px] rounded-full"
                        style={{
                            left: `${((i * 37) % 92) + 4}%`,
                            top: `${((i * 23) % 60) + 12}%`,
                            background: ["#C1708C", "#A38CD8", "#F7D070", "#8FBBAA"][i % 4],
                            transform: `rotate(${i * 53}deg)`,
                        }}
                    />
                ))}
            </div>
            <div
                className="relative z-0 h-[74px] sm:h-[84px] rounded-[16px] mx-[8px] -mt-[4px]"
                style={{ background: "linear-gradient(180deg,#EBDEF7 0%,#DCC9F0 100%)", boxShadow: "inset 0 -8px 12px rgba(150,110,190,.2)" }}
            >
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[12px] bg-white opacity-85" />
                {Array.from({ length: 10 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-[5px] h-[2px] rounded-full"
                        style={{
                            left: `${((i * 41) % 90) + 5}%`,
                            top: `${((i * 29) % 70) + 15}%`,
                            background: ["#D88EA7", "#F7D070", "#8FBBAA"][i % 3],
                            transform: `rotate(${i * 47}deg)`,
                        }}
                    />
                ))}
            </div>
            <div
                className="relative z-0 -mt-[6px] mx-[-14px] h-[14px] rounded-[50%] bg-white"
                style={{ boxShadow: "0 12px 26px rgba(59,28,41,.16)" }}
            />
        </div>
    );
}
