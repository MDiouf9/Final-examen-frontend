import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RevenuePage() {
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const data = {
        titre,
        montant: parseFloat(montant)
      };
      console.log("Sending data:", data);
      const response = await axios.patch('http://localhost:3000/transactions/revenus', data);
      console.log("Response:", response);
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'ajout du revenu:", error.message);
      console.error("Erreur détaillée:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Revenu</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            id="montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
            step="0.01"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Ajouter</button>
      </form>
    </div>
  );
}

export default RevenuePage;
