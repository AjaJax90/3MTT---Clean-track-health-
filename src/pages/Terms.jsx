import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in mt-4 pb-12">
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" 
          alt="Legal Contract" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark/80 transition-colors duration-500 group-hover:bg-brand-dark/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <ShieldCheck className="w-12 h-12 text-brand-light mb-4 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-black mb-4 drop-shadow-md">Terms of Service</h1>
          <p className="text-lg sm:text-xl max-w-xl font-medium text-green-50 drop-shadow">
            Guidelines and legal bounds for operating within the CleanTrack framework.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            By accessing or using the CleanTrack Health+ platform, mapping tools, or reporting endpoints, you strictly agree to be bound by these functional terms of service. Our platform is exclusively built to enhance public and environmental hygiene in Nigeria. Misuse of the reporting mechanisms may result in indefinite account restriction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">2. User Responsibilities & Reporting Integrity</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <span className="text-gray-700 text-lg"><strong>Accuracy of Hazard Reports:</strong> Users must ensure that images, geolocations, and descriptions of waste dumps or health risks are truthfully represented. Intentional circulation of falsified disease clusters is punishable by data revocation.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
              <span className="text-gray-700 text-lg"><strong>Emergency Constraints:</strong> This platform is highly optimized to alert sanitation and health boards. However, for immediate medical emergencies (e.g. fatal snake bites), you must contact the national hospital hotlines provided in the 'Safety' guidelines independently.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">3. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            The data visualizations, mapping logic, and environmental health correlations provided through CleanTrack Health+ are proprietary properties developed to empower Nigerians. You may freely use the platform's insights for academic or non-profit community work so long as the original mapping dashboard is cited.
          </p>
        </div>

        <div className="bg-green-50 border border-brand-green/20 rounded-xl p-6 mt-8">
          <p className="text-sm font-semibold text-brand-dark">
            Last Updated: March 2026. If you have any questions regarding your responsibilities, please use the Official Ministry of Health contact forms.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Terms;
