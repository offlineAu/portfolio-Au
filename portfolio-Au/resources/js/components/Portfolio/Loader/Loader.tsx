import { useEffect, useRef, useState } from 'react';
import './loader.css';

const STEPS = [
    { target: 30,  duration: 400, label: 'Initializing'   },
    { target: 60,  duration: 700, label: 'Loading Assets'  },
    { target: 85,  duration: 600, label: 'Rendering Scene' },
    { target: 100, duration: 500, label: 'Ready'           },
];

export function Loader({ onDone }: { onDone: () => void }) {
    const [pct,   setPct]   = useState(0);
    const [label, setLabel] = useState('Initializing');
    const [exit,  setExit]  = useState(false);

    useEffect(() => {
        let current   = 0;
        let cancelled = false;

        function animateStep(stepIdx: number) {
            if (cancelled || stepIdx >= STEPS.length) return;
            const { target, duration, label: lbl } = STEPS[stepIdx];
            const start     = current;
            const startTime = performance.now();

            function frame(now: number) {
                if (cancelled) return;
                const elapsed  = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                current        = Math.round(start + (target - start) * eased);

                setPct(current);
                setLabel(lbl);

                if (progress < 1) requestAnimationFrame(frame);
                else animateStep(stepIdx + 1);
            }
            requestAnimationFrame(frame);
        }

        animateStep(0);

        return () => { cancelled = true; };
    }, []);

    // When pct hits 100, wait then exit
    useEffect(() => {
        if (pct < 100) return;
        const t = setTimeout(() => {
            setExit(true);
            setTimeout(onDone, 900);
        }, 420);
        return () => clearTimeout(t);
    }, [pct, onDone]);

    return (
        <div className={`loader${exit ? ' loader--done' : ''}`}>
            <div className="loader-scan" />

            {/* HUD corners */}
            <div className="loader-corners">
                <span /><span /><span /><span />
            </div>
            <div className="loader-hud-tl">SYS.INIT // PORTFOLIO.v2</div>
            <div className="loader-hud-br">AU // DEV — LOADING ASSETS</div>

            <div className="loader-center">

                {/* Ring + monogram */}
                <div className="loader-ring-wrap">
                    <svg className="loader-ring" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#c8a96e" />
                                <stop offset="100%" stopColor="#f0d898" />
                            </linearGradient>
                        </defs>
                        <circle className="loader-ring-track" cx="50" cy="50" r="45" />
                        <circle className="loader-ring-fill"  cx="50" cy="50" r="45" />
                    </svg>
                    <div className="loader-ring-outer" />
                    <div className="loader-mono">A<span>U.</span></div>
                </div>

                {/* Name */}
                <div className="loader-name">
                    <div className="loader-name__main">AIRL</div>
                    <div className="loader-name__sub">Web Developer · AI Patron</div>
                </div>

                {/* Progress */}
                <div className="loader-progress-wrap">
                    <div className="loader-progress-track">
                        <div
                            className="loader-progress-fill"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <div className="loader-progress-meta">
                        <span className="loader-progress-label">{label}</span>
                        <span className="loader-progress-pct">{pct}%</span>
                    </div>
                </div>

            </div>
        </div>
    );
}