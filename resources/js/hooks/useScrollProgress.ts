import { useEffect, useRef } from 'react';

export function useScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function update() {
            const scrolled = window.scrollY;
            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (scrolled / total) * 100 : 0;
            if (barRef.current) {
                barRef.current.style.width = pct + '%';
            }
        }

        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    return barRef;
}