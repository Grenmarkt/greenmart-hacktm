import React, { useState } from "react";
import { Menu } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-green-700">GreenMart</div>
        <div className="hidden md:flex gap-4">
          <button className="text-green-700 font-medium hover:underline items-center">
            Conectează-te
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition items-center">
            Înregistrează-te
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6 text-green-700" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 p-4 flex flex-col gap-2">
          <button className="text-green-700 font-medium hover:underline text-center">
            Conectează-te
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center">
            Înregistrează-te
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
