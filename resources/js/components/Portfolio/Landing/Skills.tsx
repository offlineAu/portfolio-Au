const skills = [
    { name: 'Laravel / PHP', pct: 90 },
    { name: 'React / TypeScript', pct: 87 },
    { name: 'Inertia.js', pct: 85 },
    { name: 'Tailwind CSS', pct: 92 },
    { name: 'MySQL / PostgreSQL', pct: 80 },
    { name: 'Git & CI/CD', pct: 83 },
];

const tags = [
    'Laravel', 'React', 'TypeScript', 'Inertia.js',
    'Tailwind', 'MySQL', 'PHP', 'REST APIs',
    'Vite', 'Docker', 'Linux', 'Figma',
];

export function Skills() {
    return (
        <section className="gv-section" id="s-skills">
            <div className="gv-section-num">02</div>
            <p className="gv-eyebrow gv-reveal gv-d1">What I work with</p>
            <h2
                className="gv-section-title gv-reveal gv-d2"
                style={{ maxWidth: 500 }}
            >
                Skills &amp; <span>stack</span>
            </h2>

            <div className="gv-skills-grid">
                {skills.map((skill, i) => {
                    const delay = Math.floor(i / 2) * 0.1 + (i % 2) * 0.05;
                    return (
                        <div
                            key={skill.name}
                            className="gv-skill-row gv-reveal"
                            style={{ transitionDelay: `${0.1 + delay}s` }}
                        >
                            <div className="gv-skill-name">
                                <span>{skill.name}</span>
                                <span className="gv-skill-pct">{skill.pct}%</span>
                            </div>
                            <div className="gv-skill-track">
                                <div
                                    className="gv-skill-bar"
                                    data-pct={skill.pct}
                                    style={{ width: 0 }}
                                >
                                    <div className="gv-skill-dot" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="gv-skill-tag-row gv-reveal gv-d6" style={{ marginTop: '2rem' }}>
                {tags.map((tag) => (
                    <span key={tag} className="gv-tag">{tag}</span>
                ))}
            </div>
        </section>
    );
}