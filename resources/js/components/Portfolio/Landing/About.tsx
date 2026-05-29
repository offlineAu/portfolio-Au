export function About() {
    return (
        <section className="gv-section" id="s-about">
            <div className="gv-section-num">01</div>
            <div className="gv-about">
                <div>
                    <p className="gv-eyebrow gv-reveal gv-d1">About me</p>
                    <h2 className="gv-section-title gv-reveal gv-d2">
                        Crafting digital<br />
                        <span>experiences</span>
                    </h2>
                    <p className="gv-body-text gv-reveal gv-d3">
                        I'm a full-stack developer based in the Philippines,
                        specialising in building fast, accessible, and
                        thoughtfully designed web products using Laravel,
                        React, and TypeScript.
                    </p>
                    <p className="gv-body-text gv-reveal gv-d4">
                        Every project I ship balances clean architecture with
                        considered design — because good software should be a
                        pleasure to use and a pleasure to maintain.
                    </p>
                    <div className="gv-stat-row gv-reveal gv-d5">
                        <div className="gv-stat">
                            <span className="gv-stat-num" data-count="3">0</span>
                            <span className="gv-stat-label">Years exp.</span>
                        </div>
                        <div className="gv-stat">
                            <span className="gv-stat-num" data-count="18">0</span>
                            <span className="gv-stat-label">Projects shipped</span>
                        </div>
                        <div className="gv-stat">
                            <span className="gv-stat-num" data-count="100">0</span>
                            <span className="gv-stat-label" style={{ whiteSpace: 'nowrap' }}>
                                % remote-ready
                            </span>
                        </div>
                    </div>
                </div>

                {/* Self-drawing ring */}
                <div
                    className="gv-reveal-right gv-d2"
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <svg
                        className="gv-draw-ring"
                        viewBox="0 0 260 260"
                        aria-hidden="true"
                    >
                        <circle className="gv-ring-track" cx="130" cy="130" r="115" />
                        <circle
                            className="gv-ring-fill"
                            id="ring1"
                            cx="130"
                            cy="130"
                            r="115"
                            transform="rotate(-90 130 130)"
                            strokeDasharray="200 520"
                        />
                        <circle
                            className="gv-ring-fill"
                            id="ring2"
                            cx="130"
                            cy="130"
                            r="115"
                            transform="rotate(-90 130 130)"
                            style={{ stroke: '#e8c98e', opacity: 0.4 }}
                            strokeDasharray="0 720"
                        />
                        <circle fill="none" stroke="#141414" strokeWidth="0.5" cx="130" cy="130" r="95" />
                        <circle fill="none" stroke="#141414" strokeWidth="0.5" cx="130" cy="130" r="70" />
                        <text className="gv-ring-label" x="130" y="124" textAnchor="middle">FULL</text>
                        <text className="gv-ring-label" x="130" y="142" textAnchor="middle">STACK</text>
                        <text className="gv-ring-sub" x="130" y="160" textAnchor="middle">DEVELOPER</text>
                        <g stroke="#1e1e1e" strokeWidth="0.5">
                            <line x1="130" y1="15" x2="130" y2="22" />
                            <line x1="130" y1="238" x2="130" y2="245" />
                            <line x1="15" y1="130" x2="22" y2="130" />
                            <line x1="238" y1="130" x2="245" y2="130" />
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}