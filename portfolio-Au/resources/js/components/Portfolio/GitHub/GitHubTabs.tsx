import { BookOpen, FolderGit2, LayoutGrid, Star } from 'lucide-react';

import type { ProfileData } from '@/components/Portfolio/types';
import { getGitHubTabClass } from '@/components/Portfolio/utils';

type GitHubTabsProps = {
    profile: ProfileData;
};

export default function GitHubTabs({ profile }: GitHubTabsProps) {
    return (
        <div className="overflow-x-auto border-b border-[#30363d] pb-3">
            <nav className="flex min-w-max items-center gap-2">
                <button type="button" className={getGitHubTabClass(true)}>
                    <BookOpen className="h-4 w-4" />
                    Overview
                </button>
                <button type="button" className={getGitHubTabClass(false)}>
                    <FolderGit2 className="h-4 w-4" />
                    Repositories
                    <span className="rounded-full bg-[#30363d] px-2 py-0.5 text-xs text-[#c9d1d9]">
                        {profile.projects.length}
                    </span>
                </button>
                <button type="button" className={getGitHubTabClass(false)}>
                    <LayoutGrid className="h-4 w-4" />
                    Projects
                    <span className="rounded-full bg-[#30363d] px-2 py-0.5 text-xs text-[#c9d1d9]">
                        {Math.max(profile.projects.length - 1, 1)}
                    </span>
                </button>
                <button type="button" className={getGitHubTabClass(false)}>
                    <Star className="h-4 w-4" />
                    Stars
                </button>
            </nav>
        </div>
    );
}
