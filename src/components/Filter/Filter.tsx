import useFilters from '../../Hooks/filterHook';

function Filters() {
  // Importa funções e estados relacionados aos filtros e à ordenação usando o hook useFilters.
  const {
    filterName,
    handleChange,
    filterNumber,
    colInfo,
    filterInfo,
    removeFilter,
    colFilter,
    getOrd,
    orderPlanets,
  } = useFilters();

  const compareFilter = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            id="filterByName"
            data-testid="name-filter"
            onChange={ (event) => filterName(event.target.value) }
          />
        </label>

        <div>
          <select
            name="column"
            data-testid="column-filter"
            onChange={ (event) => handleChange(event) }
          >
            {colInfo.map((colValue, index) => (
              <option key={ index } value={ colValue }>
                {colValue}
              </option>
            ))}
          </select>

          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ (event) => handleChange(event) }
          >
            { compareFilter.map((comparison, index) => (
              <option key={ index } value={ comparison }>
                { comparison }
              </option>
            ))}
          </select>
          <label>
            <input
              name="value"
              type="number"
              defaultValue={ 0 }
              data-testid="value-filter"
              onChange={ (event) => handleChange(event) }
            />
          </label>

          {/* Botão para aplicar o filtro numérico */}
          <button
            type="button"
            data-testid="button-filter"
            onClick={ filterNumber }
          >
            Filtrar
          </button>
        </div>

        <div>
          {/* Seleção da coluna para ordenação */}
          <select
            name="columnSort"
            data-testid="column-sort"
            onChange={ (event) => getOrd(event) }
          >
            {colFilter.map((colValue, index) => (
              <option key={ index } value={ colValue }>
                {colValue}
              </option>
            ))}
          </select>

          {/* Opções de ordenação (ascendente e descendente) */}
          <label htmlFor="ASCinput">
            ASCENDENTE
            <input
              onChange={ (event) => getOrd(event) }
              type="radio"
              value="ASC"
              name="columnSortOrder"
              data-testid="column-sort-input-asc"
              id="ASCinput"
            />
          </label>

          <label htmlFor="DESCinput">
            DESCENDENTE
            <input
              onChange={ (event) => getOrd(event) }
              type="radio"
              value="DESC"
              name="columnSortOrder"
              data-testid="column-sort-input-desc"
              id="DESCinput"
            />
          </label>

          {/* Botão para ordenar */}
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ orderPlanets }
          >
            Ordenar
          </button>
        </div>

        {/* Botão para remover todos os filtros */}
        <button
          name="removeFilters"
          type="button"
          data-testid="button-remove-filters"
          onClick={ (event) => removeFilter(event) }
        >
          Remover Filtros
        </button>
      </form>

      {/* Lista de filtros aplicados */}
      {filterInfo.length > 0 && (
        <ul>
          {filterInfo.map((filter, index) => (
            <li key={ index } data-testid="filter">
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                name="X"
                onClick={ (event) => removeFilter(event, filter.column) }
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filters;
