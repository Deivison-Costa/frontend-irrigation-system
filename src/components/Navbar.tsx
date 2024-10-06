import Link from 'next/link';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Sistema de Irrigação
        </Link>
        <div className="flex items-center">
          <a href="mailto:deivisonbambui@gmail.com" className="text-white mx-2 flex items-center">
            <FaEnvelope className="mr-1" /> Contatos
          </a>
          
          <Link href="https://github.com/Deivison-Costa" className="text-white mx-2 flex items-center">
            <FaGithub className="mr-1" /> GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
