import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { OfferList } from "./pages/OfferList";
import { OfferConfig } from "./pages/OfferConfig";
import { PersonnalDetails } from "./pages/PersonnalDetails";
import { BackOffice } from "./pages/BackOffice";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offerlist" element={<OfferList />}></Route>
        <Route path="/offerconfig" element={<OfferConfig />}></Route>
        <Route path="/personnaldetails" element={<PersonnalDetails />}></Route>
        <Route path="/backoffice" element={<BackOffice />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
