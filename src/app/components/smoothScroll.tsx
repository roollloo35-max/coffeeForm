'use client'

import { useEffect } from "react"

export default function SmoothScroll() {
    
    useEffect(()=> {

        const handleClick = (e: MouseEvent) => {

            const link = (e.target as Element).closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if(!href || href === '#') return;

            e.preventDefault();

            const targetEl = document.querySelector(href);
            if(!targetEl) return;
            
            const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })

            document.addEventListener('click', handleClick)

            return () => {
                document.removeEventListener('click', handleClick)
            }
        }

    }, [])
    return null;
}

