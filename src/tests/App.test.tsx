import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Filters from '../components/Filter/Filter';
import PlanetProvider from '../components/Context/PlanetsProvider';
import App from '../App';
import Table from '../components/Table/Table';
import { PlanetsContext } from '../components/Context/PlanetsContext';
import { PlanetsContextType } from '../types';
import * as fetchModule from '../api';
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event';
import mockPlanets from '../components/Mocks';

beforeEach(() => {
  vi.spyOn(fetchModule, 'FetchAPI').mockResolvedValue(mockPlanets);
});

afterEach(() => {
  vi.restoreAllMocks();
});


describe('Testes do App', () => {
  it('Testes <Table/>', async () => {
    render(<App />);
    expect(fetchModule.FetchAPI).toHaveBeenCalled();
    expect(fetchModule.FetchAPI).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(screen.getByText(/loading.../i));
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /rotation_period/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /orbital_period/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /diameter/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /climate/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /gravity/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /terrain/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /surface_water/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /population/i })).toBeInTheDocument();

    expect(screen.getAllByTestId('planet-name').length).toBe(10);
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine');
    expect(screen.getAllByTestId('planet-name')[1]).toHaveTextContent('Alderaan');
    expect(screen.getAllByTestId('planet-name')[2]).toHaveTextContent('Yavin IV');
    expect(screen.getAllByTestId('planet-name')[3]).toHaveTextContent('Hoth');
    expect(screen.getAllByTestId('planet-name')[4]).toHaveTextContent('Dagobah');
    expect(screen.getAllByTestId('planet-name')[5]).toHaveTextContent('Bespin');
    
    await userEvent.type(screen.getByRole('textbox', {  name: /name:/i}), 'a');
    expect(screen.getAllByTestId('planet-name').length).toBe(7);
    await userEvent.clear(screen.getByRole('textbox', {  name: /name:/i}),);
    await userEvent.type(screen.getByRole('textbox', {  name: /name:/i}), 'aa');
    expect(screen.getAllByTestId('planet-name').length).toBe(1);
    await userEvent.clear(screen.getByRole('textbox', {  name: /name:/i}));
    expect(screen.getAllByTestId('planet-name').length).toBe(10);

    
  })
  /*
    expect(tableElement).toBeInTheDocument();
    expect(headers).toHaveLength(8);
    expect(headers[0]).toHaveTextContent('Name');
    expect(headers[1]).toHaveTextContent('Rotation period');
    expect(headers[2]).toHaveTextContent('Orbital period');
    expect(headers[3]).toHaveTextContent('Diameter');
    expect(headers[4]).toHaveTextContent('Climate');
    expect(headers[5]).toHaveTextContent('Gravity');
    expect(headers[6]).toHaveTextContent('Terrain');
    expect(headers[7]).toHaveTextContent('Surface water');

    expect(rows).toHaveLength(3);
    expect(rows[1]).toHaveTextContent('Alderaan');
    expect(rows[1]).toHaveTextContent('2000000000');
    expect(rows[1]).toHaveTextContent('364');
    expect(rows[1]).toHaveTextContent('12500');
    expect(rows[1]).toHaveTextContent('temperate');
    expect(rows[1]).toHaveTextContent('1 standard');
    expect(rows[1]).toHaveTextContent('grasslands, mountains');
    expect(rows[1]).toHaveTextContent('40');

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

     expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('364')).toBeInTheDocument();
    expect(screen.getByText('12500')).toBeInTheDocument();
  */
})
