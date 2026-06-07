import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationPage from './components/LocationPage';
import SEOHead from './components/SEOHead';

import { locations, getLocationBySlug } from './data/locations';
import {
  ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, Phone, Quote, Star, X, Maximize2, Loader2, Send
} from 'lucide-react';
import { NavigationLinks, ProjectImage, BlogPost } from './types';

// Import images
import heroImage from './images/beautifully-maintained-green-lawn.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img7 from './images/7.jpg';
import img8 from './images/8.jpg';
import img15 from './images/15.jpg';
import img16 from './images/car1.jpg';
import logoWhite from './images/logo_white.jpg';
import img21 from './images/arrows.png'; // Assuming this exists based on reference
import img23 from './images/beautifully-maintained-green-lawn.jpg'; // Reusing hero for consistency if specific bg missing
import img25 from './images/logo_white.jpg';

const business = {
  name: 'James Lewis Interiors',
  owner: 'James Lewis',
  tagline: 'Building better spaces. Craftsmanship you can trust. Commercial and residential work done right.',
  phoneDisplay: '07311123078',
  phoneTel: '07896832992',
  email: 'jameslewisinteriors@gmail.com',
  location: 'Shropshire, UK',
  serviceArea: 'Shropshire and nearby areas',
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
};

const services = [
  {
    title: 'Suspended Ceilings',
    description: 'Clean, level ceiling systems for corridors, offices, shops, and domestic spaces.',
    icon: CheckCircle,
  },
  {
    title: 'Ceiling Tile Replacement',
    description: 'Replacement and repair work for damaged tiles, center tiles, and access panels.',
    icon: CheckCircle,
  },
  {
    title: 'Metal Stud Partitions',
    description: 'Practical partition walls and room splits for fit-outs, refurbishments, and reconfiguration.',
    icon: CheckCircle,
  },
  {
    title: 'Drylining & Boarding',
    description: 'Straightforward boarding and drylining for a crisp finish that is ready for decoration.',
    icon: CheckCircle,
  },
  {
    title: 'Renovation Work',
    description: 'Commercial and residential renovation support with a tidy finish and clear communication.',
    icon: CheckCircle,
  },
  {
    title: 'Fit-Out Support',
    description: 'A practical tradesman approach for small works, finishings, and coordination on site.',
    icon: CheckCircle,
  },
];

const testimonials = [
  {
    name: 'Local Client',
    location: 'Shropshire',
    rating: 5,
    time: 'Recently',
    text: 'Finished the project cleanly and the alignment was spot on. Really pleased with the result.',
  },
  {
    name: 'Commercial Customer',
    location: 'Shropshire',
    rating: 5,
    time: 'Recently',
    text: 'The corridor ceiling looks excellent and the work was carried out neatly from start to finish.',
  },
  {
    name: 'Residential Customer',
    location: 'Shropshire',
    rating: 5,
    time: 'Recently',
    text: 'Clear quote, reliable timing, and a finish that made the room feel complete.',
  },
];

const galleryImages: ProjectImage[] = [
  { id: '1', url: img1, title: 'Ceiling detail' },
  { id: '2', url: img2, title: 'Fit-out work' },
  { id: '3', url: img3, title: 'Clean finish' },
  { id: '4', url: img4, title: 'Renovation detail' },
  { id: '5', url: img5, title: 'Center tile install' },
  { id: '6', url: img6, title: 'Commercial ceiling' },
  { id: '7', url: img7, title: 'Alignment work' },
  { id: '8', url: img8, title: 'Suspended ceiling grid' },
  { id: '15', url: img15, title: 'Project finish' },
  { id: '16', url: img16, title: 'Site prep' },
];

// --- Utility Components ---

