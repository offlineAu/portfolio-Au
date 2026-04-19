import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Camera,
    ExternalLink,
    GitFork,
    Github,
    Globe,
    ImageIcon,
    Linkedin,
    Link2,
    Mail,
    MapPin,
    Star,
    Users,
} from 'lucide-react';
import { useState } from 'react';

type ProfileMode = 'github' | 'facebook';
type FacebookTab = 'about' | 'experience' | 'projects' | 'focus';

type ProjectItem = {
    name: string;
    description: string;
    primaryLanguage: string | null;
    tech: string[];
    sourceUrl: string | null;
    liveUrl: string | null;
    starsCount: number;
    forksCount: number;
};

type ExperienceItem = {
    role: string;
    organization: string;
    period: string;
    details: string[];
};

type ProfileData = {
    name: string;
    username: string;
    bio: string;
    title: string;
    location: string;
    email: string;
    availability: string | null;
    aboutHeading: string;
    aboutSummary: string;
    aboutPoints: string[];
    websiteUrl: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    resumeUrl: string | null;
    avatarUrl: string | null;
    coverPhotoUrl: string | null;
    techStack: string[];
    projects: ProjectItem[];
    experience: ExperienceItem[];
    currentFocus: string[];
};

type PortfolioShowcaseProps = {
    pageTitle: string;
    profile: ProfileData;
};

type ProfileLink = {
    label: string;
    href: string;
    icon: typeof Globe;
};

function getSectionClassName(mode: ProfileMode) {
    if (mode === 'github') {
        return 'overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200';
    }

    return 'overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200';
}

function getModeButtonClass(mode: ProfileMode, value: ProfileMode) {
    return mode === value
        ? value === 'github'
            ? 'rounded-lg border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-200'
            : 'rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200'
        : 'rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50';
}

function getStyleActiveTab(activeTab: FacebookTab, tab: FacebookTab) {
    return activeTab === tab
        ? 'border-b-2 border-blue-600 pb-3 text-blue-600 transition-colors duration-200'
        : 'pb-3 text-slate-600 transition-colors duration-200 hover:text-slate-900';
}

function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function renderAvatar(
    profile: ProfileData,
    initials: string,
    className: string,
) {
    if (profile.avatarUrl) {
        return (
            <img
                src={profile.avatarUrl}
                alt={profile.name}
                className={`${className} object-cover`}
            />
        );
    }

    return initials;
}

function renderGitHubSidebar(
    profile: ProfileData,
    initials: string,
    profileLinks: ProfileLink[],
) {
    return (
        <aside className="space-y-5 transition-all duration-300">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100 text-3xl font-semibold text-slate-700">
                {renderAvatar(profile, initials, 'h-full w-full rounded-full')}
            </div>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">
                    {profile.name}
                </h2>
                <p className="text-slate-500">{profile.username}</p>
            </div>

            <button
                type="button"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
                Edit profile
            </button>

            <div className="space-y-3">
                <p className="font-medium text-slate-900">{profile.title}</p>
                <p className="min-h-[96px] text-sm leading-6 text-slate-600">
                    {profile.bio}
                </p>
                {profile.availability && (
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {profile.availability}
                    </span>
                )}
            </div>

            <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                        <span className="font-semibold text-slate-900">
                            {profile.projects.length * 9}
                        </span>{' '}
                        followers
                    </span>
                    <span>&middot;</span>
                    <span>
                        <span className="font-semibold text-slate-900">
                            {profile.techStack.length * 3}
                        </span>{' '}
                        following
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                </div>
            </div>

            <div className="space-y-2">
                {profileLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-700 transition-colors duration-200 hover:text-blue-600"
                    >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                    </a>
                ))}
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                    Organizations
                </h3>
                <div className="grid grid-cols-4 gap-3">
                    {profile.techStack.slice(0, 8).map((tech) => (
                        <div
                            key={tech}
                            className="flex h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-[10px] font-medium text-slate-600"
                        >
                            {tech.slice(0, 3).toUpperCase()}
                        </div>
                    ))}
                </div>
            </section>
        </aside>
    );
}

