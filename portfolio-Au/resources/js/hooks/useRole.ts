import { usePage } from '@inertiajs/react';
import type { Role } from '@/types';

interface PagePropsWithRole {
    auth: {
        role: Role;
    };
}

export function useRole(): Role {
    const props = usePage().props as unknown as PagePropsWithRole;
    return props.auth.role;
}

export function useIsGuest(): boolean {
    return useRole() === 'guest';
}

export function useIsRecruiter(): boolean {
    return useRole() === 'recruiter';
}

export function useIsDeveloper(): boolean {
    return useRole() === 'developer';
}