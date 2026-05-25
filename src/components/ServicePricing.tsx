import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ServicePricingProps {
  onSelectService: (serviceKey: string) => void;
}

export default function ServicePricing({ onSelectService }: ServicePricingProps) {
  const services = [
    {
      key: 'standard',
      name: 'Standard Clean',
      priceText: '$75 / Hour (2-hour min)',
      desc: 'Perfect for regular upkeep and maintaining a pristine, healthy living space.',
      features: [
        'Dust all surfaces & shelves',
        'Vacuum carpets & mop hard floors',
        'Scrub toilets, tubs, & bathroom fixtures',
        'Wipe down kitchen exterior surfaces',
        'Empty waste and recycling bins',
        'Quick bed sheets tuck & fluff'
      ],
      badge: '',
      color: 'sky'
    },
    {
      key: 'deep',
      name: 'Deep Clean',
      priceText: '$95 / Hour (3-hour min)',
      desc: 'Our signature thorough reset scrubbing deep grease, detailed dust, and sanitize.',
      features: [
        'All Standard Clean features included',
        'Hand-washing accessible baseboards',
        'Deep grout cleaning & tile scrub',
        'Dusting of individual blinds & vents',
        'Wiping down kitchen cabinet doors',
        'Deep light fixtures & fan dusting'
      ],
      badge: 'Popular choice',
      color: 'emerald'
    },
    {
      key: 'moveOut',
      name: 'Move-In / Move-Out',
      priceText: '$120 / Hour (4-hour min)',
      desc: 'The ultimate inside-out checklist to secure deposit returns and start fresh.',
      features: [
        'Deep cleaning inside empty cabinets',
        'Sanitizing inside of fridge & freezer',
        'Deep degreasing inside of oven',
        'Interior windows & tracks detailing',
        'Complete wall molding wipe-down',
        'Guaranteed rental inspection pass'
      ],
      badge: 'Highly recommended',
      color: 'slate'
    },
    {
      key: 'commercial',
      name: 'Office & Commercial',
      priceText: '$150 / Hour',
      desc: 'Maintain active worker productivity and safe, hygienic workspaces for staff.',
      features: [
        'High-touch sanitization (keyboards, handles)',
        'Conference room detailing & trash recycle',
        'Breakroom sink, fridge, & table sanitize',
        'Restroom disinfection and restocking',
        'Custom off-hour visits (night/weekend)',
        'Dedicated bonded cleaning specialists'
      ],
      badge: 'Custom schedule',
      color: 'violet'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Introduction */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="max-w-xl">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Service Offerings</span>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">Our Transparent Cleaning Tiers</h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Choose the service scope that fits your schedule. Calculate your exact customized quote instantly using our interactive calculator below. No surprise contract rates!
          </p>
        </div>
        
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-center gap-2 max-w-sm">
          <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0" />
          <span className="text-xs text-sky-800 font-semibold leading-snug">
            All services are covered by our **100% Sparkle Satisfaction Guarantee** or we re-clean for free.
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item) => (
          <div 
            key={item.key}
            className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group"
          >
            {item.badge && (
              <span className={`absolute -top-3 left-6 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-white ${
                item.key === 'deep' ? 'bg-emerald-500' : 'bg-sky-500'
              }`}>
                {item.badge}
              </span>
            )}

            <div>
              <div className="mb-4">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Spark Cleaning Chicago Option</span>
                <h4 className="text-lg font-bold text-slate-800 mt-0.5">{item.name}</h4>
                <p className="text-sky-600 font-mono font-extrabold text-sm mt-1">{item.priceText}</p>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* Bullet Features list */}
              <ul className="space-y-2.5 mb-8">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection Button */}
            <button
              onClick={() => onSelectService(item.key)}
              className={`w-full text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                item.key === 'deep' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300'
              }`}
            >
              <span>Get Quote / Book</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
