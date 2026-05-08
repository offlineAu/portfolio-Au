import { Mail, MapPin, Users } from 'lucide-react';

import ProfileLinks from '@/components/Portfolio/Shared/ProfileLinks';
import type { ProfileData, ProfileLink } from '@/components/Portfolio/types';

type FacebookIntroProps = {
    profile: ProfileData;
    profileLinks: ProfileLink[];
};

export default function FacebookIntro({
    profile,
    profileLinks,
}: FacebookIntroProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300">
            <h2 className="mb-3 text-lg font-semibold">Intro</h2>

            <div className="space-y-3 text-sm leading-6 text-slate-600">
                <p>{profile.bio}</p>

                {profile.availability && (
                    <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                        {profile.availability}
                    </p>
                )}

                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Lives in {profile.location}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                        {profile.techStack.length + 12} profile highlights
                    </span>
                </div>
            </div>

            <div className="mt-5">
                <ProfileLinks links={profileLinks} mode="facebook" />
            </div>

            <div className="mt-5">
                <h3 className="mb-2 text-sm font-semibold">Featured skills</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.techStack.slice(0, 8).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="mt-5 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200"
            >
                Edit details
            </button>
        </section>
    );
}
