import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Sistema de Irrigação
        </Link>
        <div>
          <Link href="/" className="text-white mx-2">
            Home
          </Link>
          <Link href="https://github.com/Deivison-Costa" className="text-white mx-2">
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
