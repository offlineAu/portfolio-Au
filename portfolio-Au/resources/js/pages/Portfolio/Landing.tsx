import React, { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { Hero } from '@/components/Portfolio/Landing/Hero';
import { RolePickerModal } from '@/components/Portfolio/Landing/RolePickerModal';
import '@/components/Portfolio/Landing/landing.css';

export default function Landing() {
    const role = useRole();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setModalOpen(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="lp-root">
            <Hero onOpenPicker={() => setModalOpen(true)} />

            {/* Placeholder for future sections */}
            <div className="lp-content-placeholder">
                <p>
                    Viewing as <strong>{role}</strong> — content sections coming next.
                </p>
            </div>

            <RolePickerModal
                open={modalOpen}
                current={role}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}