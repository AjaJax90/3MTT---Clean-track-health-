import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ShieldAlert, ShieldCheck, HeartPulse, Trash2, Recycle, Trees, Coins, CheckCircle } from 'lucide-react';

const HealthImpact = () => {
  const stats = [
    { label: "Hazards Reported", value: "1,240", icon: ShieldAlert, color: "text-red-500", borderColor: "#ef4444" },
    { label: "Hazards Resolved", value: "892", icon: ShieldCheck, color: "text-brand-green", borderColor: "#2e7d32" },
    { label: "Malaria Cases Prevented", value: "4,500+", icon: HeartPulse, color: "text-purple-500", borderColor: "#a855f7" },
    { label: "Awareness Reach", value: "54k", icon: Target, color: "text-blue-500", borderColor: "#3b82f6" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in mt-4">
      {/* Header */}
      <section className="text-center card p-8 bg-blue-50 border-blue-100 flex flex-col items-center">
        <HeartPulse className="w-16 h-16 text-blue-600 mb-4" />
        <h1 className="text-3xl md:text-4xl font-black text-blue-900 mb-4">Health & Environmental Impact</h1>
        <p className="text-gray-700 max-w-2xl text-lg">
          Tracking the direct correlation between environmental hygiene, rapid cleanup interventions, and the reduction of communicable diseases.
        </p>
      </section>
      
      {/* Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card text-center p-6 border-b-4 shadow-sm hover:shadow-md transition-shadow" style={{borderBottomColor: stat.borderColor}}>
            <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
            <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Community Impact Teaser */}
      <section className="card p-6 md:p-8 bg-green-50 border-green-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-green-200 pb-2">Community Impact Dynamics</h2>
            <p className="text-gray-700 mb-4 text-base md:text-lg">
              Local neighborhoods are stepping up! From Wuse to Lugbe, communities are actively clearing gutters to destroy mosquito breeding grounds and flattening waste dumps to prevent cholera. See the exact hazard reports and live resolutions for every participating area in Abuja.
            </p>
            <Link to="/impact" className="btn-primary inline-flex items-center gap-2">
              View Detailed Community Stats <Target className="w-4 h-4" />
            </Link>
          </div>
          <div className="hidden md:flex shrink-0">
            <ShieldCheck className="w-32 h-32 text-brand-green opacity-80" />
          </div>
        </div>
      </section>

      {/* Waste Management Guide Expanded */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Comprehensive Waste Management Guide</h2>
        <p className="text-gray-600 mb-4">Proper waste segregation at the household level is the first line of defense against environmental pollution and communicable diseases.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card border-t-4 border-t-brand-green hover:-translate-y-1 transition-transform shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Trees className="w-6 h-6 text-brand-dark" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Organic (Green)</h3>
            <p className="text-gray-600 text-sm mb-3">Compostable food waste, leaves, and agricultural remains.</p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Do not mix with plastics</li>
              <li>Can be used for local farming compost</li>
              <li>Decomposes naturally in days</li>
            </ul>
          </div>
          
          <div className="card border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Recyclable (Blue)</h3>
            <p className="text-gray-600 text-sm mb-3">Plastics (PET bottles), glass bottles, cans, and clean paper.</p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Rinse containers before binning</li>
              <li>Must be kept completely dry</li>
              <li>High secondary market value</li>
            </ul>
          </div>

          <div className="card border-t-4 border-t-gray-800 hover:-translate-y-1 transition-transform shadow-sm">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">General (Black)</h3>
            <p className="text-gray-600 text-sm mb-3">Non-recyclable materials, heavily soiled items, and sanitary waste.</p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Keep tightly sealed in thick bags</li>
              <li>Requires formal disposal truck</li>
              <li><strong className="text-red-600">Do NOT burn openly</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recycling Coming Soon */}
      <section className="card p-8 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden shadow-lg mt-8">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4 hidden md:block">
          <Recycle className="w-80 h-80" />
        </div>
        <div className="relative z-10 w-full md:w-2/3">
          <div className="inline-block bg-yellow-400 text-yellow-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
            Coming Soon Feature
          </div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-white">
            <Coins className="w-8 h-8 text-yellow-400" /> 
            Recycling Circular Economy
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-6">
            We are launching a nationwide <strong>Plastic-for-Points</strong> program! 
            Soon, you will be able to trade sorted recyclable PET plastics and cans at designated hubs in your community for cash incentives, mobile data top-ups, and health insurance discounts.
          </p>
          <ul className="space-y-3 text-sm text-blue-50 font-medium">
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> Massive job creation for local community sorters.</li>
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> Immediate reduction in dangerous drainage blockages.</li>
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> Direct financial returns for participating households.</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default HealthImpact;
