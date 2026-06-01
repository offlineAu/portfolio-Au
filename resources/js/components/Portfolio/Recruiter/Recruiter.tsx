import { Head } from '@inertiajs/react';
import { About }    from '@/components/Portfolio/Recruiter/About';
import { Skills }   from '@/components/Portfolio/Recruiter/Skills';
import { Projects } from '@/components/Portfolio/Recruiter/Projects';
import { Contact }  from '@/components/Portfolio/Recruiter/Contact';
import { Navbar }   from '@/components/Portfolio/Landing/Navbar';
import '@/components/Portfolio/Landing/landing.css';

export default function Recruiter() {
    return (
        <div className="lp-root">
            <Head title="Recruiter View" />
            <Navbar isLanding={false} />
            <div className="gv">
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>
        </div>
    );
}