const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-600 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        © {new Date().getFullYear()} Sistema de Irrigação. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
