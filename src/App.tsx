import React from 'react';
import "./App.css"

import Welcome from "./pages/welcome/Welcome"
import DonateCheckout from "./pages/donationCheckout/DonateCheckout";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy"
import DonationFailure from "./pages/donationFailure/DonationFailure";
import DonationSuccess from "./pages/donationSuccess/DonationSuccess";
import NotFound from "./pages/404NotFound/404NotFound"


import HeaderComponent from "./components/headerComponent/HeaderComponent"
import FooterComponent from "./components/footerComponent/FooterComponent"
import WavesComponent from './components/waves/WavesComponent';


import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = (): JSX.Element => {
  return (
    <Router>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/apoyo" element={<DonateCheckout/>}/>
        <Route path="/terminos-y-condiciones" element={<PrivacyPolicy/>}/>
        <Route path="/apoyo/completado" element={<DonationSuccess/>}/>
        <Route path="/apoyo/postergado" element={<DonationFailure/>}/>
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
      <FooterComponent/>
      <WavesComponent/>
    </Router>
  );
}

export default App;
