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
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [canAnimate, isAtTop]);

    const TimelineItem = ({ item, icon, index, type }) => (
        <div
            className={`relative pl-8 pb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
                }`}
            style={{ transitionDelay: `${index * 200 + 400}ms` }}
        >
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#783162]/20"></div>

            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-8 h-8 bg-white border-4 border-[#783162] rounded-full flex items-center justify-center text-[#783162] shadow-lg">
                {icon}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ml-4 border border-[#f5f5f5]">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-[#d4af37]" />
                    <span
                        className="text-[#783162] font-semibold text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {item.year}
                    </span>
                </div>

                <h3
                    className="text-xl font-bold text-[#2d2d2d] mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {type === 'education' ? item.degree : item.position}
                </h3>

                <h4
                    className="text-lg text-[#783162] font-semibold mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {type === 'education' ? item.institution : item.company}
                </h4>

                <p
                    className="text-[#2d2d2d]/70 leading-relaxed"
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
            className="py-20 bg-gradient-to-br from-[#f5f5f5] to-white relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Curriculum <span className="text-[#783162]">Vitae</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full"></div>
                        <p
                            className="text-[#2d2d2d]/70 text-lg mt-6 max-w-2xl mx-auto"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Riwayat pendidikan dan minat saya yang membentuk dasar ketertarikan saya dalam teknologi dan logika sistem.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Education */}
                        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'
                            }`}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-[#783162] rounded-full flex items-center justify-center text-white">
                                    <GraduationCap size={24} />
                                </div>
                                <h3
                                    className="text-3xl font-bold text-[#2d2d2d]"
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
                                        icon={<GraduationCap size={16} />}
                                        index={index}
                                        type="education"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
                            }`}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center text-white">
                                    <Briefcase size={24} />
                                </div>
                                <h3
                                    className="text-3xl font-bold text-[#2d2d2d]"
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
                                        icon={<Briefcase size={16} />}
                                        index={index}
                                        type="experience"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CV;