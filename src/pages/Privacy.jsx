import React from 'react';
import { Lock, FileKey2 } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in mt-4 pb-12">
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80" 
          alt="Data Privacy & Security" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark/80 transition-colors duration-500 group-hover:bg-brand-dark/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <Lock className="w-12 h-12 text-brand-light mb-4 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-black mb-4 drop-shadow-md">Privacy Policy</h1>
          <p className="text-lg sm:text-xl max-w-xl font-medium text-green-50 drop-shadow">
            How we aggressively protect and handle your location and health data.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            To provide the most robust environmental action platform in Africa, we necessitate the collection of specific operational data types:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
            <li><strong>Geospatial GPS Coordinates:</strong> Only extracted and transmitted locally during active Hazard Reports to precisely map Stagnant waters or Waste Dumps.</li>
            <li><strong>Camera Outputs:</strong> Real-time photo uploads used strictly for validating cleanup requests by the Nigeria CDC and environmental sanitation boards.</li>
            <li><strong>Personal Contact Data:</strong> Captured only within the secure "Volunteer Campaigns" registry to allow local medical teams to reach out directly.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Information Sharing & Partners</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Your data is never sold to third-party ad brokers. Environmental alerts naturally include spatial data which is openly synchronized with our integration partners—the <strong>Federal Ministry of Health</strong> and the <strong>Nigeria CDC</strong>—so they can effectively deploy epidemiological resources and containment teams to your community.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Data Security Protections</h2>
          <div className="flex gap-4 items-start bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
               <FileKey2 className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">End-to-End Encryption Architecture</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                All uploaded camera photos and coordinates transit through secured, mutually-authenticated API layers. Stored volunteer data inside our registries uses hashed tokens, isolating your mobile number from the raw location mapping metrics entirely.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Privacy;
