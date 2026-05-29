import { Form, Head } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    Camera,
    ExternalLink,
    Facebook,
    GitFork,
    Github,
    Globe,
    Linkedin,
    Lock,
    Mail,
    Menu,
    Search,
    Sparkles,
    Star,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import FacebookComposer from '@/components/Portfolio/Facebook/FacebookComposer';
import FacebookCoverSection from '@/components/Portfolio/Facebook/FacebookCoverSection';
import FacebookIntro from '@/components/Portfolio/Facebook/FacebookIntro';
import FacebookPostSection from '@/components/Portfolio/Facebook/FacebookPostSection';
import FacebookTabs from '@/components/Portfolio/Facebook/FacebookTabs';
import GitHubActivityFeed from '@/components/Portfolio/GitHub/GitHubActivityFeed';
import GitHubContributionCard from '@/components/Portfolio/GitHub/GitHubContributionCard';
import GitHubProfileHeader from '@/components/Portfolio/GitHub/GitHubProfileHeader';
import GitHubRepositoryGrid from '@/components/Portfolio/GitHub/GitHubRepositoryGrid';
import GitHubSidebar from '@/components/Portfolio/GitHub/GitHubSidebar';
import GitHubTabs from '@/components/Portfolio/GitHub/GitHubTabs';
import UnlockModal from '@/components/Portfolio/Shared/UnlockModal';
import type {
    FacebookTab,
    PortfolioPageProps,
    ProfileLink,
    ProfileMode,
} from '@/components/Portfolio/types';
import { getInitials, getSectionClassName } from '@/components/Portfolio/utils';

