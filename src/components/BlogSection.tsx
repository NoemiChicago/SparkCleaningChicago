import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Search, Tag, Calendar, User, Clock, ArrowRight, CornerDownRight, Check, Send, Phone, Mail, HelpCircle } from 'lucide-react';

import penthouseImg from '../assets/images/chicago_penthouse_1779682075439.png';
import kitchenImg from '../assets/images/sparkling_kitchen_1779680631090.png';
import bathroomImg from '../assets/images/luxury_bathroom_1779680652483.png';
import townhouseImg from '../assets/images/townhouse_living_1779680669964.png';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Quick newsletter subscription state
  const [newsEmail, setNewsEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const phone = "+1 (312) 956 - 4183";
  const email = "Ce.Noemi4700@Gmail.com";

  const posts: BlogPost[] = [
    {
      id: 'welcome_post',
      title: "Welcome to Spark Cleaning Chicago: Our Mission & Journey",
      summary: "Introducing Chicago's premier local home cleaners. Read about Noemi's mission to bring premium sparkle, safety, and absolute freshness to your Wind City home.",
      content: [
        "Hello Chicago, and welcome to our brand new online platform! I am Noemi, the founder and lead organizer of Spark Cleaning Chicago. For multiple years, our mission has been incredibly simple: to treat every single Lincoln Park townhouse, Gold Coast penthouse, and Wicker Park apartment as if it were our own personal sanctuary. Cleaning isn't just a basic chore for us—it's about creating a safe, serene space where you can relax, breathe clearly, and focus on what truly matters.",
        "We know how fast-paced Windy City life can be. Between navigating the CTA, late hours at work, and enjoying everything our historic neighborhoods have to offer, the absolute last thing you want to spend your weekends doing is scrubbing grease off a stovetop or hand-washing baseboards. That's why we built Spark Cleaning Chicago. We offer completely transparent cleaning pricing lists, a fully integrated online instant quote calculator, and a 100% Sparkle Satisfaction Guarantee.",
        "Every housekeeper on our team is fully vetted, background-checked, insured, and bonded. We bring top-tier commercial materials and tools, alongside optional 100% eco-friendly and pet-safe sanitizers to every single visit. Thank you for welcoming us into your homes and office workspaces. Check out our pricing calculator below to reserve your schedule, or drop us an email or phone call anytime is convenient!"
      ],
      author: "Noemi (Founder)",
      date: "May 25, 2026",
      category: "Company News",
      tags: ["Chicago Living", "Welcome", "About Us"],
      readTime: "3 min read",
      image: penthouseImg
    },
    {
      id: 'kitchen_tips',
      title: "The 15-Minute Kitchen Reset: Deep-Cleaning Cooking Areas",
      summary: "Keep your marble countertops and stainless steel appliances looking brand new with our expert step-by-step cleaning tips.",
      content: [
        "The kitchen is the heart of the home, but it's also the area most prone to accumulated grease sprays, sticky coffee rings, and fine crumbs. At Spark Cleaning Chicago, our deep kitchen resets are legendary. But how do you maintain that flawless shine between scheduled cleaning visits? It takes just 15 minutes of smart, focused effort.",
        "First, empty the sink. A dirty sink instantly makes a clean kitchen feel messy. Use a non-scratch scrub pad with warm water and some white vinegar to bring back the brilliant shine of stainless steel basins. For marble, granite, or quartz countertops, avoid acidic cleaners like lemon or vinegar. Instead, use warm water with a drop of gentle dish soap, and wipe dry immediately with a clean microfiber fabric to prevent mineral watermarks.",
        "Finally, wipe down appliances to eliminate smudges. Spray a high-quality microfiber cloth with glass spray or specialized steel cleaner, and wipe in the direction of the metal's grain. If you want a deep overhaul, remember that Noemi's crew does the heavy lifting, cleaning deep inside empty oven compartments and fridge interiors with pristine detail!"
      ],
      author: "Noemi (Founder)",
      date: "May 20, 2026",
      category: "Kitchen Tips",
      tags: ["Kitchen Tips", "Deep Clean", "Organization"],
      readTime: "4 min read",
      image: kitchenImg
    },
    {
      id: 'bathroom_tips',
      title: "Banishing Bathroom Soap Scum & Hard Water for Good",
      summary: "Say goodbye to foggy glass shower doors and dull faucets. Learn the exact methods our professional team uses.",
      content: [
        "Nothing feels as luxurious as stepping into an immaculate, spa-like bathroom. However, standard shower steam, soap residue, and Chicago's local tap minerals can quickly create a foggy film over your glass doors and high-gloss porcelain tiles.",
        "Our number one professional housekeeper secret? Use a squeegee after every single shower! It takes literally five seconds but prevents 90% of water spotting and mineral film buildup. For glass that has already acquired spots, make a simple 50/50 mixture of white distilled vinegar and water. Spray liberally, let it sit for two minutes, and wipe clean with a lint-free microfiber cloth. You will immediately notice the pristine clarity return.",
        "When polishing faucets, skip abrasive scrubbers which can Scratch fine finishes like chrome, brass, or gold plates. A microfiber cloth sprinkled with baking soda works wonders on porcelain sinks and shower floors, dissolving hard stains while remaining entirely natural and eco-safe. Keep these materials handy, and your restroom will remain a sanctuary!"
      ],
      author: "Noemi (Founder)",
      date: "May 15, 2026",
      category: "Bathroom Tips",
      tags: ["Bathroom Tips", "Sanitization", "Eco-Friendly"],
      readTime: "4 min read",
      image: bathroomImg
    },
    {
      id: 'livingroom_tips',
      title: "Keeping Your Living Space Allergen & Fine Dust-Free",
      summary: "Vacuum patterns, blind cleaning, and keeping dander away in busy metropolitan townhouses.",
      content: [
        "With busy central city streets, open windows during spring, and beloved pets, Chicago living rooms collect fine dust and airborne pollutants incredibly fast. Dust isn't just an eye-sore; it carries allergens that can impact your rest and overall health.",
        "To combat this, the golden rule of dusting is to always clean from top to bottom. Start with ceiling fan blades and top shelves, move to framed photos and windowsills, and finish with baseboards, rugs, and flooring. If you dust tables first and then wipe the light fixtures, falling dust particles will ruin your effort!",
        "Always use microfiber cloths over traditional feather dusters. Feather dusters simply brush particles into the air, where they float before settling back on your furniture. Microfibers utilize tiny static fibers to capture and hold dust permanently. Vacuum carpets slowly in overlapping directions to raise the pile and lift embedded dog or cat fur. It is these custom details that make Spark Cleaning Chicago stand out!"
      ],
      author: "Noemi (Founder)",
      date: "May 10, 2026",
      category: "Living Room",
      tags: ["Living Room", "Organization", "Spring Cleaning"],
      readTime: "5 min read",
      image: townhouseImg
    }
  ];

  // Derive unique categories and tags
  const categories = ['All', 'Company News', 'Kitchen Tips', 'Bathroom Tips', 'Living Room'];
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  // Filter logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesTag && matchesSearch;
  });

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    setNewsEmail('');
  };

  const selectPostAndScroll = (post: BlogPost) => {
    setSelectedPost(post);
    const el = document.getElementById('blog_reader_anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Blog Intro Panel */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Spark Cleaning Chicago Blog</span>
        <h3 className="text-2xl font-bold text-slate-800">Cleaning Insights & Company News</h3>
        <p className="text-sm text-slate-500">
          Curated housekeeping formulas, deep cleaning tricks from Noemi, and local Chicago area updates.
        </p>
      </div>

      {/* Anchor for reading full post */}
      <div id="blog_reader_anchor"></div>

      {/* Expanded Blog Reader (Shows if a post is selected) */}
      {selectedPost && (
        <div className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-xl animate-scaleUp p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100/50"
            >
              ← Back to Blog list
            </button>
            <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedPost.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Post Image & Metadata (Left / Top) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <User className="h-3.5 w-3.5 text-sky-500" />
                  <span>Written by: {selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-sky-500" />
                  <span>Published: {selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-sky-500" />
                  <span>Estimation: {selectedPost.readTime}</span>
                </div>
                
                <div className="h-px bg-slate-200/60 my-2"></div>
                
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPost.tags.map(t => (
                      <span key={t} className="bg-white px-2.5 py-1 rounded border border-slate-200 text-[10px] text-slate-600 font-semibold shadow-sm">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Directly Prominent CTA block with Noemi's contact */}
              <div className="bg-sky-900 text-white rounded-2xl p-5 space-y-4 text-center">
                <h5 className="font-bold text-yellow-300 text-xs uppercase tracking-widest">Love these results?</h5>
                <p className="text-slate-300 text-xs leading-normal">
                  Noemi's crew carries out all these professional methods to perfection. Schedule your appointment instantly!
                </p>
                <div className="space-y-2 pt-1">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-1.5 text-xs text-white bg-white/15 py-2.5 rounded-lg font-bold hover:bg-sky-500 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call: {phone}</span>
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center justify-center gap-1.5 text-xs text-white bg-white/10 py-2 rounded-lg font-semibold hover:bg-sky-500 transition-colors break-all">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email: {email}</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold transition-all text-xs border border-emerald-400"
                >
                  Book Online Instant Clean
                </button>
              </div>
            </div>

            {/* Post Content Body (Right) */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedPost.title}
              </h4>
              
              <p className="text-sm font-semibold text-slate-700 bg-sky-50/50 p-4 border-l-4 border-sky-400 rounded-r-xl">
                {selectedPost.summary}
              </p>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-sans">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx} className="indent-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Cleaner checklist box in post */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Our Professional Standard Includes:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    '100% Background-Checked Staff',
                    'Microfiber dust-adhesion tech',
                    'Chemical-free marble safety',
                    'Apt-window clear view wipe',
                    'Strict schedule punctuality',
                    '100% Insured work damage cover'
                  ].map((chk, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-700">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Blog Grid and Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Listing of Blog Posts */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Filtering Information Bar */}
          {(selectedTag || searchQuery) && (
            <div className="bg-sky-50/70 border border-sky-100 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-sky-800 font-semibold">
                <span>Filtering by:</span>
                {selectedTag && (
                  <span className="bg-sky-600 text-white px-2 py-0.5 rounded-full font-bold">
                    #{selectedTag}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-slate-700 text-white px-2 py-0.5 rounded-full font-bold">
                    Search: "{searchQuery}"
                  </span>
                )}
              </div>
              <button 
                onClick={() => { setSelectedTag(null); setSearchQuery(''); }}
                className="text-xs text-sky-600 hover:text-sky-800 font-bold underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No blog posts match your current filter selections.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSelectedTag(null); setSearchQuery(''); }}
                className="text-xs text-sky-600 hover:text-sky-700 font-bold mt-2 underline"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-lg flex flex-col justify-between ${
                    selectedPost?.id === post.id ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-100'
                  }`}
                >
                  <div>
                    {/* Thumb area */}
                    <div className="relative aspect-video bg-slate-100 border-b border-slate-100 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h4 className="font-extrabold text-slate-800 text-base leading-snug hover:text-sky-600 transition-colors">
                        {post.title}
                      </h4>
                      
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer & Read Trigger */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-[9px] text-sky-600 font-bold bg-sky-50 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => selectPostAndScroll(post)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Read article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Grid: Blog Sidebar (Filters, Tags, Search, Subscribe) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Search Input */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Search articles</h5>
            <div className="relative flex items-center">
              <Search className="h-4 w-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                placeholder="Type tags, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-5/70 font-medium text-slate-700"
              />
            </div>
          </div>

          {/* Categories select sidebar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Post Categories</h5>
            <div className="flex flex-col gap-1.5">
              {categories.map(cat => {
                const count = posts.filter(p => cat === 'All' || p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSelectedTag(null); }}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left cursor-pointer font-semibold ${
                      activeCategory === cat 
                        ? 'bg-sky-500 text-white' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tag cloud sidebar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Interactive Tag Cloud</h5>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map(tag => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected 
                        ? 'bg-sky-600 border-sky-600 text-white shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <Tag className="h-2.5 w-2.5" />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Newsletter sub box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm text-white text-center space-y-4">
            <div className="h-10 w-10 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h5 className="font-bold text-sm tracking-tight text-white">Subscribe for Tips</h5>
              <p className="text-[11px] text-slate-400">Receive organic cleaning recipes & exclusive discount codes!</p>
            </div>

            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
                <Check className="h-3.5 w-3.5" />
                <span>You’re on the VIP list!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-slate-800 bg-white rounded-xl focus:ring-1 focus:ring-sky-500 border-none font-semibold"
                />
                <button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md"
                >
                  <Send className="h-3 w-3" />
                  <span>Join VIP List</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
