import { ExternalLink, Mail, Star } from 'lucide-react';
import type { ReactNode } from 'react';

import ProfileAvatar from '@/components/Portfolio/Shared/ProfileAvatar';
import type { ProfileData } from '@/components/Portfolio/types';

type FacebookPostSectionProps = {
    title: string;
    profile: ProfileData;
    initials: string;
    children: ReactNode;
};

export default function FacebookPostSection({
    title,
    profile,
    initials,
    children,
}: FacebookPostSectionProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                        <ProfileAvatar
                            avatarUrl={profile.facebookAvatarUrl}
                            name={profile.name}
                            initials={initials}
                            className="h-full w-full rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {profile.name}
                        </p>
                        <p className="text-xs text-slate-500">{title}</p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-full px-3 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
                >
                    ...
                </button>
            </div>

            {children}

            <div className="mt-5 border-t border-slate-200 pt-3">
                <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                    >
                        <Star className="h-4 w-4" />
                        Like
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                    >
                        <Mail className="h-4 w-4" />
                        Comment
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Share
                    </button>
                </div>
            </div>
        </section>
    );
}
