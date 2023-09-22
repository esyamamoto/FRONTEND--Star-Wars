import { ResidentsType } from './types';

const FetchAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  const { results } = data;
  const withoutResidents = results.map((searched: ResidentsType) => {
    const { residents, ...remainder } = searched;
    return remainder;
  });
  return withoutResidents;
};

export { FetchAPI };
/* import { PlanetType } from './types'; // Importe o tipo PlanetType do arquivo types.ts

export const fetchPlanetsFromAPI = async (): Promise<PlanetType[]> => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    if (!response.ok) {
      throw new Error('Erro na requisição à API');
    }
    const data = await response.json();
    const planets: PlanetType[] = data.results.map((planet: any) => {
      const { residents, ...planetWithoutResidents } = planet;
      return {
        name: planetWithoutResidents.name,
        rotation_period: planetWithoutResidents.rotation_period,
        orbital_period: planetWithoutResidents.orbital_period,
        diameter: planetWithoutResidents.diameter,
        climate: planetWithoutResidents.climate,
        gravity: planetWithoutResidents.gravity,
        terrain: planetWithoutResidents.terrain,
        surface_water: planetWithoutResidents.surface_water,
        population: planetWithoutResidents.population,
        films: planetWithoutResidents.films,
        created: planetWithoutResidents.created,
        edited: planetWithoutResidents.edited,
        url: planetWithoutResidents.url,
      };
    });
    return planets;
  } catch (error) {
    throw new Error('Erro na requisição à API: ' + error.message);
  }
};
*/
