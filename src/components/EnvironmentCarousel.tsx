"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SensorData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  luminosity: number;
  soilMoisture: number;
  ETo: number;
  TmaxC: number;
  TminC: number;
  Tmean: number;
  Rs: number;
  Rns: number;
  Ra: number;
  Rso: number;
  Rnl: number;
  Rn: number;
  delta: number;
  gamma: number;
  es: number;
  ea: number;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const EnvironmentCarousel: React.FC = () => {
  const [data, setData] = useState<SensorData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<SensorData>(`${backendUrl}/sensors`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados dos sensores:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Carregando...</div>;

  const variables = Object.entries(data);

  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay>
      {variables.map(([key, value]) => (
        <div key={key} className="p-4">
          <h3 className="text-2xl font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
          <p className="text-xl mt-2">{value}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default EnvironmentCarousel;
