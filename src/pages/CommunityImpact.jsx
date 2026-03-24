import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, CheckCircle2, Target, MapPin } from 'lucide-react';

const CommunityImpact = () => {
  const communities = [
    { name: 'Lugbe', reports: 145, active: true },
    { name: 'Garki', reports: 24, active: true },
    { name: 'Wuse', reports: 67, active: true },
    { name: 'Maitama', reports: 12, active: true },
    { name: 'Mararaba', reports: 82, active: true },
    { name: 'Bwari', reports: 31, active: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in mt-4">
      <section className="bg-brand-light rounded-xl p-8 text-center border border-green-100">
        <Users className="w-12 h-12 text-brand-dark mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-dark mb-4">
          Community Impact
        </h1>
        <p className="text-xl text-brand-green font-medium italic mb-2">
          "Together we can fix and build our community."
        </p>
        <p className="text-gray-600">
          See how neighborhoods across Abuja are actively participating by reporting hazards and improving public health.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((comm, idx) => (
          <Link to={`/impact/${comm.name.toLowerCase()}`} key={idx} className="card hover:shadow-md hover:border-brand-green transition-all block">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-gray-800">{comm.name}</h3>
              {comm.active && (
                <span className="flex items-center gap-1 text-xs font-medium text-brand-green bg-green-50 px-2 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span> Active
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4 text-orange-500" />
                <span>{comm.reports} Reports</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Engaged</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-brand-green" /> Ongoing Interventions & Campaigns
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
           <Link to="/campaign/drainage-clearing" className="card p-5 hover:-translate-y-1 transition-transform border-orange-200 bg-orange-50/50 hover:bg-orange-50 shadow-sm">
              <h3 className="font-bold text-orange-900 mb-2 text-lg">Weekend Drainage Clearing</h3>
              <p className="text-sm text-orange-800 flex items-center gap-1.5 mb-2 font-medium"><MapPin className="w-4 h-4"/> Lugbe</p>
              <p className="text-xs text-orange-700 bg-orange-100 border border-orange-200 w-max px-3 py-1.5 rounded-full mt-4 font-bold">Sat, 8:00 AM</p>
           </Link>
           <Link to="/campaign/malaria-seminar" className="card p-5 hover:-translate-y-1 transition-transform border-purple-200 bg-purple-50/50 hover:bg-purple-50 shadow-sm">
              <h3 className="font-bold text-purple-900 mb-2 text-lg">Malaria Prevention Seminar</h3>
              <p className="text-sm text-purple-800 flex items-center gap-1.5 mb-2 font-medium"><MapPin className="w-4 h-4"/> Garki Hall</p>
              <p className="text-xs text-purple-700 bg-purple-100 border border-purple-200 w-max px-3 py-1.5 rounded-full mt-4 font-bold">Fri, 4:00 PM</p>
           </Link>
           <Link to="/campaign/recycling-points" className="card p-5 hover:-translate-y-1 transition-transform border-blue-200 bg-blue-50/50 hover:bg-blue-50 shadow-sm">
              <h3 className="font-bold text-blue-900 mb-2 text-lg">Recycle Plastics for Points</h3>
              <p className="text-sm text-blue-800 flex items-center gap-1.5 mb-2 font-medium"><MapPin className="w-4 h-4"/> Wuse Market</p>
              <p className="text-xs text-blue-700 bg-blue-100 border border-blue-200 w-max px-3 py-1.5 rounded-full mt-4 font-bold">Ongoing</p>
           </Link>
        </div>
      </section>

    </div>
  );
};

export default CommunityImpact;
