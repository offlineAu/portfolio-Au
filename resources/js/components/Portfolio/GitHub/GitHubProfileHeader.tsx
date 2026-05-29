import { BookOpen, FolderGit2, Link2 } from 'lucide-react';

import type { ProfileData } from '@/components/Portfolio/types';

type GitHubProfileHeaderProps = {
    profile: ProfileData;
    canEditMedia: boolean;
};

export default function GitHubProfileHeader({
    profile,
    canEditMedia,
}: GitHubProfileHeaderProps) {
    return (
        <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 transition-all duration-200">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold text-white">
                            {profile.name}
                        </h2>
                        <span className="rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1 text-xs font-medium text-[#8b949e]">
                            @{profile.username}
                        </span>
                        {canEditMedia && (
                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                Editing unlocked
                            </span>
                        )}
                    </div>

                    <p className="max-w-2xl text-sm leading-6 text-[#8b949e]">
                        {profile.aboutSummary}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-[#8b949e]">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1">
                            <BookOpen className="h-4 w-4" />
                            README profile
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1">
                            <FolderGit2 className="h-4 w-4" />
                            {profile.projects.length} repositories
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1">
                            <Link2 className="h-4 w-4" />
                            {profile.websiteUrl
                                ? 'Portfolio linked'
                                : 'No website linked'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-sm text-[#8b949e]">
                    <div className="rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3">
                        <p className="text-lg font-semibold text-white">
                            {profile.projects.length}
                        </p>
                        <p>Repositories</p>
                    </div>
                    <div className="rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3">
                        <p className="text-lg font-semibold text-white">
                            {profile.experience.length}
                        </p>
                        <p>Experience</p>
                    </div>
                    <div className="rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3">
                        <p className="text-lg font-semibold text-white">
                            {profile.techStack.length}
                        </p>
                        <p>Skills</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
