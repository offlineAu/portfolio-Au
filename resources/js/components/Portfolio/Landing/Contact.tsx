const contacts = [
    { platform: 'Email', value: 'airljorizjanoplo@email.com' },
    { platform: 'GitHub', value: 'github.com/airljoriz' },
    { platform: 'LinkedIn', value: 'linkedin.com/in/airljoriz' },
];

export function Contact() {
    return (
        <section className="gv-section" id="s-contact">
            <div className="gv-section-num">04</div>
            <div className="gv-contact-inner">
                <p className="gv-eyebrow gv-reveal gv-d1">Get in touch</p>
                <h2 className="gv-section-title gv-reveal gv-d2">
                    Let's build<br /><span>something</span>
                </h2>
                <p className="gv-body-text gv-reveal gv-d3">
                    Open to full-time roles, freelance projects, and
                    interesting conversations. Response within 24 hours.
                </p>
                <div className="gv-contact-links gv-reveal gv-d4">
                    {contacts.map((c) => (
                        <div key={c.platform} className="gv-contact-link">
                            <div className="gv-clink-left">
                                <span className="gv-clink-platform">{c.platform}</span>
                                <span className="gv-clink-value">{c.value}</span>
                            </div>
                            <span className="gv-clink-arrow">↗</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}