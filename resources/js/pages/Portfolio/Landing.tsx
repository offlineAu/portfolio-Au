import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useRole } from '@/hooks/useRole';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Navbar } from '@/components/Portfolio/Landing/Navbar';
import { Hero } from '@/components/Portfolio/Landing/Hero';
import { About }    from '@/components/Portfolio/Recruiter/About';
import { Skills }   from '@/components/Portfolio/Recruiter/Skills';
import { Projects } from '@/components/Portfolio/Recruiter/Projects';
import { Contact }  from '@/components/Portfolio/Recruiter/Contact';
import { RolePickerModal } from '@/components/Portfolio/Landing/RolePickerModal';
import { Loader } from '@/components/Portfolio/Loader/Loader';
import '@/components/Portfolio/Landing/landing.css';

interface Props {
    isLanding: boolean;
}

export default function Landing({ isLanding }: Props) {
    const role = useRole();
    const [scrollY, setScrollY] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const progressBarRef = useScrollProgress();

    // Dismiss native loader on mount, then reveal page
    useEffect(() => {
        const el = document.getElementById('native-loader');
        if (!el) return;
        el.classList.add('done');
        setTimeout(() => el.remove(), 550);
    }, []);

    useScrollReveal();

    useEffect(() => {
        if (!isLanding) return;
        const timer = setTimeout(() => setModalOpen(true), 600);
        return () => clearTimeout(timer);
    }, [isLanding]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="lp-root">
            {!isLanding && (
                <div ref={progressBarRef} className="gv-progress" />
            )}
            <Navbar isLanding={isLanding} />
            <Hero
                scrollY={scrollY}
                onOpenPicker={() => setModalOpen(true)}
                isLanding={isLanding}
            />
            {!isLanding && (
                <div className="gv">
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </div>
            )}
            <RolePickerModal
                open={modalOpen}
                current={role}
                onClose={() => setModalOpen(false)}
                isLanding={isLanding}
            />
        </div>
    );
}