// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css"; // Assurez-vous que Tailwind CSS est importé ici
import Dashboard from "./Pages/Dashbord";
import RevenuePage from "./Pages/Revenus";
import Depence from "./Pages/Depences";
import ModifierRevenu from "./Composants/ModifierRevenu";
import ModifierDepense from "./Composants/ModifierDepense";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/modifier-revenu/:id" element={<ModifierRevenu />} />
      <Route path="/modifier-depense/:id" element={<ModifierDepense />} />
      <Route path="/Revenus" element={<RevenuePage />} />
      <Route path="/Depences" element={<Depence />} />
    </Routes>
  );
};

export default App;
