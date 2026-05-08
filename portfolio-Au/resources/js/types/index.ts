export type * from './auth';
export type * from './navigation';
export type * from './teams';
export type * from './ui';

import type { User } from './auth';  // add this

export type Role = 'guest' | 'recruiter' | 'developer';

export interface Auth {
    user: User | null;
    role: Role;
}