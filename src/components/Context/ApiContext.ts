import { createContext } from 'react';
import { PlanetType } from '../../types';

type PlanetTypeContext = {
  planets: PlanetType[];
};
export const apiContext = createContext({} as PlanetTypeContext);
