import { Camera, ImageIcon, Star } from 'lucide-react';

import ProfileAvatar from '@/components/Portfolio/Shared/ProfileAvatar';
import type { ProfileData } from '@/components/Portfolio/types';

type FacebookComposerProps = {
    profile: ProfileData;
    initials: string;
};

export default function FacebookComposer({
    profile,
    initials,
}: FacebookComposerProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    <ProfileAvatar
                        avatarUrl={profile.facebookAvatarUrl}
                        name={profile.name}
                        initials={initials}
                        className="h-full w-full rounded-full"
                    />
                </div>
                <div className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500">
                    What's on your mind, {profile.name.split(' ')[0]}?
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 pt-3 text-sm text-slate-600">
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                >
                    <Camera className="h-4 w-4 text-red-500" />
                    Live
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                >
                    <ImageIcon className="h-4 w-4 text-emerald-500" />
                    Photo
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
                >
                    <Star className="h-4 w-4 text-amber-500" />
                    Life event
                </button>
            </div>
        </section>
    );
}
