import React, { useRef } from 'react';

function useMagnetic() {
    const ref = useRef<HTMLButtonElement>(null);
    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.2;
        const y = (e.clientY - r.top - r.height / 2) * 0.25;
        el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
        if (ref.current) ref.current.style.transform = '';
    };
    return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function TypewriterTagline() {
    const text = "I build things for the web — fast, thoughtful, and built to last.";
    const [displayed, setDisplayed] = React.useState('');
    const [started, setStarted] = React.useState(false);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
        // Start after the staggered entrance delay (~0.28s + buffer)
        const startTimer = setTimeout(() => setStarted(true), 900);
        return () => clearTimeout(startTimer);
    }, []);

    React.useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) {
            setDone(true);
            return;
        }
        // Vary speed slightly for realism
        const char = text[displayed.length];
        const delay = char === ' ' ? 60 : char === '—' ? 180 : char === ',' || char === '.' ? 140 : 55 + Math.random() * 35;
        const t = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, delay);
        return () => clearTimeout(t);
    }, [started, displayed]);

    return (
        <p className="lp-hero-tagline lp-tagline-typewriter">
            <span className="lp-tagline-bar" />
            <span className="lp-tagline-text">
                {displayed}
                <span className={`lp-tw-cursor${done ? ' lp-tw-cursor--blink' : ''}`} />
            </span>
        </p>
    );
}

