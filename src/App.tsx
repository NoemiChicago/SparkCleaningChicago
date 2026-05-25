import { Sparkles, Shield, Award, CheckCircle, Calendar, MessageSquare, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import ServicePricing from './components/ServicePricing';
import BookingSystem from './components/BookingSystem';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';

import penthouseImg from './assets/images/chicago_penthouse_1779682075439.png';

export default function App() {
  const contactPhone = "+1 (312) 956 - 4183";
  const contactEmail = "Ce.Noemi4700@Gmail.com";

  // Coordinates smooth page scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130; // height of navbar and contact banner
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Triggers selecting a service card and scrolls the user to the calculator
  const handleServiceSelect = (serviceKey: string) => {
    scrollToSection('booking');
    // We can dispatch an event or use a timeout to let the select field focus
    const selectEl = document.querySelector('select');
    if (selectEl) {
      selectEl.value = serviceKey.toUpperCase() + ' CLEANING';
    }
    // Also simulate changing the button click triggers
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn.textContent?.toLowerCase().includes(serviceKey)) {
        (btn as HTMLButtonElement).click();
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Prime Header & Navigation Panel */}
      <Header onScrollToSection={scrollToSection} />

      {/* Hero Home Banner Section */}
      <section id="hero" className="relative bg-white pt-6 pb-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left animate-slideIn">
            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-sky-100/50">
              <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-spin-slow" />
              <span>Chicago’s Most Detailed Cleaning Professionals</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-none leading-[1.1]">
              Come Home to a <br />
              <span className="text-sky-600 relative inline-block">
                Spotless Space
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-sky-100 -z-10 rounded"></span>
              </span> in Chicago
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              From premium high-rises in the Loop to charming townhouses in Lincoln Park and Wicker Park—Noemi’s team delivers reliable, bonded, medical-grade cleanings. Get an exact quote and book your appointment online in under 60 seconds.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Calculate My Cost & Book</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-7 py-3.5 rounded-xl transition-all border border-slate-200 cursor-pointer text-sm text-center"
              >
                Explore Pricing Lists
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% Satisfaction</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Fully Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Award className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Local Eco-Supplies</span>
              </div>
            </div>
          </div>

          {/* Hero Right Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-sky-50 via-transparent to-transparent -z-10 rounded-3xl"></div>
            
            {/* Main Generated High-Rise Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group max-w-lg mx-auto">
              <img
                src={penthouseImg}
                alt="Beautiful clean Chicago high-rise luxury living room overlooking Lake Michigan skyline"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-semibold drop-shadow-md">
                  📍 A sparkling penthouse clean overlooking Chicago’s majestic skyline
                </p>
              </div>
            </div>

            {/* Float-badge indicator for ratings / real urgency */}
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-sky-50 max-w-xs animate-bounce-slow">
              <span className="text-2xl">🏆</span>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Top Rated Cleaner</span>
                <span className="text-[11px] text-slate-500 block">350+ 5-star Google & Yelp reviews in Chicago</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Values / Service Qualities Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Local Pride', desc: '100% locally owned. We clean Chicago homes with meticulous attention.', emoji: '🏙️' },
              { title: 'Eco Friendly', desc: 'Optional non-toxic organic soap formulas safe for kids & house pets.', emoji: '🌱' },
              { title: 'Perfect Reviews', desc: 'Highly vetted background-checked housekeepers you can trust completely.', emoji: '✨' },
              { title: 'No Contracts', desc: 'Cancel or reschedule directly through your online board for absolute freedom.', emoji: '📅' }
            ].map((prop, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-2xl block mb-2">{prop.emoji}</span>
                <h4 className="font-bold text-slate-800 text-sm">{prop.title}</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Flexible Pricing Section */}
      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicePricing onSelectService={handleServiceSelect} />
        </div>
      </section>

      {/* Interactive Quotation Calculator & Online Booking System */}
      <section id="booking" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Instant Reservation Setup</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Custom Calculator & Live Scheduler</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Adjust your dimensions, bedrooms, bathrooms, and select personalized upgrades. Watch the cost customize in real time and hit Book to secure your spotless cleaning slots!
            </p>
          </div>

          <BookingSystem />
        </div>
      </section>

      {/* Work Gallery Section with Filters */}
      <section id="gallery" className="bg-white py-20 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GallerySection />
        </div>
      </section>

      {/* Testimonials Review Feed */}
      <section id="testimonials" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>
      </section>

      {/* Cleaning Blog & Educational Tips */}
      <section id="blog" className="bg-white py-20 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSection />
        </div>
      </section>

      {/* Contact & FAQ Area */}
      <section id="contact" className="bg-white py-20 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Spark Cleaning Chicago Support</span>
            <h3 className="text-2xl font-bold text-slate-800">We Love Answering Questions</h3>
            <p className="text-sm text-slate-500">
              Need to book a specific timing, organize custom corporate cleaning, or speak with Noemi directly? Use the forms or reach out on our direct lines!
            </p>
          </div>

          {/* Render Persistent Contact Form */}
          <ContactForm />
          
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="bg-slate-50 py-20 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Bottom Footer Section */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-sky-500 text-white p-2 rounded-xl">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-white tracking-tight">Spark Cleaning Chicago</span>
            </div>
            <p className="leading-relaxed">
              Premium residential housekeepers and office maintenance services. Bonded, insured, and deeply trusted in Gold Coast, Wicker Park, and Chicago suburbs.
            </p>
          </div>

          {/* Contacts info columns */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2">
              <li>
                <span className="block text-slate-500">Call/Text Directly</span>
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-sky-400 transition-colors">
                  {contactPhone}
                </a>
              </li>
              <li>
                <span className="block text-slate-500">Email Directly</span>
                <a href={`mailto:${contactEmail}`} className="font-semibold text-white hover:text-sky-400 transition-colors break-all">
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links columns */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Book links</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors text-left font-medium">Home page</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors text-left font-medium">Services catalog</button>
              <button onClick={() => scrollToSection('booking')} className="hover:text-white transition-colors text-left font-medium">Pricing estimator</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors text-left font-medium">Our finished work</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors text-left font-medium font-sans">Reviews</button>
              <button onClick={() => scrollToSection('blog')} className="hover:text-white transition-colors text-left font-medium">Cleaning Blog</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors text-left font-medium">FAQ</button>
            </div>
          </div>

          {/* Safe guarantees block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Local Roots</h4>
            <p className="leading-relaxed">
              We operate exclusively in Chicago, IL and neighboring suburbs. We take safety, detailed cleaning, and thorough background checking very seriously.
            </p>
            <span className="inline-block bg-sky-950 text-sky-400 font-bold border border-sky-900/50 px-3 py-1 rounded">
              📍 Local Chicago Small Business
            </span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Spark Cleaning Chicago. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-500">Insured, Bonded & Highly Vetted</span>
            <span>•</span>
            <span className="text-slate-500">Made with 🩵 in Chicago, IL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
