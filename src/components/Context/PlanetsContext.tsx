import { createContext } from 'react';
import { PlanetsType } from '../../types';

export type PlanetsContextType = {
  planetsData: PlanetsType[];
};

export const PlanetsContext = createContext<PlanetsContextType>({
  planetsData: [],
});
