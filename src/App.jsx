import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './pages/Home';
import Reporter from './pages/Reporter';
import MapHotspots from './pages/MapHotspots';
import CommunitySafety from './pages/CommunitySafety';
import About from './pages/About';
import HealthImpact from './pages/HealthImpact';
import CommunityImpact from './pages/CommunityImpact';
import CommunityDetails from './pages/CommunityDetails';
import CampaignDetails from './pages/CampaignDetails';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import OpenData from './pages/OpenData';
import Volunteers from './pages/Volunteers';
import VolunteerDB from './pages/VolunteerDB';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="report" element={<Reporter />} />
          <Route path="map" element={<MapHotspots />} />
          <Route path="impact" element={<CommunityImpact />} />
          <Route path="impact/:communityId" element={<CommunityDetails />} />
          <Route path="campaign/:campaignId" element={<CampaignDetails />} />
          <Route path="safety" element={<CommunitySafety />} />
          <Route path="about" element={<About />} />
          <Route path="health-impact" element={<HealthImpact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="api" element={<OpenData />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="admin-db" element={<VolunteerDB />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
