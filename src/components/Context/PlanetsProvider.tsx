import React, { useEffect, useState } from 'react';
import { PlanetsType } from '../../types';
import { PlanetsContext } from './PlanetsContext';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  // Define um estado para armazenar os dados dos planetas
  const [planetsData, setPlanetsData] = useState<PlanetsType[]>([]);

  // Utiliza o hook useEffect para fazer uma requisição à API quando o componente é montado
  useEffect(() => {
    // Função assíncrona para buscar dados dos planetas da API (substitua esta parte com sua própria lógica de busca)
    async function fetchPlanetsFromAPI() {
      try {
        // Realize uma chamada à API aqui para obter os dados dos planetas
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();

        // Atualiza o estado planets com os planetas obtidos da API
        setPlanetsData(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    // Chama a função de busca ao montar o componente
    fetchPlanetsFromAPI();
  }, []); // O segundo argumento vazio indica que o useEffect será executado apenas uma vez, quando o componente é montado

  // Renderiza o provedor de contexto, fornecendo os dados dos planetas para os componentes filhos
  return (
    <PlanetsContext.Provider value={ { planetsData } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetProvider;
