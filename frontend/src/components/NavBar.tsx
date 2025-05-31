import { useState } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white px-6 py-4 shadow-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <div className='text-xl font-bold text-green-700'>GreenMart</div>
        <div className='hidden gap-4 md:flex'>
          <button className='items-center font-medium text-green-700 hover:underline'>
            Conectează-te
          </button>
          <button className='items-center rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700'>
            Înregistrează-te
          </button>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className='h-6 w-6 text-green-700' />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='mt-2 flex flex-col gap-2 p-4 md:hidden'>
          <button className='text-center font-medium text-green-700 hover:underline'>
            Conectează-te
          </button>
          <button className='rounded-lg bg-green-600 px-4 py-2 text-center text-white transition hover:bg-green-700'>
            Înregistrează-te
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