export default function Show({
    pageTitle,
    profile,
    canEditMedia,
}: PortfolioPageProps) {
    const [mode, setMode] = useState<ProfileMode>('github');
    const [activeTab, setActiveTab] = useState<FacebookTab>('about');
    const [isGitHubSidebarOpen, setIsGitHubSidebarOpen] = useState(false);
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
    const [platformModal, setPlatformModal] = useState<ProfileMode | null>(
        null,
    );

    const initials = getInitials(profile.name);
    const profileLinks: ProfileLink[] = [];

    if (profile.websiteUrl) {
        profileLinks.push({
            label: 'Website',
            href: profile.websiteUrl,
            icon: Globe,
        });
    }

    if (mode === 'facebook') {
        profileLinks.push({
            label: 'GitHub',
            icon: Github,
            onClick: () => setPlatformModal('github'),
        });
    }

    if (profile.linkedinUrl) {
        profileLinks.push({
            label: 'LinkedIn',
            href: profile.linkedinUrl,
            icon: Linkedin,
        });
    }

    if (profile.resumeUrl) {
        profileLinks.push({
            label: 'Resume',
            href: profile.resumeUrl,
            icon: ExternalLink,
        });
    }

    if (mode === 'github') {
        profileLinks.push({
            label: 'Facebook',
            icon: Facebook,
            onClick: () => setPlatformModal('facebook'),
        });
    }

    useEffect(() => {
        if (canEditMedia) {
            setIsUnlockModalOpen(false);
        }
    }, [canEditMedia]);

    useEffect(() => {
        setIsGitHubSidebarOpen(false);
    }, [mode]);

    const handleSwitchMode = (targetMode: ProfileMode) => {
        setPlatformModal(null);

        if (targetMode === 'facebook') {
            setMode('facebook');
            setActiveTab('about');

            return;
        }

        setMode('github');
    };

    return (
        <>
            <Head title={pageTitle} />

            <div
                className={`min-h-screen overflow-x-hidden text-slate-900 ${
                    mode === 'github' ? 'bg-[#0d1117]' : 'bg-[#f0f2f5]'
                }`}
            >
                {mode === 'github' && (
                    <header className="sticky top-0 z-40 border-b border-[#30363d] bg-[#010409]/95 backdrop-blur">
                        <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsGitHubSidebarOpen((value) => !value)
                                }
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#30363d] text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white lg:hidden"
                                aria-label={
                                    isGitHubSidebarOpen
                                        ? 'Close sidebar'
                                        : 'Open sidebar'
                                }
                            >
                                {isGitHubSidebarOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>

                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#0d1117]">
                                    <Github className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">
                                        {profile.username}
                                    </p>
                                    <p className="truncate text-xs text-[#8b949e]">
                                        Developer portfolio in GitHub mode
                                    </p>
                                </div>
                            </div>

                            <div className="hidden flex-1 items-center justify-center lg:flex">
                                <div className="flex w-full max-w-xl items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#8b949e]">
                                    <Search className="h-4 w-4" />
                                    <span>
                                        Search repositories, projects, and notes
                                    </span>
                                </div>
                            </div>

                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    type="button"
                                    className="hidden h-10 w-10 items-center justify-center rounded-md border border-[#30363d] text-[#8b949e] transition-colors hover:border-[#58a6ff] hover:text-white sm:inline-flex"
                                    aria-label="Notifications"
                                >
                                    <Bell className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPlatformModal('facebook')}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 text-sm font-medium text-[#8b949e] transition-colors hover:border-[#58a6ff] hover:text-white"
                                >
                                    <Facebook className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Facebook
                                    </span>
                                </button>

                                {canEditMedia ? (
                                    <Form
                                        action="/portfolio/lock"
                                        method="post"
                                    >
                                        {({ processing }) => (
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex items-center gap-2 rounded-md border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
                                            >
                                                <Sparkles className="h-4 w-4" />
                                                Editing unlocked
                                            </button>
                                        )}
                                    </Form>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsUnlockModalOpen(true)
                                        }
                                        className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm font-medium text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white"
                                    >
                                        <Lock className="h-4 w-4" />
                                        Unlock editing
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>
                )}

                <UnlockModal
                    isOpen={isUnlockModalOpen}
                    mode={mode}
                    onClose={() => setIsUnlockModalOpen(false)}
                />

                {platformModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                        <div
                            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
                                platformModal === 'github'
                                    ? 'border-[#30363d] bg-[#161b22] text-[#c9d1d9]'
                                    : 'border-slate-200 bg-white text-slate-900'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p
                                        className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                                            platformModal === 'github'
                                                ? 'text-[#58a6ff]'
                                                : 'text-blue-600'
                                        }`}
                                    >
                                        Platform switch
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold">
                                        {platformModal === 'github'
                                            ? 'Open GitHub'
                                            : 'Open Facebook'}
                                    </h2>
                                    <p
                                        className={`mt-3 text-sm leading-6 ${
                                            platformModal === 'github'
                                                ? 'text-[#8b949e]'
                                                : 'text-slate-600'
                                        }`}
                                    >
                                        Choose whether you want to open the
                                        clone inside this portfolio or visit the
                                        real profile.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPlatformModal(null)}
                                    className={`rounded-md p-2 transition-colors ${
                                        platformModal === 'github'
                                            ? 'text-[#8b949e] hover:bg-[#21262d] hover:text-white'
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSwitchMode(platformModal)
                                    }
                                    className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                        platformModal === 'github'
                                            ? 'bg-[#21262d] text-white hover:bg-[#30363d]'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {platformModal === 'github'
                                        ? 'Open GitHub clone'
                                        : 'Open Facebook mode'}
                                </button>

                                {platformModal === 'github' &&
                                profile.githubUrl ? (
                                    <a
                                        href={profile.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#30363d] px-4 py-3 text-sm font-medium text-[#c9d1d9] transition-colors hover:border-[#58a6ff] hover:text-white"
                                    >
                                        <Github className="h-4 w-4" />
                                        Visit actual GitHub
                                    </a>
                                ) : platformModal === 'facebook' &&
                                  profile.facebookUrl ? (
                                    <a
                                        href={profile.facebookUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                    >
                                        <Facebook className="h-4 w-4" />
                                        Visit actual Facebook
                                    </a>
                                ) : (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        {platformModal === 'facebook'
                                            ? 'Actual Facebook profile link is not configured yet. Facebook mode is still available inside the portfolio.'
                                            : 'Actual GitHub link is not configured yet. GitHub clone is still available inside the portfolio.'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'github' && isGitHubSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                        onClick={() => setIsGitHubSidebarOpen(false)}
                    />
                )}

                <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
                    {mode === 'facebook' && (
                        <>
                            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {pageTitle}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Social profile view
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPlatformModal('github')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </button>
                            </div>

                            <FacebookCoverSection
                                profile={profile}
                                initials={initials}
                                canEditMedia={canEditMedia}
                            >
                                <FacebookTabs
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            </FacebookCoverSection>
                        </>
                    )}

                    <div
                        className={
                            mode === 'github'
                                ? 'grid min-h-[calc(100vh-12rem)] gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'
                                : 'grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'
                        }
                    >
                        {mode === 'github' && (
                            <>
                                <div className="hidden lg:block">
                                    <GitHubSidebar
                                        profile={profile}
                                        initials={initials}
                                        profileLinks={profileLinks}
                                        canEditMedia={canEditMedia}
                                    />
                                </div>

                                <aside
                                    className={`fixed inset-y-0 left-0 z-40 w-[320px] max-w-[85vw] overflow-y-auto border-r border-[#30363d] bg-[#0d1117] p-4 transition-transform duration-300 lg:hidden ${
                                        isGitHubSidebarOpen
                                            ? 'translate-x-0'
                                            : '-translate-x-full'
                                    }`}
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <p className="text-sm font-semibold tracking-[0.18em] text-[#8b949e] uppercase">
                                            Profile panel
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsGitHubSidebarOpen(false)
                                            }
                                            className="rounded-md border border-[#30363d] p-2 text-[#8b949e] transition-colors hover:text-white"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <GitHubSidebar
                                        profile={profile}
                                        initials={initials}
                                        profileLinks={profileLinks}
                                        canEditMedia={canEditMedia}
                                    />
                                </aside>
                            </>
                        )}

                        {mode === 'facebook' && (
                            <FacebookIntro
                                profile={profile}
                                profileLinks={profileLinks}
                            />
                        )}

                        <main
                            className={`min-w-0 ${
                                mode === 'github' ? 'space-y-6' : 'space-y-4'
                            }`}
                        >
                            {mode === 'github' && (
                                <GitHubProfileHeader
                                    profile={profile}
                                    canEditMedia={canEditMedia}
                                />
                            )}
                            {mode === 'github' && (
                                <GitHubTabs profile={profile} />
                            )}
                            {mode === 'github' && (
                                <GitHubContributionCard profile={profile} />
                            )}
                            {mode === 'github' && (
                                <GitHubActivityFeed profile={profile} />
                            )}
                            {mode === 'facebook' && (
                                <FacebookComposer
                                    profile={profile}
                                    initials={initials}
                                />
                            )}

                            {(mode === 'github' || activeTab === 'about') &&
                                (mode === 'github' ? (
                                    <section
                                        className={getSectionClassName(mode)}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold text-white">
                                            README.md
                                        </h2>
                                        <p className="mb-4 text-sm text-[#8b949e]">
                                            A developer-style overview pinned at
                                            the top of the profile.
                                        </p>

                                        <h3 className="mb-2 text-base font-semibold text-white">
                                            {profile.aboutHeading}
                                        </h3>
                                        <p className="text-sm leading-6 text-[#8b949e]">
                                            {profile.aboutSummary}
                                        </p>
                                        <ul className="mt-4 space-y-3">
                                            {profile.aboutPoints.map(
                                                (point) => (
                                                    <li
                                                        key={point}
                                                        className="rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm text-[#c9d1d9]"
                                                    >
                                                        {point}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </section>
                                ) : (
                                    <FacebookPostSection
                                        title="About"
                                        profile={profile}
                                        initials={initials}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold">
                                            About
                                        </h2>
                                        <h3 className="mb-2 text-base font-semibold text-slate-900">
                                            {profile.aboutHeading}
                                        </h3>
                                        <p className="text-sm leading-6 text-slate-600">
                                            {profile.aboutSummary}
                                        </p>
                                        <ul className="mt-4 space-y-3">
                                            {profile.aboutPoints.map(
                                                (point) => (
                                                    <li
                                                        key={point}
                                                        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                                                    >
                                                        {point}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </FacebookPostSection>
                                ))}

                            {(mode === 'github' ||
                                activeTab === 'experience') &&
                                (mode === 'github' ? (
                                    <section
                                        className={getSectionClassName(mode)}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold text-white">
                                            Experience
                                        </h2>
                                        <p className="mb-4 text-sm text-[#8b949e]">
                                            Roles, collaborations, and shipped
                                            work.
                                        </p>

                                        <div className="space-y-3">
                                            {profile.experience.map((item) => (
                                                <article
                                                    key={`${item.organization}-${item.role}`}
                                                    className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4 transition-shadow duration-200 hover:border-[#58a6ff]/40"
                                                >
                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-white">
                                                                {item.role}
                                                            </h3>
                                                            <p className="text-sm text-[#8b949e]">
                                                                {
                                                                    item.organization
                                                                }
                                                            </p>
                                                        </div>
                                                        <p className="text-sm text-[#8b949e]">
                                                            {item.period}
                                                        </p>
                                                    </div>

                                                    <ul className="mt-3 space-y-2 text-sm text-[#c9d1d9]">
                                                        {item.details.map(
                                                            (detail) => (
                                                                <li
                                                                    key={detail}
                                                                    className="leading-6"
                                                                >
                                                                    {detail}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ) : (
                                    <FacebookPostSection
                                        title="Experience"
                                        profile={profile}
                                        initials={initials}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold">
                                            Experience
                                        </h2>
                                        <p className="mb-4 text-sm text-slate-500">
                                            Roles, collaborations, and shipped
                                            work.
                                        </p>

                                        <div className="space-y-3">
                                            {profile.experience.map((item) => (
                                                <article
                                                    key={`${item.organization}-${item.role}`}
                                                    className="rounded-lg border border-slate-200 p-4 transition-shadow duration-200 hover:shadow-sm"
                                                >
                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">
                                                                {item.role}
                                                            </h3>
                                                            <p className="text-sm text-slate-600">
                                                                {
                                                                    item.organization
                                                                }
                                                            </p>
                                                        </div>
                                                        <p className="text-sm text-slate-500">
                                                            {item.period}
                                                        </p>
                                                    </div>

                                                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                                        {item.details.map(
                                                            (detail) => (
                                                                <li
                                                                    key={detail}
                                                                    className="leading-6"
                                                                >
                                                                    {detail}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </article>
                                            ))}
                                        </div>
                                    </FacebookPostSection>
                                ))}

                            {(mode === 'github' || activeTab === 'projects') &&
                                (mode === 'github' ? (
                                    <GitHubRepositoryGrid profile={profile} />
                                ) : (
                                    <FacebookPostSection
                                        title="Highlighted projects"
                                        profile={profile}
                                        initials={initials}
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    Highlighted projects
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Featured work adapted into a
                                                    social-style presentation.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {profile.projects.map((project) => (
                                                <article
                                                    key={project.name}
                                                    className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="inline-flex items-center gap-2 font-semibold text-slate-900">
                                                                <BookOpen className="h-4 w-4 text-slate-500" />
                                                                {project.name}
                                                            </h3>
                                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                                {
                                                                    project.description
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            {project.sourceUrl && (
                                                                <a
                                                                    href={
                                                                        project.sourceUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                                                                >
                                                                    Code
                                                                </a>
                                                            )}
                                                            {project.liveUrl && (
                                                                <a
                                                                    href={
                                                                        project.liveUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                                                                >
                                                                    Live
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {project.tech.map(
                                                            (item) => (
                                                                <span
                                                                    key={item}
                                                                    className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600"
                                                                >
                                                                    {item}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                        {project.primaryLanguage && (
                                                            <span className="inline-flex items-center gap-2">
                                                                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                                                {
                                                                    project.primaryLanguage
                                                                }
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
                                    </FacebookPostSection>
                                ))}

                            {(mode === 'github' || activeTab === 'focus') &&
                                (mode === 'github' ? (
                                    <section
                                        className={getSectionClassName(mode)}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold text-white">
                                            Current focus
                                        </h2>
                                        <p className="mb-4 text-sm text-[#8b949e]">
                                            What is actively being improved and
                                            explored right now.
                                        </p>

                                        <ul className="space-y-3">
                                            {profile.currentFocus.map(
                                                (focus) => (
                                                    <li
                                                        key={focus}
                                                        className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4 text-sm leading-6 text-[#c9d1d9] transition-shadow duration-200 hover:border-[#58a6ff]/40"
                                                    >
                                                        {focus}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </section>
                                ) : (
                                    <FacebookPostSection
                                        title="Posts"
                                        profile={profile}
                                        initials={initials}
                                    >
                                        <h2 className="mb-2 text-lg font-semibold">
                                            Posts
                                        </h2>
                                        <p className="mb-4 text-sm text-slate-500">
                                            A timeline-style look at current
                                            development priorities.
                                        </p>

                                        <ul className="space-y-3">
                                            {profile.currentFocus.map(
                                                (focus) => (
                                                    <li
                                                        key={focus}
                                                        className="rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-600 transition-shadow duration-200 hover:shadow-sm"
                                                    >
                                                        {focus}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </FacebookPostSection>
                                ))}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
