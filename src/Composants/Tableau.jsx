import React from 'react';

const Tableau = ({ 
  titre, 
  donnees, 
  colonnes, 
  onSupprimer, 
  onModifier, 
  onAjouter 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">{titre}</h2>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            {colonnes.map((col, index) => (
              <th key={index} className="p-2 text-left">{col.Header}</th>
            ))}
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map((item) => (
            <tr key={item.id} className="border-b">
              {colonnes.map((col, index) => (
                <td key={index} className="p-2">{item[col.accessor]}</td>
              ))}
              <td className="p-2 text-center">
                <button 
                  onClick={() => onModifier(item.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Modifier
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
      <button 
        onClick={onAjouter}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Ajouter {titre === 'Revenus' ? 'un revenu' : 'une dépense'}
      </button>
    </div>
  );
}

export default Tableau;
