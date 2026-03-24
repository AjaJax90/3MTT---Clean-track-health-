import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Target, HeartPulse, ShieldAlert, CheckCircle } from 'lucide-react';

const campaignData = {
  'drainage-clearing': {
    title: 'Weekend Drainage Clearing',
    location: 'Lugbe',
    date: 'Saturday, 8:00 AM',
    icon: ShieldAlert,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80',
    description: 'Join the Lugbe community in a massive weekend push to unclog central drainages. Blocked drains are the primary breeding ground for Anopheles mosquitoes. By clearing these pathways, we actively prevent the spread of Malaria and Cholera before the heavy rains begin.',
    goals: ['Clear 5km of main drainage', 'Evacuate 2 tons of plastic waste', 'Distribute 500 mosquito nets to vulnerable households']
  },
  'malaria-seminar': {
    title: 'Malaria Prevention Seminar',
    location: 'Garki Community Hall',
    date: 'Friday, 4:00 PM',
    icon: HeartPulse,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
    description: 'A free public health seminar led by the National Hospital outreach team. Learn critical personal protection measures against Malaria, how to properly use insecticide-treated nets, and the importance of early diagnosis. Rapid tests will be available on-site.',
    goals: ['Educate 300 residents on symptom tracking', 'Conduct 150 free rapid diagnostic tests', 'Deploy indoor residual spraying for the hall area']
  },
  'recycling-points': {
    title: 'Recycle Plastics for Points',
    location: 'Wuse Market Hub',
    date: 'Ongoing (Mon-Sat)',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?auto=format&fit=crop&q=80',
    description: 'Turn your waste into wealth! Drop off clean, sorted PET plastic bottles and aluminum cans at the Wuse Market interactive hub. Every kilogram earns you community points which can be instantly redeemed for mobile data, groceries, or clinic discounts.',
    goals: ['Recover 10 tons of recyclable plastics monthly', 'Onboard 500 households into the circular economy', 'Prevent plastics from entering the city sewage system']
  }
};

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const data = campaignData[campaignId];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!data) return <div className="p-12 text-center text-gray-500 text-lg">Campaign event not found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulating database persistent execution using localStorage
    const existingData = JSON.parse(localStorage.getItem('campaign_volunteers') || '[]');
    const newEntry = {
      ...formData,
      campaignId,
      campaignName: data.title,
      dateJoined: new Date().toISOString()
    };
    
    // Save to Data Base
    localStorage.setItem('campaign_volunteers', JSON.stringify([...existingData, newEntry]));
    
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in mt-4">
      <Link to="/impact" className="inline-flex items-center gap-2 text-brand-green hover:underline font-medium mb-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
        <ArrowLeft className="w-4 h-4" /> Back to Impact Dashboard
      </Link>

      <div className="card overflow-hidden p-0 border-0 shadow-lg">
        <div className="h-64 sm:h-96 w-full relative">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white w-full">
             <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2 w-max shadow-sm border border-white/10">
                <data.icon className="w-4 h-4" /> Official Campaign
             </div>
             <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 leading-tight drop-shadow-md">{data.title}</h1>
             <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-200 mt-4 font-medium">
               <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5"><MapPin className="w-4 h-4 text-gray-300"/> {data.location}</span>
               <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5"><Calendar className="w-4 h-4 text-gray-300"/> {data.date}</span>
             </div>
          </div>
        </div>
        
        <div className="p-6 md:p-10 bg-white space-y-10">
          <section>
             <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-100 pb-2 inline-block">Campaign Overview</h2>
             <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
          </section>

          <section className={`${data.bg} p-8 rounded-2xl border border-gray-100 shadow-inner`}>
             <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${data.color}`}>
               <Target className="w-7 h-7" /> Key Objectives
             </h3>
             <ul className="space-y-4">
               {data.goals.map((goal, i) => (
                 <li key={i} className="flex items-start gap-4">
                   <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-black shadow border border-gray-100 shrink-0 text-gray-700">{i+1}</span>
                   <span className="text-gray-800 font-medium text-lg pt-1.5">{goal}</span>
                 </li>
               ))}
             </ul>
          </section>

          <div className="pt-6 border-t border-gray-100">
             {!showForm && !submitted ? (
               <div className="flex justify-start sm:justify-end">
                 <button onClick={() => setShowForm(true)} className="btn-primary w-full sm:w-auto text-lg py-4 px-10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                   Volunteer & Join Campaign
                 </button>
               </div>
             ) : submitted ? (
               <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 shadow-sm">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                   <CheckCircle className="w-8 h-8 text-brand-green" />
                 </div>
                 <h3 className="text-2xl font-bold text-green-900 mb-2">You're on the list!</h3>
                 <p className="text-green-800 text-lg max-w-lg mx-auto">
                   Thank you, <strong className="font-bold text-brand-dark">{formData.name}</strong>, for stepping up to protect your community. Our coordinators will reach out to you at <strong>{formData.phone}</strong> shortly with next steps.
                 </p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-green font-semibold hover:underline text-sm opacity-80">Submit another volunteer</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2 shadow-sm">
                 <div className="mb-8 border-b border-gray-200 pb-4">
                   <h3 className="text-2xl font-bold text-gray-800 mb-2">Volunteer Registration</h3>
                   <p className="text-gray-600">Please provide your contact details. Your data is securely saved in our regional database registry for campaign mobilization.</p>
                 </div>
                 
                 <div className="space-y-5">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                     <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field bg-white shadow-sm border-gray-300 py-3" placeholder="E.g. Chidera Okafor" />
                   </div>
                   <div className="grid sm:grid-cols-2 gap-5">
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                       <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field bg-white shadow-sm border-gray-300 py-3" placeholder="0800 000 0000" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                       <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input-field bg-white shadow-sm border-gray-300 py-3" placeholder="Optional" />
                     </div>
                   </div>
                 </div>
                 
                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                   <button type="button" onClick={() => setShowForm(false)} className="btn-secondary px-8 py-3 text-lg font-bold">Cancel</button>
                   <button type="submit" className="btn-primary px-10 py-3 text-lg font-bold shadow-md hover:shadow-lg">Submit Registration</button>
                 </div>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
