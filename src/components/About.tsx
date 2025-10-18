import { useEffect, useRef, useState } from 'react';
import { Code, Smartphone, Globe, Award, Zap } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';
import TechMarquee from './TechMarquee';

const About = () => {
    const { profile, skills } = portfolioData;

    // UI state
    const [isVisible, setIsVisible] = useState(false); // section popup
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [skillsAnimated, setSkillsAnimated] = useState(false); // bar fill
    const [canAnimate, setCanAnimate] = useState(true); // true hanya kalau user mulai dari top
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // refs
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const skillsRef = useRef<HTMLDivElement | null>(null);
    const pendingSkillsRef = useRef(false);
    const timerRef = useRef<number | null>(null);

    // detect touch device (untuk fallback hover -> tap)
    useEffect(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
    }, []);

    // reset animasi saat user kembali ke top
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= 20) {
                setCanAnimate(true);
                setIsVisible(false);
                setSkillsAnimated(false);
                pendingSkillsRef.current = false;
                if (timerRef.current) {
                    window.clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver untuk section (judul, teks, marquee)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate) {
                    setIsVisible(true);
                }
            },
            // rootMargin dibuat sedikit positif/negatif agar andal pada perangkat kecil
            { threshold: 0.14, rootMargin: '-40px 0px -40px 0px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [canAnimate]);

    // IntersectionObserver untuk skill area
    useEffect(() => {
        const skillsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate) {
                    if (isVisible) {
                        if (timerRef.current) window.clearTimeout(timerRef.current);
                        // delay supaya popup section duluan lalu bar
                        timerRef.current = window.setTimeout(() => {
                            setSkillsAnimated(true);
                            setCanAnimate(false);
                            pendingSkillsRef.current = false;
                            timerRef.current = null;
                        }, 650);
                    } else {
                        // jika section belum muncul, tandai pending
                        pendingSkillsRef.current = true;
                    }
                }
            },
            { threshold: 0.2, rootMargin: '-30px 0px -30px 0px' }
        );

        if (skillsRef.current) skillsObserver.observe(skillsRef.current);
        return () => skillsObserver.disconnect();
    }, [canAnimate, isVisible]);

    // jika sebelumnya skill area terlihat (pending) dan sekarang section pop-up => jalankan bar
    useEffect(() => {
        if (isVisible && pendingSkillsRef.current && canAnimate) {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setSkillsAnimated(true);
                setCanAnimate(false);
                pendingSkillsRef.current = false;
                timerRef.current = null;
            }, 650);
        }

        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isVisible, canAnimate]);

    // Close popup when tapping/clicking outside (berguna di mobile untuk menutup skill popup)
    useEffect(() => {
        const handleDocClick = (e: MouseEvent | TouchEvent) => {
            const el = e.target as Node | null;
            if (!el) return;
            // kalau klik/tap bukan di dalam skill popup atau skill item, tutup popup
            const popup = document.querySelector('.skill-popup');
            const skillItems = document.querySelectorAll('.skill-item');
            const clickedInsidePopup = popup && popup.contains(el);
            let clickedSkillItem = false;
            skillItems.forEach((it) => {
                if (it.contains(el)) clickedSkillItem = true;
            });
            if (!clickedInsidePopup && !clickedSkillItem) {
                setHoveredSkill(null);
            }
        };

        document.addEventListener('click', handleDocClick);
        document.addEventListener('touchstart', handleDocClick);
        return () => {
            document.removeEventListener('click', handleDocClick);
            document.removeEventListener('touchstart', handleDocClick);
        };
    }, []);

    // services
    const services = [
        {
            icon: <Code size={32} />,
            title: 'Frontend Development',
            description:
                'Membuat antarmuka pengguna yang responsif dan interaktif dengan React.js dan kerangka kerja modern lainnya',
        },
        {
            icon: <Globe size={32} />,
            title: 'Backend Development',
            description:
                'Membangun aplikasi sisi server yang kuat dengan Node.js, PHP, ASP .NET, dan database management',
        },
        {
            icon: <Smartphone size={32} />,
            title: 'Mobile Development',
            description:
                'Mengembangkan aplikasi Android atau IOS lintas platform dengan React Native dan Flutter',
        },
    ];

    return (
        <section id="about" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#783162]/10 rounded-full blur-3xl -translate-y-48 translate-x-48 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div
                        className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Tentang <span className="text-[#783162]">Saya</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full" />
                    </div>

                    {/* Tech Marquee */}
                    <div className={`transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <TechMarquee />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        {/* About Text */}
                        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <h3 className="text-2xl font-bold text-[#2d2d2d] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Peminat Pengembangan Backend
                            </h3>

                            <p className="text-[#2d2d2d]/80 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {profile.description}
                            </p>

                            <p className="text-[#2d2d2d]/80 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Sebagai pembelajar yang antusias, saya sedang mencari kesempatan untuk menerapkan pengetahuan saya dalam proyek nyata, belajar dari developer berpengalaman, dan mengasah keterampilan dalam teknologi backend. Saya percaya pada pentingnya menulis kode yang bersih dan terstruktur, serta bersemangat untuk dapat berkontribusi dalam pekerjaan pengembangan yang bermakna.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-[#783162]" style={{ fontFamily: 'Poppins, sans-serif' }}>Email:</span>
                                    <span className="text-[#2d2d2d]" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-[#783162]" style={{ fontFamily: 'Poppins, sans-serif' }}>Location:</span>
                                    <span className="text-[#2d2d2d]" style={{ fontFamily: 'Poppins, sans-serif' }}>{profile.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Technical Skills */}
                        <div ref={skillsRef} className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                            <h3 className="text-2xl font-bold text-[#2d2d2d] mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Keahlian
                            </h3>

                            <div className="space-y-6">
                                {skills.map((skill, idx) => {
                                    const perSkillDelay = 150 * idx;
                                    return (
                                        <div
                                            key={skill.name}
                                            className="group relative skill-item"
                                            // desktop: hover, mobile: tap
                                            onMouseEnter={() => !isTouchDevice && setHoveredSkill(skill.name)}
                                            onMouseLeave={() => !isTouchDevice && setHoveredSkill(null)}
                                            onClick={() => {
                                                if (isTouchDevice) {
                                                    // toggle popup on touch devices
                                                    setHoveredSkill((prev) => (prev === skill.name ? null : skill.name));
                                                }
                                            }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <button
                                                    // use button for accessibility on mobile (tap target)
                                                    className="font-medium text-[#2d2d2d] hover:text-[#783162] transition-colors"
                                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                                    onClick={(e) => {
                                                        // prevent outer click handler duplication
                                                        e.stopPropagation();
                                                        if (isTouchDevice) {
                                                            setHoveredSkill((prev) => (prev === skill.name ? null : skill.name));
                                                        }
                                                    }}
                                                >
                                                    {skill.name}
                                                </button>
                                                <span className="text-[#783162] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {skill.level}%
                                                </span>
                                            </div>

                                            <div className="w-full bg-[#f5f5f5] rounded-full h-3 overflow-hidden relative">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: skillsAnimated ? `${skill.level}%` : '0%',
                                                        background: 'linear-gradient(90deg, #783162, #d4af37)',
                                                        transition: `width 1.4s cubic-bezier(.22,1,.36,1) ${skillsAnimated ? perSkillDelay + 200 : 0}ms`,
                                                    }}
                                                />
                                            </div>

                                            {/* Skill Popup (use class skill-popup for outside click detection) */}
                                            {hoveredSkill === skill.name && (
                                                <div
                                                    className="skill-popup absolute left-0 -top-36 z-50 bg-white rounded-lg shadow-xl p-4 border border-[#783162]/20 min-w-[200px]"
                                                    style={{ animation: 'fadeIn 0.22s ease-out forwards' }}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="font-bold text-[#783162]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                            {skill.name}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Zap size={16} className="text-[#d4af37]" />
                                                        <span className="text-sm text-[#2d2d2d] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                            Proficiency: {skill.level}%
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Award size={16} className="text-[#783162]" />
                                                        <span className="text-xs text-[#2d2d2d]/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                            {skill.level >= 90 ? 'Expert Level' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                                                        </span>
                                                    </div>
                                                    <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="text-3xl font-bold text-center text-[#2d2d2d] mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Kemampuan <span className="text-[#783162]">Saya</span>
                        </h3>
                        <div className="flex justify-center">
                            <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
                                {services.map((service) => (
                                    <div
                                        key={service.title}
                                        className="text-center p-6 bg-[#f5f5f5] rounded-2xl hover:shadow-lg hover:shadow-[#783162]/10 transition-all duration-300 transform hover:scale-105 group"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#783162] group-hover:text-[#d4af37] transition-colors shadow-lg">
                                            {service.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-[#2d2d2d] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {service.title}
                                        </h4>
                                        <p className="text-[#2d2d2d]/70 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS kecil */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
        </section>
    );
};

export default About;
