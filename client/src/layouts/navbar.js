import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-purple- p-4 flex justify-between items-center">
      <div className="text- text-xl font-bold">
        {/* You can add a logo or branding here if needed */}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-purple-800 text-white px-4 py-2 rounded"
        />
      </div>
    </nav>
  );
};

export default Navbar;