export function Hero({
    onOpenPicker,
    scrollY,
}: {
    onOpenPicker: () => void;
    scrollY: number;
}) {
    const parallaxTranslate = scrollY * 0.12;
    const zoomScale = 1 + scrollY * 0.0004;

    const primaryBtn = useMagnetic();
    const ghostBtn = useMagnetic();

    React.useEffect(() => {
        const path = document.querySelector('.lp-name-underline-path') as SVGPathElement | null;
        if (path) {
            const len = Math.ceil(path.getTotalLength());
            path.style.strokeDasharray = `${len}`;
            path.style.strokeDashoffset = `${len}`;
            // Store for hover reset
            path.dataset.len = String(len);
        }
    }, []);

    return (
        <section className="lp-hero">
            <div className="lp-hero-noise" />

            {/* Available badge — lives in header row */}
            <div className="lp-hero-header">
                <div className="lp-avail-badge">
                    <span className="lp-dot" />
                    <span>Available for work</span>
                </div>
            </div>

            <div
                className="lp-hero-body"
                style={{ transform: `translateY(-${parallaxTranslate}px)` }}
            >
                {/* ── LEFT ── */}
                <div className="lp-hero-left">
                    {/* Eyebrow */}
                    <p className="lp-hero-eyebrow">Hi, I am</p>

                    <h1 className="lp-hero-name">
                        <div className="lp-name-outer">

                            {/* Invisible spacer keeps container width = full name width */}
                            <span className="lp-name-ambient" aria-hidden="true">
                                Airl Joriz Janoplo
                            </span>

                            {/* Glitch letters float on top of spacer */}
                            <span className="lp-ambient-letters" aria-hidden="true">
                                <span className="lp-g-letter lp-g-0">A</span>
                                <span className="lp-g-letter lp-g-1">u</span>
                            </span>

                            {/* Full name cascades in on hover */}
                            <span className="lp-name-hover" aria-label="Airl Joriz Janoplo">
                                {'Airl Joriz Janoplo'.split('').map((ch, i) => (
                                    <span
                                        key={i}
                                        className="lp-r-letter"
                                        style={{ '--i': i } as React.CSSProperties}
                                    >
                                        {ch === ' ' ? '\u00A0' : ch}
                                    </span>
                                ))}
                            </span>

                            <svg
                                className="lp-name-underline-svg"
                                viewBox="0 0 639 327"
                                preserveAspectRatio="xMidYMid meet"
                                aria-hidden="true"
                                ref={(el) => {
                                    if (el) {
                                        const path = el.querySelector('path');
                                        if (path) {
                                            const len = Math.ceil(path.getTotalLength());
                                            path.style.strokeDasharray = `${len}`;
                                            path.style.strokeDashoffset = `${len}`;
                                        }
                                    }
                                }}
                            >
                                <path
                                    className="lp-name-underline-path"
                                    d="M 466.00 327.00 L 144.00 327.00 C223.20,327.00 288.01,326.66 288.02,326.25 C288.04,325.84 288.95,322.12 290.05,318.00 C292.31,309.52 292.31,309.51 294.42,294.50 C296.26,281.37 296.56,278.79 298.48,260.00 C300.12,243.98 302.51,226.22 303.91,219.72 C304.41,217.40 305.12,212.57 305.48,209.00 C305.84,205.43 306.54,199.80 307.02,196.50 C309.40,180.14 309.27,179.30 305.27,185.47 C302.10,190.36 299.74,191.42 296.97,189.18 C294.93,187.53 294.76,186.55 294.83,177.19 C294.87,171.59 294.66,167.00 294.38,167.00 C294.10,167.00 289.46,168.12 284.07,169.48 C267.91,173.58 237.60,179.70 219.50,182.53 C214.00,183.38 208.60,184.27 207.50,184.50 C205.74,184.86 205.46,185.85 205.20,192.71 C204.17,219.66 186.67,250.25 166.40,260.50 C159.06,264.22 157.94,264.49 150.50,264.41 C141.61,264.31 137.21,262.71 128.50,256.45 C121.29,251.26 116.60,246.56 109.75,237.62 C94.69,217.97 89.42,196.87 94.04,174.74 C95.75,166.55 103.99,143.57 109.69,131.09 C110.13,130.13 109.94,129.92 109.09,130.44 C108.41,130.87 105.31,130.89 102.20,130.51 C97.49,129.92 95.99,129.21 93.21,126.26 L 89.87 122.72 L 81.18 124.43 C65.18,127.60 63.71,127.82 62.31,127.29 C58.24,125.73 65.08,122.94 81.27,119.57 L 90.03 117.74 L 94.01 109.62 C103.94,89.38 133.88,45.82 150.18,27.90 C154.48,23.18 158.00,18.56 158.00,17.65 C158.00,16.74 158.75,16.00 159.66,16.00 C160.57,16.00 163.61,14.23 166.41,12.07 C180.10,1.52 191.73,-0.65 203.08,5.25 C208.77,8.20 209.66,9.12 212.92,15.38 C216.23,21.74 216.53,23.03 216.84,32.45 C217.16,42.39 215.60,50.70 209.43,71.75 C208.88,73.60 210.74,72.69 219.64,66.75 C238.51,54.18 269.55,39.58 302.00,28.03 C311.62,24.60 319.93,21.39 320.45,20.90 C322.47,18.99 323.85,20.25 327.41,27.26 C333.05,38.37 333.76,44.64 331.50,63.39 C330.46,71.95 329.82,79.12 330.06,79.33 C330.30,79.54 335.00,79.09 340.50,78.34 C346.06,77.58 358.94,76.98 369.50,76.98 C400.44,76.99 408.00,78.18 408.00,83.02 C408.00,84.11 408.19,85.00 408.43,85.00 C408.82,85.00 411.95,82.13 422.11,72.45 C428.96,65.93 436.77,64.19 439.62,68.55 C440.99,70.64 441.19,72.69 440.71,80.08 L 440.13 89.07 L 446.81 84.36 C461.37,74.13 469.12,69.00 470.04,69.00 C473.51,69.00 468.07,74.84 462.49,77.09 C461.94,77.32 456.49,80.98 450.38,85.23 L 439.28 92.96 L 438.11 100.73 C437.46,105.00 436.68,110.19 436.38,112.25 C435.97,114.99 436.18,116.00 437.16,115.99 C440.80,115.97 455.45,111.77 456.41,110.47 C457.01,109.66 459.30,108.88 461.50,108.74 C464.93,108.54 465.54,108.81 465.81,110.65 C466.16,113.15 465.75,113.30 447.41,117.59 L 435.31 120.42 L 433.57 138.96 C432.62,149.16 431.67,158.62 431.47,160.00 C431.28,161.38 430.84,166.55 430.51,171.50 C428.09,207.86 424.27,222.73 414.96,232.04 C409.72,237.28 405.69,239.18 398.55,239.75 C389.44,240.48 379.90,237.31 371.33,230.69 C353.15,216.66 351.39,192.83 366.44,164.39 C371.23,155.34 371.69,154.00 370.01,154.00 C365.10,154.00 321.39,160.91 315.94,162.54 C314.88,162.86 313.99,165.36 313.14,170.43 C312.46,174.51 311.70,178.90 311.47,180.19 C310.55,185.29 306.90,214.08 305.96,223.69 C305.42,229.30 304.53,236.21 303.99,239.05 C303.45,241.90 302.32,251.49 301.48,260.36 C300.64,269.24 299.29,280.10 298.48,284.50 C296.60,294.80 293.00,322.21 293.00,326.24 C293.00,326.66 370.85,327.00 466.00,327.00 Z"
                                />
                            </svg>

                        </div>
                    </h1>

                    <TypewriterTagline />
                   

                    <div className="lp-hero-actions">
                        <button
                            className="lp-btn lp-btn--primary"
                            {...primaryBtn}
                        >
                            View my work
                        </button>
                        <button
                            className="lp-btn lp-btn--ghost"
                            onClick={onOpenPicker}
                            {...ghostBtn}
                        >
                            Change perspective
                        </button>
                    </div>

                    <footer className="lp-hero-footer">
                        <span>Laravel</span>
                        <span className="lp-sep">·</span>
                        <span>React</span>
                        <span className="lp-sep">·</span>
                        <span>TypeScript</span>
                        <span className="lp-sep">·</span>
                        <span>Inertia</span>
                    </footer>
                </div>

                {/* ── RIGHT: PHOTO ── */}
                <div className="lp-hero-right">
                    <div
                        className="lp-photo-blend"
                        style={{ transform: `scale(${zoomScale})` }}
                    >
                        <img
                            src="/portrait3.png"
                            alt="Airl Joriz Janoplo"
                            className="lp-portrait-img"
                        />
                        {/* Corner monogram */}
                        <div className="lp-photo-corner">
                            <div className="lp-corner-line" />
                            <span className="lp-corner-label">Au</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}