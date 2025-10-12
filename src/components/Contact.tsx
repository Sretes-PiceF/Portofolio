import { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { portfolioData } from '../mock/portofolioData';

const Contact = () => {
    const { profile, socialMedia } = portfolioData;
    const { toast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [canAnimate, setCanAnimate] = useState(true);
    const sectionRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Mock form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast({
                title: "Message Sent Successfully!",
                description: "Thank you for your message. I'll get back to you soon.",
            });

            setFormData({ name: '', email: '', message: '' });
        } catch { // eslint-disable-next-line @typescript-eslint/no-unused-vars
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        }
    };

    const socialIcons = {
        instagram: Instagram,
        linkedin: Linkedin,
        github: Github,
        twitter: Twitter
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-[#f5f5f5] to-white relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#783162]/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Let's <span className="text-[#783162]">Connect</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full"></div>
                        <p
                            className="text-[#2d2d2d]/70 text-lg mt-6 max-w-2xl mx-auto"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Have a project in mind or want to collaborate? I'd love to hear from you!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'
                            }`}>
                            <h3
                                className="text-3xl font-bold text-[#2d2d2d] mb-8"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Get in Touch
                            </h3>

                            {/* Contact Details */}
                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-[#783162] rounded-full flex items-center justify-center text-white">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4
                                            className="font-semibold text-[#2d2d2d]"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            Email
                                        </h4>
                                        <p
                                            className="text-[#2d2d2d]/70"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            {profile.email}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-[#783162] rounded-full flex items-center justify-center text-white">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4
                                            className="font-semibold text-[#2d2d2d]"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            Location
                                        </h4>
                                        <p
                                            className="text-[#2d2d2d]/70"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            {profile.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4
                                    className="text-xl font-bold text-[#2d2d2d] mb-6"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Follow Me
                                </h4>
                                <div className="flex gap-4">
                                    {Object.entries(socialMedia).map(([platform, url]) => {
                                        const IconComponent = socialIcons[platform];
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-white border-2 border-[#783162] rounded-full flex items-center justify-center text-[#783162] hover:bg-[#783162] hover:text-white hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#783162]/30 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <IconComponent size={20} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
                            }`}>
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#f5f5f5]">
                                <h3
                                    className="text-2xl font-bold text-[#2d2d2d] mb-6"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Send Message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-[#f5f5f5] focus:border-[#783162] focus:ring-0 transition-colors"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-[#f5f5f5] focus:border-[#783162] focus:ring-0 transition-colors"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>

                                    <div>
                                        <Textarea
                                            name="message"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-[#f5f5f5] focus:border-[#783162] focus:ring-0 resize-none transition-colors"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#783162] hover:bg-[#783162]/90 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send size={20} />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;