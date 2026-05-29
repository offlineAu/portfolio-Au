import { Form } from '@inertiajs/react';
import { Mail, MapPin, Users } from 'lucide-react';

import ProfileAvatar from '@/components/Portfolio/Shared/ProfileAvatar';
import ProfileLinks from '@/components/Portfolio/Shared/ProfileLinks';
import type { ProfileData, ProfileLink } from '@/components/Portfolio/types';

type GitHubSidebarProps = {
    profile: ProfileData;
    initials: string;
    profileLinks: ProfileLink[];
    canEditMedia: boolean;
};

export default function GitHubSidebar({
    profile,
    initials,
    profileLinks,
    canEditMedia,
}: GitHubSidebarProps) {
    return (
        <aside className="space-y-5">
            <section className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm">
                <div className="space-y-4">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#0d1117] bg-[#21262d] text-3xl font-semibold text-[#c9d1d9] shadow-[0_0_0_1px_rgba(48,54,61,1)]">
                        <ProfileAvatar
                            avatarUrl={profile.githubAvatarUrl}
                            name={profile.name}
                            initials={initials}
                            className="h-full w-full rounded-full"
                        />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight text-white">
                            {profile.name}
                        </h2>
                        <p className="text-base text-[#8b949e]">
                            {profile.username}
                        </p>
                    </div>

                    <p className="text-sm leading-6 text-[#c9d1d9]">
                        {profile.bio}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-[#8b949e]">
                        <span className="inline-flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="font-semibold text-[#c9d1d9]">
                                {profile.projects.length * 9}
                            </span>
                            followers
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="font-semibold text-[#c9d1d9]">
                                {profile.techStack.length * 3}
                            </span>
                            following
                        </span>
                    </div>

                    {profile.availability && (
                        <span className="inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                            {profile.availability}
                        </span>
                    )}

                    <div className="space-y-2 text-sm text-[#8b949e]">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{profile.email}</span>
                        </div>
                    </div>

                    <ProfileLinks links={profileLinks} mode="github" />

                    {canEditMedia ? (
                        <Form
                            action="/portfolio/media/github-avatar"
                            method="post"
                            encType="multipart/form-data"
                            className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3"
                        >
                            {({ processing, errors }) => (
                                <div className="space-y-2">
                                    <p className="text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase">
                                        Edit mode
                                    </p>
                                    <input
                                        type="file"
                                        name="github_avatar"
                                        accept="image/*"
                                        className="block w-full text-sm text-[#c9d1d9] file:mr-3 file:rounded-md file:border-0 file:bg-[#21262d] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#c9d1d9] hover:file:bg-[#30363d]"
                                    />
                                    <p className="text-xs text-[#8b949e]">
                                        JPG, PNG, or WEBP up to 5MB.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm font-medium text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white"
                                    >
                                        Update GitHub avatar
                                    </button>
                                    {errors.github_avatar && (
                                        <p className="text-sm text-red-400">
                                            {errors.github_avatar}
                                        </p>
                                    )}
                                </div>
                            )}
                        </Form>
                    ) : (
                        <p className="text-sm text-[#8b949e]">
                            Locked portfolio mode is active. Unlock editing to
                            update the GitHub avatar from this page.
                        </p>
                    )}
                </div>
            </section>

            <section className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-white">
                    Popular technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                    {profile.techStack.slice(0, 10).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1 text-xs font-medium text-[#c9d1d9]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}
