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
  const [selectValue, setSelectValue,
  ] = useState<PlanetsCompareType>(INITIAL_STATE as PlanetsCompareType);
  const [columnInfo, setColumnInfo] = useState(columnFilter);
  const [filterInfo, setFilterInfo] = useState<PlanetsCompareType[]>([]);
  const [order, setOrder] = useState<ListOrderType>(ORDER_STATE as ListOrderType);

  const filterByName = (filterS: string) => {
    const filt = planets
      .filter((planet) => planet.name.toLocaleLowerCase()
        .includes(filterS.toLocaleLowerCase()));
    setFilterPlanets(filt);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    setSelectValue({
      ...selectValue,
      [name]: value,
    });
  };

  const filterNumberValues = () => {
    const { column, comparison, value } = selectValue;
    setFilterInfo([...filterInfo, selectValue]);
    const newColumnOp = columnInfo
      .filter((option: string) => option !== column);
    setColumnInfo(newColumnOp);

    const planetsFilter = filterPlanets.length > 0 ? filterPlanets : planets;
    const filterBase = planetsFilter
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
    setFilterPlanets(filterBase);
  };

  const removeFilter = (
    event: React.MouseEvent<HTMLButtonElement>,
    filter?: string,
  ) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === 'removeFilters') {
      setColumnInfo(columnFilter);
      setFilterPlanets([]);
      setFilterInfo([]);
    } else if (name === 'X' && filter) {
      setColumnInfo([...columnInfo, filter]);
      const newFilterOp = filterInfo.filter(
        (option) => option.column !== filter,
      );
      setFilterInfo(newFilterOp);

      let filt = planets;
      newFilterOp.forEach((option) => {
        filt = planets.filter((planet) => {
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
      setFilterPlanets(filt);
    }
  };

  const getOrd = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
    const planetsOrder = filterPlanets.length > 0 ? filterPlanets : planets;
    const filteredPlanets = planetsOrder
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
    selectValue,
    columnInfo,
    filterInfo,
    getOrd,
    orderPlanets,
  };
};

export default useFilters;
