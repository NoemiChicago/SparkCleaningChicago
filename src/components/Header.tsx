import { Phone, Mail, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phone = "+1 (312) 956 - 4183";
  const email = "Ce.Noemi4700@Gmail.com";

  const handleLinkClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="app_header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
      {/* Top Banner with Direct Contact Info */}
      <div className="bg-sky-600 text-white text-xs sm:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="h-4 w-4 text-sky-200 animate-pulse" />
            <span>Premium Cleaning Services in Chicago & Suburbs</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors font-semibold"
            >
              <Phone className="h-3.5 w-3.5 text-sky-200" />
              <span>{phone}</span>
            </a>
            <a 
              href={`mailto:${email}`} 
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors font-semibold"
            >
              <Mail className="h-3.5 w-3.5 text-sky-200" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none group"
          >
            <div className="bg-sky-500 text-white p-2 rounded-xl shadow-md group-hover:bg-sky-600 transition-all duration-300">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800 tracking-tight block">
                Spark Cleaning
              </span>
              <span className="text-xs text-sky-600 font-semibold tracking-wider uppercase block -mt-1">
                Chicago
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleLinkClick('services')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Services & Pricing
            </button>
            <button 
              onClick={() => handleLinkClick('booking')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Instant Booking
            </button>
            <button 
              onClick={() => handleLinkClick('gallery')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Our Gallery
            </button>
            <button 
              onClick={() => handleLinkClick('testimonials')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleLinkClick('blog')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Cleaning Blog
            </button>
            <button 
              onClick={() => handleLinkClick('faq')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleLinkClick('contact')}
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleLinkClick('booking')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md border border-sky-500 hover:border-sky-600 transition-all cursor-pointer text-sm"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-sky-600 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-100 flex flex-col px-4 py-4 gap-3 animate-fadeIn">
          <button 
            onClick={() => handleLinkClick('services')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Services & Pricing
          </button>
          <button 
            onClick={() => handleLinkClick('booking')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Instant Booking
          </button>
          <button 
            onClick={() => handleLinkClick('gallery')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Our Gallery
          </button>
          <button 
            onClick={() => handleLinkClick('testimonials')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Testimonials
          </button>
          <button 
            onClick={() => handleLinkClick('blog')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Cleaning Blog
          </button>
          <button 
            onClick={() => handleLinkClick('faq')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleLinkClick('contact')}
            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-all text-sm"
          >
            Contact Us
          </button>
          
          <div className="h-px bg-slate-200 my-2"></div>
          
          <div className="flex flex-col gap-2.5 px-3">
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-2 text-slate-800 font-bold hover:text-sky-600"
            >
              <Phone className="h-4 w-4 text-sky-500" />
              <span>{phone}</span>
            </a>
            <a 
              href={`mailto:${email}`} 
              className="flex items-center gap-2 text-slate-800 font-semibold hover:text-sky-600 text-xs truncate"
            >
              <Mail className="h-4 w-4 text-sky-500" />
              <span>{email}</span>
            </a>
          </div>

          <button
            onClick={() => handleLinkClick('booking')}
            className="mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white text-center py-2.5 rounded-xl font-bold transition-colors shadow-sm"
          >
            Book Online
          </button>
        </div>
      )}
    </header>
  );
}
