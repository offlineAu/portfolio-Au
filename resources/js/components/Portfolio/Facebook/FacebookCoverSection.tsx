import { Form } from '@inertiajs/react';
import { Camera, ImageIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import ProfileAvatar from '@/components/Portfolio/Shared/ProfileAvatar';
import type { ProfileData } from '@/components/Portfolio/types';

type FacebookCoverSectionProps = {
    profile: ProfileData;
    initials: string;
    canEditMedia: boolean;
    children?: ReactNode;
};

function FacebookActionBar({ canEditMedia }: { canEditMedia: boolean }) {
    return (
        <div className="mt-4 flex flex-wrap gap-3">
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
                <ImageIcon className="h-4 w-4" />
                Add to story
            </button>

            {canEditMedia ? (
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800">
                    <Camera className="h-4 w-4" />
                    Editing unlocked
                </span>
            ) : (
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800">
                    <Camera className="h-4 w-4" />
                    Unlock to edit
                </span>
            )}
        </div>
    );
}

export default function FacebookCoverSection({
    profile,
    initials,
    canEditMedia,
    children,
}: FacebookCoverSectionProps) {
    return (
        <section className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300">
            <div className="relative">
                <div
                    className="h-32 bg-[linear-gradient(135deg,#1877f2_0%,#42a5f5_55%,#90caf9_100%)] bg-cover bg-center sm:h-60"
                    style={
                        profile.facebookCoverPhotoUrl
                            ? {
                                  backgroundImage: `url(${profile.facebookCoverPhotoUrl})`,
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

                {canEditMedia && (
                    <Form
                        action="/portfolio/media/facebook-cover"
                        method="post"
                        encType="multipart/form-data"
                        className="absolute bottom-4 left-4 rounded-lg bg-white/90 p-3 shadow-sm"
                    >
                        {({ processing, errors }) => (
                            <>
                                <input
                                    type="file"
                                    name="facebook_cover"
                                    accept="image/*"
                                    className="block w-full text-sm"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Wide image recommended, up to 8MB.
                                </p>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800"
                                >
                                    <Camera className="h-4 w-4" />
                                    Update cover
                                </button>
                                {errors.facebook_cover && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.facebook_cover}
                                    </p>
                                )}
                            </>
                        )}
                    </Form>
                )}
            </div>

            <div className="px-5 pb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="relative z-20 -mt-10 flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 text-3xl font-semibold text-slate-700 shadow-md">
                                <ProfileAvatar
                                    avatarUrl={profile.facebookAvatarUrl}
                                    name={profile.name}
                                    initials={initials}
                                    className="h-full w-full rounded-full"
                                />
                            </div>

                            <div className="pt-3 sm:pt-10">
                                <h2 className="text-3xl font-bold text-slate-900">
                                    {profile.name}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {profile.title}
                                </p>
                                <FacebookActionBar
                                    canEditMedia={canEditMedia}
                                />
                            </div>
                        </div>

                        {canEditMedia && (
                            <Form
                                action="/portfolio/media/facebook-avatar"
                                method="post"
                                encType="multipart/form-data"
                                className="max-w-sm"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <input
                                            type="file"
                                            name="facebook_avatar"
                                            accept="image/*"
                                            className="block w-full text-sm"
                                        />
                                        <p className="mt-1 text-xs text-slate-500">
                                            JPG, PNG, or WEBP up to 5MB.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800"
                                        >
                                            Update Facebook avatar
                                        </button>
                                        {errors.facebook_avatar && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.facebook_avatar}
                                            </p>
                                        )}
                                    </>
                                )}
                            </Form>
                        )}
                    </div>

                    <div className="pt-2 sm:pt-10">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {profile.projects.length} featured items
                        </span>
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
}
