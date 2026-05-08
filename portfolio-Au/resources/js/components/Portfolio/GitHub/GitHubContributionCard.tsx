import type { ProfileData } from '@/components/Portfolio/types';

type GitHubContributionCardProps = {
    profile: ProfileData;
};

export default function GitHubContributionCard({
    profile,
}: GitHubContributionCardProps) {
    const totalContributions =
        profile.projects.length * 28 + profile.experience.length * 17;

    return (
        <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 transition-all duration-200">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Contribution activity
                    </h2>
                    <p className="text-sm text-[#8b949e]">
                        Last 12 months of portfolio momentum
                    </p>
                </div>
                <span className="text-sm text-[#8b949e]">
                    {totalContributions} contributions
                </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
                {Array.from({ length: 42 }).map((_, index) => (
                    <div
                        key={index}
                        className={`aspect-square rounded-sm transition-transform duration-200 hover:scale-105 ${
                            index % 5 === 0
                                ? 'bg-emerald-500'
                                : index % 4 === 0
                                  ? 'bg-emerald-400'
                                  : index % 3 === 0
                                    ? 'bg-emerald-700/80'
                                    : 'bg-[#21262d]'
                        }`}
                    />
                ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#8b949e]">
                <span>{profile.projects.length} featured repositories</span>
                <span>{profile.experience.length} experience entries</span>
                <span>{profile.currentFocus.length} active focus threads</span>
            </div>
        </section>
    );
}
