import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';

const Hero = () => {
    const { profile } = portfolioData;


    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] via-white to-[#f8f9fa] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#783162]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Profile Image */}
                    <div className="mb-12 mt-10 animate-fade-in">
                        <div className="w-48 h-48 mx-auto relative">
                            <div className="w-full h-full rounded-full border-4 border-[#783162] overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                                <img
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/30 animate-ping"></div>
                        </div>
                    </div>

                    {/* Name and Tagline */}
                    <div className="mb-8 animate-slide-up">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2d2d2d] mb-4"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {profile.name}
                        </h1>
                        <p
                            className="text-xl md:text-2xl text-[#783162] font-medium mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {profile.tagline}
                        </p>
                        <p
                            className="text-lg text-[#2d2d2d]/70 max-w-2xl mx-auto leading-relaxed"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {profile.description}
                        </p>
                    </div>
                    {/* Scroll Indicator */}
                    <div className="animate-bounce">
                        <button
                            onClick={scrollToAbout}
                            className="text-[#783162] hover:text-[#d4af37] transition-colors"
                        >
                            <ArrowDown size={32} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
        </section>
    );
};

export default Hero;