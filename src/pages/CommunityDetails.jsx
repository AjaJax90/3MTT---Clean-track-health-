import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Droplets, ShieldAlert, CheckCircle2, AlertTriangle, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const mockData = {
  lugbe: { 
    name: 'Lugbe', reports: 145, fixed: 92, people: '1,200', desc: 'Active community effort focusing on waste collection.',
    breakdown: { waste: 60, drainage: 30, bush: 10 },
    recent: [
      { id: '102', cat: 'Waste Dump', date: '2 days ago', loc: 'Carwash Bus Stop', status: 'Resolved', sev: 'High' },
      { id: '105', cat: 'Stagnant Water', date: '1 day ago', loc: 'FHA Phase 1', status: 'Pending', sev: 'High' },
      { id: '108', cat: 'Overgrown Bush', date: '5 hrs ago', loc: 'Airport Road', status: 'Under Review', sev: 'Medium' }
    ]
  },
  garki: { 
    name: 'Garki', reports: 24, fixed: 14, people: '450', desc: 'Urban area focusing on proper refuse disposal.',
    breakdown: { waste: 50, drainage: 40, bush: 10 },
    recent: [
      { id: '201', cat: 'Stagnant Water', date: '3 days ago', loc: 'Area 1 Market', status: 'Resolved', sev: 'Medium' }
    ]
  },
  wuse: { 
    name: 'Wuse', reports: 67, fixed: 48, people: '800', desc: 'Market center actively clearing drainages.',
    breakdown: { waste: 40, drainage: 60, bush: 0 },
    recent: [
      { id: '304', cat: 'Waste Dump', date: '4 days ago', loc: 'Wuse Zone 6', status: 'Resolved', sev: 'Medium' }
    ]
  },
  maitama: { name: 'Maitama', reports: 12, fixed: 10, people: '120', desc: 'Low density area maintaining overgrown bushes.', breakdown: { waste: 10, drainage: 20, bush: 70 }, recent: [] },
  mararaba: { name: 'Mararaba', reports: 82, fixed: 30, people: '3,100', desc: 'Dense area heavily participating in drainage clearing campaigns.', breakdown: { waste: 30, drainage: 60, bush: 10 }, recent: [] },
  bwari: { name: 'Bwari', reports: 31, fixed: 19, people: '500', desc: 'Addressing local waste dumps and health education.', breakdown: { waste: 70, drainage: 10, bush: 20 }, recent: [] }
};

const CommunityDetails = () => {
  const { communityId } = useParams();
  const data = mockData[communityId] || mockData['lugbe']; // Default fallback just in case
  
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedReport, setExpandedReport] = useState(null);

  const toggleReport = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Under Review': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in mt-4">
      <Link to="/impact" className="inline-flex items-center gap-2 text-brand-green hover:underline font-medium mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Impact Dashboard
      </Link>

      <section className="bg-brand-light rounded-xl p-6 sm:p-8 border border-green-100 relative shadow-sm">
        <div className="absolute top-4 right-4 bg-green-100 text-brand-green px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <CheckCircle2 className="w-4 h-4" /> Active Status
        </div>
        <h1 className="text-3xl font-bold text-brand-dark mb-2">
          {data.name} Community Action Tracker
        </h1>
        <p className="text-gray-700 max-w-2xl text-lg">{data.desc}</p>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'overview' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Impact Overview
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'reports' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Recent Hazard Reports
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card text-center py-8 hover:-translate-y-1 transition-transform">
              <h3 className="text-5xl font-extrabold text-gray-800">{data.reports}</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">Hazards Reported</p>
            </div>
            <div className="card text-center py-8 border-brand-green bg-gradient-to-b from-green-50 to-white hover:-translate-y-1 transition-transform">
              <h3 className="text-5xl font-extrabold text-brand-green">{data.fixed}</h3>
              <p className="text-sm font-semibold text-brand-dark uppercase tracking-wider mt-2">Issues Resolved</p>
            </div>
            <div className="card text-center py-8 hover:-translate-y-1 transition-transform">
              <h3 className="text-5xl font-extrabold text-blue-600">{data.people}</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">Citizens Engaged</p>
            </div>
          </div>

          <section className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Hazard Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="flex items-center gap-2"><Trash2 className="w-4 h-4 text-orange-500"/> Waste Dumps</span>
                  <span className="text-gray-600">{data.breakdown.waste}% of total</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${data.breakdown.waste}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-500"/> Stagnant Water / Drainages</span>
                  <span className="text-gray-600">{data.breakdown.drainage}% of total</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${data.breakdown.drainage}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-brand-green"/> Overgrown Bushes (Snake Risks)</span>
                  <span className="text-gray-600">{data.breakdown.bush}% of total</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-brand-green h-2.5 rounded-full" style={{ width: `${data.breakdown.bush}%` }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Interventions</h2>
          {data.recent && data.recent.length > 0 ? (
            data.recent.map(report => (
              <div key={report.id} className="card p-0 overflow-hidden border border-gray-200">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50/50 cursor-pointer transition-colors"
                  onClick={() => toggleReport(report.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${report.cat === 'Waste Dump' ? 'bg-orange-100 text-orange-600' : report.cat === 'Stagnant Water' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-brand-dark'}`}>
                      {report.cat === 'Waste Dump' ? <Trash2 className="w-6 h-6"/> : report.cat === 'Stagnant Water' ? <Droplets className="w-6 h-6"/> : <AlertTriangle className="w-6 h-6"/>}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">#{report.id} - {report.cat}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" /> {report.loc}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full hidden sm:block ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    {expandedReport === report.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </div>

                {expandedReport === report.id && (
                  <div className="p-4 bg-white border-t border-gray-100 text-sm grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1 font-medium">Report Status</p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full sm:hidden mb-2 inline-block ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <p className="text-gray-800 font-medium sm:block hidden">{report.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1 font-medium">Reported On</p>
                      <div className="flex items-center gap-1 text-gray-800 font-medium">
                        <Calendar className="w-4 h-4" /> {report.date}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1 font-medium">Severity Level</p>
                      <p className={`font-bold ${report.sev === 'High' ? 'text-red-600' : 'text-orange-500'}`}>{report.sev} Risk</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1 font-medium">Public Health Risk</p>
                      <p className="text-gray-800 text-xs">
                        {report.cat === 'Stagnant Water' ? "High risk of mosquito breeding and Malaria vector multiplication." : 
                         report.cat === 'Waste Dump' ? "Can cause cholera outbreaks and severe air pollution if burned." : 
                         "High risk of dangerous snake habitats close to residential zones."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-lg border border-gray-200 text-gray-500">
              No recent hazard reports found for this community. Local records represent a historical overview.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default CommunityDetails;
