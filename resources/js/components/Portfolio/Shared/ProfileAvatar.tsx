type ProfileAvatarProps = {
    avatarUrl: string | null;
    name: string;
    initials: string;
    className: string;
};

export default function ProfileAvatar({
    avatarUrl,
    name,
    initials,
    className,
}: ProfileAvatarProps) {
    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={name}
                className={`${className} object-cover`}
            />
        );
    }

    return initials;
}
