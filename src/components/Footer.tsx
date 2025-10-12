import { Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';

const Footer = () => {
    const { profile } = portfolioData;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#2d2d2d] text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#783162]/10 rounded-full blur-3xl -translate-y-48 -translate-x-48"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl translate-y-32 translate-x-32"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back to Top Button */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-[#783162] hover:bg-[#d4af37] rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-[#783162]/30"
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>

                {/* Footer Content */}
                <div className="py-8 text-center">
                    {/* Name */}
                    <h3
                        className="text-2xl font-bold mb-4 text-white"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {profile.name}
                    </h3>

                    {/* Tagline */}
                    <p
                        className="text-[#d4af37] font-medium mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {profile.tagline}
                    </p>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        {['Home', 'About', 'CV', 'Portfolio', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-white/70 hover:text-[#d4af37] transition-colors font-medium"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#783162]/30 to-transparent mb-6"></div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-white/60">
                        <p style={{ fontFamily: 'Poppins, sans-serif' }}>
                            © {new Date().getFullYear()} {profile.name}. All rights reserved.
                        </p>
                        <div className="hidden md:block text-[#783162]">•</div>
                        <p
                            className="flex items-center gap-1"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Made with <Heart size={16} className="text-red-500" fill="currentColor" /> in Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;