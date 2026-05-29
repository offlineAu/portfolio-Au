import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CinematicPortrait, FloatingStats } from '@/components/Portfolio/Landing/CinematicPortrait';

const TECH_STACK = [
    { name: 'Laravel',  logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
    { name: 'React',    logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Inertia',  logo: 'https://cdn.simpleicons.org/inertia/9553E9' },
    { name: 'PHP',      logo: 'https://cdn.simpleicons.org/php/777BB4' },
    { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'Vite',     logo: 'https://cdn.simpleicons.org/vite/646CFF' },
];

function TechCarousel() {
    const items = [...TECH_STACK, ...TECH_STACK];
    return (
        <div className="lp-carousel-wrap lp-carousel-wrap--inline">
            <div className="lp-carousel-track">
                {items.map((tech, i) => (
                    <div key={`${tech.name}-${i}`} className="lp-carousel-item">
                        <img src={tech.logo} alt={tech.name} className="lp-carousel-logo" loading="lazy" />
                        <span className="lp-carousel-name">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

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
    const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
    return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function TypewriterTagline() {
    const text = "I design and build website rapidly with the help of AI. I have trained and use Hugging Face models for Sentiment Analysis.";
    const [displayed, setDisplayed] = React.useState('');
    const [started, setStarted] = React.useState(false);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
        const t = setTimeout(() => setStarted(true), 900);
        return () => clearTimeout(t);
    }, []);

    React.useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) { setDone(true); return; }
        const char = text[displayed.length];
        const delay = char === '—' ? 180 : char === ',' || char === '.' ? 130 : 45 + Math.random() * 30;
        const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), delay);
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

interface HeroProps {
    onOpenPicker: () => void;
    scrollY: number;
    isLanding?: boolean;
}

export function Hero({ onOpenPicker, scrollY, isLanding = false }: HeroProps) {
    const parallaxTranslate = scrollY * 0.06;
    const primaryBtn = useMagnetic();
    const ghostBtn   = useMagnetic();

    const [isPortraitDeepHovered, setIsPortraitDeepHovered] = useState(false);
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handlePortraitEnter = useCallback(() => {
        hoverTimerRef.current = setTimeout(() => setIsPortraitDeepHovered(true), 2000);
    }, []);
    const handlePortraitLeave = useCallback(() => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        setIsPortraitDeepHovered(false);
    }, []);

    useEffect(() => {
        if (isPortraitDeepHovered) {
            document.body.classList.add('hero-dof-active');
        } else {
            document.body.classList.remove('hero-dof-active');
        }
        return () => document.body.classList.remove('hero-dof-active');
    }, [isPortraitDeepHovered]);

    return (
        <section className="lp-hero">
            <div className="lp-hero-noise" />

            <div className="lp-hero-body">

                {/* ── LEFT ── */}
                <div className="lp-hero-left">
                    <div
                        className="lp-hero-left-inner"
                        style={{ transform: `translateY(-${parallaxTranslate}px)` }}
                    >
                        <div className="lp-identity-block">
                            <p className="lp-greeting">Hey There,</p>
                            <p className="lp-iam">I am</p>
                            <h1 className="lp-hero-name">
                                {'Airl'.split('').map((ch, i) => (
                                    <span
                                        key={i}
                                        className="lp-r-letter lp-r-letter--visible"
                                        style={{ '--i': i } as React.CSSProperties}
                                    >
                                        {ch}
                                    </span>
                                ))}
                            </h1>
                            <TypewriterTagline />
                        </div>

                        <div className="lp-hero-actions">
                            {isLanding ? (
                                <>
                                    <button
                                        className="lp-btn lp-btn--primary"
                                        {...primaryBtn}
                                        onClick={onOpenPicker}
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
                                </>
                            ) : (
                                <>
                                    <button
                                        className="lp-btn lp-btn--primary"
                                        {...primaryBtn}
                                        onClick={() =>
                                            document
                                                .querySelector('#s-portfolio')
                                                ?.scrollIntoView({ behavior: 'smooth' })
                                        }
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
                                </>
                            )}
                        </div>

                        <div className="lp-left-carousel-wrapper">
                            <p className="lp-carousel-label">Built with</p>
                            <TechCarousel />
                        </div>
                    </div>
                </div>

                {/* ── CENTER: PORTRAIT ──
                    lp-hero-center is display:flex + justify-content:center.
                    CinematicPortrait renders cp-wrapper (display:flex),
                    which is the direct flex child — centering now works.
                ── */}
                <div
                    className="lp-hero-center"
                    onMouseEnter={handlePortraitEnter}
                    onMouseLeave={handlePortraitLeave}
                >
                    <CinematicPortrait />
                </div>

                {/* ── RIGHT: HOLOGRAPHIC STATS ── */}
                <div className="lp-hero-right">
                    <div className="lp-avail-badge">
                        <span className="lp-dot" />
                        <span>Available for work</span>
                    </div>
                    <div className="lp-hero-right-inner">
                        <FloatingStats isPortraitHovered={isPortraitDeepHovered} />
                    </div>
                </div>
            </div>
        </section>
    );
}