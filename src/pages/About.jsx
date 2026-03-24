import React from 'react';
import { Target, Eye, Camera, MapPin, Users, HeartPulse, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in mt-4 pb-12">
      
      {/* Animated Hero Banner */}
      <section className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
          alt="Clean Environment" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark/70 transition-colors duration-500 group-hover:bg-brand-dark/60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <Sparkles className="w-10 h-10 text-brand-light mb-4 animate-bounce" />
          <h1 className="text-4xl sm:text-6xl font-black mb-4 drop-shadow-md">About CleanTrack</h1>
          <p className="text-lg sm:text-xl max-w-2xl font-medium text-green-50 drop-shadow">
            Bridging the gap between environmental hygiene and public health across Nigeria.
          </p>
        </div>
      </section>

      {/* Mission & Vision Interactive Cards */}
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="card p-8 sm:p-10 border-t-4 border-t-brand-green hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl bg-white group">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-green transition-colors duration-300">
            <Target className="w-8 h-8 text-brand-green group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To educate and empower Nigerians on waste management, recycling, and environmental
            health through accessible digital tools and community-driven engagement.
          </p>
        </div>

        <div className="card p-8 sm:p-10 border-t-4 border-t-blue-500 hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl bg-white group">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
            <Eye className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-4">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A future where disease outbreaks like Malaria and Cholera are eradicated by achieving perfectly clean, hazard-free local environments in every neighborhood.
          </p>
        </div>
      </section>

      {/* Image & Text Split Section */}
      <section className="bg-brand-light rounded-3xl p-8 sm:p-12 border border-green-100 shadow-inner flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">The Ground Reality</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CleanTrack Health+ was born out of a critical realization: <strong className="text-brand-dark">public health is inherently tied to environmental health.</strong>
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            When waste dumps overflow or drainages get blocked by plastics, they immediately become breeding grounds for disease vectors. By allowing citizens to map these risks instantly, we rapidly accelerate the time it takes for health workers and sanitation boards to physically respond.
          </p>
        </div>
        <div className="flex-1 w-full min-h-[300px]">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80" 
              alt="Community action" 
              className="w-full h-[300px] sm:h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="pt-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How CleanTrack Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Spot a Hazard", desc: "Identify an illegal waste dump, blocked gutter, or overgrown bush.", icon: Camera, color: "text-orange-500", bg: "bg-orange-50" },
            { step: 2, title: "Report & Map", desc: "Snap a photo using our smart tool. We automatically geolocate the exact risk zone.", icon: MapPin, color: "text-blue-500", bg: "bg-blue-50" },
            { step: 3, title: "Community Action", desc: "Local volunteers and health officers receive the alert and mobilize.", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
            { step: 4, title: "Health Saved", desc: "The environmental risk is neutralized, preventing immediate disease outbreaks.", icon: HeartPulse, color: "text-brand-green", bg: "bg-green-50" },
          ].map((item) => (
            <div key={item.step} className="text-center relative group">
              <div className={`w-20 h-20 mx-auto ${item.bg} rounded-3xl rotate-3 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center mb-6 shadow-sm border border-gray-100`}>
                <item.icon className={`w-10 h-10 ${item.color}`} />
              </div>
              <div className="absolute top-10 right-0 w-1/2 h-[2px] bg-gray-200 -z-10 hidden lg:block"></div>
              <div className="absolute top-10 left-0 w-1/2 h-[2px] bg-gray-200 -z-10 hidden lg:block"></div>
              
              <span className="inline-block bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">
                STEP {item.step}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
