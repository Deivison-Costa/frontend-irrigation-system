"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

const EnvironmentCards: React.FC = () => {
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

  const titlesInPortuguese: { [key: string]: string } = {
    temperature: "Temperatura",
    humidity: "Umidade",
    windSpeed: "Velocidade do Vento",
    pressure: "Pressão",
    luminosity: "Luminosidade",
    soilMoisture: "Umidade do Solo",
    ETo: "Evapotranspiração (ETo)",
    TmaxC: "Temperatura Máxima (Tmax)",
    TminC: "Temperatura Mínima (Tmin)",
    Tmean: "Temperatura Média (Tmean)",
    Rs: "Radiação Solar (Rs)",
    Rns: "Radiação Solar Líquida (Rns)",
    Ra: "Radiação Extraterrestre (Ra)",
    Rso: "Radiação de Céu Limpo (Rso)",
    Rnl: "Radiação de Onda Longa Líquida (Rnl)",
    Rn: "Radiação Líquida (Rn)",
    delta: "Inclinação da Curva de Pressão de Vapor Saturado (Delta)",
    gamma: "Coeficiente Psicrométrico (Gamma)",
    es: "Pressão de Vapor Saturado (es)",
    ea: "Pressão Real de Vapor (ea)",
  };

  const getClassification = (key: string, value: number) => {
    switch (key) {
      case "temperature":
        if (value < 15) {
          return "Baixa: A temperatura abaixo de 15°C pode retardar o crescimento da maioria das plantas, reduzindo a fotossíntese e a absorção de nutrientes.";
        }
        if (value >= 15 && value <= 25) {
          return "Ideal: Temperatura ótima para o desenvolvimento da maioria das culturas, favorecendo a fotossíntese e o crescimento equilibrado.";
        }
        return "Alta: Temperaturas acima de 25°C podem causar estresse térmico nas plantas, reduzindo a eficiência da fotossíntese e aumentando a demanda por água.";
      
      case "humidity":
        if (value < 30) {
          return "Baixa: Umidade relativa baixa pode causar perda excessiva de água pelas plantas através da transpiração, levando ao murchamento e estresse hídrico.";
        }
        if (value >= 30 && value <= 60) {
          return "Ideal: Faixa adequada de umidade para a transpiração eficiente e troca gasosa nas folhas, sem causar estresse hídrico nas plantas.";
        }
        return "Alta: Umidade alta pode promover o desenvolvimento de doenças fúngicas nas plantas, além de reduzir a evapotranspiração.";

      case "windSpeed":
        if (value < 1) {
          return "Baixa: Velocidades de vento muito baixas podem limitar a polinização natural de algumas culturas que dependem do vento.";
        }
        if (value >= 1 && value <= 5) {
          return "Ideal: Velocidades de vento moderadas ajudam na polinização, na dispersão de sementes e na circulação de ar, sem causar danos.";
        }
        return "Alta: Velocidades acima de 5 m/s podem causar danos físicos às plantas, como quebra de ramos, e aumentar a evapotranspiração, desidratando o solo.";

      case "pressure":
        if (value < 90) {
          return "Baixa: Baixa pressão atmosférica pode indicar tempestades ou mudanças climáticas severas, afetando negativamente o desenvolvimento das culturas.";
        }
        if (value >= 90 && value <= 105) {
          return "Ideal: Pressão atmosférica normal, sem impacto direto negativo sobre as plantas ou o ambiente agrícola.";
        }
        return "Alta: Alta pressão pode estar associada a tempo seco e quente, o que pode aumentar a necessidade de irrigação.";

      case "luminosity":
        if (value < 300) {
          return "Baixa: Luminosidade insuficiente pode prejudicar a fotossíntese, resultando em crescimento reduzido e baixa produtividade das plantas.";
        }
        if (value >= 300 && value <= 800) {
          return "Ideal: Luminosidade adequada para a maioria das culturas, proporcionando energia suficiente para uma fotossíntese eficiente.";
        }
        return "Alta: Excesso de luz pode causar queimaduras nas folhas e frutos, além de aumentar a necessidade de água devido à maior evapotranspiração.";

      case "soilMoisture":
        if (value < 20) {
          return "Baixa: Baixa umidade do solo indica seca, podendo causar murchamento e falhas no desenvolvimento radicular das plantas.";
        }
        if (value >= 20 && value <= 50) {
          return "Ideal: Umidade do solo suficiente para o desenvolvimento saudável das plantas e para suportar a evapotranspiração.";
        }
        return "Alta: Excesso de umidade no solo pode levar ao encharcamento, reduzindo a oxigenação das raízes e aumentando o risco de doenças.";

      case "ETo":
        if (value < 2) {
          return "Baixa: Baixa evapotranspiração indica baixa demanda de água pelas plantas, geralmente em condições úmidas e frias.";
        }
        if (value >= 2 && value <= 5) {
          return "Ideal: Nível adequado de evapotranspiração para a maioria das culturas, refletindo um equilíbrio hídrico saudável.";
        }
        return "Alta: Evapotranspiração alta indica alta demanda de água pelas plantas, podendo sinalizar a necessidade de irrigação adicional.";

      case "TmaxC":
        if (value < 20) {
          return "Baixa: Temperatura máxima baixa pode resultar em baixo crescimento das plantas e reduzir a atividade metabólica.";
        }
        if (value >= 20 && value <= 30) {
          return "Ideal: Temperatura máxima dentro da faixa ideal para promover o crescimento e desenvolvimento saudável da maioria das culturas.";
        }
        return "Alta: Temperaturas máximas muito altas podem causar estresse térmico nas plantas, aumentando a evapotranspiração e a necessidade de irrigação.";

      case "TminC":
        if (value < 5) {
          return "Baixa: Temperaturas mínimas muito baixas podem causar danos por geada nas plantas, afetando a qualidade e rendimento das culturas.";
        }
        if (value >= 5 && value <= 15) {
          return "Ideal: Temperaturas mínimas dentro de uma faixa segura para a maioria das culturas, sem risco de danos por geada.";
        }
        return "Alta: Temperaturas mínimas altas podem reduzir a respiração noturna das plantas, afetando o crescimento e acúmulo de nutrientes.";

      case "Tmean":
        if (value < 10) {
          return "Baixa: Temperatura média baixa pode retardar o desenvolvimento das culturas e prolongar o ciclo de crescimento.";
        }
        if (value >= 10 && value <= 25) {
          return "Ideal: Temperatura média dentro de uma faixa ideal para o desenvolvimento equilibrado das culturas.";
        }
        return "Alta: Temperatura média elevada pode indicar estresse térmico nas plantas, exigindo maior manejo de irrigação e sombreamento.";

      case "Rs":
        if (value < 10) {
          return "Baixa: Radiação solar baixa pode limitar a fotossíntese, afetando negativamente o crescimento das plantas e a produtividade.";
        }
        if (value >= 10 && value <= 20) {
          return "Ideal: Radiação solar adequada para promover a fotossíntese eficiente e o crescimento das culturas.";
        }
        return "Alta: Radiação solar excessiva pode causar superaquecimento das plantas, aumento da evapotranspiração e possíveis danos às folhas.";

      case "Rns":
        if (value < 5) {
          return "Baixa: Radiação solar líquida baixa pode indicar condições nubladas, reduzindo a eficiência da fotossíntese.";
        }
        if (value >= 5 && value <= 15) {
          return "Ideal: Radiação líquida dentro de uma faixa ideal para manter a fotossíntese equilibrada.";
        }
        return "Alta: Excesso de radiação líquida pode aumentar o estresse térmico nas plantas e elevar as necessidades de irrigação.";

      case "Ra":
        if (value < 5) {
          return "Baixa: Radiação extraterrestre baixa pode indicar condições com baixa luminosidade, limitando a energia solar disponível para as plantas.";
        }
        if (value >= 5 && value <= 10) {
          return "Ideal: Radiação extraterrestre adequada para suportar a fotossíntese eficiente e o desenvolvimento das culturas.";
        }
        return "Alta: Radiação extraterrestre elevada pode levar a um excesso de radiação solar, aumentando a temperatura e a evapotranspiração.";

      case "Rso":
        if (value < 5) {
          return "Baixa: Radiação de céu limpo baixa pode indicar condições atmosféricas densas ou nubladas, reduzindo a fotossíntese.";
        }
        if (value >= 5 && value <= 10) {
          return "Ideal: Radiação de céu limpo adequada para garantir uma fotossíntese eficiente.";
        }
        return "Alta: Radiação de céu limpo elevada pode aumentar a carga térmica nas plantas, exigindo práticas de manejo para evitar superaquecimento.";

      case "Rnl":
        if (value < 2) {
          return "Baixa: Radiação de onda longa líquida baixa pode indicar perda de calor à noite, podendo provocar geadas em algumas culturas.";
        }
        if (value >= 2 && value <= 5) {
          return "Ideal: Radiação de onda longa líquida dentro da faixa normal, mantendo o equilíbrio térmico.";
        }
        return "Alta: Radiação de onda longa elevada pode refletir condições de calor excessivo à noite, dificultando o resfriamento das plantas.";

      case "Rn":
        if (value < 10) {
          return "Baixa: Radiação líquida baixa pode indicar limitação na energia disponível para o crescimento das plantas.";
        }
        if (value >= 10 && value <= 20) {
          return "Ideal: Radiação líquida adequada para promover o desenvolvimento saudável das plantas.";
        }
        return "Alta: Excesso de radiação líquida pode aumentar a evapotranspiração e o estresse térmico.";

      case "delta":
        return "Delta representa a inclinação da curva de pressão de vapor saturado, usada no cálculo da evapotranspiração. Este valor influencia a estimativa da demanda hídrica das plantas.";

      case "gamma":
        return "Gamma é o coeficiente psicrométrico, utilizado no cálculo da evapotranspiração, e ajuda a determinar a demanda de água pela planta com base na temperatura e pressão do ar.";

      case "es":
        return "Es representa a pressão de vapor saturado, indicando a quantidade máxima de vapor d'água que o ar pode conter a uma determinada temperatura. Altos valores indicam potencial para maior transpiração das plantas.";

      case "ea":
        return "Ea representa a pressão real de vapor, que é a quantidade atual de vapor d'água no ar. Diferenças entre es e ea indicam a demanda de evapotranspiração.";

      default:
        return "N/A: Sem classificação agronômica disponível.";
    }
  };

  const getBackgroundImage = (key: string) => {
    switch (key) {
      case "temperature":
        return "/images/temperature.png";
      case "humidity":
        return "/images/humidity.png";
      case "windSpeed":
        return "/images/wind.png";
      case "pressure":
        return "/images/pressure.png";
      case "luminosity":
        return "/images/luminosity.png";
      case "soilMoisture":
        return "/images/soil-moisture.png";
      case "ETo":
        return "/images/evapotranspiration.png";
      case "TmaxC":
        return "/images/temperature-max.svg";
      case "TminC":
        return "/images/temperature-min.svg";
      case "Tmean":
        return "/images/temperature-mean.png";
      case "Rs":
        return "/images/radiation-solar.png";
      case "Rns":
        return "/images/radiation-solar-net.jpg";
      case "Ra":
        return "/images/extraterrestrial-radiation.png";
      case "Rso":
        return "/images/clear-sky-radiation.png";
      case "Rnl":
        return "/images/longwave-radiation.png";
      case "Rn":
        return "/images/net-radiation.png";
      case "delta":
        return "/images/evapotranspiration-delta.png";
      case "gamma":
        return "/images/psychrometric-coefficient.png";
      case "es":
        return "/images/saturation-vapor-pressure.png";
      case "ea":
        return "/images/actual-vapor-pressure.png";
      default:
        return "/images/default.png";
    }
  };  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {variables.map(([key, value]) => (
        <div
          key={key}
          className="relative p-6 text-white rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(${getBackgroundImage(key)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minWidth: "250px",
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            aspectRatio: "1 / 1",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold capitalize">{titlesInPortuguese[key] || key}</h3>
            <p className="text-lg mt-2">Valor: {value}</p>
            <p className="text-md mt-1">{getClassification(key, value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnvironmentCards;