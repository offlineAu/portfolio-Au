import { useEffect, useRef, useState } from 'react';

const links = [
    { label: 'About',   href: '#s-about' },
    { label: 'Skills',  href: '#s-skills' },
    { label: 'Work',    href: '#s-portfolio' },
];

const sectionIds = ['s-about', 's-skills', 's-portfolio', 's-contact'];

export function Navbar() {
    const [active, setActive]     = useState('s-about');
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden]     = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        // Scroll-spy
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { threshold: 0.35 },
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });

        // Scroll direction + shrink
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            setHidden(y > lastY.current && y > 120);
            lastY.current = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* ── DESKTOP NAV ── */}
            <nav
                className={[
                    'gv-navbar',
                    scrolled ? 'gv-navbar--scrolled' : '',
                    hidden  ? 'gv-navbar--hidden'   : '',
                ].join(' ')}
                aria-label="Main navigation"
            >
                <div className="gv-nav-pill">
                    <button
                        className="gv-nav-logo"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Back to top"
                    >
                        Au<span>.</span>
                    </button>

                    {links.map((l) => {
                        const id = l.href.replace('#', '');
                        return (
                            <button
                                key={l.href}
                                className={`gv-nav-link${active === id ? ' active' : ''}`}
                                onClick={() => scrollTo(l.href)}
                            >
                                {l.label}
                                <span className="gv-nav-dot" aria-hidden="true" />
                            </button>
                        );
                    })}

                    <button
                        className="gv-nav-cta"
                        onClick={() => scrollTo('#s-contact')}
                    >
                        Hire me
                    </button>
                </div>
            </nav>

            {/* ── MOBILE BOTTOM TAB BAR ── */}
            <nav className="gv-mob-tabbar" aria-label="Mobile navigation">
                <div className="gv-mob-pill">
                    {links.map((l) => {
                        const id    = l.href.replace('#', '');
                        const isAct = active === id;
                        return (
                            <button
                                key={l.href}
                                className={`gv-mob-tab${isAct ? ' active' : ''}`}
                                onClick={() => scrollTo(l.href)}
                                aria-current={isAct ? 'page' : undefined}
                            >
                                <span className="gv-mob-icon" aria-hidden="true">
                                    {icon(l.label)}
                                </span>
                                {isAct && <span className="gv-mob-dot" aria-hidden="true" />}
                                <span className="gv-mob-label">{l.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

function icon(label: string) {
    switch (label) {
        case 'About':   return '◈';
        case 'Skills':  return '◎';
        case 'Work':    return '◉';
        case 'Contact': return '◐';
        default:        return '·';
    }
}