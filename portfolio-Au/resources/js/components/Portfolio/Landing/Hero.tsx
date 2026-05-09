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

                    {/* Name block */}
                    <h1 className="lp-hero-name">
                        <div className="lp-name-outer" onMouseEnter={() => {}} onMouseLeave={() => {}}>

                            {/* Ambient monogram — glitches on loop */}
                            <span className="lp-name-ambient" aria-hidden="true">
                                <span className="lp-g-letter">A</span>
                                <span className="lp-g-letter lp-g-outline">u</span>
                            </span>

                            {/* Hover state — full name cascades in */}
                            <span className="lp-name-hover" aria-label="Airl Joriz Janoplo">
                                {'Airl Joriz Janoplo'.split('').map((ch, i) => (
                                    <span key={i} className="lp-r-letter" style={{ '--i': i } as React.CSSProperties}>
                                        {ch === ' ' ? '\u00A0' : ch}
                                    </span>
                                ))}
                            </span>

                            <div className="lp-name-underline" />
                        </div>
                    </h1>

                    <p className="lp-hero-tagline">
                        I build things for the web — fast, thoughtful, and
                        built to last.
                    </p>

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
                            src="/portrait2.png"
                            alt="Airl Joriz Janoplo"
                            className="lp-portrait-img"
                        />
                        {/* Corner monogram */}
                        <div className="lp-photo-corner">
                            <div className="lp-corner-line" />
                            <span className="lp-corner-label">AJJ</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}