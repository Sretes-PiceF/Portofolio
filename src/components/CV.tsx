import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';

const CV = () => {
    const { education, experience } = portfolioData;
    const [isVisible, setIsVisible] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [canAnimate, setCanAnimate] = useState(true);
    const sectionRef = useRef(null);

    // Track scroll position to determine if at top
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 50) {
                // At the top - reset animation state
                setIsAtTop(true);
                setCanAnimate(true);
                setIsVisible(false);
            } else if (isAtTop && currentScrollY > 50) {
                // Just left the top - now can animate
                setIsAtTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAtTop]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate && !isAtTop) {
                    setIsVisible(true);
                    setCanAnimate(false); // Prevent re-animation until back to top
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-50px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [canAnimate, isAtTop]);

    const TimelineItem = ({ item, icon, index, type }) => (
        <div
            className={`relative pl-6 sm:pl-8 pb-6 sm:pb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
                }`}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
        >
            {/* Timeline line */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-[#783162]/20"></div>

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 sm:top-2 w-6 h-6 sm:w-8 sm:h-8 bg-white border-2 sm:border-4 border-[#783162] rounded-full flex items-center justify-center text-[#783162] shadow-lg z-10">
                {icon}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ml-2 sm:ml-4 border border-[#f5f5f5]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Calendar size={14} className="text-[#d4af37] flex-shrink-0" />
                    <span
                        className="text-[#783162] font-semibold text-xs sm:text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {item.year}
                    </span>
                </div>

                <h3
                    className="text-base sm:text-lg md:text-xl font-bold text-[#2d2d2d] mb-1 sm:mb-2 line-clamp-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {type === 'education' ? item.degree : item.position}
                </h3>

                <h4
                    className="text-sm sm:text-base md:text-lg text-[#783162] font-semibold mb-2 sm:mb-3 line-clamp-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {type === 'education' ? item.institution : item.company}
                </h4>

                <p
                    className="text-[#2d2d2d]/70 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {item.description}
                </p>
            </div>
        </div>
    );

    return (
        <section
            id="cv"
            ref={sectionRef}
            className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#f5f5f5] to-white relative overflow-hidden w-full"
        >
            {/* Background decoration - smaller on mobile */}
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#d4af37]/5 rounded-full blur-2xl md:blur-3xl translate-y-24 sm:translate-y-32 md:translate-y-48 -translate-x-24 sm:-translate-x-32 md:-translate-x-48"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Section Header */}
                    <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-4 sm:mb-6 px-2"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Curriculum <span className="text-[#783162]">Vitae</span>
                        </h2>
                        <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full mb-4 sm:mb-6"></div>
                        <p
                            className="text-[#2d2d2d]/70 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto px-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Riwayat pendidikan dan minat saya yang membentuk dasar ketertarikan saya dalam teknologi dan logika sistem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {/* Education */}
                        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'
                            }`}>
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#783162] rounded-full flex items-center justify-center text-white flex-shrink-0">
                                    <GraduationCap size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                </div>
                                <h3
                                    className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d2d2d]"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Pendidikan
                                </h3>
                            </div>

                            <div className="relative">
                                {education.map((item, index) => (
                                    <TimelineItem
                                        key={item.id}
                                        item={item}
                                        icon={<GraduationCap size={12} className="sm:w-4 sm:h-4" />}
                                        index={index}
                                        type="education"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
                            }`}>
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-white flex-shrink-0">
                                    <Briefcase size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                </div>
                                <h3
                                    className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d2d2d]"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Pengalaman
                                </h3>
                            </div>

                            <div className="relative">
                                {experience.map((item, index) => (
                                    <TimelineItem
                                        key={item.id}
                                        item={item}
                                        icon={<Briefcase size={12} className="sm:w-4 sm:h-4" />}
                                        index={index}
                                        type="experience"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add CSS for line clamp */}
            <style>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default CV;