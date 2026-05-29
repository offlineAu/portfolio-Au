import type { Dispatch, SetStateAction } from 'react';

import type { FacebookTab } from '@/components/Portfolio/types';
import { getStyleActiveTab } from '@/components/Portfolio/utils';

type FacebookTabsProps = {
    activeTab: FacebookTab;
    setActiveTab: Dispatch<SetStateAction<FacebookTab>>;
};

export default function FacebookTabs({
    activeTab,
    setActiveTab,
}: FacebookTabsProps) {
    return (
        <div className="mt-6 border-t border-slate-200 pt-4">
            <nav className="flex flex-wrap gap-8 px-4 text-[15px] font-semibold text-slate-600">
                <button
                    type="button"
                    onClick={() => setActiveTab('about')}
                    className={getStyleActiveTab(activeTab, 'about')}
                >
                    About
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('experience')}
                    className={getStyleActiveTab(activeTab, 'experience')}
                >
                    Experience
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className={getStyleActiveTab(activeTab, 'projects')}
                >
                    Projects
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('focus')}
                    className={getStyleActiveTab(activeTab, 'focus')}
                >
                    Posts
                </button>
            </nav>
        </div>
    );
}
