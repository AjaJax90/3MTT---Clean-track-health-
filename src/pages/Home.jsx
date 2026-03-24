import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, MapPin, HeartPulse, Recycle, Target } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: "Community Impact",
      desc: "See how different communities in Abuja are actively participating.",
      icon: ShieldAlert,
      link: "/impact"
    },
    {
      title: "Risk Hotspot Tracking",
      desc: "View reported risks in your local area on a live map.",
      icon: MapPin,
      link: "/map"
    },
    {
      title: "Community Safety",
      desc: "Access emergency numbers and health guides quickly.",
      icon: HeartPulse,
      link: "/safety"
    },
    {
      title: "Health & Impact",
      desc: "Learn about waste management and community impact.",
      icon: Recycle,
      link: "/health-impact"
    }
  ];

  return (
    <div className="space-y-8 animate-in mt-4">
      {/* Ongoing Campaigns Animated Ticker (Top Banner) */}
      <div className="bg-brand-dark text-white rounded-lg flex items-center h-12 sm:h-14 shadow-sm relative overflow-hidden group mb-4">
        <div className="font-bold flex items-center gap-2 whitespace-nowrap bg-brand-dark px-4 sm:px-6 absolute left-0 h-full z-10 hidden sm:flex shadow-[4px_0_12px_rgba(0,0,0,0.5)] border-r border-brand-green/30">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
          <span className="text-xs sm:text-sm tracking-wide uppercase">Ongoing Campaigns</span>
        </div>
        <div className="w-full pl-0 sm:pl-[240px] overflow-hidden flex items-center">
          <div className="w-max animate-marquee inline-block whitespace-nowrap group-hover:[animation-play-state:paused] text-sm font-semibold tracking-wide cursor-pointer py-1">
            <Link to="/volunteers" className="mx-6 sm:mx-8 font-extrabold hover:underline text-yellow-300 hover:text-white transition-colors tracking-wide bg-brand-dark px-2 rounded">🚨 OPEN CALL: Join the Rapid Cleanup Volunteer Squad! 🚨</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/drainage-clearing" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">🌍 Weekend Drainage Clearing in Lugbe - Saturday 8 AM</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/malaria-seminar" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">🦟 Malaria Prevention Seminar in Garki - Friday 4 PM</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/recycling-points" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">♻️ Recycle Plastics for Points at Wuse Market Hub</Link>
            <span className="opacity-30">•</span>

            {/* Duplicated strictly for infinite loop matching */}
            <Link to="/volunteers" className="mx-6 sm:mx-8 font-extrabold hover:underline text-yellow-300 hover:text-white transition-colors tracking-wide bg-brand-dark px-2 rounded">🚨 OPEN CALL: Join the Rapid Cleanup Volunteer Squad! 🚨</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/drainage-clearing" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">🌍 Weekend Drainage Clearing in Lugbe - Saturday 8 AM</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/malaria-seminar" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">🦟 Malaria Prevention Seminar in Garki - Friday 4 PM</Link>
            <span className="opacity-30">•</span>
            <Link to="/campaign/recycling-points" className="mx-6 sm:mx-8 hover:underline text-green-100 hover:text-white transition-colors">♻️ Recycle Plastics for Points at Wuse Market Hub</Link>
            <span className="opacity-30">•</span>
          </div>
        </div>
      </div>


      {/* Hero Section */}
      <section className="bg-brand-light rounded-xl p-8 text-center border border-green-100">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
          Protect Your Environment.<br />Safeguard Your Health.
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Helping Nigerians report environmental risks, reduce disease spread, and access help faster.
        </p>
        <div className="flex justify-center">
          <Link to="/report" className="btn-primary w-full sm:w-auto text-lg py-3 px-8 text-center">
            Report an Issue
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <Link to={feature.link} key={idx} className="card hover:shadow-md hover:border-brand-green transition-all block">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-brand-green">
                <feature.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>


    </div>
  );
};

export default Home;
