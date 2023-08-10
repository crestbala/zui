import { useState, useEffect } from 'react';

function findScreenSize(screenWidth: number): string {
    switch (true) {
        case screenWidth < 600:
            return 'xs';
        case screenWidth >= 600 && screenWidth < 850:
            return 'sm';
        case screenWidth >= 850 && screenWidth < 1000:
            return 'md';
        case screenWidth >= 1000 && screenWidth < 1250:
            return 'lg';
        default:
            return 'xl';
    }
}

export const useScreenBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<string>('');
    useEffect(() => {
        const handleResize = () => setBreakpoint(findScreenSize(window.innerWidth))
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return breakpoint;
};