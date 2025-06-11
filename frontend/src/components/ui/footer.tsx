const Footer = () => {
  return (
    <footer className="bg-green-700 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">

        <div>
          <h2 className="text-xl font-bold">GreenMart</h2>
          <p className="text-sm mt-2">
            Cumpără produse 
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: suport@greenmart.ro</p>
          <p className="text-sm">Tel: 0742 220 93#</p>
          <p className="text-sm mt-1">L-V: 09:00 - 18:00</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-200 mt-8">
        © {new Date().getFullYear()} GreenMart. Toate drepturile rezervate.
      </div>
    </footer>
  );
};

export default Footer;
