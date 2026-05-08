import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PortfolioProfile = {
    pageTitle: string;
    name: string;
    username: string;
    title: string;
    location: string;
    email: string;
    availability: string | null;
    bio: string;
    aboutHeading: string;
    aboutSummary: string;
    aboutPoints: string[];
    websiteUrl: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    facebookUrl: string | null;
    resumeUrl: string | null;
    avatarUrl: string | null;
    coverPhotoUrl: string | null;
};

type SkillItem = {
    id: number;
    name: string;
    category: string;
    sortOrder: number;
};

type ProjectItem = {
    id: number;
    name: string;
    description: string;
    primaryLanguage: string | null;
    techStack: string[];
    sourceUrl: string | null;
    liveUrl: string | null;
    starsCount: number;
    forksCount: number;
    sortOrder: number;
    isFeatured: boolean;
};

type ExperienceItem = {
    id: number;
    role: string;
    organization: string;
    period: string;
    details: string;
    sortOrder: number;
};

type FocusItem = {
    id: number;
    content: string;
    sortOrder: number;
};

const textareaClassName =
    'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-28 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

export default function Portfolio({
    profile,
    skills,
    projects,
    experiences,
    focusItems,
}: {
    profile: PortfolioProfile;
    skills: SkillItem[];
    projects: ProjectItem[];
    experiences: ExperienceItem[];
    focusItems: FocusItem[];
}) {
    return (
        <>
            <Head title="Portfolio manager" />

            <div className="space-y-8">
                <Heading
                    title="Portfolio manager"
                    description="Manage the public portfolio content that powers the GitHub and Facebook profile views."
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Profile content</CardTitle>
                        <CardDescription>
                            Update the shared identity, bio, about section, and
                            contact links.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action="/settings/portfolio/profile"
                            method="post"
                            options={{ preserveScroll: true }}
                            encType="multipart/form-data"
                            className="space-y-5"
                        >
                            {({ errors, processing, recentlySuccessful }) => (
                                <>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="patch"
                                    />

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="page_title">
                                                Page title
                                            </Label>
                                            <Input
                                                id="page_title"
                                                name="page_title"
                                                defaultValue={profile.pageTitle}
                                            />
                                            <InputError
                                                message={errors.page_title}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={profile.name}
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="username">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                defaultValue={profile.username}
                                            />
                                            <InputError
                                                message={errors.username}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                defaultValue={profile.title}
                                            />
                                            <InputError
                                                message={errors.title}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="location">
                                                Location
                                            </Label>
                                            <Input
                                                id="location"
                                                name="location"
                                                defaultValue={profile.location}
                                            />
                                            <InputError
                                                message={errors.location}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                defaultValue={profile.email}
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="availability">
                                                Availability
                                            </Label>
                                            <Input
                                                id="availability"
                                                name="availability"
                                                defaultValue={
                                                    profile.availability ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.availability}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            defaultValue={profile.bio}
                                            className={textareaClassName}
                                        />
                                        <InputError message={errors.bio} />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="about_heading">
                                                About heading
                                            </Label>
                                            <Input
                                                id="about_heading"
                                                name="about_heading"
                                                defaultValue={
                                                    profile.aboutHeading
                                                }
                                            />
                                            <InputError
                                                message={errors.about_heading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="about_summary">
                                                About summary
                                            </Label>
                                            <Input
                                                id="about_summary"
                                                name="about_summary"
                                                defaultValue={
                                                    profile.aboutSummary
                                                }
                                            />
                                            <InputError
                                                message={errors.about_summary}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="about_points_text">
                                            About bullet points
                                        </Label>
                                        <textarea
                                            id="about_points_text"
                                            name="about_points_text"
                                            defaultValue={profile.aboutPoints.join(
                                                '\n',
                                            )}
                                            className={textareaClassName}
                                        />
                                        <InputError
                                            message={errors.about_points_text}
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="avatar_file">
                                                Upload avatar image
                                            </Label>
                                            {profile.avatarUrl && (
                                                <img
                                                    src={profile.avatarUrl}
                                                    alt="Current avatar"
                                                    className="h-24 w-24 rounded-full object-cover"
                                                />
                                            )}
                                            <Input
                                                id="avatar_file"
                                                type="file"
                                                name="avatar_file"
                                                accept="image/*"
                                            />
                                            <InputError
                                                message={errors.avatar_file}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cover_photo_file">
                                                Upload cover image
                                            </Label>
                                            {profile.coverPhotoUrl && (
                                                <img
                                                    src={profile.coverPhotoUrl}
                                                    alt="Current cover"
                                                    className="h-24 w-full rounded-lg object-cover"
                                                />
                                            )}
                                            <Input
                                                id="cover_photo_file"
                                                type="file"
                                                name="cover_photo_file"
                                                accept="image/*"
                                            />
                                            <InputError
                                                message={
                                                    errors.cover_photo_file
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="website_url">
                                                Website URL
                                            </Label>
                                            <Input
                                                id="website_url"
                                                name="website_url"
                                                defaultValue={
                                                    profile.websiteUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.website_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="github_url">
                                                GitHub URL
                                            </Label>
                                            <Input
                                                id="github_url"
                                                name="github_url"
                                                defaultValue={
                                                    profile.githubUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.github_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="linkedin_url">
                                                LinkedIn URL
                                            </Label>
                                            <Input
                                                id="linkedin_url"
                                                name="linkedin_url"
                                                defaultValue={
                                                    profile.linkedinUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.linkedin_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="facebook_url">
                                                Facebook URL
                                            </Label>
                                            <Input
                                                id="facebook_url"
                                                name="facebook_url"
                                                defaultValue={
                                                    profile.facebookUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.facebook_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="resume_url">
                                                Resume URL
                                            </Label>
                                            <Input
                                                id="resume_url"
                                                name="resume_url"
                                                defaultValue={
                                                    profile.resumeUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.resume_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="avatar_url">
                                                Avatar image URL fallback
                                            </Label>
                                            <Input
                                                id="avatar_url"
                                                name="avatar_url"
                                                defaultValue={
                                                    profile.avatarUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.avatar_url}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cover_photo_url">
                                                Cover photo URL fallback
                                            </Label>
                                            <Input
                                                id="cover_photo_url"
                                                name="cover_photo_url"
                                                defaultValue={
                                                    profile.coverPhotoUrl ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.cover_photo_url}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button disabled={processing}>
                                            Save profile
                                        </Button>
                                        {recentlySuccessful && (
                                            <p className="text-sm text-muted-foreground">
                                                Saved
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>
                            These power the tech stack chips in both public
                            profile modes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="rounded-lg border p-4"
                            >
                                <Form
                                    action={`/settings/portfolio/skills/${skill.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="space-y-3"
                                >
                                    {({ errors, processing }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="patch"
                                            />
                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`skill-name-${skill.id}`}
                                                    >
                                                        Skill
                                                    </Label>
                                                    <Input
                                                        id={`skill-name-${skill.id}`}
                                                        name="name"
                                                        defaultValue={
                                                            skill.name
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`skill-category-${skill.id}`}
                                                    >
                                                        Category
                                                    </Label>
                                                    <Input
                                                        id={`skill-category-${skill.id}`}
                                                        name="category"
                                                        defaultValue={
                                                            skill.category
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`skill-sort-${skill.id}`}
                                                    >
                                                        Sort order
                                                    </Label>
                                                    <Input
                                                        id={`skill-sort-${skill.id}`}
                                                        type="number"
                                                        name="sort_order"
                                                        defaultValue={
                                                            skill.sortOrder
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.name ||
                                                    errors.category ||
                                                    errors.sort_order
                                                }
                                            />
                                            <div className="flex items-center gap-3">
                                                <Button disabled={processing}>
                                                    Update skill
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                <Form
                                    action={`/settings/portfolio/skills/${skill.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="mt-3"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="delete"
                                    />
                                    <Button type="submit" variant="outline">
                                        Delete skill
                                    </Button>
                                </Form>
                            </div>
                        ))}

                        <Form
                            action="/settings/portfolio/skills"
                            method="post"
                            options={{ preserveScroll: true }}
                            className="space-y-3 rounded-lg border border-dashed p-4"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-skill-name">
                                                New skill
                                            </Label>
                                            <Input
                                                id="new-skill-name"
                                                name="name"
                                                placeholder="Laravel"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-skill-category">
                                                Category
                                            </Label>
                                            <Input
                                                id="new-skill-category"
                                                name="category"
                                                placeholder="Backend"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-skill-sort">
                                                Sort order
                                            </Label>
                                            <Input
                                                id="new-skill-sort"
                                                type="number"
                                                name="sort_order"
                                                defaultValue={skills.length + 1}
                                            />
                                        </div>
                                    </div>
                                    <InputError
                                        message={
                                            errors.name ||
                                            errors.category ||
                                            errors.sort_order
                                        }
                                    />
                                    <Button disabled={processing}>
                                        Add skill
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>
                            These feed the GitHub pinned repositories cards and
                            Facebook projects tab.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="rounded-lg border p-4"
                            >
                                <Form
                                    action={`/settings/portfolio/projects/${project.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="space-y-3"
                                >
                                    {({ errors, processing }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="patch"
                                            />
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-name-${project.id}`}
                                                    >
                                                        Project name
                                                    </Label>
                                                    <Input
                                                        id={`project-name-${project.id}`}
                                                        name="name"
                                                        defaultValue={
                                                            project.name
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-language-${project.id}`}
                                                    >
                                                        Primary language
                                                    </Label>
                                                    <Input
                                                        id={`project-language-${project.id}`}
                                                        name="primary_language"
                                                        defaultValue={
                                                            project.primaryLanguage ??
                                                            ''
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor={`project-description-${project.id}`}
                                                >
                                                    Description
                                                </Label>
                                                <textarea
                                                    id={`project-description-${project.id}`}
                                                    name="description"
                                                    defaultValue={
                                                        project.description
                                                    }
                                                    className={
                                                        textareaClassName
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor={`project-tech-${project.id}`}
                                                >
                                                    Tech stack
                                                </Label>
                                                <textarea
                                                    id={`project-tech-${project.id}`}
                                                    name="tech_stack_text"
                                                    defaultValue={project.techStack.join(
                                                        '\n',
                                                    )}
                                                    className={
                                                        textareaClassName
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-source-${project.id}`}
                                                    >
                                                        Source URL
                                                    </Label>
                                                    <Input
                                                        id={`project-source-${project.id}`}
                                                        name="source_url"
                                                        defaultValue={
                                                            project.sourceUrl ??
                                                            ''
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-live-${project.id}`}
                                                    >
                                                        Live URL
                                                    </Label>
                                                    <Input
                                                        id={`project-live-${project.id}`}
                                                        name="live_url"
                                                        defaultValue={
                                                            project.liveUrl ??
                                                            ''
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-4">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-stars-${project.id}`}
                                                    >
                                                        Stars
                                                    </Label>
                                                    <Input
                                                        id={`project-stars-${project.id}`}
                                                        type="number"
                                                        name="stars_count"
                                                        defaultValue={
                                                            project.starsCount
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-forks-${project.id}`}
                                                    >
                                                        Forks
                                                    </Label>
                                                    <Input
                                                        id={`project-forks-${project.id}`}
                                                        type="number"
                                                        name="forks_count"
                                                        defaultValue={
                                                            project.forksCount
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`project-order-${project.id}`}
                                                    >
                                                        Sort order
                                                    </Label>
                                                    <Input
                                                        id={`project-order-${project.id}`}
                                                        type="number"
                                                        name="sort_order"
                                                        defaultValue={
                                                            project.sortOrder
                                                        }
                                                    />
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <input
                                                        id={`project-featured-${project.id}`}
                                                        type="checkbox"
                                                        name="is_featured"
                                                        value="1"
                                                        defaultChecked={
                                                            project.isFeatured
                                                        }
                                                        className="h-4 w-4 rounded border"
                                                    />
                                                    <Label
                                                        htmlFor={`project-featured-${project.id}`}
                                                    >
                                                        Featured
                                                    </Label>
                                                </div>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.name ||
                                                    errors.description ||
                                                    errors.primary_language ||
                                                    errors.tech_stack_text ||
                                                    errors.source_url ||
                                                    errors.live_url
                                                }
                                            />
                                            <div className="flex items-center gap-3">
                                                <Button disabled={processing}>
                                                    Update project
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                <Form
                                    action={`/settings/portfolio/projects/${project.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="mt-3"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="delete"
                                    />
                                    <Button type="submit" variant="outline">
                                        Delete project
                                    </Button>
                                </Form>
                            </div>
                        ))}

                        <Form
                            action="/settings/portfolio/projects"
                            method="post"
                            options={{ preserveScroll: true }}
                            className="space-y-3 rounded-lg border border-dashed p-4"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-project-name">
                                                Project name
                                            </Label>
                                            <Input
                                                id="new-project-name"
                                                name="name"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-project-language">
                                                Primary language
                                            </Label>
                                            <Input
                                                id="new-project-language"
                                                name="primary_language"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-project-description">
                                            Description
                                        </Label>
                                        <textarea
                                            id="new-project-description"
                                            name="description"
                                            className={textareaClassName}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-project-tech">
                                            Tech stack
                                        </Label>
                                        <textarea
                                            id="new-project-tech"
                                            name="tech_stack_text"
                                            className={textareaClassName}
                                        />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-project-stars">
                                                Stars
                                            </Label>
                                            <Input
                                                id="new-project-stars"
                                                type="number"
                                                name="stars_count"
                                                defaultValue={0}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-project-forks">
                                                Forks
                                            </Label>
                                            <Input
                                                id="new-project-forks"
                                                type="number"
                                                name="forks_count"
                                                defaultValue={0}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-project-sort">
                                                Sort order
                                            </Label>
                                            <Input
                                                id="new-project-sort"
                                                type="number"
                                                name="sort_order"
                                                defaultValue={
                                                    projects.length + 1
                                                }
                                            />
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <input
                                                id="new-project-featured"
                                                type="checkbox"
                                                name="is_featured"
                                                value="1"
                                                defaultChecked
                                                className="h-4 w-4 rounded border"
                                            />
                                            <Label htmlFor="new-project-featured">
                                                Featured
                                            </Label>
                                        </div>
                                    </div>
                                    <InputError
                                        message={
                                            errors.name ||
                                            errors.description ||
                                            errors.primary_language ||
                                            errors.tech_stack_text
                                        }
                                    />
                                    <Button disabled={processing}>
                                        Add project
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Experience</CardTitle>
                        <CardDescription>
                            These populate the experience timeline and profile
                            cards.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {experiences.map((experience) => (
                            <div
                                key={experience.id}
                                className="rounded-lg border p-4"
                            >
                                <Form
                                    action={`/settings/portfolio/experiences/${experience.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="space-y-3"
                                >
                                    {({ errors, processing }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="patch"
                                            />
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`experience-role-${experience.id}`}
                                                    >
                                                        Role
                                                    </Label>
                                                    <Input
                                                        id={`experience-role-${experience.id}`}
                                                        name="role"
                                                        defaultValue={
                                                            experience.role
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`experience-organization-${experience.id}`}
                                                    >
                                                        Organization
                                                    </Label>
                                                    <Input
                                                        id={`experience-organization-${experience.id}`}
                                                        name="organization"
                                                        defaultValue={
                                                            experience.organization
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`experience-period-${experience.id}`}
                                                    >
                                                        Period
                                                    </Label>
                                                    <Input
                                                        id={`experience-period-${experience.id}`}
                                                        name="period"
                                                        defaultValue={
                                                            experience.period
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`experience-sort-${experience.id}`}
                                                    >
                                                        Sort order
                                                    </Label>
                                                    <Input
                                                        id={`experience-sort-${experience.id}`}
                                                        type="number"
                                                        name="sort_order"
                                                        defaultValue={
                                                            experience.sortOrder
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor={`experience-details-${experience.id}`}
                                                >
                                                    Details
                                                </Label>
                                                <textarea
                                                    id={`experience-details-${experience.id}`}
                                                    name="details"
                                                    defaultValue={
                                                        experience.details
                                                    }
                                                    className={
                                                        textareaClassName
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.role ||
                                                    errors.organization ||
                                                    errors.period ||
                                                    errors.details
                                                }
                                            />
                                            <div className="flex items-center gap-3">
                                                <Button disabled={processing}>
                                                    Update experience
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                <Form
                                    action={`/settings/portfolio/experiences/${experience.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="mt-3"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="delete"
                                    />
                                    <Button type="submit" variant="outline">
                                        Delete experience
                                    </Button>
                                </Form>
                            </div>
                        ))}

                        <Form
                            action="/settings/portfolio/experiences"
                            method="post"
                            options={{ preserveScroll: true }}
                            className="space-y-3 rounded-lg border border-dashed p-4"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-experience-role">
                                                Role
                                            </Label>
                                            <Input
                                                id="new-experience-role"
                                                name="role"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-experience-organization">
                                                Organization
                                            </Label>
                                            <Input
                                                id="new-experience-organization"
                                                name="organization"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-experience-period">
                                                Period
                                            </Label>
                                            <Input
                                                id="new-experience-period"
                                                name="period"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-experience-sort">
                                                Sort order
                                            </Label>
                                            <Input
                                                id="new-experience-sort"
                                                type="number"
                                                name="sort_order"
                                                defaultValue={
                                                    experiences.length + 1
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-experience-details">
                                            Details
                                        </Label>
                                        <textarea
                                            id="new-experience-details"
                                            name="details"
                                            className={textareaClassName}
                                        />
                                    </div>
                                    <InputError
                                        message={
                                            errors.role ||
                                            errors.organization ||
                                            errors.period ||
                                            errors.details
                                        }
                                    />
                                    <Button disabled={processing}>
                                        Add experience
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Current focus</CardTitle>
                        <CardDescription>
                            Short bullet points that describe what you are
                            actively learning or building.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {focusItems.map((focusItem) => (
                            <div
                                key={focusItem.id}
                                className="rounded-lg border p-4"
                            >
                                <Form
                                    action={`/settings/portfolio/focus-items/${focusItem.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="space-y-3"
                                >
                                    {({ errors, processing }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="patch"
                                            />
                                            <div className="grid gap-4 md:grid-cols-[1fr_120px]">
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`focus-content-${focusItem.id}`}
                                                    >
                                                        Content
                                                    </Label>
                                                    <textarea
                                                        id={`focus-content-${focusItem.id}`}
                                                        name="content"
                                                        defaultValue={
                                                            focusItem.content
                                                        }
                                                        className={
                                                            textareaClassName
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor={`focus-sort-${focusItem.id}`}
                                                    >
                                                        Sort order
                                                    </Label>
                                                    <Input
                                                        id={`focus-sort-${focusItem.id}`}
                                                        type="number"
                                                        name="sort_order"
                                                        defaultValue={
                                                            focusItem.sortOrder
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.content ||
                                                    errors.sort_order
                                                }
                                            />
                                            <div className="flex items-center gap-3">
                                                <Button disabled={processing}>
                                                    Update focus item
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                <Form
                                    action={`/settings/portfolio/focus-items/${focusItem.id}`}
                                    method="post"
                                    options={{ preserveScroll: true }}
                                    className="mt-3"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="delete"
                                    />
                                    <Button type="submit" variant="outline">
                                        Delete focus item
                                    </Button>
                                </Form>
                            </div>
                        ))}

                        <Form
                            action="/settings/portfolio/focus-items"
                            method="post"
                            options={{ preserveScroll: true }}
                            className="space-y-3 rounded-lg border border-dashed p-4"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-4 md:grid-cols-[1fr_120px]">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-focus-content">
                                                Content
                                            </Label>
                                            <textarea
                                                id="new-focus-content"
                                                name="content"
                                                className={textareaClassName}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-focus-sort">
                                                Sort order
                                            </Label>
                                            <Input
                                                id="new-focus-sort"
                                                type="number"
                                                name="sort_order"
                                                defaultValue={
                                                    focusItems.length + 1
                                                }
                                            />
                                        </div>
                                    </div>
                                    <InputError
                                        message={
                                            errors.content || errors.sort_order
                                        }
                                    />
                                    <Button disabled={processing}>
                                        Add focus item
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Portfolio.layout = {
    breadcrumbs: [
        {
            title: 'Portfolio manager',
            href: '/settings/portfolio',
        },
    ],
};
