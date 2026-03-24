import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import { AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapHotspots = () => {
  // Center roughly between Lugbe, City Center, and Mararaba
  const center = [9.0100, 7.4851]; 

  const riskZones = [
    { 
      id: 1,
      name: "Lugbe (Carwash Bus Stop)", 
      pos: [8.9749, 7.3753], 
      incidents: 145,
      color: '#dc2626', // Red
      fillOpacity: 0.4,
      severity: 'High Risk (Severe Waste Dump)', 
      desc: 'Frequent reports of uncollected refuse and blocked drainages causing mosquito breeding.' 
    },
    { 
      id: 2,
      name: "Mararaba Axis", 
      pos: [9.0401, 7.5936], 
      incidents: 82,
      color: '#ea580c', // Orange
      fillOpacity: 0.3,
      severity: 'Medium-High Risk', 
      desc: 'Extensive overgrown bushes and localized flooding from blocked gutters.' 
    },
    { 
      id: 3,
      name: "Garki Area 1", 
      pos: [9.0250, 7.4800], 
      incidents: 24,
      color: '#eab308', // Yellow
      fillOpacity: 0.3,
      severity: 'Medium Risk', 
      desc: 'Occasional waste burning and improper disposal reported.' 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Risk Map</h1>
          <p className="text-gray-600 text-lg">Explore and monitor areas prone to immediate environmental and health hazards.</p>
        </div>
      </div>

      {/* Interactive Risk Explanation Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-bl-full -z-0"></div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-3 relative z-10 text-brand-dark">
          <AlertTriangle className="w-6 h-6 text-brand-warning" /> 
          Understanding the Hazard Spectrum
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8 relative z-10 text-[15px]">
          The CleanTrack map is powered by crowdsourced citizen reports. As environmental hazards like stagnant water and illegal dumpsites accumulate in a specific zone, the area's risk factor geometrically compounds. We categorize this live data into three critical, color-coded threat levels to direct immediate government sanitation response and alert local clinics.
          Hover over the indicators below to learn what each color code demands:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <div className="group border border-red-100 bg-red-50 hover:bg-red-100 hover:-translate-y-1 p-5 rounded-xl transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-5 rounded-full bg-red-500 animate-pulse border-4 border-red-200 shadow-sm shrink-0"></span>
              <h3 className="font-bold text-red-800 text-lg">High Risk</h3>
            </div>
            <p className="text-sm text-red-900 leading-relaxed">Critical threat level indicating over <strong>100+ unaddressed hazard reports</strong>. This signifies a high probability of immediate disease outbreak (Cholera/Malaria) requiring emergency intervention.</p>
          </div>

          <div className="group border border-orange-100 bg-orange-50 hover:bg-orange-100 hover:-translate-y-1 p-5 rounded-xl transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-5 rounded-full bg-orange-500 border-4 border-orange-200 shadow-sm shrink-0"></span>
              <h3 className="font-bold text-orange-800 text-lg">Medium Risk</h3>
            </div>
            <p className="text-sm text-orange-900 leading-relaxed">Between <strong>50 and 99 hazard reports</strong>. Accumulating risks such as overgrown bushes or localized flooding that require scheduled sanitation board cleanup within 7 days.</p>
          </div>

          <div className="group border border-yellow-100 bg-yellow-50 hover:bg-yellow-100 hover:-translate-y-1 p-5 rounded-xl transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 border-4 border-yellow-200 shadow-sm shrink-0"></span>
              <h3 className="font-bold text-yellow-800 text-lg">Moderate Risk</h3>
            </div>
            <p className="text-sm text-yellow-900 leading-relaxed">Fewer than <strong>50 early warning reports</strong>. Represents minor environmental infractions like refuse burning that communities can resolve proactively via local volunteer campaigns.</p>
          </div>
        </div>
      </div>

      <div className="card p-2 md:p-4 bg-white shadow-sm border border-gray-200">
        <div className="h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden border border-slate-300 relative z-0">
          <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Draw Color Spectrum Circles for Risk Zones */}
            {riskZones.map(zone => {
              // Calculate radius dynamically based on incidents (min 500m)
              const dynamicRadius = Math.max(zone.incidents * 12, 500); 

              return (
                <Circle 
                  key={`circle-${zone.id}`}
                  center={zone.pos} 
                  radius={dynamicRadius}
                  pathOptions={{ 
                    color: zone.color, 
                    fillColor: zone.color, 
                    fillOpacity: zone.fillOpacity 
                  }}
                >
                  {/* Show incident count permanently over the circle center */}
                  <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-gray-800 font-bold text-lg drop-shadow-md">
                    {zone.incidents}
                  </Tooltip>
                  
                  <Popup>
                    <div className="font-semibold text-lg">{zone.name}</div>
                    <div className="text-sm font-medium" style={{ color: zone.color }}>
                      {zone.severity} ({zone.incidents} Reports)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{zone.desc}</p>
                  </Popup>
                </Circle>
              );
            })}

            {/* Render Individual Markers in the center of the zones for easy clicking */}
            {riskZones.map(marker => (
              <Marker key={`marker-${marker.id}`} position={marker.pos}>
                <Popup>
                  <div className="font-semibold">{marker.name}</div>
                  <div className="text-sm text-gray-500">{marker.severity} - {marker.incidents} incidents</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* The simplified old legend was removed globally since the top panel replaces it entirely. */}
    </div>
  );
};

export default MapHotspots;
