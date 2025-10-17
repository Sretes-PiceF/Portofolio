import { ExternalLink } from 'lucide-react';

const TechMarquee = () => {
    const technologies = [
        {
            name: 'React.js',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            color: '#61DAFB',
            link: 'https://react.dev/'
        },
        {
            name: 'Node.js',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            color: '#339933',
            link: 'https://nodejs.org/en/docs'
        },
        {
            name: 'JavaScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            color: '#F7DF1E',
            link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
            name: 'TypeScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
            color: '#3178C6',
            link: 'https://www.typescriptlang.org/docs/'
        },
        {
            name: 'Next.js',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            color: '#000000',
            link: 'https://nextjs.org/docs'
        },
        {
            name: 'Laravel',
            icon: 'https://www.vectorlogo.zone/logos/laravel/laravel-icon.svg',
            color: '#FF2D20',
            link: 'https://laravel.com/docs'
        },
        {
            name: 'PHP',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            color: '#777BB4',
            link: 'https://www.php.net/docs.php'
        },
        {
            name: 'MySQL',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            color: '#4479A1',
            link: 'https://dev.mysql.com/doc/'
        },
        {
            name: 'PostgreSQL',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            color: '#4169E1',
            link: 'https://www.postgresql.org/docs/'
        },
        {
            name: 'Git',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            color: '#F05032',
            link: 'https://git-scm.com/doc'
        },
        {
            name: '.NET',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
            color: '#512BD4',
            link: 'https://learn.microsoft.com/en-us/dotnet/'
        }
    ];

    // Fungsi untuk membuka dokumentasi
    const openDocumentation = (url: string, event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }
        console.log('Opening documentation:', url);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Fungsi handler untuk error gambar
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        console.warn(`Logo not found: ${target.src}`);
        target.style.display = 'none';
    };

    return (
        <div className="w-full overflow-hidden bg-white py-12 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#783162]/5 via-transparent to-[#d4af37]/5"></div>

            <div className="relative">
                {/* Header */}
                <div className="text-center mb-8">
                    <h3
                        className="text-2xl font-bold text-[#2d2d2d] mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Teknologi & <span className="text-[#783162]">Framework</span>
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto"></div>
                </div>

                {/* Marquee Container */}
                <div className="relative">
                    {/* Gradient overlays untuk efek fade */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* First Row - Left to Right */}
                    <div className="flex overflow-hidden mb-4">
                        <div className="flex animate-marquee-smooth">
                            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                                <button
                                    key={`left-${index}`}
                                    onClick={(e) => openDocumentation(tech.link, e)}
                                    className="flex items-center gap-3 mx-6 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#f5f5f5] min-w-fit group cursor-pointer relative focus:outline-none focus:ring-0 focus:shadow-lg"
                                    style={{
                                        borderLeft: `4px solid ${tech.color}`
                                    }}
                                    title={`Klik untuk membuka dokumentasi ${tech.name}`}
                                >
                                    {/* Logo SVG berwarna asli */}
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className="w-8 h-8 object-contain"
                                        onError={handleImageError}
                                    />
                                    {/* Teks */}
                                    <span
                                        className="font-semibold text-[#2d2d2d] text-lg whitespace-nowrap group-hover:text-[#783162] transition-colors duration-300"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {tech.name}
                                    </span>

                                    {/* External Link Icon - muncul saat hover */}
                                    <ExternalLink
                                        size={14}
                                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#783162] bg-white rounded-full p-1 shadow-md"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Right to Left */}
                    <div className="flex overflow-hidden">
                        <div className="flex animate-marquee-smooth-reverse">
                            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                                <button
                                    key={`right-${index}`}
                                    onClick={(e) => openDocumentation(tech.link, e)}
                                    className="flex items-center gap-3 mx-6 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#f5f5f5] min-w-fit group cursor-pointer relative focus:outline-none focus:ring-0 focus:shadow-lg"
                                    style={{
                                        borderRight: `4px solid ${tech.color}`
                                    }}
                                    title={`Klik untuk membuka dokumentasi ${tech.name}`}
                                >
                                    {/* Logo SVG berwarna asli */}
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className="w-8 h-8 object-contain"
                                        onError={handleImageError}
                                    />
                                    {/* Teks */}
                                    <span
                                        className="font-semibold text-[#2d2d2d] text-lg whitespace-nowrap group-hover:text-[#783162] transition-colors duration-300"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {tech.name}
                                    </span>

                                    {/* External Link Icon - muncul saat hover */}
                                    <ExternalLink
                                        size={14}
                                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#783162] bg-white rounded-full p-1 shadow-md"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes marquee-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marquee-smooth-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee-smooth {
          animation: marquee-smooth 45s linear infinite;
          will-change: transform;
        }
        
        .animate-marquee-smooth-reverse {
          animation: marquee-smooth-reverse 50s linear infinite;
          will-change: transform;
        }
        
        /* Hilangkan jeda dengan backface visibility */
        .animate-marquee-smooth,
        .animate-marquee-smooth-reverse {
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Smooth hover effect */
        .group:hover {
          transform: scale(1.05);
          z-index: 10;
        }
        
        /* Pause animation on hover */
        .flex.animate-marquee-smooth:hover,
        .flex.animate-marquee-smooth-reverse:hover {
          animation-play-state: paused;
        }
        
        /* Pastikan logo tidak ada filter atau animasi */
        img {
          filter: none !important;
          animation: none !important;
        }
        
        /* Improve rendering performance */
        .flex.animate-marquee-smooth,
        .flex.animate-marquee-smooth-reverse {
          transform-style: preserve-3d;
        }

        /* HAPUS SEMUA FOCUS STYLES YANG MENIMBULKAN BAYANGAN UNGU */
        button {
          outline: none;
          user-select: none;
        }

        button:focus {
          outline: none;
          ring: none;
          box-shadow: none;
        }

        button:focus-visible {
          outline: none;
          ring: none;
          box-shadow: none;
        }

        /* Active state untuk button - tanpa bayangan ungu */
        button:active {
          transform: scale(0.98);
        }

        /* Hapus semua ring color default browser */
        button:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>
        </div>
    );
};

export default TechMarquee;