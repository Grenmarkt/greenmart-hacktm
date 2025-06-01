import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white px-6 py-4 shadow-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <div className='text-xl font-bold text-green-700'>GreenMart</div>
        <div className='hidden gap-4 md:flex'>
          <Button variant={'link'} asChild>
            <Link to={'/signin'}>Conectează-te</Link>
          </Button>
          <Button variant='link' asChild>
            <Link to={'/signup'}>Înregistrează-te</Link>
          </Button>
          <Button asChild>
            <Link to={'/become-seller'}>Devino producator</Link>
          </Button>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className='h-6 w-6 text-green-700' />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='mt-2 flex flex-col gap-2 p-4 md:hidden'>
          <Button variant={'link'} asChild>
            <Link to={'/signin'}>Conectează-te</Link>
          </Button>
          <Button variant='link' asChild>
            <Link to={'/signup'}>Înregistrează-te</Link>
          </Button>
          <Button asChild>
            <Link to={'/become-seller'}>Devino producator</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
