import { useState } from 'react';
import { Search, ShoppingCart, MapPin, ChevronDown } from 'lucide-react';

type Category = 
  | 'fructe'
  | 'legume'
  | 'lactate'
  | 'cereale'
  | 'carne'
  | 'miere_si_gemuri'
  | 'muraturi'
  | 'sucuri_si_bauturi_alcoolice';

const categories: { key: Category; label: string; icon: string }[] = [
  { key: 'fructe', label: 'Fructe', icon: '🍎' },
  { key: 'legume', label: 'Legume', icon: '🥕' },
  { key: 'lactate', label: 'Lactate', icon: '🥛' },
  { key: 'cereale', label: 'Cereale', icon: '🌾' },
  { key: 'carne', label: 'Carne', icon: '🥩' },
  { key: 'miere_si_gemuri', label: 'Miere și Gemuri', icon: '🍯' },
  { key: 'muraturi', label: 'Murături', icon: '🥒' },
  { key: 'sucuri_si_bauturi_alcoolice', label: 'Sucuri și Băuturi Alcoolice', icon: '🍹' }
];

const counties = [
  'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 
  'Brăila', 'Brașov', 'București', 'Buzău', 'Călărași', 'Caraș-Severin', 
  'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu', 
  'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș', 
  'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Sălaj', 'Satu Mare', 
  'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea'
];

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 min-w-56 max-h-80 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('legume');
  const [selectedCounty, setSelectedCounty] = useState('Timișoara');
  const [searchQuery, setSearchQuery] = useState('Mere');

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-3xl font-bold tracking-wider">
            LOGO
          </div>

          {/* Search and Dropdowns Section */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none text-gray-700 text-sm w-48"
                  placeholder="Căutare produse..."
                />
              </div>
            </div>

            {/* Categories Dropdown */}
            <Dropdown
              trigger={
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm font-medium">Legume</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              }
            >
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-gray-700 text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </Dropdown>

            {/* Location Dropdown */}
            <Dropdown
              trigger={
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{selectedCounty}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              }
            >
              {counties.map((county) => (
                <button
                  key={county}
                  onClick={() => setSelectedCounty(county)}
                  className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                >
                  <span className="text-gray-700 text-sm font-medium">{county}</span>
                </button>
              ))}
            </Dropdown>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              Cautare
            </button>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-green-100 font-medium text-sm transition-colors duration-200">
                Contact
              </a>
              <a href="#" className="text-white hover:text-green-100 font-medium text-sm transition-colors duration-200">
                Conectare
              </a>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">
                Devino un distribuitor
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}