function renderGitHubProfileHeader(profile: ProfileData) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        {profile.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {profile.title}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            README profile
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Link2 className="h-4 w-4" />
                            {profile.websiteUrl
                                ? 'Portfolio linked'
                                : 'No website linked'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-sm text-slate-600">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-lg font-semibold text-slate-900">
                            {profile.projects.length}
                        </p>
                        <p>Repositories</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-lg font-semibold text-slate-900">
                            {profile.experience.length}
                        </p>
                        <p>Experience</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-lg font-semibold text-slate-900">
                            {profile.techStack.length}
                        </p>
                        <p>Skills</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function renderGitHubTabs(profile: ProfileData) {
    return (
        <div className="mb-6 border-b border-slate-200">
            <nav className="flex flex-wrap gap-6 px-1 text-sm text-slate-600">
                <button
                    type="button"
                    className="border-b-2 border-orange-500 pb-3 font-medium text-slate-900"
                >
                    Overview
                </button>
                <button
                    type="button"
                    className="pb-3 transition-colors hover:text-slate-900"
                >
                    Repositories{' '}
                    <span className="text-slate-400">
                        {profile.projects.length}
                    </span>
                </button>
                <button
                    type="button"
                    className="pb-3 transition-colors hover:text-slate-900"
                >
                    Projects{' '}
                    <span className="text-slate-400">
                        {Math.max(profile.projects.length - 1, 1)}
                    </span>
                </button>
                <button
                    type="button"
                    className="pb-3 transition-colors hover:text-slate-900"
                >
                    Packages
                </button>
                <button
                    type="button"
                    className="pb-3 transition-colors hover:text-slate-900"
                >
                    Stars
                </button>
            </nav>
        </div>
    );
}

function renderGitHubContributionCard(profile: ProfileData) {
    const totalContributions =
        profile.projects.length * 28 + profile.experience.length * 17;

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Contribution activity</h2>
                <span className="text-sm text-slate-500">Last 12 months</span>
            </div>

            <p className="mb-4 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                    {totalContributions} contributions
                </span>{' '}
                across projects, experience, and current learning work.
            </p>

            <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
                {Array.from({ length: 42 }).map((_, index) => (
                    <div
                        key={index}
                        className={`aspect-square rounded-sm ${
                            index % 5 === 0
                                ? 'bg-emerald-500'
                                : index % 4 === 0
                                  ? 'bg-emerald-400'
                                  : index % 3 === 0
                                    ? 'bg-emerald-200'
                                    : 'bg-slate-100'
                        }`}
                    />
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-600">
                <div className="flex flex-wrap gap-4">
                    <span>{profile.projects.length} featured repositories</span>
                    <span>{profile.experience.length} experience entries</span>
                    <span>{profile.techStack.length} tracked skills</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Less</span>
                    <span className="h-3 w-3 rounded-sm bg-slate-100" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-200" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-400" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                    <span>More</span>
                </div>
            </div>
        </section>
    );
}

function renderFacebookActionBar() {
    return (
        <div className="mt-4 flex flex-wrap gap-3">
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
                <ImageIcon className="h-4 w-4" />
                Add to story
            </button>
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-300"
            >
                <Camera className="h-4 w-4" />
                Edit profile
            </button>
        </div>
    );
}

function renderFacebookIntro(
    profile: ProfileData,
    profileLinks: ProfileLink[],
) {
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

            <div className="mt-5 space-y-3">
                {profileLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
                    >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                    </a>
                ))}
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

function renderFacebookComposer(profile: ProfileData, initials: string) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {renderAvatar(
                        profile,
                        initials,
                        'h-full w-full rounded-full',
                    )}
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

function renderFacebookSectionHeader(profile: ProfileData, initials: string) {
    return (
        <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {renderAvatar(
                        profile,
                        initials,
                        'h-full w-full rounded-full',
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900">
                        {profile.name}
                    </p>
                    <p className="text-xs text-slate-500">Portfolio section</p>
                </div>
            </div>

            <button
                type="button"
                className="rounded-full px-3 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
            >
                ...
            </button>
        </div>
    );
}

function renderFacebookEngagementFooter() {
    return (
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
    );
}

export default function PortfolioShowcase({
    pageTitle,
    profile,
}: PortfolioShowcaseProps) {
    const [mode, setMode] = useState<ProfileMode>('github');
    const [activeTab, setActiveTab] = useState<FacebookTab>('about');

    const initials = getInitials(profile.name);
    const profileLinks: ProfileLink[] = [
        profile.websiteUrl
            ? { label: 'Website', href: profile.websiteUrl, icon: Globe }
            : null,
        profile.githubUrl
            ? { label: 'GitHub', href: profile.githubUrl, icon: Github }
            : null,
        profile.linkedinUrl
            ? { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin }
            : null,
        profile.resumeUrl
            ? { label: 'Resume', href: profile.resumeUrl, icon: ExternalLink }
            : null,
    ].filter((link): link is ProfileLink => link !== null);

    return (
        <>
            <Head title={pageTitle} />

            <div
                className={`min-h-screen text-slate-900 ${
                    mode === 'github' ? 'bg-[#f6f8fa]' : 'bg-[#f0f2f5]'
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                {pageTitle}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Switch between GitHub and Facebook style profile
                                views built from the same portfolio data.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 rounded-xl bg-white/80 p-1 shadow-sm backdrop-blur">
                            <button
                                type="button"
                                onClick={() => setMode('github')}
                                className={getModeButtonClass(mode, 'github')}
                            >
                                GitHub
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMode('facebook');
                                    setActiveTab('about');
                                }}
                                className={getModeButtonClass(mode, 'facebook')}
                            >
                                Facebook
                            </button>
                        </div>
                    </div>

                    {mode === 'facebook' && (
                        <section className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300">
                            <div className="relative">
                                <div
                                    className="h-32 bg-[linear-gradient(135deg,#1877f2_0%,#42a5f5_55%,#90caf9_100%)] bg-cover bg-center sm:h-60"
                                    style={
                                        profile.coverPhotoUrl
                                            ? {
                                                  backgroundImage: `url(${profile.coverPhotoUrl})`,
                                              }
                                            : undefined
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-white"
                                >
                                    <Camera className="h-4 w-4" />
                                    Edit cover photo
                                </button>
                            </div>

                            <div className="px-5 pb-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                                    <div className="flex flex-col sm:flex-row sm:gap-4">
                                        <div className="-mt-10 relative z-20 flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 text-3xl font-semibold text-slate-700 shadow-md">
                                            {renderAvatar(
                                                profile,
                                                initials,
                                                'h-full w-full rounded-full',
                                            )}
                                        </div>

                                        <div className="pt-3 sm:pt-10">
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                {profile.name}
                                            </h2>
                                            <p className="text-sm text-slate-500">
                                                {profile.title}
                                            </p>
                                            {renderFacebookActionBar()}
                                        </div>
                                    </div>

                                    <div className="pt-2 sm:pt-10">
                                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {profile.projects.length} featured
                                            items
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-slate-200 pt-4">
                                    <nav className="flex flex-wrap gap-8 px-4 text-[15px] font-semibold text-slate-600">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab('about')
                                            }
                                            className={getStyleActiveTab(
                                                activeTab,
                                                'about',
                                            )}
                                        >
                                            About
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab('experience')
                                            }
                                            className={getStyleActiveTab(
                                                activeTab,
                                                'experience',
                                            )}
                                        >
                                            Experience
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab('projects')
                                            }
                                            className={getStyleActiveTab(
                                                activeTab,
                                                'projects',
                                            )}
                                        >
                                            Projects
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab('focus')
                                            }
                                            className={getStyleActiveTab(
                                                activeTab,
                                                'focus',
                                            )}
                                        >
                                            Posts
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </section>
                    )}

                    <div
                        className={
                            mode === 'github'
                                ? 'grid gap-6 transition-all duration-300 lg:grid-cols-[296px_minmax(0,1fr)]'
                                : 'grid gap-6 transition-all duration-300 lg:grid-cols-[320px_minmax(0,1fr)]'
                        }
                    >
                        {mode === 'github' &&
                            renderGitHubSidebar(
                                profile,
                                initials,
                                profileLinks,
                            )}

                        {mode === 'facebook' &&
                            renderFacebookIntro(profile, profileLinks)}

                        <main
                            className={
                                mode === 'github' ? 'space-y-6' : 'space-y-4'
                            }
                        >
                            {mode === 'github' &&
                                renderGitHubProfileHeader(profile)}
                            {mode === 'github' && renderGitHubTabs(profile)}
                            {mode === 'github' &&
                                renderGitHubContributionCard(profile)}
                            {mode === 'facebook' &&
                                renderFacebookComposer(profile, initials)}

                            {(mode === 'github' || activeTab === 'about') && (
                                <section className={getSectionClassName(mode)}>
                                    {mode === 'facebook' &&
                                        renderFacebookSectionHeader(
                                            profile,
                                            initials,
                                        )}

                                    <h2 className="mb-2 text-lg font-semibold">
                                        {mode === 'github'
                                            ? 'README.md'
                                            : 'About'}
                                    </h2>
                                    {mode === 'github' && (
                                        <p className="mb-4 text-sm text-slate-500">
                                            A developer-style overview pinned at
                                            the top of the profile.
                                        </p>
                                    )}

                                    <h3 className="mb-2 text-base font-semibold text-slate-900">
                                        {profile.aboutHeading}
                                    </h3>
                                    <p className="text-sm leading-6 text-slate-600">
                                        {profile.aboutSummary}
                                    </p>
                                    <ul className="mt-4 space-y-3">
                                        {profile.aboutPoints.map((point) => (
                                            <li
                                                key={point}
                                                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                                            >
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    {mode === 'facebook' &&
                                        renderFacebookEngagementFooter()}
                                </section>
                            )}

                            {(mode === 'github' ||
                                activeTab === 'experience') && (
                                <section className={getSectionClassName(mode)}>
                                    {mode === 'facebook' &&
                                        renderFacebookSectionHeader(
                                            profile,
                                            initials,
                                        )}

                                    <h2 className="mb-2 text-lg font-semibold">
                                        Experience
                                    </h2>
                                    <p className="mb-4 text-sm text-slate-500">
                                        Roles, collaborations, and shipped work.
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
                                                            {item.organization}
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
                                    {mode === 'facebook' &&
                                        renderFacebookEngagementFooter()}
                                </section>
                            )}

                            {(mode === 'github' ||
                                activeTab === 'projects') && (
                                <section className={getSectionClassName(mode)}>
                                    {mode === 'facebook' &&
                                        renderFacebookSectionHeader(
                                            profile,
                                            initials,
                                        )}

                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {mode === 'github'
                                                    ? 'Pinned'
                                                    : 'Highlighted projects'}
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {mode === 'github'
                                                    ? 'Repositories showcased from the portfolio data source.'
                                                    : 'Featured work adapted into a social-style presentation.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            mode === 'github'
                                                ? 'grid gap-4 xl:grid-cols-2'
                                                : 'space-y-3'
                                        }
                                    >
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
                                    {mode === 'facebook' &&
                                        renderFacebookEngagementFooter()}
                                </section>
                            )}

                            {(mode === 'github' || activeTab === 'focus') && (
                                <section className={getSectionClassName(mode)}>
                                    {mode === 'facebook' &&
                                        renderFacebookSectionHeader(
                                            profile,
                                            initials,
                                        )}

                                    <h2 className="mb-2 text-lg font-semibold">
                                        {mode === 'github'
                                            ? 'Current focus'
                                            : 'Posts'}
                                    </h2>
                                    <p className="mb-4 text-sm text-slate-500">
                                        {mode === 'github'
                                            ? 'What is actively being improved and explored right now.'
                                            : 'A timeline-style look at current development priorities.'}
                                    </p>

                                    <ul className="space-y-3">
                                        {profile.currentFocus.map((focus) => (
                                            <li
                                                key={focus}
                                                className="rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-600 transition-shadow duration-200 hover:shadow-sm"
                                            >
                                                {focus}
                                            </li>
                                        ))}
                                    </ul>
                                    {mode === 'facebook' &&
                                        renderFacebookEngagementFooter()}
                                </section>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
