import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import type { Role } from '@/types';

const roles: { id: Role; label: string; emoji: string; description: string; hint: string; }[] = [
    { id: 'guest', label: 'Just Browsing', emoji: '👋', description: 'Show me the highlights', hint: 'Clean overview — portfolio, skills, contact.' },
    { id: 'recruiter', label: "I'm Hiring", emoji: '🎯', description: "I'm looking for talent", hint: 'Resume, availability, tech stack, achievements.' },
    { id: 'developer', label: 'Fellow Dev', emoji: '⚡', description: 'Show me the deep cuts', hint: 'Architecture decisions, side projects, code.' },
];

export function RolePickerModal({ open, current, onClose }: { open: boolean; current: Role; onClose: () => void; }) {
    const [selecting, setSelecting] = useState<Role | null>(null);

    function pick(role: Role) {
        setSelecting(role);
        router.post('/role', { role }, {
            preserveScroll: true,
            onFinish: () => {
                setSelecting(null);
                onClose();
            },
        });
    }

    if (!open) return null;

    return (
        <>
            <div className="lp-backdrop" onClick={onClose} aria-hidden="true" />
            <div className="lp-modal" role="dialog" aria-modal="true">
                <div className="lp-modal-inner">
                    <div className="lp-modal-header">
                        <p className="lp-modal-eyebrow">Welcome</p>
                        <h2 className="lp-modal-title">How are you visiting today?</h2>
                        <p className="lp-modal-sub">The content adapts to what's most useful for you.</p>
                    </div>
                    <div className="lp-role-list">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                className={`lp-role-card ${current === r.id ? 'lp-role-card--active' : ''} ${selecting === r.id ? 'lp-role-card--loading' : ''}`}
                                onClick={() => pick(r.id)}
                                disabled={selecting !== null}
                            >
                                <span className="lp-role-emoji">{r.emoji}</span>
                                <span className="lp-role-text">
                                    <span className="lp-role-label">{r.label}</span>
                                    <span className="lp-role-desc">{r.description}</span>
                                    <span className="lp-role-hint">{r.hint}</span>
                                </span>
                                <span className="lp-role-arrow">{selecting === r.id ? '…' : '→'}</span>
                            </button>
                        ))}
                    </div>
                    <button className="lp-modal-dismiss" onClick={onClose}>
                        Continue as {current === 'guest' ? 'guest' : current} ↓
                    </button>
                </div>
            </div>
        </>
    );
}