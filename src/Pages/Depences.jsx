import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ModifierDepense() {
  const { id } = useParams();
  const [titre, setTitre] = useState('');
  const [montant, setMontant] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepense = async () => {
      try {
        const response = await fetch(`http://localhost:3000/transactions/depenses/${id}`);
        const data = await response.json();
        setTitre(data.titre);
        setMontant(data.montant);
      } catch (error) {
        console.error("Erreur lors de la récupération de la dépense:", error);
      }
    };

    fetchDepense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/transactions/depenses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titre,
          montant
        })
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error("Erreur lors de la mise à jour de la dépense.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la dépense:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
        <h2 className="text-2xl mb-4">Modifier Dépense</h2>
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

export default ModifierDepense;
