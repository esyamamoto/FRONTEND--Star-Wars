import useFilters from '../../Hooks/filterHook';

function Filters() {
  // Importa funções e estados relacionados aos filtros e à ordenação usando o hook useFilters.
  const {
    filterByName,
    handleChange,
    filterNumberValues,
    columnOptions,
    filterOptions,
    removeFilter,
    columnFilter,
    getOrder,
    orderPlanets,
  } = useFilters();

  const compareFilter = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <form>
        <label htmlFor="filterName">
          Name:
          <input
            type="text"
            id="filterByName"
            data-testid="name-filter"
            onChange={ (event) => filterByName(event.target.value) }
          />
        </label>

        <div>
          <select
            name="column"
            data-testid="column-filter"
            onChange={ (e) => handleChange(e) }
          >
            {columnOptions.map((columnValue, index) => (
              <option key={ index } value={ columnValue }>
                {columnValue}
              </option>
            ))}
          </select>
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ (e) => handleChange(e) }
          >
            { compareFilter.map((comparison, index) => (
              <option key={ index } value={ comparison }>
                { comparison }
              </option>
            ))}
          </select>
          <input
            name="value"
            type="number"
            defaultValue={ 0 }
            data-testid="value-filter"
            onChange={ (e) => handleChange(e) }
          />

          {/* Botão para aplicar o filtro numérico */}
          <button
            type="button"
            data-testid="button-filter"
            onClick={ filterNumberValues }
          >
            Filtrar
          </button>
        </div>

        <div>
          {/* Seleção da coluna para ordenação */}
          <select
            name="columnSort"
            data-testid="column-sort"
            onChange={ (e) => getOrder(e) }
          >
            {columnFilter.map((columnValue, index) => (
              <option key={ index } value={ columnValue }>
                {columnValue}
              </option>
            ))}
          </select>

          {/* Opções de ordenação (ascendente e descendente) */}
          <label htmlFor="ASCinput">
            ASCENDENTE
            <input
              onChange={ (e) => getOrder(e) }
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
              onChange={ (event) => getOrder(event) }
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
      {filterOptions.length > 0 && (
        <ul>
          {filterOptions.map((filter, index) => (
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
