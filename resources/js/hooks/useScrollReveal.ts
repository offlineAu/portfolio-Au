import { useEffect } from 'react';

export function useScrollReveal() {
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('visible');

                    // Animate skill bars
                    const bar = entry.target.querySelector<HTMLElement>('.gv-skill-bar');
                    if (bar) {
                        const pct = bar.dataset.pct;
                        setTimeout(() => {
                            bar.style.width = pct + '%';
                            bar.classList.add('animated');
                        }, 80);
                    }

                    // Animate counters
                    entry.target
                        .querySelectorAll<HTMLElement>('[data-count]')
                        .forEach((el) => {
                            const target = parseInt(el.dataset.count ?? '0');
                            let current = 0;
                            const step = Math.ceil(target / 40);
                            const interval = setInterval(() => {
                                current = Math.min(current + step, target);
                                el.textContent = String(current);
                                if (current >= target) clearInterval(interval);
                            }, 28);
                        });
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
        );

        document
            .querySelectorAll('.gv-reveal, .gv-reveal-left, .gv-reveal-right')
            .forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);
}