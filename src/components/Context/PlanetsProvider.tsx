import React, { useEffect, useState } from 'react';
import { PlanetsType } from '../../types';
import { PlanetsContext } from './PlanetsContext';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [planetsData, setPlanetsData] = useState<PlanetsType[]>([]);

  useEffect(() => {
    async function fetchPlanetsFromAPI() {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();

        setPlanetsData(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchPlanetsFromAPI();
  }, []); // O segundo argumento vazio indica que o useEffect será executado apenas uma vez, quando o componente é montado

  return (
    <PlanetsContext.Provider value={ { planetsData } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetProvider;
