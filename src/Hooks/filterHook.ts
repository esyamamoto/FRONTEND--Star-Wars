import { useContext, useState } from 'react';
import GlobalContext from '../components/Context/GlobalContext';
import { PlanetsCompareType, ListOrderType } from '../types';

const ORDER_STATE = {
  order: {
    column: 'population',
    sort: 'ASC',
  },
};
const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};
const columnFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const useFilters = () => {
  const { planets, filterPlanets, setFilterPlanets } = useContext(GlobalContext);
  const [selectedValues, setSelectedValues,
  ] = useState<PlanetsCompareType>(INITIAL_STATE as PlanetsCompareType);
  const [columnOptions, setColumnOptions] = useState(columnFilter);
  const [filterOptions, setFilterOptions] = useState<PlanetsCompareType[]>([]);
  const [order, setOrder] = useState<ListOrderType>(ORDER_STATE as ListOrderType);

  const filterByName = (filterS: string) => {
    const filtered = planets
      .filter((planet) => planet.name.toLocaleLowerCase()
        .includes(filterS.toLocaleLowerCase()));
    setFilterPlanets(filtered);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  const filterNumberValues = () => {
    const { column, comparison, value } = selectedValues;
    setFilterOptions([...filterOptions, selectedValues]);
    const newColumnOp = columnOptions
      .filter((option: string) => option !== column);
    setColumnOptions(newColumnOp);

    const planetsToFilter = filterPlanets.length > 0 ? filterPlanets : planets;
    const filtered = planetsToFilter
      .filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        } if (comparison === 'igual a') {
          return Number(planet[column]) === Number(value);
        }
        return planet;
      });
    setFilterPlanets(filtered);
  };

  const removeFilter = (
    event: React.MouseEvent<HTMLButtonElement>,
    filter?: string,
  ) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === 'removeFilters') {
      setColumnOptions(columnFilter);
      setFilterPlanets([]);
      setFilterOptions([]);
    } else if (name === 'X' && filter) {
      setColumnOptions([...columnOptions, filter]);
      const newFilterOp = filterOptions.filter(
        (option) => option.column !== filter,
      );
      setFilterOptions(newFilterOp);

      let filtered = planets;
      newFilterOp.forEach((option) => {
        filtered = planets.filter((planet) => {
          const { column, comparison, value } = option;
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(value);
          } if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          } if (comparison === 'igual a') {
            return Number(planet[column]) === Number(value);
          }
          return true;
        });
      });
      setFilterPlanets(filtered);
    }
  };

  const getOrder = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = event.target;

    if (name === 'columnSort' && value !== order.order.column) {
      setOrder({
        order: {
          column: value as 'population' | 'orbital_period' | 'diameter'
          | 'rotation_period' | 'surface_water',
          sort: order.order.sort,
        },
      });
    } else if (name === 'columnSortOrder' && value !== order.order.sort) {
      setOrder({
        order: {
          column: order.order.column,
          sort: value as 'ASC' | 'DESC',
        },
      });
    }
  };

  const orderPlanets = () => {
    const { column, sort } = order.order;
    const planetsToOrder = filterPlanets.length > 0 ? filterPlanets : planets;
    const filteredPlanets = planetsToOrder
      .filter((planet) => planet[column] !== 'unknown');

    filteredPlanets.sort((a, b) => {
      const valueA = parseFloat(a[column]);
      const valueB = parseFloat(b[column]);
      if (!Number.isNaN(valueA) && !Number.isNaN(valueB)) {
        return sort === 'ASC' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });

    setFilterPlanets(filteredPlanets);
  };

  return {
    removeFilter,
    filterByName,
    filterNumberValues,
    columnFilter,
    handleChange,
    selectedValues,
    columnOptions,
    filterOptions,
    getOrder,
    orderPlanets,
  };
};

export default useFilters;
