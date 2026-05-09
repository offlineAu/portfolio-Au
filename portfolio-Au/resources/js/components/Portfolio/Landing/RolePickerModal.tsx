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

const roles: RoleOption[] = [
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
}

export function RolePickerModal({ open, current, onClose }: Props) {
    const [loading, setLoading] = useState<Role | null>(null);

    function selectRole(role: Role) {
        if (role === current) {
            onClose();
            return;
        }

        setLoading(role);

        router.post(
            '/role',
            { role },
            {
                preserveScroll: true,
                onFinish: () => {
                    setLoading(null);
                    onClose();
                },
            },
        );
    }

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="lp-backdrop"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="lp-modal" role="dialog" aria-modal="true" aria-labelledby="picker-title">
                <div className="lp-modal-inner">

                    <div className="lp-modal-header">
                        <p className="lp-modal-eyebrow">Perspective</p>
                        <h2 className="lp-modal-title" id="picker-title">
                            How are you visiting?
                        </h2>
                        <p className="lp-modal-sub">
                            Your choice shapes what you see.
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

                    <button
                        className="lp-modal-dismiss"
                        onClick={onClose}
                    >
                        continue without choosing
                    </button>

                </div>
            </div>
        </>
    );
}