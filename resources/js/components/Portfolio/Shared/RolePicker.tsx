import { router } from '@inertiajs/react';
import { useRole } from '@/hooks/useRole';
import { type Role } from '@/types';

const roles: { value: Role; label: string; description: string }[] = [
    {
        value: 'guest',
        label: 'Guest',
        description: 'General overview of my work',
    },
    {
        value: 'recruiter',
        label: 'Recruiter',
        description: 'Experience, availability, and resume',
    },
    {
        value: 'developer',
        label: 'Developer',
        description: 'System design, APIs, and architecture',
    },
];

export default function RolePicker() {
    const currentRole = useRole();

    function selectRole(role: Role) {
        router.post('/role', { role }, { preserveScroll: true })
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-slate-500">
                Choose your perspective
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
                {roles.map((r) => (
                    <button
                        key={r.value}
                        onClick={() => selectRole(r.value)}
                        className={`flex flex-col gap-1 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                            currentRole === r.value
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                    >
                        <span className="text-sm font-semibold">
                            {r.label}
                        </span>
                        <span className="text-xs text-slate-500">
                            {r.description}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}