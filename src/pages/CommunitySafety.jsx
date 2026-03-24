import React, { useState, useEffect } from 'react';
import { Phone, Shield, Bug, Droplets, Wind, ChevronDown, ChevronUp, Navigation, MapPin, Loader2, Ambulance } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Red Icon for Clinics
const clinicIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Component to dynamically set map center
const RecenterMap = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
};

const clinics = [
  { id: 1, name: "National Hospital Abuja", role: "General Hospital", phone: "0809-NAT-HOSP", pos: [9.0543, 7.4721] },
  { id: 2, name: "Garki Hospital", role: "General Hospital", phone: "0703-456-7890", pos: [9.0250, 7.4800] },
  { id: 3, name: "Lugbe Health Center", role: "Local Clinic", phone: "0814-LUGBE-MED", pos: [8.9749, 7.3753] },
  { id: 4, name: "Maitama District Hospital", role: "Specialty / General", phone: "0805-987-6543", pos: [9.0833, 7.4951] },
  { id: 5, name: "Bwari General Hospital", role: "General Hospital", phone: "0902-111-2222", pos: [9.2833, 7.3833] }
];

const CommunitySafety = () => {
  const [openSection, setOpenSection] = useState('malaria');
  const [userLoc, setUserLoc] = useState(null); // [lat, lng]
  const [locating, setLocating] = useState(false);
  const [nearest, setNearest] = useState(null);
  const defaultCenter = [9.0579, 7.4951]; // Abuja Center

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const locateUser = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLoc([latitude, longitude]);
          
          // Find nearest clinic
          let closest = clinics[0];
          let minDistance = getDistance(latitude, longitude, clinics[0].pos[0], clinics[0].pos[1]);
          
          for(let i=1; i<clinics.length; i++) {
            const dist = getDistance(latitude, longitude, clinics[i].pos[0], clinics[i].pos[1]);
            if(dist < minDistance) {
              minDistance = dist;
              closest = clinics[i];
            }
          }
          setNearest({ ...closest, distance: minDistance.toFixed(1) });
          setLocating(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Couldn't fetch your location. Please check your browser permissions.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  };

  const guides = [
    {
      id: 'malaria',
      title: 'Mosquito & Malaria Prevention',
      icon: Bug,
      color: 'text-brand-dark',
      bgHeader: 'bg-green-50/50 hover:bg-green-50',
      content: (
        <div className="mt-4 space-y-4 text-gray-700 text-sm">
          <div><strong className="text-gray-900">Primary Cause:</strong> The Anopheles mosquito, which breeds in stagnant water and blocked drainages.</div>
          <div><strong className="text-gray-900">Hazard:</strong> Transmission of Malaria parasites causing severe fever, chills, and potentially fatal complications if untreated.</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Environmental Prevention</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Remove stagnant water from buckets and tires.</li>
                <li>Clear blocked drainages and gutters regularly.</li>
                <li>Dispose of waste properly in covered bins.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Personal Protection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Sleep under insecticide-treated nets.</li>
                <li>Keep windows screened and closed at night.</li>
                <li>Wear long sleeves during peak mosquito hours.</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h3 className="font-bold text-red-800 mb-2">First Aid / Action</h3>
            <p>If you experience fever, chills, or severe headaches, visit the nearest clinic immediately for a rapid diagnostic test and prescribed antimalarials. Do not self-medicate.</p>
          </div>
        </div>
      )
    },
    {
      id: 'waterborne',
      title: 'Cholera & Waterborne Diseases',
      icon: Droplets,
      color: 'text-blue-600',
      bgHeader: 'bg-blue-50/50 hover:bg-blue-50',
      content: (
        <div className="mt-4 space-y-4 text-gray-700 text-sm">
          <div><strong className="text-gray-900">Primary Cause:</strong> Contaminated water points frequently caused by raw sewage, flooded blocked gutters, and unmanaged waste dumps leaking into the water supply.</div>
          <div><strong className="text-gray-900">Hazard:</strong> Rapid onset of severe bacterial infections leading to extreme dehydration, diarrhea, and vomiting.</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Environmental Prevention</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Ensure community wells are securely covered.</li>
                <li>Prevent refuse and sewage from entering main water bodies.</li>
                <li>Report burst sewage pipes immediately using the Report tool.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Personal Protection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Always boil or chemically treat drinking water.</li>
                <li>Wash hands thoroughly with soap before eating.</li>
                <li>Wash all raw fruits and vegetables with clean, safe water.</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h3 className="font-bold text-red-800 mb-2">First Aid / Action</h3>
            <p>Begin taking Oral Rehydration Salts (ORS) immediately to replace lost fluids. Seek urgent hospital care if symptoms persist or worsen.</p>
          </div>
        </div>
      )
    },
    {
      id: 'snake',
      title: 'Snake Safety & Bites',
      icon: Shield,
      color: 'text-brand-warning',
      bgHeader: 'bg-orange-50/50 hover:bg-orange-50',
      content: (
        <div className="mt-4 space-y-4 text-gray-700 text-sm">
          <div><strong className="text-gray-900">Primary Cause:</strong> Venomous snakes seeking shelter or hunting rodents in overgrown bushes and improperly managed waste dumps near homes.</div>
          <div><strong className="text-gray-900">Hazard:</strong> Venomous bites that can cause severe necrosis, internal bleeding, paralysis, or death if antivenom isn't administered quickly.</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Environmental Prevention</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear all overgrown bushes immediately surrounding your house.</li>
                <li>Remove stacked firewood, rocks, or debris where snakes can hide.</li>
                <li>Seal all cracks and crevices in house walls and foundations.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Personal Protection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Wear protective boots when walking in tall grass or farming.</li>
                <li>Use a flashlight when walking outside at night.</li>
                <li>Keep your distance and do not try to kill or provoke a sighted snake.</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h3 className="font-bold text-red-800 mb-2">First Aid / Action</h3>
            <p className="mb-2">If bitten:</p>
            <ol className="list-decimal list-inside space-y-1 bg-white p-3 rounded">
              <li>Stay as calm and still as possible to slow venom spread.</li>
              <li>Keep the bitten limb still and lower than your heart.</li>
              <li>Remove tight clothing, rings, or jewelry near the bite before swelling occurs.</li>
              <li><strong className="text-red-700">Seek medical help immediately. Do not cut, suck the wound, or apply a tight tourniquet.</strong></li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'air',
      title: 'Air Quality & Refuse Burning',
      icon: Wind,
      color: 'text-purple-600',
      bgHeader: 'bg-purple-50/50 hover:bg-purple-50',
      content: (
        <div className="mt-4 space-y-4 text-gray-700 text-sm">
          <div><strong className="text-gray-900">Primary Cause:</strong> Open-air incineration of household waste, rubber, and plastics by community members lacking proper waste disposal systems.</div>
          <div><strong className="text-gray-900">Hazard:</strong> Release of toxic particles, dioxins, and heavy metals leading to severe respiratory issues, asthma attacks, and cardiovascular diseases.</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Environmental Prevention</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Subscribe to formal or local waste collection services instead of burning.</li>
                <li>Separate organic waste for compost rather than incineration.</li>
                <li>Report illegal major dumping/burning grounds via the app.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Personal Protection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Keep doors and windows firmly closed if a neighbor is burning waste.</li>
                <li>Avoid hanging laundry outside during heavy burning periods.</li>
                <li>Wear a high-quality N95 mask if you must go outside near the smoke.</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h3 className="font-bold text-red-800 mb-2">First Aid / Action</h3>
            <p>Move immediately to an area with clean, fresh air. If struggling to breathe or experiencing an asthma attack, sit upright, use prescribed inhalers immediately, and seek emergency oxygen at the nearest clinic if symptoms do not improve rapidly.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in mt-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Community Safety</h1>
        <p className="text-gray-600 text-lg mt-1">Locate nearby treatment centers and access emergency protocols.</p>
      </div>

      {/* Nearest Treatment Finder */}
      <section className="card border-blue-200 shadow-sm relative overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ambulance className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Nearest Treatment Clinic</h2>
          </div>
          <button 
            onClick={locateUser}
            disabled={locating}
            className="btn-primary w-full md:w-auto bg-blue-600 hover:bg-blue-700 border-none flex items-center justify-center gap-2"
          >
            {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            {locating ? 'Locating...' : 'Find Clinic Near Me'}
          </button>
        </div>

        {nearest && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Closest Option ({nearest.distance} km away)</p>
              <p className="font-bold text-gray-900 text-lg">{nearest.name}</p>
              <p className="text-gray-600 text-sm">{nearest.role}</p>
              <a href={`tel:${nearest.phone}`} className="inline-block mt-2 bg-white text-blue-700 border border-blue-300 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-100 transition-colors">
                Call {nearest.phone}
              </a>
            </div>
          </div>
        )}

        <div className="h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300 relative z-0">
          <MapContainer center={userLoc || defaultCenter} zoom={userLoc ? 13 : 11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User Location Marker */}
            {userLoc && (
              <>
                <RecenterMap lat={userLoc[0]} lng={userLoc[1]} zoom={13} />
                <Marker position={userLoc}>
                  <Popup><span className="font-bold">You are here</span></Popup>
                </Marker>
              </>
            )}

            {/* Clinic Markers */}
            {clinics.map(clinic => (
              <Marker key={clinic.id} position={clinic.pos} icon={clinicIcon}>
                <Popup>
                  <div className="font-semibold text-red-600">{clinic.name}</div>
                  <div className="text-xs text-gray-500">{clinic.role}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="card border-red-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="flex items-center gap-2 mb-4 pl-2">
          <Phone className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">Emergency Hotlines</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 pl-2">
          {[
            { name: "National Emergency", role: "Toll-Free", phone: "112" },
            { name: "Snakebite Center (Kaltungo/Abuja)", role: "Specialty", phone: "0800-SNAKE-FREE" },
            { name: "Ambulance Services", role: "Medical Dispatch", phone: "122" },
            { name: "NCDC Toll-Free", role: "Epidemics / Outbreaks", phone: "6232" }
          ].map((hosp, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
              <div>
                <p className="font-bold text-gray-800 text-sm">{hosp.name}</p>
                <p className="text-xs text-gray-500">{hosp.role}</p>
              </div>
              <a href={`tel:${hosp.phone}`} className="bg-red-50 text-red-600 px-3 py-1.5 rounded font-bold text-sm hover:bg-red-100 transition-colors border border-red-200">
                {hosp.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Expandable Safety Guides */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Health & Environmental Guides</h2>
        
        {guides.map((guide) => (
          <div key={guide.id} className="card p-0 overflow-hidden border border-gray-200 transition-all">
            <button 
              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${guide.bgHeader}`}
              onClick={() => toggleSection(guide.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white shadow-sm border border-gray-100 ${guide.color}`}>
                  <guide.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{guide.title}</h3>
              </div>
              {openSection === guide.id ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            
            {openSection === guide.id && (
              <div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                {guide.content}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default CommunitySafety;
