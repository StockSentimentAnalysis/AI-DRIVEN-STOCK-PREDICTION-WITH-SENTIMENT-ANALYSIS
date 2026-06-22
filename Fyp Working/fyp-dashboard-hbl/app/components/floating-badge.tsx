'use client';

export default function FloatingBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-pulse-glow">
      <div className="glass rounded-xl px-4 py-3 border border-danger/40 shadow-lg shadow-danger/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
          <div>
            <p className="text-xs font-mono font-bold text-danger tracking-wide">
              RESULT: NULL
            </p>
            <p className="text-[10px] font-mono text-text-muted mt-0.5">
              R² = −0.0413 &nbsp;|&nbsp; AUC = 0.5423 &nbsp;|&nbsp; Coverage 8.4% &lt; 11%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
