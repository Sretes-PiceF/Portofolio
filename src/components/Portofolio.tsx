import { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../mock/portofolioData';
import { Project } from '../types/portofolio';

const Portfolio = () => {
    const { projects } = portfolioData;
    const [isVisible, setIsVisible] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [canAnimate, setCanAnimate] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    // Deteksi posisi scroll (apakah di atas halaman)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 50) {
                setIsAtTop(true);
                setCanAnimate(true);
                setIsVisible(false);
            } else if (isAtTop && currentScrollY > 50) {
                setIsAtTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAtTop]);

    // Observer untuk animasi saat Portofolio terlihat
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate && !isAtTop) {
                    setIsVisible(true);
                    setCanAnimate(false);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-50px 0px -50px 0px',
            }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [canAnimate, isAtTop]);

    const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
        const isEven = index % 2 === 0;

        return (
            <div
                className={`
                group bg-white rounded-xl md:rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-xl md:hover:shadow-2xl hover:shadow-[#783162]/20 
                border border-[#f5f5f5] w-full transition-all duration-[1200ms] 
                transform ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isVisible
                        ? 'opacity-100 translate-x-0 scale-100'
                        : `opacity-0 ${isEven ? '-translate-x-16' : 'translate-x-16'} scale-95`
                    }
            `}
                style={{
                    transitionDelay: `${index * 150 + 300}ms`, // efek stagger
                }}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#783162]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
                        <Button
                            size="sm"
                            className="bg-black/20 backdrop-blur-md text-white border border-white/20 hover:bg-black/30 hover:border-white/40 transition-all duration-500 text-xs sm:text-sm min-h-8 sm:min-h-9 transform hover:scale-105"
                            onClick={() => window.open(project.githubLink, '_blank')}
                        >
                            <Github size={14} className="mr-1 sm:mr-2" />
                            Code
                        </Button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    <h3
                        className="text-lg sm:text-xl font-bold text-[#2d2d2d] mb-2 sm:mb-3 group-hover:text-[#783162] transition-colors duration-500 line-clamp-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {project.title}
                    </h3>
                    <p
                        className="text-[#2d2d2d]/70 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3 transition-colors duration-500 group-hover:text-[#2d2d2d]/80"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-2 sm:px-3 py-1 bg-[#f5f5f5] text-[#783162] text-xs sm:text-sm font-medium rounded-full hover:bg-[#783162] hover:text-white transition-all duration-500 transform hover:scale-105"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[#f5f5f5]">
                        <Button
                            variant="ghost"
                            className="flex-1 text-[#2d2d2d] hover:text-[#783162] hover:bg-[#783162]/5 text-xs sm:text-sm min-h-9 sm:min-h-10 transition-all duration-500 transform hover:scale-105"
                            onClick={() => window.open(project.githubLink, '_blank')}
                        >
                            <Github size={14} className="mr-1 sm:mr-2" />
                            Source Code
                        </Button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="py-12 sm:py-16 md:py-20 bg-white relative w-full overflow-hidden"
        >
            {/* Background */}
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#783162]/3 rounded-full blur-2xl md:blur-3xl -translate-y-24 -translate-x-24"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#d4af37]/5 rounded-full blur-2xl md:blur-3xl translate-y-16 translate-x-16"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <div
                        className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-4 sm:mb-6 px-2"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <span className="text-[#783162]">Portofolio</span>
                        </h2>
                        <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full mb-4 sm:mb-6"></div>
                        <p
                            className="text-[#2d2d2d]/70 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto px-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Project yang pernah saya buat selama belajar di SMK Negeri 6 Malang. Sebagai bukti nyata kemampuan saya dalam mengembangkan aplikasi.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div
                        className={`text-center mt-10 transition-all duration-1000 ease-out ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                            }`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        <Button
                            className="bg-[#783162] hover:bg-[#783162]/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            onClick={() => window.open('https://github.com/Sretes-PiceF', '_blank')}
                        >
                            <Github size={16} className="mr-2" />
                            Melihat Semua Project
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
