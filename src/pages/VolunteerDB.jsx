import React, { useState, useEffect } from 'react';
import { Database, UserCheck, Phone, MapPin, Trash2, CalendarClock } from 'lucide-react';

const VolunteerDB = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch data from simulated local database
    const fetchDB = () => {
      const dbData = JSON.parse(localStorage.getItem('cleantrack_volunteers_db') || '[]');
      // Sort newest first
      setVolunteers(dbData.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)));
    };
    fetchDB();
  }, []);

  const handleClearDB = () => {
    if (window.confirm("CRITICAL WARNING: This will permanently wipe all registered volunteers from the local database. Proceed?")) {
      localStorage.removeItem('cleantrack_volunteers_db');
      setVolunteers([]);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown Date';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: 'numeric', minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in mt-4 pb-12">
      
      {/* Header */}
      <div className="bg-brand-dark rounded-3xl p-8 sm:p-10 shadow-lg text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Database className="w-10 h-10 text-brand-green" />
          </div>
          <div>
            <h1 className="text-3xl font-black mb-1">Admin Database</h1>
            <p className="text-gray-300">Live feed of collected Cleanup Squad volunteers.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-brand-green text-brand-dark px-4 py-2 rounded-lg font-bold">
            Total Records: {volunteers.length}
          </div>
          <button 
            onClick={handleClearDB}
            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Purge DB
          </button>
        </div>
      </div>

      {/* Responsive Data View */}
      {volunteers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
          <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Database Empty</h2>
          <p className="text-gray-500">No volunteers have registered through the portal yet. Check back later after running campaigns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((vol, idx) => (
            <div key={idx} className="bg-white border text-left border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-light rounded-bl-full -z-0 group-hover:bg-green-100 transition-colors"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1 pr-4">{vol.name}</h3>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone className="w-4 h-4 text-brand-green" />
                    <span className="font-medium text-gray-800">{vol.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span>{vol.district}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CalendarClock className="w-4 h-4 text-brand-green" />
                    <span>{formatDate(vol.joinedAt)}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <span className="inline-block bg-brand-light text-brand-dark text-xs font-bold px-3 py-1.5 rounded-md border border-brand-green/30 w-full text-center">
                    {vol.interest}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerDB;
