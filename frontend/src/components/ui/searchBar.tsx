import { Search } from "lucide-react";
import { Categories } from "@/data/categories";
import { cities } from "@/data/cities";

const SearchBar = () => {
  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-4">
          {/* Search Input */}
          <div className="flex items-center flex-1 gap-2">
            <Search className="text-gray-500 w-5 h-5 hidden sm:block" />
            <input
              type="text"
              placeholder="Aș dori să cumpăr..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Dropdown */}
          <select className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm">
            {Categories.map((cat) => (
              <option key={cat.label}>{cat.label}</option>
            ))}
          </select>

          {/* City Dropdown */}
          <select className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm">
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>

          {/* Search Button */}
          <button className="w-full sm:w-auto bg-yellow-400 text-green-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 transition">
            Căutare
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
