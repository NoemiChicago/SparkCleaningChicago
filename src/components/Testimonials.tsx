import { Star, MessageSquare, Shield, Smile } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
}

export default function Testimonials() {
  const reviews: Review[] = [
    {
      id: 'rev1',
      name: 'Sarah M.',
      location: 'Lincoln Park, Chicago',
      service: 'Bi-Weekly Standard Cleaning',
      rating: 5,
      comment: "I love how transparent Spark Cleaning Chicago is! The pricing calculator on their website gave me an exact quote of $145. No hidden fees or surprise upcharges, and my townhouse has never looked so spotless. Best service in the city!",
      date: 'May 12, 2026'
    },
    {
      id: 'rev2',
      name: 'Brandon H.',
      location: 'Gold Coast, Chicago',
      service: 'Deep Kitchen & Bathroom Clean',
      rating: 5,
      comment: "Absolutely outstanding cleaners. Our penthouse tile grout and stainless steel appliances look back to brand-new condition. Scheduled easily via their online system, and their team was respectful, punctual, and highly meticulous.",
      date: 'April 28, 2026'
    },
    {
      id: 'rev3',
      name: 'Carlos T.',
      location: 'Wicker Park, Chicago',
      service: 'Move-Out Cleaning Service',
      rating: 5,
      comment: "Our landlord is notoriously picky about cleaning for rent deposit returns. Noemi’s crew came in and cleaned inside the oven, fridge, and baseboard hand-washer. Got our entire deposit back without a single question. Highly recommend!",
      date: 'May 3, 2026'
    },
    {
      id: 'rev4',
      name: 'Janelle K.',
      location: 'Lakeview, Chicago',
      service: 'Monthly Standard Clean',
      rating: 5,
      comment: "The peace of mind this team brings me is priceless. Completely pet-friendly, they use eco-friendly materials that don't trigger my allergies. I've recommended Spark Cleaning Chicago to three of my friends already!",
      date: 'March 15, 2026'
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Intro section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Trusted Reviews</span>
        <h3 className="text-2xl font-bold text-slate-800">Why Chicagoans Love Spark Cleaning Chicago</h3>
        <p className="text-sm text-slate-500">
          From Lincoln Park townhomes to downtown high-rises, we deliver sparkling consistency to our local residential and office communities.
        </p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="bg-sky-500 text-white p-3 rounded-xl">
            <Star className="h-6 w-6 fill-current text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 block">5.0 / 5.0</span>
            <span className="text-xs text-slate-500 font-semibold block">Average Customer Review</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="bg-emerald-500 text-white p-3 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 block">100% Bonded</span>
            <span className="text-xs text-slate-500 font-semibold block">Fully Insured & Background Checked</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="bg-slate-500 text-white p-3 rounded-xl">
            <Smile className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 block">1,800+ Cleans</span>
            <span className="text-xs text-slate-500 font-semibold block">Completed in the Chicagoland Area</span>
          </div>
        </div>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div 
            key={rev.id} 
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
          >
            <div>
              {/* Rating stars */}
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Customer profile info */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-xs mt-auto">
              <div>
                <span className="font-bold text-slate-800 block">{rev.name}</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">📍 {rev.location}</span>
              </div>
              <div className="text-right">
                <span className="bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-bold text-[10px] block">
                  {rev.service}
                </span>
                <span className="text-slate-400 text-[10px] block mt-1">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