const BeforeAfterSlider: React.FC<{ beforeImage: string | Record<string, unknown>; afterImage: string | Record<string, unknown>; }> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="absolute inset-0">
        <img src={String(afterImage)} alt="After" className="w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 right-4 bg-gold-500 text-earth-900 px-4 py-2 rounded-full font-bold shadow-lg">
          After
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img src={String(beforeImage)} alt="Before" className="w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          Before
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="flex gap-1">
            <div className="w-0.5 h-6 bg-gray-400"></div>
            <div className="w-0.5 h-6 bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ subtitle: string; title: string; align?: 'left' | 'center' }> = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-earth-900 relative inline-block">
      {title}
      <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gold-500"></span>
    </h2>
  </div>
);

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ""); // Add your Web3Forms key here

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setShowPopup(true);
        form.reset();
      } else {
        console.error("Web3Forms Error:", data);
        alert("Error sending: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-black p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto lg:mx-0">
        <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-6 md:mb-8 uppercase font-sans">
          Get a Free Quote Today
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white font-bold text-sm mb-1">Your Name *</label>
            <input id="name" type="text" name="name" placeholder="Your Name" className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-white font-bold text-sm mb-1">Phone *</label>
            <input id="phone" type="tel" name="phone" placeholder={business.phoneDisplay} className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base" required />
          </div>
          <div>
            <label htmlFor="city" className="block text-white font-bold text-sm mb-1">Your City *</label>
            <input id="city" type="text" name="city" placeholder="Shropshire" className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-white font-bold text-sm mb-1">How can we help? *</label>
            <textarea id="message" name="message" placeholder="Project details..." rows={3} className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm resize-none" required />
          </div>
          <div className="flex items-start gap-2">
            <input id="agb" type="checkbox" className="mt-1" required />
            <label htmlFor="agb" className="text-xs text-gray-300">
              I agree to the <a href="/agb" className="text-gold-500 underline hover:text-gold-400 transition-colors">Terms</a> and allow contact.
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#c5a26a] hover:bg-[#b08d55] text-white font-black uppercase py-4 rounded-md text-lg md:text-xl tracking-wide transition-colors duration-300 mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (<><Loader2 className="animate-spin mr-2 h-5 w-5" /> Sending...</>) : ('Send Request')}
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative transform transition-all scale-100">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Thank You!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">We have received your request. Our team will contact you shortly.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#c5a26a] text-white font-bold py-3 rounded-lg hover:bg-[#b08d55] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ContactFormMobile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ""); // Add your Web3Forms key here

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setShowPopup(true);
        form.reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Your Name *</label>
          <input type="text" name="name" placeholder="Your Name" className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#c5a26a] text-sm font-medium" required />
        </div>
        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Phone *</label>
          <input type="tel" name="phone" placeholder={business.phoneDisplay} className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#c5a26a] text-sm font-medium" required />
        </div>
        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">Your City *</label>
          <input type="text" name="city" placeholder="Shropshire" className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#c5a26a] text-sm font-medium" required />
        </div>
        <div>
          <label className="block text-[#1a1c1d] font-bold text-xs mb-2 pl-1">How can we help? *</label>
          <textarea name="message" placeholder="Project details..." rows={4} className="w-full px-4 py-4 rounded-xl bg-[#f8f9fa] border-none text-[#1a1c1d] placeholder:text-gray-400 focus:ring-2 focus:ring-[#c5a26a] text-sm resize-none font-medium" required />
        </div>
        <div className="flex items-start gap-3 mt-4 px-1">
          <input type="checkbox" className="mt-1 accent-[#c5a26a] w-4 h-4" required id="agb-mob-inner" />
          <label htmlFor="agb-mob-inner" className="text-[11px] text-gray-500 leading-normal">
            I agree to the <a href="/agb" className="text-[#c5a26a] font-bold underline">Terms</a> and allow contact.
          </label>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-[#c5a26a] text-white font-black py-4 rounded-xl uppercase tracking-wider shadow-xl shadow-stone-900/10 active:scale-[0.98] transition-all disabled:opacity-50 mt-6 text-base">
          {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
        </button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-8 text-sm">We have received your request and will contact you shortly.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#c5a26a] text-white font-bold py-3 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Page Sections ---

const Hero = () => {
  return (
    <>
      {/* Mobile Hero */}
      <div className="lg:hidden flex flex-col bg-stone-100">
        <div className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: `url("${img23}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center flex flex-col items-center top-[-40px]">
            <span className="text-[#c5a26a] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 animate-[fadeInUp_0.8s_ease-out]">
              Shropshire, UK
            </span>
            <h1 className="text-4xl font-serif text-white leading-[1.1] animate-[fadeInUp_1s_ease-out] drop-shadow-lg">
              James Lewis <br />
              <span className="text-[#c5a26a] italic font-light block mt-2">Interiors</span>
            </h1>
            <p className="text-white text-lg leading-relaxed max-w-[340px] mx-auto my-8 animate-[fadeInUp_1.3s_ease-out] font-medium drop-shadow-md">
              Building better spaces. Craftsmanship you can trust. Commercial and residential work done right.
            </p>
            <div className="flex flex-col gap-4 w-full max-w-[280px] animate-[fadeInUp_1.4s_ease-out]">
              <Link to={NavigationLinks.SERVICES} className="bg-[#c5a26a] text-white py-4 px-8 font-bold text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform">
                Our Services
              </Link>
              <Link to={NavigationLinks.PROJECTS} className="border border-white/50 bg-white/5 backdrop-blur-sm text-white py-4 px-8 font-bold text-xs uppercase tracking-[0.2em] active:scale-95 transition-transform hover:bg-white/10">
                View Projects
              </Link>
            </div>
          </div>
          <div className="bottom-10 left-1/2 -translate-x-2.5">
             {/* Placeholder for scroll arrows if img21 is available */}
             {/* <img src={img21} alt="Scroll down" className="w-44 h-auto opacity-100 drop-shadow-xl" /> */}
          </div>
        </div>
        <div className="relative z-30 -mt-8 bg-white rounded-t-[40px] px-6 pt-16 pb-16 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-earth-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img src={img25} alt="Logo" className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl" />
            </div>
          </div>
          <div className="text-center"><br /><br />
            <h2 className="text-2xl md:text-3xl font-black text-earth-900 text-center mb-6 md:mb-8 uppercase font-sans">
              Get a Free Quote Today
            </h2>
            <ContactFormMobile />
          </div>
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="hidden lg:block relative min-h-screen w-full overflow-visible pb-12">
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: `url("${img23}")` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-black/20"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10 pt-20 lg:pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="overflow-hidden mb-2">
                <p className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm animate-[fadeInUp_1s_ease-out_forwards]">
                  Shropshire, UK
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[1.1] drop-shadow-2xl mb-6 md:mb-8 animate-[fadeInUp_1.2s_ease-out_forwards]">
                James Lewis
                <br />
                <span className="italic font-light text-gold-400">Interiors</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl border-l-2 border-gold-500 pl-4 md:pl-6 mb-8 md:mb-10 animate-[fadeInUp_1.4s_ease-out_forwards] mx-auto lg:mx-0">
                Building better spaces. Craftsmanship you can trust. Commercial and residential work done right.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 animate-[fadeInUp_1.6s_ease-out_forwards] justify-center lg:justify-start">
                <Link to={NavigationLinks.SERVICES} className="px-6 md:px-10 py-3 md:py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-xl hover:-translate-y-1 text-sm md:text-base">
                  Our Services
                </Link>
                <Link to={NavigationLinks.PROJECTS} className="px-6 md:px-10 py-3 md:py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold tracking-widest uppercase transition-all duration-300 text-center backdrop-blur-sm hover:-translate-y-1 text-sm md:text-base">
                  View Projects
                </Link>
              </div>
            </div>
            <div className="animate-[fadeInUp_1.6s_ease-out_forwards]">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
            <div className="w-px h-8 md:h-12 bg-white/50"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Our Services" title="Quality Craftsmanship" />
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="h-full p-6 md:p-8 bg-white hover:bg-earth-900 group transition-all duration-500 shadow-sm hover:shadow-xl border-b-2 border-transparent hover:border-gold-500">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-stone-100 group-hover:bg-white/10 rounded-full flex items-center justify-center text-earth-900 group-hover:text-gold-500 mb-4 md:mb-6 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-earth-900 group-hover:text-white mb-3 md:mb-4 transition-colors">{s.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{s.description}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutPreview = () => (
  <section className="py-16 md:py-24 bg-earth-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('images/moroccan-flower.png')] opacity-5 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
        <RevealOnScroll>
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border border-gold-500/30 z-0"></div>
            <img src={img7} alt="Work of James Lewis Interiors" className="relative z-10 w-full h-[400px] md:h-[600px] object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white text-earth-900 p-4 md:p-8 shadow-xl max-w-xs hidden lg:block z-20">
              <p className="font-serif text-lg md:text-2xl italic">"James Lewis and with love of the craft."</p>
              <p className="text-right mt-2 md:mt-4 font-bold text-gold-600 text-xs md:text-sm tracking-widest">— James Lewis Interiors</p>
            </div>
          </div>
        </RevealOnScroll>
        <div className="lg:w-1/2 space-y-6 md:space-y-8 mt-8 lg:mt-0">
          <RevealOnScroll delay={200}>
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 leading-tight">Craftsmanship & <span className="text-gold-500 italic">Tradition</span></h2>
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6">
              Based in Shropshire and working on commercial and residential spaces with a tidy, practical approach. The aim is simple: keep the site clean, keep the communication clear, and deliver a finish that looks right.
            </p>
            <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-sm mt-6 md:mt-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <img src={img25} alt="Logo" className="w-25 h-16 md:w-35 md:h-24 object-cover border-2 border-gold-500 shadow-md" />
              <div>
                <h4 className="text-lg md:text-xl font-serif text-white">James Lewis Interiors</h4>
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">Interior Contractor</p>
                <p className="text-gray-400 text-xs italic">"Quality interior services you can trust."</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
              {[
                { title: "Commercial & Residential", desc: "Work tailored for both business fit-outs and home renovations." },
                { title: "Free Quotes", desc: `Call or text ${business.phoneDisplay} for a free estimate.` },
                { title: "Clean Finishes", desc: "Suspended ceilings, partitions, and drylining done properly." }
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="mt-1 mr-3 md:mr-4 text-gold-500 shrink-0"><CheckCircle size={20} className="md:w-6 md:h-6" /></div>
                  <div>
                    <h4 className="text-white font-bold font-serif text-base md:text-lg">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 md:pt-8">
              <Link to={NavigationLinks.ABOUT} className="inline-flex items-center text-gold-500 hover:text-white uppercase tracking-widest font-bold text-sm transition-colors border-b border-gold-500 pb-1 hover:border-white">
                Learn More About Us <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Our Projects" title="Current Projects & Concepts" />
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
          {galleryImages.slice(0, 6).map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 50}>
              <div className="block h-full cursor-default">
                <div className="group relative overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-500 h-full">
                  <img src={String(post.url)} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-12">
          <Link to={NavigationLinks.PROJECTS} className="inline-block px-6 md:px-10 py-3 md:py-4 border-2 border-earth-900 text-earth-900 font-bold uppercase tracking-widest hover:bg-earth-900 hover:text-white transition-colors text-sm md:text-base bg-white/50 backdrop-blur-sm">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const googleMapsUrl = ""; 
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const displayedReviews = testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="py-16 md:py-24 bg-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url('./images/grid.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <SectionTitle subtitle="Customer Reviews" title="What Our Clients Say" />
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayedReviews.map((review, i) => (
            <RevealOnScroll key={`${currentPage}-${i}`} delay={i * 100}>
              <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg h-full flex flex-col hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg mr-3 shrink-0">
                    {review.name[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-earth-900 text-base md:text-lg hover:text-gold-500 transition-colors cursor-pointer">
                        {review.name}
                      </a>
                    </div>
                    <p className="text-xs text-gray-500">{review.time}</p>
                  </div>
                </div>
                <div className="flex text-gold-500 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill={j < review.rating ? "currentColor" : "none"} className={j < review.rating ? "text-gold-500" : "text-gray-300"} />
                  ))}
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{review.text}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
          <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0} className="px-6 py-2 md:py-3 bg-earth-900 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gold-500 hover:text-earth-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm md:text-base">
            ← Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)} className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-sm md:text-base transition-all ${i === currentPage ? 'bg-gold-500 text-earth-900' : 'bg-earth-900 text-white hover:bg-gold-500 hover:text-earth-900'}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1} className="px-6 py-2 md:py-3 bg-earth-900 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gold-500 hover:text-earth-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm md:text-base">
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

const InteractiveMap = () => (
  <div className="w-full h-[300px] md:h-[500px] relative">
    <iframe
      src="https://www.google.com/maps?q=Shropshire,+UK&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Location in Shropshire"
      className="transition-all duration-700"
    ></iframe>
  </div>
);

// --- Pages ---

const PageHeader: React.FC<{ title: string; subtitle: string; image: string }> = ({ title, subtitle, image }) => (
  <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] w-full overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${image}")` }}>
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <span className="block text-gold-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-3 md:mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">{subtitle}</span>
      <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-4 md:mb-6 animate-[fadeInUp_1s_ease-out_forwards]">{title}</h1>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <SEOHead
      title={`${business.name} | ${business.tagline}`}
      description={`${business.name} in ${business.location}. ${business.tagline} Call ${business.phoneDisplay} for a free no-obligation quote.`}
      keywords="suspended ceilings Shropshire, ceiling tiles Shropshire, metal stud partitions, drylining, renovation work, commercial fit out, residential interior work"
    />
    <Hero />
    <ServicesSection />
    <AboutPreview />
    <ProjectsGallery />
    <Testimonials />
    <InteractiveMap />
  </>
);

const ServicesPage = () => (
  <>
    <SEOHead
      title={`${business.name} Services | Suspended Ceilings, Partitions and Renovation Work`}
      description={`Services in ${business.location}: suspended ceilings, ceiling tile replacement, metal stud partitions, drylining, and renovation work. Free no-obligation quotes.`}
      keywords="suspended ceilings, ceiling tiles, metal stud partitions, drylining, fit out work, renovation contractor Shropshire"
    />
    <PageHeader title="Services" subtitle="What we do" image={heroImage} />
    <ServicesSection />
    <section className="py-12 md:py-20 bg-earth-900 text-center text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6">Ready to Transform Your Space?</h2>
        <p className="text-gray-300 mb-4 text-sm md:text-base">We offer focused interior work for commercial and residential projects across Shropshire.</p>
        <Link to={NavigationLinks.CONTACT} className="inline-block px-6 md:px-8 py-2 md:py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-earth-900 transition-colors uppercase tracking-widest font-bold text-sm md:text-base">
          Get Free Quote
        </Link>
      </div>
    </section>
    <Testimonials />
  </>
);

const ProjectsPage = () => (
  <>
    <SEOHead
      title={`${business.name} Gallery | Recent Interior Projects`}
      description="Browse recent James Lewis Interiors project photos showing suspended ceilings, tile work, clean finishes, and renovation details."
      keywords="project gallery, suspended ceiling gallery, interior contractor photos, renovation work photos"
    />
    <PageHeader title="Projects" subtitle="Recent work" image={img15} />
    <FullGalleryPage />
  </>
);

const AboutPage = () => (
  <>
    <SEOHead
      title={`About ${business.name} | ${business.owner} in Shropshire`}
      description={`Meet ${business.owner} of ${business.name}. Commercial and residential interior work, suspended ceilings, partitions, renovations, and tidy finish work.`}
      keywords="about James Lewis, interior contractor Shropshire, suspended ceilings Shropshire"
    />
    <PageHeader title="About" subtitle="James Lewis Interiors" image={img3} />
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url('./images/grid.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="prose prose-sm md:prose-lg prose-stone mx-auto">
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-earth-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img src={img25} alt="Our Team" className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl" />
            </div>
            <div className="mt-4 md:mt-6 text-center">
              <h4 className="text-xl md:text-2xl font-serif text-earth-900">James Lewis Interiors</h4>
              <p className="text-gold-500 text-xs md:text-sm font-bold uppercase tracking-widest">Interior Contractor</p>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-earth-900 mb-4 md:mb-6 text-center">Building Better Spaces</h3>
          <p className="leading-loose text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            James Lewis focuses on clean, reliable workmanship for homes and businesses. The work is straightforward, the finish is neat, and the communication stays clear.
          </p>
          <p className="leading-loose text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Recent work includes suspended ceilings, center tiles, corridor runs, partitioning, and small renovation details where accuracy matters. The work is built around free no-obligation quotes and a straightforward quote-to-completion process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 md:py-12 text-center border-y border-gray-200 my-8 md:my-12">
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">10+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Satisfaction</span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-serif text-gold-500 mb-1 md:mb-2">Free</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Quotes</span>
            </div>
          </div>
          <div className="bg-stone-50 p-6 md:p-8 rounded-lg mt-8 md:mt-12">
            <h4 className="text-xl font-serif text-earth-900 mb-4 text-center">Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <Phone className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <a href={`tel:${business.phoneTel}`} className="text-earth-900 hover:text-gold-500 transition-colors font-bold">{business.phoneDisplay}</a>
              </div>
              <div>
                <Send className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <a href={`mailto:${business.email}`} className="text-earth-900 hover:text-gold-500 transition-colors">{business.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <InteractiveMap />
  </>
);

const ContactPage = () => (
  <>
    <SEOHead
      title={`Contact ${business.name} | Free Quotes in Shropshire`}
      description={`Contact ${business.name} for suspended ceilings, partitions, renovations, and interior work in Shropshire. Phone ${business.phoneDisplay}.`}
      keywords="contact James Lewis Interiors, Shropshire quote, suspended ceilings quote"
    />
    <PageHeader title="Contact" subtitle="Get In Touch" image={img4} />
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <RevealOnScroll>
              <SectionTitle subtitle="contact us" title="Your Request" align="left" />
            </RevealOnScroll>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start">
                <MapPin className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Our Service Area</h4>
                  <p className="text-gray-600">{business.serviceArea}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Phone</h4>
                  <a href={`tel:${business.phoneTel}`} className="text-earth-900 hover:text-gold-500 transition-colors font-bold text-lg">{business.phoneDisplay}</a>
                  <p className="text-gray-600 text-sm mt-1">Call or text for a free quote!</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-gold-500 mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-earth-900 mb-2">Email</h4>
                  <a href={`mailto:${business.email}`} className="text-earth-900 hover:text-gold-500 transition-colors">{business.email}</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <RevealOnScroll delay={200}>
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
    <InteractiveMap />
  </>
);

const FullGalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowLeft' && selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
      else if (e.key === 'ArrowRight' && selectedImageIndex < galleryImages.length - 1) setSelectedImageIndex(selectedImageIndex + 1);
      else if (e.key === 'Escape') setSelectedImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <>
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <SectionTitle subtitle="full portfolio" title="Selected Project Gallery" align="center" />
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
            {galleryImages.map((img, index) => (
              <RevealOnScroll key={img.id} delay={index * 30}>
                <div
                  className="group relative overflow-hidden aspect-square cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={String(img.url)} alt={img.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-6">
                    <h4 className="text-white font-serif font-bold text-lg text-center mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h4>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImageIndex(null)}>
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={String(galleryImages[selectedImageIndex].url)} alt={galleryImages[selectedImageIndex].title} className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center z-10">×</button>
            {selectedImageIndex > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(selectedImageIndex - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-14 h-14 flex items-center justify-center z-10">‹</button>
            )}
            {selectedImageIndex < galleryImages.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(selectedImageIndex + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-500 transition-colors bg-black/50 rounded-full w-14 h-14 flex items-center justify-center z-10">›</button>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimationStyles = () => (
  <style>{`
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    .animate-wiggle {
      animation: wiggle 1s ease-in-out infinite;
    }
  `}</style>
);

const LocationPageRouter = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const location = getLocationBySlug(citySlug || '');
  if (!location) return <Navigate to="/" replace />;
  return <LocationPage location={location} />;
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen overflow-x-hidden font-sans text-earth-900 selection:bg-gold-500 selection:text-white bg-stone-50">
        <style>{`
          html.lenis, html.lenis body { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: hidden; }
          .lenis.lenis-scrolling iframe { pointer-events: none; }
        `}</style>
        <AnimationStyles />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={NavigationLinks.HOME} element={<HomePage />} />
            <Route path={NavigationLinks.SERVICES} element={<ServicesPage />} />
            <Route path={NavigationLinks.PROJECTS} element={<ProjectsPage />} />
            <Route path={NavigationLinks.GALLERY} element={<FullGalleryPage />} />
            <Route path={NavigationLinks.ABOUT} element={<AboutPage />} />
            <Route path={NavigationLinks.CONTACT} element={<ContactPage />} />
            <Route path="/standorte/:citySlug" element={<LocationPageRouter />} />
          </Routes>
        </main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end pointer-events-none">
          <div className="flex items-center mr-3 md:mr-4 pointer-events-auto animate-[fadeIn_0.5s_ease-out_2s_forwards] opacity-0">
            <div className="bg-white px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-xl relative">
              <span className="text-earth-900 font-bold text-xs md:text-sm whitespace-nowrap">Have questions? Contact us!</span>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
            </div>
          </div>
          <a
            href={`https://wa.me/${business.phoneTel.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform pointer-events-auto relative group"
            aria-label="Chat on WhatsApp"
          >
            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" className="w-10 h-10 relative z-10 animate-wiggle" />
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
          </a>
        </div>
      </div>
    </Router>
  );
};

export default App;