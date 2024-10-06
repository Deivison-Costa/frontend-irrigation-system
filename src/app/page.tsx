import EnvironmentCarousel from '@/components/EnvironmentCards';
import ErrorTable from '@/components/ErrorTable';

const Home: React.FC = () => {
  return (
    <div>
      <EnvironmentCarousel />
      <ErrorTable />
    </div>
  );
};

export default Home;
