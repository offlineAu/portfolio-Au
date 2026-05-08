import React from 'react';

export function Hero({ onOpenPicker }: { onOpenPicker: () => void }) {
    return (
        <section className="lp-hero">
            <div className="lp-hero-noise" aria-hidden="true" />
            
            <header className="lp-hero-header">
                <span className="lp-hero-available">
                    <span className="lp-dot" />
                    Available for work
                </span>
            </header>

            {/* The wrapper now acts as a two-column grid */}
            <div className="lp-hero-wrapper">
                
                {/* ── Left Side: Name and Tagline ── */}
                <div className="lp-hero-text-side">
                    <p className="lp-hero-eyebrow">Full Stack Developer</p>

                    <h1 className="lp-hero-name">
                        <span className="lp-hero-first">Airl Joriz</span>
                        <span className="lp-hero-last">Janoplo</span>
                    </h1>

                    <p className="lp-hero-tagline">
                        I build things for the web — fast, thoughtful, and built to last.
                    </p>
                </div>

                {/* ── Right Side: Portrait ── */}
                <div className="lp-hero-photo-side">
                    <div className="lp-hero-photo-blend">
                        <img 
                            src="/portrait.png" 
                            alt="Airl Joriz Janoplo" 
                            className="lp-hero-portrait-img"
                        />
                    </div>
                </div>

                {/* ── Bottom Row: Buttons ── */}
                <div className="lp-hero-actions-row">
                    <div className="lp-hero-actions">
                        <button className="lp-btn lp-btn--primary">
                            View my work
                        </button>
                        <button
                            className="lp-btn lp-btn--ghost"
                            onClick={onOpenPicker}
                        >
                            Change perspective
                        </button>
                    </div>
                </div>
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
        </section>
    );
}