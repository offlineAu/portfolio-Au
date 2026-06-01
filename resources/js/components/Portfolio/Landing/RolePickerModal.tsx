import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { Role } from '@/types';

interface RoleOption {
    id: Role;
    label: string;
    emoji: string;
    description: string;
    hint: string;
}

// In RolePickerModal.tsx, change the LANDING_ROLES array:
const LANDING_ROLES: RoleOption[] = [
    {
        id: 'recruiter',
        label: "I'm Recruiting",
        emoji: '🔍',
        description: 'Show me experience and availability',
        hint: 'Resume, timeline, tech depth, and contact.',
    },
    {
        id: 'developer',
        label: 'Fellow Developer',
        emoji: '⚙️',
        description: 'Show me the system',
        hint: 'Architecture, APIs, security layer, and code.',
    },
];

const PORTFOLIO_ROLES: RoleOption[] = [
    {
        id: 'guest',
        label: 'Just Browsing',
        emoji: '👋',
        description: 'Show me the highlights',
        hint: 'Clean overview — portfolio, skills, contact.',
    },
    {
        id: 'recruiter',
        label: "I'm Recruiting",
        emoji: '🔍',
        description: 'Show me experience and availability',
        hint: 'Resume, timeline, tech depth, and contact.',
    },
    {
        id: 'developer',
        label: 'Fellow Developer',
        emoji: '⚙️',
        description: 'Show me the system',
        hint: 'Architecture, APIs, security layer, and code.',
    },
];

interface Props {
    open: boolean;
    current: Role;
    onClose: () => void;
    isLanding?: boolean;
}

export function RolePickerModal({ open, current, onClose, isLanding = false }: Props) {
    const [loading, setLoading] = useState<Role | null>(null);
    const roles = isLanding ? LANDING_ROLES : PORTFOLIO_ROLES;

    function selectRole(role: Role) {
        // On full portfolio, same role just closes
        if (!isLanding && role === current) {
            onClose();
            return;
        }

        setLoading(role);

        router.post(
            '/role',
            {
                role,
                redirect_to: isLanding ? 'portfolio' : 'back',
            },
            {
                preserveScroll: !isLanding,
                onFinish: () => {
                    setLoading(null);
                    if (!isLanding) onClose();
                    // On landing, Inertia follows the redirect to /portfolio
                },
            },
        );
    }

    if (!open) return null;

    return (
        <>
            <div className="lp-backdrop" onClick={onClose} aria-hidden="true" />

            <div className="lp-modal" role="dialog" aria-modal="true" aria-labelledby="picker-title">
                <div className="lp-modal-inner">

                    <div className="lp-modal-header">
                        <p className="lp-modal-eyebrow">Perspective</p>
                        <h2 className="lp-modal-title" id="picker-title">
                            {isLanding ? 'Who are you?' : 'Change perspective'}
                        </h2>
                        <p className="lp-modal-sub">
                            {isLanding
                                ? 'Opens the full portfolio tailored to you.'
                                : 'Your choice shapes what you see.'}
                        </p>
                    </div>

                    <div className="lp-role-list">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                className={[
                                    'lp-role-card',
                                    current === r.id ? 'lp-role-card--active' : '',
                                    loading === r.id ? 'lp-role-card--loading' : '',
                                ].join(' ')}
                                onClick={() => selectRole(r.id)}
                                disabled={loading !== null}
                            >
                                <span className="lp-role-emoji">{r.emoji}</span>
                                <span className="lp-role-text">
                                    <span className="lp-role-label">{r.label}</span>
                                    <span className="lp-role-desc">{r.description}</span>
                                    <span className="lp-role-hint">{r.hint}</span>
                                </span>
                                <span className="lp-role-arrow">→</span>
                            </button>
                        ))}
                    </div>

                    {/* Landing: no dismiss — they must pick to proceed */}
                    {!isLanding && (
                        <button className="lp-modal-dismiss" onClick={onClose}>
                            continue without choosing
                        </button>
                    )}

                    {/* Landing: subtle escape hatch */}
                    {isLanding && (
                        <button className="lp-modal-dismiss" onClick={onClose}>
                            just let me look around
                        </button>
                    )}

                </div>
            </div>
        </>
    );
}