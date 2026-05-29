import type { ProfileLink, ProfileMode } from '@/components/Portfolio/types';

type ProfileLinksProps = {
    links: ProfileLink[];
    mode: ProfileMode;
};

export default function ProfileLinks({ links, mode }: ProfileLinksProps) {
    if (links.length === 0) {
        return null;
    }

    const linkClassName =
        mode === 'github'
            ? 'flex items-center gap-2 text-sm text-[#8b949e] transition-colors hover:text-[#58a6ff]'
            : 'flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900';

    return (
        <div className="space-y-2">
            {links.map((link) =>
                link.onClick ? (
                    <button
                        key={link.label}
                        type="button"
                        onClick={link.onClick}
                        className={`${linkClassName} w-full text-left`}
                    >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                    </button>
                ) : (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.external === false ? undefined : '_blank'}
                        rel={link.external === false ? undefined : 'noreferrer'}
                        className={linkClassName}
                    >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                    </a>
                ),
            )}
        </div>
    );
}
