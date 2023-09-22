export type PlanetsType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};
export type GlobalType = {
  planets: PlanetsType[];
  loading: boolean;
  messageError: string | null;
  filterPlanets: PlanetsType[];
  setFilterPlanets: (planets: PlanetsType[]) => void;
};

export type ResidentsType = PlanetsType & { residents: string[] };

export type PlanetsCompareType = {
  column:
  'population' |
  'orbital_period' |
  'diameter' |
  'rotation_period' |
  'surface_water';
  comparison:
  'maior que' |
  'menor que' |
  'igual a';
  value: number;
};

export type ListOrderType = {
  order: {
    column:
    'population' |
    'orbital_period' |
    'diameter' |
    'rotation_period' |
    'surface_water';
    sort:
    'ASC' |
    'DESC';
  }
};
/*
export const DEFAULT_ORDER_STATE = {
  order: {
    column: 'population',
    sort: 'ASC',
  },
};

export const DEFAULT_INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

export const DEFAULT_COLUMN_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
*/
