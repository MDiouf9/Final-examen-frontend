import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [transactionsRevenus, setTransactionsRevenus] = useState([]);
  const [transactionsDepenses, setTransactionsDepenses] = useState([]);
  const [revenus, setRevenus] = useState(0);
  const [depenses, setDepenses] = useState(0);
  const [solde, setSolde] = useState(0);

  const navigate = useNavigate();

  const fetchRevenus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions/revenus');
      setTransactionsRevenus(response.data);
      calculerTotaux(response.data, 'revenus');
    } catch (error) {
      console.error("Erreur lors de la récupération des revenus:", error);
    }
  };

  const fetchDepenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions/depenses');
      setTransactionsDepenses(response.data);
      calculerTotaux(response.data, 'depenses');
    } catch (error) {
      console.error("Erreur lors de la récupération des dépenses:", error);
    }
  };

  const calculerTotaux = (data, type) => {
    let total = 0;
    data.forEach(transaction => {
      total += transaction.montant;
    });

    if (type === 'revenus') {
      setRevenus(total);
    } else if (type === 'depenses') {
      setDepenses(total);
    }

    // Calculer le solde après avoir mis à jour revenus et dépenses
    setSolde(revenus - depenses);
  };

  const supprimerTransaction = async (id, type) => {
    try {
      const url = type === 'revenus' 
        ? `http://localhost:3000/transactions/revenus/${id}` 
        : `http://localhost:3000/transactions/depenses/${id}`;
      
      await axios.delete(url);

      if (type === 'revenus') {
        const nouvellesTransactions = transactionsRevenus.filter(t => t.id !== id);
        setTransactionsRevenus(nouvellesTransactions);
        calculerTotaux(nouvellesTransactions, 'revenus');
      } else if (type === 'depenses') {
        const nouvellesTransactions = transactionsDepenses.filter(t => t.id !== id);
        setTransactionsDepenses(nouvellesTransactions);
        calculerTotaux(nouvellesTransactions, 'depenses');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const afficherDetails = (id, type) => {
  if (type === 'revenus') {
    navigate(`/modifier-revenu/${id}`);
  } else if (type === 'depenses') {
    navigate(`/modifier-depense/${id}`);
  }
};

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card titre="Revenus" montant={revenus} couleur="bg-green-500" />
        <Card titre="Dépenses" montant={depenses} couleur="bg-red-500" />
        <Card titre="Solde" montant={solde} couleur="bg-blue-500" />
      </div>

      <div className="mb-8">
        <button 
          onClick={fetchRevenus}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Charger Revenus
        </button>
        <Tableau 
          titre="Revenus" 
          donnees={transactionsRevenus}
          onSupprimer={(id) => supprimerTransaction(id, 'revenus')}
          onAfficherDetails={(id) => afficherDetails(id, 'revenus')}
        />
        <button 
          onClick={() => navigate('/Revenus')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter Revenus
        </button>
      </div>

      <div className="mb-8">
        <button 
          onClick={fetchDepenses}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Charger Dépenses
        </button>
        <Tableau 
          titre="Dépenses" 
          donnees={transactionsDepenses}
          onSupprimer={(id) => supprimerTransaction(id, 'depenses')}
          onAfficherDetails={(id) => afficherDetails(id, 'depenses')}
        />
        <button 
          onClick={() => navigate('/Depences')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter Dépenses
        </button>
      </div>
    </div>
  );
}

function Card({ titre, montant, couleur }) {
  return (
    <div className={`${couleur} text-white rounded-lg shadow-md p-4`}>
      <h2 className="text-xl font-bold">{titre}</h2>
      <p className="text-3xl font-semibold">{montant.toFixed(2)} €</p>
    </div>
  );
}

function Tableau({ titre, donnees, onSupprimer, onAfficherDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">{titre}</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Montant</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.titre}</td>
              <td className="p-2 text-right">{item.montant.toFixed(2)} €</td>
              <td className="p-2 text-center">
                <button 
                  onClick={() => onAfficherDetails(item.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                 modifier
                </button>
                <button 
                  onClick={() => onSupprimer(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
