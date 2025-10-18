import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../mock/portofolioData';

const Hero = () => {
    const { profile } = portfolioData;

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-[#f5f5f5] via-white to-[#f8f9fa] 
                 relative overflow-hidden px-6 sm:px-8 md:px-12 
                 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32"
        >
            {/* Background decorative bubbles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-16 sm:right-24 w-52 sm:w-72 h-52 sm:h-72 bg-[#783162]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl text-center">
                {/* Profile image */}
                <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 mx-auto">
                        <div
                            className="w-full h-full rounded-full border-4 border-[#783162]
                         overflow-hidden shadow-2xl hover:scale-105
                         transition-transform duration-500 ease-out"
                        >
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/30 animate-ping"></div>
                    </div>
                </div>

                {/* Name + Tagline + Description */}
                <div className="animate-slide-up">
                    <h1
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
                       font-bold text-[#2d2d2d] mb-3 sm:mb-4 md:mb-6
                       leading-snug"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {profile.name}
                    </h1>

                    <p
                        className="text-base sm:text-lg md:text-xl text-[#783162] 
                       font-semibold mb-4 sm:mb-6 md:mb-8
                       tracking-wide px-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {profile.tagline}
                    </p>

                    <p
                        className="text-sm sm:text-base md:text-lg text-[#2d2d2d]/80 
                       max-w-[90%] sm:max-w-[600px] md:max-w-[750px] mx-auto 
                       leading-relaxed text-justify sm:text-center
                       px-2 sm:px-0"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {profile.description}
                    </p>
                </div>

                {/* Scroll Down Button */}
                <div className="mt-10 sm:mt-12 md:mt-16 animate-bounce">
                    <button
                        onClick={scrollToAbout}
                        className="text-[#783162] hover:text-[#d4af37] transition-colors duration-300"
                        aria-label="Scroll to About Section"
                    >
                        <ArrowDown size={34} className="mx-auto" />
                    </button>
                </div>
            </div>

            {/* Animations */}
            <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1.2s ease-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>
        </section>
    );
};

export default Hero;
