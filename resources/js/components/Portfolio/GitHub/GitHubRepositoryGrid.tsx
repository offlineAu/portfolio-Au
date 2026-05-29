import { BookOpen, GitFork, LayoutGrid, Rows3, Star } from 'lucide-react';
import { useState } from 'react';

import type { GitHubRepoView, ProfileData } from '@/components/Portfolio/types';

type GitHubRepositoryGridProps = {
    profile: ProfileData;
};

export default function GitHubRepositoryGrid({
    profile,
}: GitHubRepositoryGridProps) {
    const [repoView, setRepoView] = useState<GitHubRepoView>('cards');

    return (
        <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 transition-all duration-200">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Repositories
                    </h2>
                    <p className="mt-1 text-sm text-[#8b949e]">
                        Pinned repositories and active work prepared for future
                        API sync.
                    </p>
                </div>

                <div className="inline-flex w-fit rounded-lg border border-[#30363d] bg-[#0d1117] p-1">
                    <button
                        type="button"
                        onClick={() => setRepoView('cards')}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                            repoView === 'cards'
                                ? 'bg-[#21262d] text-white'
                                : 'text-[#8b949e] hover:text-white'
                        }`}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        Cards
                    </button>
                    <button
                        type="button"
                        onClick={() => setRepoView('table')}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                            repoView === 'table'
                                ? 'bg-[#21262d] text-white'
                                : 'text-[#8b949e] hover:text-white'
                        }`}
                    >
                        <Rows3 className="h-4 w-4" />
                        Table
                    </button>
                </div>
            </div>

            {profile.projects.length === 0 ? (
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-xl border border-[#30363d] bg-[#0d1117] p-4"
                        >
                            <div className="h-4 w-1/3 rounded bg-[#21262d]" />
                            <div className="mt-3 h-3 w-11/12 rounded bg-[#21262d]" />
                            <div className="mt-2 h-3 w-8/12 rounded bg-[#21262d]" />
                        </div>
                    ))}
                </div>
            ) : repoView === 'table' ? (
                <div className="overflow-hidden rounded-xl border border-[#30363d]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#30363d] text-sm text-[#c9d1d9]">
                            <thead className="bg-[#0d1117] text-left text-xs tracking-[0.18em] text-[#8b949e] uppercase">
                                <tr>
                                    <th className="px-4 py-3">Repository</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Language</th>
                                    <th className="px-4 py-3">Stars</th>
                                    <th className="px-4 py-3">Forks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363d] bg-[#161b22]">
                                {profile.projects.map((project) => (
                                    <tr
                                        key={project.name}
                                        className="transition-colors hover:bg-[#0d1117]"
                                    >
                                        <td className="px-4 py-4 font-medium text-[#58a6ff]">
                                            {project.name}
                                        </td>
                                        <td className="px-4 py-4 text-[#8b949e]">
                                            {project.description}
                                        </td>
                                        <td className="px-4 py-4 text-[#8b949e]">
                                            {project.primaryLanguage ?? 'Mixed'}
                                        </td>
                                        <td className="px-4 py-4">
                                            {project.starsCount}
                                        </td>
                                        <td className="px-4 py-4">
                                            {project.forksCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                    {profile.projects.map((project) => (
                        <article
                            key={project.name}
                            className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#58a6ff]/40"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="inline-flex items-center gap-2 text-base font-semibold text-[#58a6ff]">
                                        <BookOpen className="h-4 w-4 text-[#8b949e]" />
                                        {project.name}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex shrink-0 gap-2">
                                    {project.sourceUrl && (
                                        <a
                                            href={project.sourceUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-md border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white"
                                        >
                                            Code
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-md border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white"
                                        >
                                            Live
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs text-[#8b949e]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#8b949e]">
                                {project.primaryLanguage && (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                        {project.primaryLanguage}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1.5">
                                    <Star className="h-3.5 w-3.5" />
                                    {project.starsCount}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <GitFork className="h-3.5 w-3.5" />
                                    {project.forksCount}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
