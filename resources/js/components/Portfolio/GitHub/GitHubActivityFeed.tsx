import { Sparkles } from 'lucide-react';

import type { ProfileData } from '@/components/Portfolio/types';

type GitHubActivityFeedProps = {
    profile: ProfileData;
};

export default function GitHubActivityFeed({
    profile,
}: GitHubActivityFeedProps) {
    const activityItems = [
        ...profile.currentFocus.slice(0, 2).map((focus) => ({
            title: focus,
            meta: 'Current focus',
        })),
        ...profile.experience.slice(0, 2).map((item) => ({
            title: `${item.role} at ${item.organization}`,
            meta: item.period,
        })),
    ];

    return (
        <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 transition-all duration-200">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Recent activity
                    </h2>
                    <p className="text-sm text-[#8b949e]">
                        Shipping notes, learning loops, and recent work
                    </p>
                </div>
                <Sparkles className="h-5 w-5 text-[#58a6ff]" />
            </div>

            <div className="space-y-3">
                {activityItems.map((item) => (
                    <article
                        key={`${item.meta}-${item.title}`}
                        className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4 transition-colors hover:border-[#58a6ff]/40"
                    >
                        <p className="text-sm font-medium text-white">
                            {item.title}
                        </p>
                        <p className="mt-1 text-xs tracking-[0.18em] text-[#8b949e] uppercase">
                            {item.meta}
                        </p>
                    </article>
                ))}

                {activityItems.length === 0 && (
                    <div className="space-y-3">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse rounded-xl border border-[#30363d] bg-[#0d1117] p-4"
                            >
                                <div className="h-4 w-2/3 rounded bg-[#21262d]" />
                                <div className="mt-3 h-3 w-1/3 rounded bg-[#21262d]" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
