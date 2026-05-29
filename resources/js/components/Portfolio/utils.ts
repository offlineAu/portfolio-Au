import type { FacebookTab, ProfileMode } from '@/components/Portfolio/types';

export function getSectionClassName(mode: ProfileMode) {
    if (mode === 'github') {
        return 'overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm transition-all duration-200';
    }

    return 'overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200';
}

export function getModeButtonClass(mode: ProfileMode, value: ProfileMode) {
    if (mode === value) {
        return value === 'github'
            ? 'rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-2 text-sm font-medium text-white transition-colors duration-200'
            : 'rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200';
    }

    return 'rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50';
}

export function getStyleActiveTab(activeTab: FacebookTab, tab: FacebookTab) {
    return activeTab === tab
        ? 'border-b-2 border-blue-600 pb-3 text-blue-600 transition-colors duration-200'
        : 'pb-3 text-slate-600 transition-colors duration-200 hover:text-slate-900';
}

export function getGitHubTabClass(active: boolean) {
    return active
        ? 'inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-medium text-white'
        : 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#c9d1d9]';
}

export function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}
