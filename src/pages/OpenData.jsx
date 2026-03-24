import React from 'react';
import { Database, SearchCode, Server, Zap } from 'lucide-react';

const OpenData = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in mt-4 pb-12">
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
          alt="Developer Database API" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark/85 transition-colors duration-500 group-hover:bg-brand-dark/75"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <Database className="w-12 h-12 text-brand-light mb-4 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-black mb-4 drop-shadow-md flex items-center gap-3">
            Open Data API <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider relative -top-3">Beta</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl font-medium text-green-50 drop-shadow">
            Unleashing Nigeria's hazard reporting data for health developers & researchers.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 space-y-10">
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">The Mission Behind the Architecture</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            At CleanTrack Health+, our primary conviction is that public health data belongs to the public. To ensure maximum transparency and rapid technological scaling, we are aggressively developing a fully RESTful API endpoint architecture. This allows third-party epidemiological scientists, smart city engineers, and NGOs to tap directly into the live pulse of environmental hazard mapping across Abuja.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl hover:-translate-y-1 transition-transform">
             <SearchCode className="w-8 h-8 text-brand-green mb-3" />
             <h3 className="font-bold text-gray-900 mb-2">Live Hazard Lookups</h3>
             <p className="text-gray-600 text-sm">Query coordinates for newly reported illegal dumpsites and blocked gutters globally or via bounding boxes.</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl hover:-translate-y-1 transition-transform">
             <Server className="w-8 h-8 text-brand-green mb-3" />
             <h3 className="font-bold text-gray-900 mb-2">Impact Tally Sync</h3>
             <p className="text-gray-600 text-sm">Fetch real-time aggregated cleanup operations and resolved environmental cases community by community.</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl hover:-translate-y-1 transition-transform">
             <Zap className="w-8 h-8 text-brand-green mb-3" />
             <h3 className="font-bold text-gray-900 mb-2">Webhooks Interface</h3>
             <p className="text-gray-600 text-sm">Subscribe your NGO's backend directly to receive instantaneous POST packets whenever a high-severity alert is raised.</p>
          </div>
        </div>

        <div className="bg-brand-dark rounded-xl p-6 text-gray-300 font-mono text-sm overflow-w-auto group relative">
          <div className="absolute top-0 right-0 p-3 flex gap-2 opacity-50">
             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 mb-3">// GET /api/v1/hazards?region=abuja_garki</p>
          <pre className="text-green-400">
{`{
  "status": "success",
  "data": {
    "hazards": [
      {
        "id": "HZ-9941",
        "category": "stagnant_water",
        "severity": "High",
        "coordinates": [9.0765, 7.3986],
        "reported_at": "2026-03-24T12:00:00Z",
        "verified_by_ncdc": true
      }
    ],
    "pagination": { "cursor": "next_page_str" }
  }
}`}
          </pre>
        </div>

        <div className="pt-6 border-t border-gray-100 text-center">
            <button className="btn-primary text-lg w-full sm:w-auto px-10 py-4 shadow-md font-bold" onClick={() => alert("Developer portal token generation is rolling out exclusively to registered NGO partners starting next quarter. Stay tuned!")}>
              Apply for API Key Documentation
            </button>
        </div>

      </section>

    </div>
  );
};

export default OpenData;
