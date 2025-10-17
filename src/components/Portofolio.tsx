import { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../mock/portofolioData';

const Portfolio = () => {
    const { projects } = portfolioData;
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

    const ProjectCard = ({ project, index }) => (
        <div
            className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#783162]/20 transition-all duration-500 transform hover:scale-105 border border-[#f5f5f5] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            style={{ transitionDelay: `${index * 150 + 400}ms` }}
        >
            {/* Project Image */}
            <div className="relative overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#783162]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/70 backdrop-blur-md shadow-md transition-all duration-300
    "
                        onClick={() => window.open(project.githubLink, '_blank')}
                    >
                        <Github size={16} className="mr-1" />
                        Code
                    </Button>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <h3
                    className="text-xl font-bold text-[#2d2d2d] mb-3 group-hover:text-[#783162] transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {project.title}
                </h3>

                <p
                    className="text-[#2d2d2d]/70 leading-relaxed mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-[#f5f5f5] text-[#783162] text-sm font-medium rounded-full hover:bg-[#783162] hover:text-white transition-colors"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-4 border-t border-[#f5f5f5]">

                    <Button
                        variant="ghost"
                        className="flex-1 text-[#2d2d2d] hover:text-[#783162] hover:bg-[#783162]/5"
                        onClick={() => window.open(project.githubLink, '_blank')}
                    >
                        <Github size={16} className="mr-2" />
                        Source Code
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="py-20 bg-white relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#783162]/3 rounded-full blur-3xl -translate-y-48 -translate-x-48"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl translate-y-32 translate-x-32"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <span className="text-[#783162]">Portofolio</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full"></div>
                        <p
                            className="text-[#2d2d2d]/70 text-lg mt-6 max-w-2xl mx-auto"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Project yang pernah saya buat selama belajar di SMK Negeri 6 Malang. Sebagai bukti nyata kemampuan saya dalam mengembangkan aplikasi.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* View All Projects CTA */}
                    <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                        <Button
                            className="bg-[#783162] hover:bg-[#783162]/90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            onClick={() => window.open('https://github.com/Sretes-PiceF', '_blank')}
                        >
                            <Github size={20} className="mr-2" />
                            View All Projects on GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;