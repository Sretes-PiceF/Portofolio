const TechMarquee = () => {
    const technologies = [
        { name: 'React.js', icon: '⚛️', color: '#61DAFB' },
        { name: 'Node.js', icon: '🟢', color: '#339933' },
        { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
        { name: 'TypeScript', icon: '🔷', color: '#3178C6' },
        { name: 'Next.js', icon: '▲', color: '#000000' },
        { name: 'Docker', icon: '🐳', color: '#2496ED' },
        { name: 'Git', icon: '📝', color: '#F05032' },
        { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' }
    ];

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
                    {/* First Row - Left to Right */}
                    <div className="flex overflow-hidden whitespace-nowrap mb-4">
                        <div className="animate-marquee-left flex">
                            {[...technologies, ...technologies].map((tech, index) => (
                                <div
                                    key={`left-${index}`}
                                    className="flex items-center gap-3 mx-8 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#f5f5f5] min-w-fit"
                                    style={{
                                        borderLeft: `4px solid ${tech.color}20`
                                    }}
                                >
                                    <span className="text-2xl">{tech.icon}</span>
                                    <span
                                        className="font-semibold text-[#2d2d2d] text-lg"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Right to Left */}
                    <div className="flex overflow-hidden whitespace-nowrap">
                        <div className="animate-marquee-right flex">
                            {[...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, index) => (
                                <div
                                    key={`right-${index}`}
                                    className="flex items-center gap-3 mx-8 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#f5f5f5] min-w-fit"
                                    style={{
                                        borderRight: `4px solid ${tech.color}20`
                                    }}
                                >
                                    <span className="text-2xl">{tech.icon}</span>
                                    <span
                                        className="font-semibold text-[#2d2d2d] text-lg"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
        
        /* Pause animation on hover */
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default TechMarquee;