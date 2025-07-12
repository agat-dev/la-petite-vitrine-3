import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Routes Stripe supprimées */}
          {/* Plus de /success ni /cancel */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;