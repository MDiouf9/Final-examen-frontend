import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ModifierRevenu() {
  const { id } = useParams();
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRevenu = async () => {
      try {
        const response = await fetch(`http://localhost:3000/transactions/revenus/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du revenu');
        }
        const data = await response.json();
        setTitre(data.titre);
        setMontant(data.montant);
      } catch (error) {
        console.error("Erreur lors de la récupération du revenu:", error);
      }
    };

    fetchRevenu();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/transactions/revenus/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titre,
          montant
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du revenu');
      }

      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la mise à jour du revenu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
        <h2 className="text-2xl mb-4">Détails du Revenu</h2>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p><strong>Titre :</strong> {titre}</p>
          <p><strong>Montant :</strong> {montant} €</p>
        </div>
        <h2 className="text-2xl mb-4">Modifier Revenu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Titre</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Montant</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifierRevenu;
