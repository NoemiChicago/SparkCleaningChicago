import { useState, FormEvent } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactPhone = "+1 (312) 956 - 4183";
  const contactEmail = "Ce.Noemi4700@Gmail.com";

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate API delivery delay
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Contact Info Sidebar (Left) */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Available 7 Days a week</span>
              <h4 className="text-2xl font-bold mt-1">Get In Touch Directly</h4>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Have atypical sizing or custom commercial workspace requests? Call or email Noemi directly, or drop us a secure message below. We respond in under 30 minutes.
              </p>
            </div>

            <div className="space-y-5 pt-4">
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="bg-white/10 text-sky-400 p-3 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Direct Hotline</span>
                  <span className="text-base font-bold text-white tracking-wide">{contactPhone}</span>
                </div>
              </a>

              <a 
                href={`mailto:${contactEmail}`} 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="bg-white/10 text-sky-400 p-3 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Noemi Directly</span>
                  <span className="text-sm font-bold text-white transition-colors group-hover:text-sky-300 break-all">
                    {contactEmail}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 text-sky-400 p-3 rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Operational House Hours</span>
                  <span className="text-xs text-white">Monday – Sunday: 8:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 text-sky-400 p-3 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Locally Operating From</span>
                  <span className="text-xs text-white">Chicago, IL & Nearby Suburbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick neighborhood bullet scroll list */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest block">Primary Service Areas</span>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Serving Gold Coast, Lincoln Park, Wicker Park, Lakeview, River North, South Loop, Logan Square, Old Town, Bucktown, and surrounding suburbs.
            </p>
          </div>
        </div>

        {/* Real Message Form Input Area (Right) */}
        <div className="lg:col-span-7 p-8 md:p-10 bg-slate-50/50">
          {isSent ? (
            <div className="h-full flex flex-col justify-center items-center text-center py-10 animate-fadeIn">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-500 max-w-sm mt-2">
                Thank you for your message. Noemi receives your message on high-priority and will contact you back shortly via email or call.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-5">
              <div>
                <h4 className="text-lg font-bold text-slate-800">Send an Online Inquiry</h4>
                <p className="text-xs text-slate-500 mt-1">Get custom quotes, clarify booking details, or ask quick questions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Jessica Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Jessica@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (312) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Your Question / Message Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your home, custom schedule requirements, or any specific instructions."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl text-xs transition-all tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400 mt-2">
                <HelpCircle className="h-3 w-3" />
                <span>We strictly respect privacy. No spam lists, ever.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
