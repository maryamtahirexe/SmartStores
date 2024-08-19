import React from 'react';

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-transparent shadow-2xl rounded-lg p-6 hover:shadow-primary transition-shadow duration-300 border border-primary">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-primary">{title}</h2>
          <p className="text-4xl font-semibold text-highlight">{value}</p>
        </div>
        <div className="flex space-x-2">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
