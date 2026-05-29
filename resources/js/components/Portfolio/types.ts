export type ProfileMode = 'github' | 'facebook';
export type FacebookTab = 'about' | 'experience' | 'projects' | 'focus';
export type GitHubRepoView = 'cards' | 'table';

export type ProjectItem = {
    name: string;
    description: string;
    primaryLanguage: string | null;
    tech: string[];
    sourceUrl: string | null;
    liveUrl: string | null;
    starsCount: number;
    forksCount: number;
};

export type ExperienceItem = {
    role: string;
    organization: string;
    period: string;
    details: string[];
};

export type ProfileData = {
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
    facebookUrl: string | null;
    resumeUrl: string | null;
    githubAvatarUrl: string | null;
    facebookAvatarUrl: string | null;
    facebookCoverPhotoUrl: string | null;
    techStack: string[];
    projects: ProjectItem[];
    experience: ExperienceItem[];
    currentFocus: string[];
};

export type PortfolioPageProps = {
    pageTitle: string;
    profile: ProfileData;
    canEditMedia: boolean;
};

export type ProfileLink = {
    label: string;
    href?: string;
    onClick?: () => void;
    external?: boolean;
    icon: ComponentType<{ className?: string }>;
};
import type { ComponentType } from 'react';
