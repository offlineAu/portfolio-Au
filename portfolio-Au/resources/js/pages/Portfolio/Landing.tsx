import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Navbar } from '@/components/Portfolio/Landing/Navbar';
import { Hero } from '@/components/Portfolio/Landing/Hero';
import { About } from '@/components/Portfolio/Landing/About';
import { Skills } from '@/components/Portfolio/Landing/Skills';
import { Projects } from '@/components/Portfolio/Landing/Projects';
import { Contact } from '@/components/Portfolio/Landing/Contact';
import { RolePickerModal } from '@/components/Portfolio/Landing/RolePickerModal';
import '@/components/Portfolio/Landing/landing.css';


export default function Landing() {
    const role = useRole();
    const [scrollY, setScrollY] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const progressBarRef = useScrollProgress();

    useScrollReveal();

    useEffect(() => {
        const timer = setTimeout(() => setModalOpen(true), 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="lp-root">
            <div ref={progressBarRef} className="gv-progress" />

            <Navbar /> 

            <Hero
                scrollY={scrollY}
                onOpenPicker={() => setModalOpen(true)}
            />

            <div className="gv">
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>

            <RolePickerModal
                open={modalOpen}
                current={role}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}