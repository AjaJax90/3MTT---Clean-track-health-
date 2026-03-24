import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Reporter = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    severity: 'Medium',
    location: '',
    image: null,
  });

  const categories = [
    "Waste Dump",
    "Stagnant Water / Blocked Gutters",
    "Overgrown Bush",
    "Refuse Burning",
    "Snake Risk / Sighting"
  ];

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, image: URL.createObjectURL(e.target.files[0])});
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setStatus('error');
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setFormData({ ...formData, location: `${lat}, ${lng} (Verified GPS)` });
        setIsLocating(false);
        setStatus('idle');
      },
      (error) => {
        setErrorMsg("Unable to retrieve location. Please check your browser permissions or type it manually.");
        setStatus('error');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    // Frontend Verification
    setTimeout(() => {
      if (!formData.category || !formData.location) {
        setStatus('error');
        setErrorMsg('Please fill in all required fields (Category & Location).');
        return;
      }

      setStatus('success');
    }, 1500); // simulate network delay
  };

  if (status === 'success') {
    return (
      <div className="card max-w-lg mx-auto mt-8 text-center py-12 px-6">
        <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted Successfully</h2>
        <p className="text-gray-600 mb-6">
          Thank you. Your report helps keep the community safe and clean.
        </p>
        <button 
          onClick={() => { setStatus('idle'); setFormData({...formData}); }} 
          className="btn-primary"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Report an Issue</h1>
      <p className="text-gray-600 mb-6">Instantly report environmental hazards in your community.</p>

      <form onSubmit={handleSubmit} className="card space-y-5">
        
        {status === 'error' && (
          <div className="bg-red-50 text-brand-danger p-3 rounded flex items-start gap-2 text-sm border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Category <span className="text-red-500">*</span></label>
          <select 
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {formData.category === 'Waste Dump' && <p className="text-xs text-brand-warning mt-1">Improper waste disposal leads to severe health hazards.</p>}
          {formData.category === 'Stagnant Water / Blocked Gutters' && <p className="text-xs text-brand-warning mt-1">High risk of mosquito breeding (Malaria/Cholera).</p>}
          {formData.category === 'Overgrown Bush' && <p className="text-xs text-brand-warning mt-1">High risk of snake habitat.</p>}
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Severity</label>
          <div className="flex gap-2 mt-2">
            {['Low', 'Medium', 'High'].map(level => (
              <button
                type="button"
                key={level}
                onClick={() => setFormData({...formData, severity: level})}
                className={`flex-1 py-2 rounded text-sm font-medium border transition-colors ${
                  formData.severity === level 
                    ? 'bg-brand-green text-white border-brand-green' 
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Location Implementation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="e.g. Area 1, Garki, Abuja" 
              className="input-field mt-0"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
            <button 
              type="button" 
              className="bg-brand-light p-2 rounded border border-brand-green/30 hover:bg-green-100 transition-colors flex items-center justify-center min-w-[44px]"
              onClick={handleGetLocation}
              disabled={isLocating}
              title="Locate Me via GPS"
            >
              {isLocating ? <Loader2 className="w-5 h-5 text-brand-green animate-spin" /> : <MapPin className="w-5 h-5 text-brand-green" />}
            </button>
          </div>
        </div>

        {/* Camera Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo Upload</label>
          {formData.image ? (
            <div className="relative">
              <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded border border-gray-300" />
              <button 
                type="button" 
                onClick={() => setFormData({...formData, image: null})}
                className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-50"
                title="Remove photo"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded p-6 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
              <Camera className="w-6 h-6" />
              <span>Tap to take a photo or select file</span>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>



        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn-primary w-full flex justify-center items-center gap-2 py-3 mt-4"
        >
          {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
        </button>

      </form>
    </div>
  );
};

export default Reporter;
