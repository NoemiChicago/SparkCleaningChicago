import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-booking');

  const faqs: FAQItem[] = [
    {
      id: 'faq-booking',
      question: 'How does the online quote calculator and booking system work?',
      answer: 'Our instant estimator customizes your rate in real-time based on your service hours, frequency, and selected upgrades (like deep cleaning inside the oven or fridge) at transparent flat rates ($75/hr for standard, $95/hr for deep, $120/hr for move-out, and $150/hr for office & commercial) plus a flat $50 refundable security deposit for all bookings. After seeing your price, you simply enter your contact details, select a date and time slot, and click Book. No credit card is required upfront, and booking is entirely contract-free.'
    },
    {
      id: 'faq-safety',
      question: 'Are your cleaning products safe for small children and household pets?',
      answer: 'Absolutely. We prioritize health and safety. You can select our 100% Eco-Friendly Supplies option during booking. We use organic, plant-based, non-toxic sanitizers that successfully dissolve grime, grease, and dust dander without leaving harmful residues or irritating chemical scents.'
    },
    {
      id: 'faq-service-area',
      question: 'Which specific Chicago neighborhoods and suburbs do you serve?',
      answer: "We supply professional housekeepers across the entire city of Chicago—including Lincoln Park, Gold Coast, Lakeview, Wicker Park, River North, South Loop, Bucktown, and Logan Square—as well as adjacent surrounding North Shore and Western suburbs."
    },
    {
      id: 'faq-be-home',
      question: 'Do I need to be at home during my scheduled cleaning appointment?',
      answer: 'No, you do not need to be home. Many of our clients prefer to provide a garage code, key box instructions, or have their front desk concierge let our vetted cleaning crew in. Our team is fully bonded, background-checked, and insured, so your property is completely safe.'
    },
    {
      id: 'faq-satisfaction',
      question: 'What is your 100% Sparkle Satisfaction Guarantee?',
      answer: "Your ultimate peace of mind is our pride. If any element of your cleaning checklist is not completed to your absolute satisfaction, simply contact Noemi within 24 hours of completion and we will dispatch a team member to re-clean those specific areas immediately for free."
    },
    {
      id: 'faq-cancel',
      question: 'How do I cancel or reschedule a scheduled booking?',
      answer: 'We provide absolute scheduling freedom in Chicago. You can cancel or change your scheduled slot completely free of charge up to 24 hours before your booking. Simply call or text Noemi directly at +1 (312) 956 - 4183 or email Ce.Noemi4700@Gmail.com.'
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq_section_container" className="space-y-10 max-w-4xl mx-auto">
      {/* FAQ Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Clear Answers</span>
        <h3 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h3>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Everything you need to know about Spark Cleaning Chicago’s transparent rates, professional credentials, safety, and booking policies.
        </p>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              id={`faq-card-${faq.id}`}
              key={faq.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'border-sky-200 shadow-md ring-1 ring-sky-100/50' 
                  : 'border-slate-100 shadow-sm hover:border-sky-100'
              }`}
            >
              {/* Question Trigger */}
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                    isOpen ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm md:text-base tracking-tight leading-tight">
                    {faq.question}
                  </span>
                </div>
                <div className="text-slate-400 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-sky-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>

              {/* Collapsible Answer Pane */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-52 border-t border-slate-50' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pt-4 bg-slate-50/40 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Help micro CTA box */}
      <div className="bg-sky-50/60 border border-sky-100/70 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Still have more custom questions?</span>
            <span className="text-[11px] text-slate-500">Noemi is standing by to respond to any specialized or commercial questions.</span>
          </div>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          Contact Us Directly
        </button>
      </div>
    </div>
  );
}
