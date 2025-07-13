import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';
import { CGVPage } from './pages/CGV';
import { MentionsLegalesPage } from './pages/MentionsLegales';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialite';
import { EcommercePage } from './pages/Ecommerce';
import { LoginPage } from './pages/Login';
import { AuthProvider } from './components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="w-full overflow-x-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/commande" element={<EcommercePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cgv" element={<CGVPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;