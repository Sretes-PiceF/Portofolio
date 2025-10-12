import { useEffect, useRef, useState } from 'react';
import { Code, Smartphone, Globe, Award, Zap } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';
import TechMarquee from './TechMarquee';

const About = () => {
    const { profile, skills } = portfolioData;

    // --- UI state
    const [isVisible, setIsVisible] = useState(false); // section pop-up (judul, teks, marquee)
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [skillsAnimated, setSkillsAnimated] = useState(false); // bar fill
    const [canAnimate, setCanAnimate] = useState(true); // true hanya saat user mulai dari top

    // refs
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const skillsRef = useRef<HTMLDivElement | null>(null);

    // internal ref: kalau skill area sudah di-view sebelum isVisible=true,
    // kita simpan antrian agar bar mulai setelah isVisible selesai.
    const pendingSkillsRef = useRef(false);
    // timer ref supaya bisa dibersihkan saat unmount / reset
    const timerRef = useRef<number | null>(null);

    // -------------------------
    // Reset animasi ketika user kembali ke paling atas (scrollY <= 20)
    // sehingga jika user mulai lagi dari top, animasi akan aktif kembali.
    // -------------------------
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= 20) {
                // reset agar animasi bisa terjadi lagi jika user mulai scroll dari top
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

    // -------------------------
    // IntersectionObserver untuk section (judul, teks, marquee)
    // Hanya trigger ketika canAnimate = true (artinya user memulai dari top).
    // -------------------------
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate) {
                    // tampilkan pop-up section
                    setIsVisible(true);
                }
            },
            { threshold: 0.18, rootMargin: '-60px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [canAnimate]);

    // -------------------------
    // IntersectionObserver untuk skill area.
    // - Jika skill area ter-observe dan canAnimate === true:
    //    * jika isVisible sudah true -> start delayed fill bar
    //    * jika isVisible belum true -> simpan pendingSkillsRef agar ter-trigger setelah isVisible
    // - Setelah skill fill dimulai -> setCanAnimate(false) supaya tidak re-trigger
    // -------------------------
    useEffect(() => {
        const skillsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate) {
                    // skill area terlihat
                    if (isVisible) {
                        // kalau section popup sudah tampil, mulai bar dengan delay halus
                        // delay supaya bar mulai *sesaat setelah* pop-up selesai
                        if (timerRef.current) window.clearTimeout(timerRef.current);
                        timerRef.current = window.setTimeout(() => {
                            setSkillsAnimated(true);
                            setCanAnimate(false); // jangan ulangi animasi sampai user kembali ke top
                            pendingSkillsRef.current = false;
                            timerRef.current = null;
                        }, 700); // 700ms delay agar pop-up terasa selesai dulu
                    } else {
                        // jika section belum pop-up, tandai pending
                        pendingSkillsRef.current = true;
                    }
                }
            },
            { threshold: 0.25, rootMargin: '-60px' }
        );

        if (skillsRef.current) skillsObserver.observe(skillsRef.current);
        return () => skillsObserver.disconnect();
    }, [canAnimate, isVisible]);

    // -------------------------
    // Kalau sebelumnya skill area sempat terlihat (pending) dan sekarang section pop-up muncul,
    // jalankan animasi bar setelah delay.
    // -------------------------
    useEffect(() => {
        if (isVisible && pendingSkillsRef.current && canAnimate) {
            // kalau ada pending (skill area sudah di-view) mulai delayed fill now
            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setSkillsAnimated(true);
                setCanAnimate(false);
                pendingSkillsRef.current = false;
                timerRef.current = null;
            }, 700);
        }
        // clear timer saat unmount / state change
        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isVisible, canAnimate]);

    // --- services static (hanya 3 service)
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
                                    // optional: stagger per-skill delay for a nicer cascade effect
                                    const perSkillDelay = 150 * idx; // ms
                                    return (
                                        <div
                                            key={skill.name}
                                            className="group relative"
                                            onMouseEnter={() => setHoveredSkill(skill.name)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-[#2d2d2d] cursor-pointer hover:text-[#783162] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {skill.name}
                                                </span>
                                                <span className="text-[#783162] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    {skill.level}%
                                                </span>
                                            </div>

                                            <div className="w-full bg-[#f5f5f5] rounded-full h-3 overflow-hidden relative">
                                                <div
                                                    // inline style untuk transisi width yang sangat smooth; gunakan cubic-bezier untuk feel natural
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: skillsAnimated ? `${skill.level}%` : '0%',
                                                        background: 'linear-gradient(90deg, #783162, #d4af37)',
                                                        transition: `width 1.4s cubic-bezier(.22,1,.36,1) ${skillsAnimated ? perSkillDelay + 200 : 0}ms`,
                                                    }}
                                                />
                                            </div>

                                            {/* Skill Popup */}
                                            {hoveredSkill === skill.name && (
                                                <div className="absolute left-0 -top-16 z-50 bg-white rounded-lg shadow-xl p-4 border border-[#783162]/20 min-w-[200px] animate-fadeIn">
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
                                                            {skill.level >= 90 ? 'Expert Level' : skill.level >= 80 ? 'Beginner' : 'Intermediate'}
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

                    {/* Services - Ditempatkan di tengah dengan 3 kolom */}
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

            {/* CSS kecil untuk popup fadeIn */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.22s ease-out forwards;
        }
      `}</style>
        </section>
    );
};

export default About;