import React, { useState, useRef, useCallback } from 'react';

/* ════════════════════════════════════════════════════════════
   AVAILABILITY PING
   Drop-in replacement for .lp-avail-badge + .lp-hero-right-inner.
   On hover the badge expands into a micro-scheduler card.
════════════════════════════════════════════════════════════ */

const SLOTS = [
    { date: 'Jun 15', label: 'Discovery Chat',  avail: true  },
    { date: 'Jun 18', label: 'Technical Review', avail: true  },
    { date: 'Jun 20', label: 'Full Interview',   avail: false },
];

const CONTACT_HREF = 'mailto:janoplo.airljoriz@gmail.com?subject=Discovery%20Chat%20Request';

export function AvailabilityPing() {
    const [open,     setOpen]     = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEnter = useCallback(() => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setOpen(true);
    }, []);

    const handleLeave = useCallback(() => {
        leaveTimer.current = setTimeout(() => setOpen(false), 260);
    }, []);

    const handleSelect = useCallback((i: number) => {
        setSelected(i);
    }, []);

    return (
        <div
            className={`ap-root${open ? ' ap-root--open' : ''}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* ── COLLAPSED: the original badge ── */}
            <div className="ap-badge">
                <span className="ap-dot" aria-hidden />
                <span className="ap-badge__text">Available for work</span>
                <span className="ap-badge__chevron" aria-hidden>›</span>
            </div>

            {/* ── EXPANDED: micro-scheduler card ── */}
            <div className={`ap-card${open ? ' ap-card--visible' : ''}`} aria-hidden={!open}>
                <div className="ap-card__header">
                    <span className="ap-card__title">Book a slot</span>
                    <span className="ap-card__subtitle">Next availability</span>
                </div>

                <ul className="ap-slots" role="list">
                    {SLOTS.map((s, i) => (
                        <li
                            key={i}
                            className={[
                                'ap-slot',
                                !s.avail           ? 'ap-slot--taken'    : '',
                                selected === i      ? 'ap-slot--selected' : '',
                            ].join(' ')}
                            onClick={() => s.avail && handleSelect(i)}
                            role="button"
                            tabIndex={s.avail ? 0 : -1}
                            aria-disabled={!s.avail}
                            onKeyDown={(e) => e.key === 'Enter' && s.avail && handleSelect(i)}
                        >
                            <span className="ap-slot__indicator" aria-hidden />
                            <span className="ap-slot__date">{s.date}</span>
                            <span className="ap-slot__label">{s.label}</span>
                            {!s.avail && <span className="ap-slot__full">Full</span>}
                            {selected === i && <span className="ap-slot__check" aria-hidden>✓</span>}
                        </li>
                    ))}
                </ul>

                <a
                    href={CONTACT_HREF}
                    className={`ap-cta${selected !== null ? ' ap-cta--ready' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {selected !== null
                        ? `Book ${SLOTS[selected].date} →`
                        : 'Send a message →'}
                </a>

                <div className="ap-card__divider" />
                <p className="ap-card__note">
                    Usually replies within <em>24 hrs</em>
                </p>
            </div>
        </div>
    );
}