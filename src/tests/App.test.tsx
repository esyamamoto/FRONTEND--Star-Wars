import { fireEvent, render, screen } from '@testing-library/react';
import Table from '../components/Table/Table';import Filters from '../components/Filter/Filter';
import { PlanetsContext } from '../components/Context/PlanetsContext';
import GlobalContext from '../components/Context/GlobalContext';
;

const mockPlanetsData = [
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
  },
  {
    name: 'Alderaan',
    rotation_period: '24',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
  },
];

describe('Testes do componente Table', () => {
  test('renderiza os filtros corretamente', () => {
    render(
      <PlanetsContext.Provider value={{ planetsData: mockPlanetsData }}>
        <Filters />
      </PlanetsContext.Provider>
    );
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
  });
  test('aplica e remove filtros corretamente', () => {
    render(
      <PlanetsContext.Provider value={{ planetsData: mockPlanetsData }}>
        <Filters />
      </PlanetsContext.Provider>
    );
    fireEvent.change(screen.getByTestId('name-filter'), { target: { value: 'Tatooine' } });
    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000' } });
    fireEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getByTestId('filter')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button-remove-filters'));
    expect(screen.queryByTestId('filter')).toBeNull();
  });

  test('renderiza mensagem de "loading..." quando loading é verdadeiro e messageError é falso', () => {
    render(
      <Table />,
      {
        wrapper: ({ children }) => (
          <GlobalContext.Provider value={{ loading: true, messageError: null }}>
            {children}
          </GlobalContext.Provider>
        ),
      }
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
    expect(screen.queryByText('ERROR...')).toBeNull();
  });

  test('renderiza a tabela com os dados de filterPlanets quando este está definido', () => {
    const mockFilteredPlanets = [
      {
        name: 'Alderaan',
        rotation_period: '24',
        orbital_period: '364',
        diameter: '12500',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'grasslands, mountains',
        surface_water: '40',
        population: '2000000000',
        residents: [],
        films: [],
        created: '2014-12-10T11:35:48.479000Z',
        edited: '2014-12-20T20:58:18.420000Z',
        url: 'https://swapi-trybe.herokuapp.com/api/planets/2/',
      },
    ];

    render(
      <Table />,
      {
        wrapper: ({ children }) => (
          <GlobalContext.Provider value={{ planets: [], filterPlanets: mockFilteredPlanets }}>
            {children}
          </GlobalContext.Provider>
        ),
      }
    );

    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('364')).toBeInTheDocument();
    expect(screen.getByText('12500')).toBeInTheDocument();
  });

  test('renderiza a tabela com os dados de planetas quando filterPlanets não está definido', () => {
    const mockPlanets = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: [],
        films: [],
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi-trybe.herokuapp.com/api/planets/1/',
      },
    ];

    render(
      <Table />,
      {
        wrapper: ({ children }) => (
          <GlobalContext.Provider value={{ planets: mockPlanets, filterPlanets: [] }}>
            {children}
          </GlobalContext.Provider>
        ),
      }
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('304')).toBeInTheDocument();
    expect(screen.getByText('10465')).toBeInTheDocument();
  });
});