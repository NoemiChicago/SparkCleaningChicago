import { useState } from 'react';
import { Camera, RefreshCw, ZoomIn, Eye } from 'lucide-react';

import penthouseImg from '../assets/images/chicago_penthouse_1779682075439.png';
import kitchenImg from '../assets/images/sparkling_kitchen_1779680631090.png';
import bathroomImg from '../assets/images/luxury_bathroom_1779680652483.png';
import townhouseImg from '../assets/images/townhouse_living_1779680669964.png';

interface GalleryPic {
  id: string;
  title: string;
  category: 'Kitchen' | 'Bathroom' | 'Living Room' | 'Full House';
  image: string;
  beforeDesc: string;
  afterDesc: string;
  chicagoNeighbourhood: string;
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPic, setSelectedPic] = useState<GalleryPic | null>(null);
  const [hoveredPic, setHoveredPic] = useState<string | null>(null);
  
  // Track which items have "Before" view toggled on
  const [beforeToggled, setBeforeToggled] = useState<{ [key: string]: boolean }>({});

  const items: GalleryPic[] = [
    {
      id: 'pic1',
      title: 'Stunning Skyline Penthouse Clean',
      category: 'Living Room',
      image: penthouseImg,
      beforeDesc: 'Post-party clutter, dusty high-ceilings, smudged lakefront windows, and scattered layout.',
      afterDesc: 'Immaculate glass, polished hardwood flooring, dust-free custom furniture, and aligned layout.',
      chicagoNeighbourhood: 'The Loop, Chicago'
    },
    {
      id: 'pic2',
      title: 'Spotless Modern Kitchen Deep-Clean',
      category: 'Kitchen',
      image: kitchenImg,
      beforeDesc: 'Grease stains on range, fingerprint marks on steel, dirty tiles, and dull counter surfaces.',
      afterDesc: 'Sanitized marble countertops, gleaming subway tiles, finger-print-free stainless appliances.',
      chicagoNeighbourhood: 'Lincoln Park, Chicago'
    },
    {
      id: 'pic3',
      title: 'Pristine Glass & Tile Bath Reset',
      category: 'Bathroom',
      image: bathroomImg,
      beforeDesc: 'Water scum on glass, dusty towels, dull faucets, and light hard-water tile buildup.',
      afterDesc: 'Spotless high-gloss glass doors, polished chrome faucets, folded display towels, flawless grout.',
      chicagoNeighbourhood: 'Gold Coast, Chicago'
    },
    {
      id: 'pic4',
      title: 'Sparkling Historic Townhouse Living Room',
      category: 'Living Room',
      image: townhouseImg,
      beforeDesc: 'Pet dander on carpets, chaotic bookshelves, fingerprints on millwork, and dusty window frames.',
      afterDesc: 'All surfaces sanitized, pristine custom vacuum pattern, orderly bookshelves, and allergens removed.',
      chicagoNeighbourhood: 'Wicker Park, Chicago'
    }
  ];

  const categories = ['All', 'Kitchen', 'Bathroom', 'Living Room'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const toggleBeforeAfter = (id: string) => {
    setBeforeToggled(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* Filters and Section Tag */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Chicago Proof Portfolio</span>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">Gleaming Real-Life Results</h3>
        </div>
        
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === cat 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => {
          const isBefore = beforeToggled[item.id] || false;
          return (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredPic(item.id)}
              onMouseLeave={() => setHoveredPic(null)}
            >
              {/* Photo Area with Custom Filters for "Before" */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isBefore 
                      ? 'contrast-75 brightness-75 grep saturate-50 blur-[2px]' 
                      : 'contrast-100 brightness-100 saturate-100 blur-0'
                  }`}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-slate-900/85 text-white text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="bg-sky-600/90 text-white text-[10px] px-2.5 py-1 rounded-lg font-bold backdrop-blur-sm shadow flex items-center gap-1">
                    📍 {item.chicagoNeighbourhood}
                  </span>
                </div>

                {/* Sliding Before/After Indicator Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                  <p className="text-[11px] text-white font-medium pr-2 truncate">
                    {isBefore 
                      ? `⚠️ Before Clean: ${item.beforeDesc}` 
                      : `✨ After Clean: ${item.afterDesc}`
                    }
                  </p>
                  
                  {/* Interactive toggle */}
                  <button
                    onClick={() => toggleBeforeAfter(item.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      isBefore 
                        ? 'bg-sky-500 text-white hover:bg-sky-600 animate-pulse' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{isBefore ? 'See After' : 'See Before'}</span>
                  </button>
                </div>

                {/* Hover Quick Zoom / Details action overlay */}
                {hoveredPic === item.id && (
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center transition-all duration-300 pointer-events-none">
                    <div className="bg-white/95 p-3 rounded-full shadow-lg text-slate-800 scale-110 transition-transform">
                      <Camera className="h-5 w-5 text-sky-600 animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title Area */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">Chicago Premium Residential Service Portfolio</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPic(item)}
                    className="bg-sky-50 text-sky-700 hover:bg-sky-100 p-2 rounded-xl transition-all cursor-pointer border border-sky-100/50"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Modal Modal detail view */}
      {selectedPic && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-sky-100 animate-scaleUp">
            <div className="relative aspect-video">
              <img 
                src={selectedPic.image} 
                alt={selectedPic.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setSelectedPic(null)}
                  className="bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full font-bold">
                  📍 {selectedPic.chicagoNeighbourhood}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase">{selectedPic.category} Service</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-800">{selectedPic.title}</h4>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs text-red-600 font-bold block mb-1">🔴 Standard Before:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedPic.beforeDesc}</p>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <span className="text-xs text-emerald-700 font-bold block mb-1">🟢 Sparkle After:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedPic.afterDesc}</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-slate-100 text-xs items-center text-slate-500">
                <span>Our cleaner’s guarantee: 100% Satisfaction</span>
                <button
                  onClick={() => {
                    setSelectedPic(null);
                    // scroll to booking-calculator
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl font-bold transition-all text-xs"
                >
                  Book Instant Room Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
