import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ShieldAlert, Map as MapIcon, Info, HeartPulse, Target, Building2, Globe2, Activity } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Report', path: '/report', icon: ShieldAlert },
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Safety', path: '/safety', icon: HeartPulse },
    { name: 'Health/Impact', path: '/health-impact', icon: Target },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      {/* Desktop Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-green flex items-center gap-2">
            <ShieldAlert className="h-6 w-6" />
            CleanTrack Health+
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  location.pathname === item.path ? 'text-brand-green' : 'text-gray-600 hover:text-brand-green'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4">
        <Outlet />
      </main>

      {/* Expansive Data Partnerships Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-28 md:pb-12 mt-12 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <Link to="/" className="text-2xl font-black text-brand-light flex items-center gap-2 mb-6">
                <ShieldAlert className="h-8 w-8 text-green-400" />
                CleanTrack
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering Nigerian communities to crowdsource environmental hazard mapping and eradicate preventable public health outbreaks like Malaria and Cholera through actionable data.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-brand-light border-b border-green-500/30 pb-2 inline-block">Platform Links</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/map" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div> Risk Hotspot Map</Link></li>
                <li><Link to="/impact" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div> Community Impact</Link></li>
                <li><Link to="/health-impact" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div> Waste Management</Link></li>
                <li><Link to="/safety" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div> Clinics & Safety</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div> About Us</Link></li>
              </ul>
            </div>

            {/* Report Categories (Active Links) */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-brand-light border-b border-green-500/30 pb-2 inline-block">Report Hazard Categories</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/report" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full border border-orange-400 shrink-0 group-hover:bg-orange-400"></div> Waste Dumps</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full border border-orange-400 shrink-0 group-hover:bg-orange-400"></div> Blocked Gutters</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full border border-orange-400 shrink-0 group-hover:bg-orange-400"></div> Overgrown Bush</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full border border-orange-400 shrink-0 group-hover:bg-orange-400"></div> Refuse Burning</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full border border-orange-400 shrink-0 group-hover:bg-orange-400"></div> Snake/Pest Sighting</Link></li>
              </ul>
            </div>

            {/* Partnerships & Data Integration */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-brand-light border-b border-green-500/30 pb-2 inline-block">Integration Partners</h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">Risk metrics and hazard reports securely synchronized with government health boards.</p>
              
              <div className="grid grid-cols-1 gap-3">
                <a href="https://health.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:bg-white/10 hover:border-green-400/50 transition-all group">
                  <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-green-400/20 transition-colors"><Building2 className="w-4 h-4 text-green-400" /></div>
                  <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1">Federal Ministry of Health</span>
                </a>
                
                <a href="https://ncdc.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:bg-white/10 hover:border-blue-400/50 transition-all group">
                  <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-blue-400/20 transition-colors"><Activity className="w-4 h-4 text-blue-400" /></div>
                  <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1">Nigeria CDC (NCDC)</span>
                </a>

                <a href="https://www.afro.who.int/countries/nigeria" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:bg-white/10 hover:border-indigo-400/50 transition-all group">
                  <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-indigo-400/20 transition-colors"><Globe2 className="w-4 h-4 text-indigo-400" /></div>
                  <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1">World Health Org</span>
                </a>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; 2026 CleanTrack Health+ Platform. All rights reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white underline-offset-4">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white underline-offset-4">Terms of Service</Link>
              <Link to="/api" className="hover:text-white transition-colors flex items-center gap-1 underline decoration-transparent hover:decoration-white underline-offset-4">Open Data API ↗</Link>
              <span className="text-gray-600">|</span>
              <Link to="/admin-db" className="hover:text-brand-green transition-colors text-gray-500 font-medium">Admin Portal</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full text-xs gap-1 ${
              location.pathname === item.path ? 'text-brand-green' : 'text-gray-500 hover:text-brand-green'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
