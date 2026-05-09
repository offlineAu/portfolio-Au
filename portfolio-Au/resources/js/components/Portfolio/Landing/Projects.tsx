import { useRef, useState } from 'react';

const projects = [
    {
        title: 'Airl Portfolio',
        desc: 'This very portfolio — scrollytelling, role-based content, cinematic hero.',
        tags: ['Laravel', 'Inertia', 'React'],
        bg: '#0d1117',
        accent: '#c8a96e',
        icon: '◈',
    },
    {
        title: 'E-commerce Platform',
        desc: 'Full-stack shop with real-time inventory, cart, and Stripe checkout.',
        tags: ['Laravel', 'React', 'Stripe'],
        bg: '#0d0d1a',
        accent: '#7c6aef',
        icon: '◉',
    },
    {
        title: 'Agri-Monitoring SaaS',
        desc: 'IoT dashboard for farm sensors with live chart updates and alerts.',
        tags: ['TypeScript', 'Charts', 'WebSocket'],
        bg: '#0d1a12',
        accent: '#4ade80',
        icon: '◎',
    },
    {
        title: 'CMS & Blog Engine',
        desc: 'Headless CMS with markdown support, role-based editor access.',
        tags: ['Laravel', 'REST', 'Vue'],
        bg: '#1a0d0d',
        accent: '#e87c6e',
        icon: '◐',
    },
];

export function Projects() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    function onMouseDown(e: React.MouseEvent) {
        setIsDragging(true);
        startX.current = e.pageX - (wrapRef.current?.offsetLeft ?? 0);
        scrollLeft.current = wrapRef.current?.scrollLeft ?? 0;
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!isDragging || !wrapRef.current) return;
        e.preventDefault();
        const x = e.pageX - (wrapRef.current.offsetLeft ?? 0);
        wrapRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
    }

    function onMouseUp() { setIsDragging(false); }

    return (
        <section className="gv-section" id="s-portfolio">
            <div className="gv-section-num">03</div>
            <p className="gv-eyebrow gv-reveal gv-d1">Selected work</p>
            <h2 className="gv-section-title gv-reveal gv-d2">
                Portfolio <span>highlights</span>
            </h2>
            <p
                className="gv-body-text gv-reveal gv-d3"
                style={{ maxWidth: 500, marginBottom: 0 }}
            >
                Drag or scroll to explore recent projects.
            </p>

            <div
                ref={wrapRef}
                className="gv-portfolio-scroll-wrap"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className="gv-portfolio-track">
                    {projects.map((p) => (
                        <div key={p.title} className="gv-project-card">
                            <div
                                className="gv-card-img"
                                style={{ background: p.bg }}
                            >
                                <div className="gv-card-img-inner">
                                    <svg
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                        aria-hidden="true"
                                    >
                                        <text
                                            x="50" y="62"
                                            textAnchor="middle"
                                            fontSize="52"
                                            fill={p.accent}
                                            opacity="0.25"
                                            fontFamily="serif"
                                        >
                                            {p.icon}
                                        </text>
                                        <circle cx="50" cy="50" r="30" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.2" />
                                        <circle cx="50" cy="50" r="45" fill="none" stroke={p.accent} strokeWidth="0.3" opacity="0.1" />
                                    </svg>
                                </div>
                            </div>
                            <div className="gv-card-body">
                                <div className="gv-card-tags">
                                    {p.tags.map((t) => (
                                        <span key={t} className="gv-card-tag">{t}</span>
                                    ))}
                                </div>
                                <div className="gv-card-title">{p.title}</div>
                                <div className="gv-card-desc">{p.desc}</div>
                            </div>
                            <div className="gv-card-cta">VIEW PROJECT ↗</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gv-scroll-hint gv-reveal gv-d4">
                <span>Scroll to explore</span>
                <span className="gv-scroll-arrow">→</span>
            </div>
        </section>
    );
}