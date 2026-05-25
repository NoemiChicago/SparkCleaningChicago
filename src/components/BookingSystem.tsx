import { useState, useEffect, FormEvent } from 'react';
import { Booking } from '../types';
import { Calendar, Clock, DollarSign, Home, User, Mail, Phone, MapPin, CheckCircle, FileText, Info, Trash2 } from 'lucide-react';

export default function BookingSystem() {
  const [serviceType, setServiceType] = useState<string>('standard');
  const [hoursBooked, setHoursBooked] = useState<number>(3);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'biweekly' | 'monthly'>('biweekly');
  
  // Extras
  const [extras, setExtras] = useState<string[]>([]);
  
  // Contact info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('');
  
  // Custom states
  const [estimatedCost, setEstimatedCost] = useState<number>(190);
  const [calculatedQuote, setCalculatedQuote] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [localBookings, setLocalBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'calculator' | 'my-bookings'>('calculator');

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chicago_sparkle_bookings');
    if (saved) {
      try {
        setLocalBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved bookings", e);
      }
    }
  }, []);

  // Standard flat pricing of $75 per hour
  const HOURLY_RATE = 75;
  const SECURITY_DEPOSIT = 75;

  const extraItems = [
    { id: 'fridge', name: 'Inside Fridge Cleaning', price: 35, icon: '🧊' },
    { id: 'oven', name: 'Inside Oven Deep Clean', price: 40, icon: '🔥' },
    { id: 'windows', name: 'Deep Interior Windows (per glass)', price: 50, icon: '🪟' },
    { id: 'baseboards', name: 'Hand-washing Baseboards', price: 45, icon: '🧹' },
    { id: 'cabinets', name: 'Inside Cabinets (Empty Only)', price: 45, icon: '🚪' },
    { id: 'pets', name: 'Pet Friendly / Hair Lift', price: 25, icon: '🐾' },
    { id: 'eco', name: '100% Eco-Friendly Supplies', price: 15, icon: '🌱' }
  ];

  // Frequency discounts
  const discountMultiplier = {
    once: 1.0,
    weekly: 0.80, // 20% off
    biweekly: 0.85, // 15% off
    monthly: 0.90 // 10% off
  };

  // Recommend baseline cleaning hours dynamically based on service level, bedrooms & bathrooms
  useEffect(() => {
    let baseTime = 2; // base standard minutes or hours
    if (serviceType === 'deep') baseTime = 3;
    if (serviceType === 'moveOut') baseTime = 4;
    
    // Add additional hours for larger structures
    const recommendedHours = Math.max(
      baseTime,
      baseTime + Math.max(0, bedrooms - 1) * 0.5 + Math.max(0, bathrooms - 1) * 0.5
    );
    
    setHoursBooked(Math.ceil(recommendedHours));
  }, [serviceType, bedrooms, bathrooms]);

  // Recalculate price dynamically whenever hours, frequency or upgrades change
  useEffect(() => {
    let rate = HOURLY_RATE; // 75
    if (serviceType === 'moveOut') {
      rate = 120;
    } else if (serviceType === 'commercial') {
      rate = 150;
    } else if (serviceType === 'deep') {
      rate = 95;
    }
    const hourlySubtotal = hoursBooked * rate;
    
    // Extras cost
    let extrasCost = 0;
    extras.forEach(extraId => {
      const matched = extraItems.find(item => item.id === extraId);
      if (matched) {
        extrasCost += matched.price;
      }
    });

    const subtotal = hourlySubtotal + extrasCost;
    const discount = discountMultiplier[frequency];
    const finalAmount = Math.round(subtotal * discount) + SECURITY_DEPOSIT;
    
    setEstimatedCost(finalAmount);
  }, [hoursBooked, serviceType, frequency, extras]);

  // Handle Extras Toggle
  const toggleExtra = (id: string) => {
    if (extras.includes(id)) {
      setExtras(extras.filter(item => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  // Submitting the custom Quote / Booking Form
  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !preferredDate || !preferredTime) {
      alert("Please fill in all contact and appointment details to reserve your time!");
      return;
    }

    const newBooking: Booking = {
      id: "BK-" + Math.floor(100000 + Math.random() * 90000).toString(),
      name,
      email,
      phone,
      address,
      serviceType: serviceType.toUpperCase() + ' CLEANING',
      hoursBooked,
      bedrooms,
      bathrooms,
      frequency,
      preferredDate,
      preferredTime,
      extras: extras.map(ex => {
        const matching = extraItems.find(item => item.id === ex);
        return matching ? matching.name : ex;
      }),
      estimatedCost,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedBookings = [newBooking, ...localBookings];
    setLocalBookings(updatedBookings);
    localStorage.setItem('chicago_sparkle_bookings', JSON.stringify(updatedBookings));
    
    setIsBooked(true);
    
    // Clear form inputs
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPreferredDate('');
    setPreferredTime('');
    setExtras([]);
  };

  // Delete a booking
  const handleDeleteBooking = (id: string) => {
    const updated = localBookings.filter(b => b.id !== id);
    setLocalBookings(updated);
    localStorage.setItem('chicago_sparkle_bookings', JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-sky-100/80 p-6 md:p-10 shadow-lg">
      
      {/* Tab Switchers */}
      <div className="flex border-b border-slate-200 mb-8 pointer-events-auto">
        <button
          onClick={() => { setActiveTab('calculator'); setIsBooked(false); }}
          className={`pb-4 px-6 text-sm font-semibold transition-all relative ${
            activeTab === 'calculator' 
              ? 'text-sky-600 border-b-2 border-sky-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          1. Calculate Quote & Book
        </button>
        <button
          onClick={() => setActiveTab('my-bookings')}
          className={`pb-4 px-6 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'my-bookings' 
              ? 'text-sky-600 border-b-2 border-sky-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          2. My Cleaning Schedule
          {localBookings.length > 0 && (
            <span className="bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {localBookings.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'calculator' ? (
        <div>
          {isBooked ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fadeIn">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Your Booking is Confirmed!</h3>
              <p className="text-slate-600 mt-2 max-w-lg mx-auto">
                Thank you, we've registered your appointment. A Spark Cleaning Chicago cleaner is scheduled for your service. We have dispatched a confirmation receipt details to your email.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setActiveTab('my-bookings')}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow text-sm"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => setIsBooked(false)}
                  className="bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  Schedule Another Clean
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Form Input Side */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center bg-sky-100 text-sky-600 h-6 w-6 rounded-full text-xs font-bold">1</span>
                    Select Service Type
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'standard', name: 'Standard Clean', desc: 'Routine dusting, sweeping & wiping' },
                      { id: 'deep', name: 'Deep Clean', desc: 'Intense dirt, grease, & baseboard removal' },
                      { id: 'moveOut', name: 'Move-In/Out', desc: 'Empty house absolute thorough detailing' },
                      { id: 'commercial', name: 'Office Clean', desc: 'Workspaces and commercial facilities' }
                    ].map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setServiceType(service.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          serviceType === service.id
                            ? 'border-sky-500 bg-sky-50 shadow-sm'
                            : 'border-slate-200 hover:border-sky-200 bg-white'
                        }`}
                      >
                        <span className="font-bold text-slate-800 text-sm block">{service.name}</span>
                        <span className="text-xs text-slate-500 block mt-1 leading-tight">{service.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Home Stats Details */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center bg-sky-100 text-sky-600 h-6 w-6 rounded-full text-xs font-bold">2</span>
                    Tell Us About Your Space
                  </h3>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    {/* Hourly Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-sky-500" /> Service Duration (Hours)
                        </label>
                        <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
                          {hoursBooked} {hoursBooked === 1 ? 'Hour' : 'Hours'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        step="1"
                        value={hoursBooked}
                        onChange={(e) => setHoursBooked(Number(e.target.value))}
                        className="w-full accent-sky-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                        <span>2 hours (Min)</span>
                        <span>4 hours</span>
                        <span>6 hours</span>
                        <span>8 hours</span>
                        <span>12 hours (Max)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 italic mt-2 leading-relaxed">
                        📌 We’ve set a suggested cleaning duration based on rooms, but feel free to adjust up or down depending on your current needs!
                      </p>
                    </div>

                    {/* Bed/Baths */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                            className="px-4 py-2 hover:bg-slate-200 font-bold transition-colors text-slate-600"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-bold text-slate-800 text-sm">{bedrooms} Bed</span>
                          <button
                            type="button"
                            onClick={() => setBedrooms(bedrooms + 1)}
                            className="px-4 py-2 hover:bg-slate-200 font-bold transition-colors text-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                            className="px-4 py-2 hover:bg-slate-200 font-bold transition-colors text-slate-600"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-bold text-slate-800 text-sm">{bathrooms} Bath</span>
                          <button
                            type="button"
                            onClick={() => setBathrooms(bathrooms + 1)}
                            className="px-4 py-2 hover:bg-slate-200 font-bold transition-colors text-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cleaning Frequency */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Service Frequency</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'once', name: 'One-Time', badge: '' },
                          { id: 'weekly', name: 'Weekly', badge: '20% Off' },
                          { id: 'biweekly', name: 'Bi-Weekly', badge: '15% Off' },
                          { id: 'monthly', name: 'Monthly', badge: '10% Off' }
                        ].map((freq) => (
                          <button
                            key={freq.id}
                            type="button"
                            onClick={() => setFrequency(freq.id as any)}
                            className={`p-2.5 rounded-lg border text-center transition-all flex flex-col justify-center items-center ${
                              frequency === freq.id
                                ? 'bg-sky-500 border-sky-500 text-white'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span className="text-xs font-bold leading-tight">{freq.name}</span>
                            {freq.badge && (
                              <span className={`text-[9px] px-1 py-0.2 rounded mt-1 font-bold ${
                                frequency === freq.id ? 'bg-white text-sky-600' : 'bg-sky-100 text-sky-700'
                              }`}>
                                {freq.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extras Selections */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center bg-sky-100 text-sky-600 h-6 w-6 rounded-full text-xs font-bold">3</span>
                    Add Service Upgrades
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extraItems.map((item) => {
                      const selected = extras.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleExtra(item.id)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                            selected
                              ? 'border-sky-500 bg-sky-50/70 shadow-sm font-medium'
                              : 'border-slate-200 hover:border-sky-100 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <span className="text-xs font-bold text-slate-700 block">{item.name}</span>
                              <span className="text-[11px] text-slate-400 font-mono">+${item.price}</span>
                            </div>
                          </div>
                          <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selected ? 'border-sky-500 bg-sky-500' : 'border-slate-300 bg-white'
                          }`}>
                            {selected && <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Instant Quote & Details Right Side */}
              <div className="lg:col-span-12 xl:col-span-5">
                <div className="sticky top-28 bg-white border border-sky-100 shadow-xl rounded-2xl overflow-hidden p-6 md:p-8 space-y-6">
                  
                  {/* Quote Breakdown */}
                  <div className="border-b border-dashed border-slate-200 pb-5 text-center">
                    <p className="text-xs uppercase tracking-wider font-bold text-sky-600">Online Cost Estimator</p>
                    <div className="flex items-baseline justify-center text-slate-800 mt-2">
                      <span className="text-2xl font-bold font-mono">$</span>
                      <span className="text-5xl font-extrabold font-mono tracking-tight">{estimatedCost}</span>
                      <span className="text-slate-500 text-xs font-semibold ml-1">/ cleaning</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold mt-2">
                      <CheckCircle className="h-3 w-3" /> Fully Guaranteed Quote
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detail Summary</h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Service level</span>
                      <span className="font-bold text-slate-800 uppercase">{serviceType} clean</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Clean Duration</span>
                      <span className="font-bold text-slate-800 font-mono">{hoursBooked} {hoursBooked === 1 ? 'Hour' : 'Hours'} (@ ${serviceType === 'moveOut' ? 120 : (serviceType === 'commercial' ? 150 : (serviceType === 'deep' ? 95 : 75))}/hr)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Property Layout</span>
                      <span className="font-bold text-slate-800">{bedrooms} Bed, {bathrooms} Bath</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Interval frequency</span>
                      <span className="font-bold text-slate-800 capitalize">{frequency}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Security Deposit</span>
                      <span className="font-bold text-slate-800 font-mono text-emerald-600 flex items-center gap-1">$75 <span className="text-[10px] text-slate-400 font-normal">(Non Refundable)</span></span>
                    </div>
                    {extras.length > 0 && (
                      <div className="flex flex-col gap-1 pt-1 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 font-bold uppercase">Upgrades</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {extras.map(exId => {
                            const found = extraItems.find(it => it.id === exId);
                            return found ? (
                              <span key={exId} className="bg-sky-50 text-sky-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-sky-100">
                                {found.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking Fields Action Form */}
                  <form onSubmit={handleSubmitBooking} className="pt-4 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Set Appointment Details</h4>
                    
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-sm font-medium"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-sm font-medium"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number (e.g. +1 312-xxx-xxxx)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-sm font-medium"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Service Address and Unit (Chicago area)"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-sm font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-xs font-semibold text-slate-700"
                          />
                        </div>

                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <select
                            required
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-slate-50/70 text-xs font-semibold text-slate-700"
                          >
                            <option value="">Preferred Time</option>
                            <option value="08:00 AM">08:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="12:00 PM">12:00 PM (Noon)</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-center font-bold tracking-wide transition-all shadow-md focus:ring-4 focus:ring-emerald-200 cursor-pointer block mt-4"
                    >
                      Book Professional Clean For ${estimatedCost}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 text-center">
                      🔒 Includes a non-refundable $75 security deposit.
                    </p>
                  </form>

                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* LIST OF BOOKINGS */
        <div className="space-y-6 animate-fadeIn">
          {localBookings.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
              <p className="text-slate-500">No active cleanings booked yet. Fill out the Quote Form & make your first booking today!</p>
              <button
                onClick={() => setActiveTab('calculator')}
                className="mt-4 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Go to Quote Calculator
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-base font-bold text-slate-800">Scheduled Appointments ({localBookings.length})</h4>
                <p className="text-xs text-slate-400 italic">Saved locally on your device</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localBookings.map((b) => (
                  <div key={b.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm relative hover:shadow-md transition-shadow">
                    
                    {/* Delete action */}
                    <button
                      onClick={() => {
                        if (confirm(`Cancel and delete booking ${b.id}?`)) {
                          handleDeleteBooking(b.id);
                        }
                      }}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Cancel Booking"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <span className="inline-block bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded text-[10px] font-bold">
                          {b.id}
                        </span>
                        <h5 className="font-bold text-slate-800 text-sm mt-1">{b.serviceType}</h5>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 mt-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Date & Time</span>
                        <span className="font-semibold">{b.preferredDate} @ {b.preferredTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Service Scope</span>
                        <span className="font-semibold">{b.hoursBooked ? `${b.hoursBooked} Hours` : `${b.homeSize} sqft`} ({b.bedrooms} Bed, {b.bathrooms} Bath)</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block text-[10px]">Cleaning Address</span>
                        <span className="font-semibold truncate block">{b.address}</span>
                      </div>
                      <div className="col-span-2 text-slate-700 font-bold text-xs pt-1 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span>Rate: <span className="font-semibold capitalize text-slate-500 font-mono">({b.frequency})</span></span>
                          <span className="text-[9px] text-slate-400 font-normal italic leading-none mt-0.5">(Includes $75 security deposit)</span>
                        </div>
                        <span className="font-mono text-sky-600 font-extrabold text-sm">${b.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
