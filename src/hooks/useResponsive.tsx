// hooks/useResponsive.ts
import { useState, useEffect } from 'react';

export const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            // Determine device type
            if (window.innerWidth < 768) {
                setDeviceType('mobile');
            } else if (window.innerWidth < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        handleResize(); // Set initial values
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = deviceType === 'mobile';
    const isTablet = deviceType === 'tablet';
    const isDesktop = deviceType === 'desktop';

    return {
        windowSize,
        deviceType,
        isMobile,
        isTablet,
        isDesktop,
    };
};