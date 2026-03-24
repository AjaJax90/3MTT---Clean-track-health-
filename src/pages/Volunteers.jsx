import React, { useState } from 'react';
import { Users, CheckCircle, HeartHandshake, Loader2, MapPin, Sparkles } from 'lucide-react';

const Volunteers = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    interest: 'General Waste Clearing'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API delay and save to local storage (mock DB)
    setTimeout(() => {
      const existingKey = 'cleantrack_volunteers_db';
      const existing = JSON.parse(localStorage.getItem(existingKey) || '[]');
      existing.push({ ...formData, joinedAt: new Date().toISOString() });
      localStorage.setItem(existingKey, JSON.stringify(existing));
      
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto mt-12 animate-in text-center p-8 bg-white rounded-3xl shadow-sm border border-green-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Squad!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you, {formData.name}. Your details have been securely logged. The local cleanup coordinator for {formData.district || 'your area'} will reach out to you via WhatsApp soon!
        </p>
        <button 
          onClick={() => { setStatus('idle'); setFormData({name: '', phone: '', district: '', interest: 'General Waste Clearing'}); }}
          className="btn-primary"
        >
          Register Another Volunteer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in mt-4 pb-12">
      
      {/* Hero Banner */}
      <section className="bg-brand-dark text-white p-8 sm:p-12 rounded-3xl shadow-lg text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1593113588332-ceaa88d2a417?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <HeartHandshake className="w-16 h-16 text-brand-green mx-auto mb-6 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-5xl font-black mb-4">Join the Cleanup Squad</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Become a critical part of the rapid response network. Help eradicate environmental hazards in Abuja before they trigger disease outbreaks.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
           <Users className="w-6 h-6 text-brand-green" />
           <h2 className="text-2xl font-bold text-gray-800">Volunteer Registration Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-brand-danger">*</span></label>
              <input 
                type="text" required
                placeholder="e.g. Chidera Okafor"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Phone Number <span className="text-brand-danger">*</span></label>
              <input 
                type="tel" required
                placeholder="080..."
                className="input-field"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Area / District (Abuja) <span className="text-brand-danger">*</span></label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" required
                placeholder="e.g. Gwarinpa, Lugbe, Maitama..."
                className="input-field pl-10"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Interest <span className="text-brand-danger">*</span></label>
            <select 
              className="input-field"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
            >
              <option value="General Waste Clearing">General Waste & Drainage Clearing</option>
              <option value="Health Awareness Seminars">Conducting Health Awareness Seminars</option>
              <option value="Logistics & Transport">Logistics & Transportation</option>
              <option value="Medical First Responder">Medical First Responder (Nurses/Doctors)</option>
            </select>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="btn-primary w-full py-4 text-lg font-bold flex justify-center items-center gap-2"
            >
              {status === 'submitting' ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Registering...</>
              ) : (
                <><Sparkles className="w-6 h-6" /> Submit Application</>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              By submitting this form, you agree to allow local Cleanup Coordinators to contact you via the provided phone number. Your data is strictly protected under our Privacy Policy.
            </p>
          </div>
        </form>
      </section>

    </div>
  );
};

export default Volunteers;
