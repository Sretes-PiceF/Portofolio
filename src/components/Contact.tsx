import { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { portfolioData } from '../mock/portofolioData';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { profile, socialMedia } = portfolioData;
    const { toast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [canAnimate, setCanAnimate] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const form = useRef<HTMLFormElement>(null); // ✅ fix TS useRef error

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // --- Scroll animation logic ---
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canAnimate && !isAtTop) {
                    setIsVisible(true);
                    setCanAnimate(false);
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [canAnimate, isAtTop]);

    // --- Input handler ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // --- Submit handler ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!form.current) return;

        try {
            await emailjs.sendForm(
                'service_9mbgo73', // ✅ ganti dengan SERVICE ID kamu
                'template_jd32qj6', // ✅ ganti dengan TEMPLATE ID kamu
                form.current,
                '3303t_dnfBDcl15NI' // ✅ ini PUBLIC KEY kamu
            );

            toast({
                title: "Message Sent Successfully!",
                description: "Thank you for your message. I'll get back to you soon.",
            });

            setFormData({ name: '', email: '', message: '' });
        }
        finally {
            setIsSubmitting(false);
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
            {/* Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#783162]/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6">
                            Let's <span className="text-[#783162]">Connect</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#783162] to-[#d4af37] mx-auto rounded-full"></div>
                        <p className="text-[#2d2d2d]/70 text-lg mt-6 max-w-2xl mx-auto">
                            Have a project in mind or want to collaborate? I'd love to hear from you!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Info */}
                        <div
                            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                        >
                            <h3 className="text-3xl font-bold text-[#2d2d2d] mb-8">Get in Touch</h3>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
                                    <div className="w-12 h-12 bg-[#783162] rounded-full flex items-center justify-center text-white">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#2d2d2d]">Email</h4>
                                        <p className="text-[#2d2d2d]/70">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
                                    <div className="w-12 h-12 bg-[#783162] rounded-full flex items-center justify-center text-white">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#2d2d2d]">Location</h4>
                                        <p className="text-[#2d2d2d]/70">{profile.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div>
                                <h4 className="text-xl font-bold text-[#2d2d2d] mb-6">Follow Me</h4>
                                <div className="flex gap-4">
                                    {Object.entries(socialMedia).map(([platform, url]) => {
                                        const Icon = socialIcons[platform as keyof typeof socialIcons];
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-white border-2 border-[#783162] rounded-full flex items-center justify-center text-[#783162] hover:bg-[#783162] hover:text-white hover:border-[#d4af37] hover:shadow-lg hover:scale-110 transition-all duration-300"
                                            >
                                                <Icon size={20} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div
                            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                                }`}
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold text-[#2d2d2d] mb-6">Send Message</h3>

                                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#783162] hover:bg-[#783162]/90 text-white py-3 px-6 rounded-xl"
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
