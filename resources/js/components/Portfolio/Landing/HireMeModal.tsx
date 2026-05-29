import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

/* ── ENV CREDENTIALS (set these in your .env file) ──────────
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
─────────────────────────────────────────────────────────── */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

/* ── YOUR CONTACT DETAILS ── */
const YOUR_EMAIL  = 'janoplo.airljoriz@gmail.com';        // ← replace
const YOUR_PHONE  = '+63 916 669 3799';      // ← replace
const YOUR_GITHUB = 'github.com/offlineAu';  // ← replace

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface HireMeModalProps {
    open: boolean;
    onClose: () => void;
}

export function HireMeModal({ open, onClose }: HireMeModalProps) {
    const [name,    setName]    = useState('');
    const [email,   setEmail]   = useState('');
    const [message, setMessage] = useState('');
    const [status,  setStatus]  = useState<Status>('idle');
    const backdropRef = useRef<HTMLDivElement>(null);

    /* ── close on Escape ── */
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    /* ── reset form on open ── */
    useEffect(() => {
        if (open) {
            setName(''); setEmail(''); setMessage(''); setStatus('idle');
        }
    }, [open]);

    /* ── lock body scroll ── */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    /* ── send email via EmailJS ── */
    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || !message.trim()) return;

        // Guard: warn if env vars are missing (dev experience)
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error(
                '[HireMeModal] Missing EmailJS env vars.\n' +
                'Make sure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, ' +
                'and VITE_EMAILJS_PUBLIC_KEY are set in your .env file.'
            );
            setStatus('error');
            return;
        }

        setStatus('sending');

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name:  name.trim(),
                    from_email: email.trim(),
                    message:    message.trim(),
                    /* Optional: include reply-to so you can reply directly */
                    reply_to:   email.trim(),
                },
                PUBLIC_KEY,
            );
            setStatus('sent');
        } catch (err) {
            console.error('[HireMeModal] EmailJS send failed:', err);
            setStatus('error');
        }
    };

    /* ── backdrop click to close ── */
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === backdropRef.current) onClose();
    };

    if (!open) return null;

    return (
        <div ref={backdropRef} className="hm-backdrop" onClick={handleBackdropClick}>
            <div
                className={`hm-modal${open ? ' hm-modal--visible' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Hire Me"
            >
                {/* ── DECORATIVE CORNERS ── */}
                <span className="hm-corner hm-corner--tl" />
                <span className="hm-corner hm-corner--tr" />
                <span className="hm-corner hm-corner--bl" />
                <span className="hm-corner hm-corner--br" />

                {/* ── SCAN LINE ── */}
                <div className="hm-scan-line" aria-hidden />

                {/* ── HEADER ── */}
                <div className="hm-header">
                    <div className="hm-header__left">
                        <span className="hm-header__dot" />
                        <span className="hm-header__badge">◈ OPEN TO WORK</span>
                    </div>
                    <button className="hm-close" onClick={onClose} aria-label="Close modal">
                        <span /><span />
                    </button>
                </div>

                {/* ── BODY ── */}
                <div className="hm-body">

                    {/* LEFT: INFO */}
                    <div className="hm-info">
                        <div className="hm-info__eyebrow">CONTACT</div>
                        <h2 className="hm-info__title">
                            Let's build<br />something<br /><em>great.</em>
                        </h2>
                        <p className="hm-info__sub">
                            Available for freelance projects, full-time roles, and AI-integrated web builds.
                        </p>

                        <div className="hm-divider" />

                        <ul className="hm-contact-list">
                            <li>
                                <a href={`mailto:${YOUR_EMAIL}`} className="hm-contact-item">
                                    <span className="hm-contact-item__icon" aria-hidden>✉</span>
                                    <div className="hm-contact-item__body">
                                        <span className="hm-contact-item__label">Email</span>
                                        <span className="hm-contact-item__value">{YOUR_EMAIL}</span>
                                    </div>
                                    <span className="hm-contact-item__arrow">↗</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${YOUR_PHONE.replace(/\s/g,'')}`} className="hm-contact-item">
                                    <span className="hm-contact-item__icon" aria-hidden>☎</span>
                                    <div className="hm-contact-item__body">
                                        <span className="hm-contact-item__label">Phone</span>
                                        <span className="hm-contact-item__value">{YOUR_PHONE}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`https://${YOUR_GITHUB}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hm-contact-item"
                                >
                                    <span className="hm-contact-item__icon" aria-hidden>⬡</span>
                                    <div className="hm-contact-item__body">
                                        <span className="hm-contact-item__label">GitHub</span>
                                        <span className="hm-contact-item__value">{YOUR_GITHUB}</span>
                                    </div>
                                    <span className="hm-contact-item__arrow">↗</span>
                                </a>
                            </li>
                        </ul>

                        <div className="hm-availability">
                            <span className="hm-availability__dot" />
                            <span className="hm-availability__text">Usually responds within 24 hours</span>
                        </div>
                    </div>

                    {/* RIGHT: FORM */}
                    <div className="hm-form">
                        {status === 'sent' ? (
                            /* ── SUCCESS STATE ── */
                            <div className="hm-success">
                                <div className="hm-success__ring">
                                    <span className="hm-success__icon">✦</span>
                                </div>
                                <h3 className="hm-success__title">Message Sent</h3>
                                <p className="hm-success__sub">
                                    Thanks {name.split(' ')[0]}!<br />I'll get back to you soon.
                                </p>
                                <button className="hm-btn hm-btn--ghost" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        ) : (
                            /* ── FORM FIELDS ── */
                            <>
                                <div className="hm-form__heading">Send a message</div>

                                <div className="hm-field">
                                    <label className="hm-label" htmlFor="hm-name">Your Name</label>
                                    <input
                                        id="hm-name"
                                        className="hm-input"
                                        type="text"
                                        placeholder="Juan dela Cruz"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        disabled={status === 'sending'}
                                        autoComplete="name"
                                    />
                                </div>

                                <div className="hm-field">
                                    <label className="hm-label" htmlFor="hm-email">Email Address</label>
                                    <input
                                        id="hm-email"
                                        className="hm-input"
                                        type="email"
                                        placeholder="juan@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={status === 'sending'}
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="hm-field">
                                    <label className="hm-label" htmlFor="hm-message">Message</label>
                                    <textarea
                                        id="hm-message"
                                        className="hm-input hm-input--textarea"
                                        placeholder="Tell me about your project or opportunity..."
                                        rows={4}
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        disabled={status === 'sending'}
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="hm-error" role="alert">
                                        ⚠ Something went wrong. Try again or email me directly.
                                    </p>
                                )}

                                <button
                                    className={`hm-btn hm-btn--primary${status === 'sending' ? ' hm-btn--loading' : ''}`}
                                    onClick={handleSubmit}
                                    disabled={
                                        status === 'sending' ||
                                        !name.trim() ||
                                        !email.trim() ||
                                        !message.trim()
                                    }
                                >
                                    {status === 'sending' ? (
                                        <span className="hm-btn__spinner" />
                                    ) : (
                                        <>Send Message <span className="hm-btn__arrow">↗</span></>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}