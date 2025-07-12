import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { FormPage } from "./screens/FormPage/FormPage";
import { OrderPage } from "./pages/OrderPage";
import { Success } from "./pages/Success";
import { Cancel } from "./pages/Cancel";

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/devis" element={<FormPage />} />
          <Route path="/commande" element={<OrderPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
