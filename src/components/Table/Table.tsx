import { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';

function Table() {
  const { planets } = useContext(GlobalContext);
  const { loading, messageError, filterPlanets } = useContext(GlobalContext);
  const headersTable = planets?.length > 0 ? Object.keys(planets[0]) : [];
  const listPlanets = filterPlanets?.length > 0 ? filterPlanets : planets;
  const planetsNamesShow = listPlanets?.map((planet) => planet.name);
  return (

    <div className="table">
      { loading && <p>loading...</p> }
      { messageError && <p>ERROR...</p> }
      { listPlanets && (
        <table>
          <thead>
            <tr>
              { headersTable.map((header, index) => (
                <th key={ index }>{ header }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { listPlanets.map((planet, index) => (
              <tr key={ index }>
                { Object.values(planet).map((value, indexPlanet) => (
                  <td
                    data-testid={ planetsNamesShow
                      .includes(value as string) ? 'planet-name' : '' }
                    key={ indexPlanet }
                  >
                    { value }
                  </td>
                )) }
              </tr>
            )) }
          </tbody>
        </table>

      )}
    </div>
  );
}

export default Table;
/*
<table>
      <>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody style={ stylePlanetsTable }>
        { planetsToRender && planetsToRender.map((planet: Planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>

        ))}
      </tbody>
    </table>
*/
