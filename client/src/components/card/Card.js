import React from 'react';

const Card = ({ storeName, storeLocation, owners }) => {
  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 hover:shadow-purple-950 transition-shadow duration-300 border border-purple-950">
      <h2 className="text-2xl font-bold mb-2 text-purple-950">{storeName}</h2>
      <p className="text-gray-500 mb-4">Location: {storeLocation}</p>
      <div className="mt-4">
        <h3 className="font-semibold mb-2 text-purple-950">Owners:</h3>
        <ul className="pl-4 text-gray-700 list-none">
          {owners.map((owner) => (
            <li key={owner.id} className="mb-2">
              <p>
                {owner.name} (
                <a
                  href={`mailto:${owner.email}`}
                  className="text-purple-950 hover:text-purple-700 transition-colors duration-300"
                >
                  {owner.email}
                </a>)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;