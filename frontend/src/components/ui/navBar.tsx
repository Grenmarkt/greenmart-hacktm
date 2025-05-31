import { useState } from "react";
import { Menu } from "lucide-react";
import SearchBar from "./searchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
       
        <div className="w-full flex items-center justify-between min-[900px]:hidden">
          <div className="text-2xl font-bold text-green-700">GreenMart</div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-7 w-7 text-green-700" />
          </button>
        </div>

        <div className="hidden min-[1200px]:flex w-full items-center justify-between">
          <div className="text-2xl font-bold text-green-700">GreenMart</div>

          <div className="w-1/2 mx-auto">
            <SearchBar />
          </div>

          <div className="flex gap-4 items-center">
            <button className="text-green-700 font-medium text-base hover:underline">
              Conectează-te
            </button>
            <button className="bg-green-600 text-white px-5 py-2 text-base rounded-lg hover:bg-green-700 transition">
              Înregistrează-te
            </button>
          </div>
        </div>

        <div className="hidden max-[1199px]:min-[900px]:flex w-full items-center justify-between">
          <div className="text-2xl font-bold text-green-700">GreenMart</div>
          <div className="flex gap-4 items-center">
            <button className="text-green-700 font-medium text-base hover:underline">
              Conectează-te
            </button>
            <button className="bg-green-600 text-white px-5 py-2 text-base rounded-lg hover:bg-green-700 transition">
              Înregistrează-te
            </button>
          </div>
        </div>
{/*ok*/}
        <div className="hidden max-[1199px]:min-[900px]:block w-full">
          <SearchBar />
        </div>

        {isOpen && (
          <>
            <div className="min-[900px]:hidden mt-3 flex flex-col gap-2 px-2">
              <button className="text-green-700 font-medium hover:underline text-left text-base">
                Conectează-te
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-left text-base">
                Înregistrează-te
              </button>
            </div>

            <div className="min-[900px]:hidden mt-3 px-2 w-full">
              <SearchBar />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
