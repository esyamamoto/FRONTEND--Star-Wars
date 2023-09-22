import { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';

function Table() {
  const { planets } = useContext(GlobalContext);
  const { loading, messageError, filterPlanets } = useContext(GlobalContext);
  const tbHeaders = planets?.length > 0 ? Object.keys(planets[0]) : [];
  const planetsRender = filterPlanets?.length > 0 ? filterPlanets : planets;
  const planetsNames = planetsRender?.map((planet) => planet.name);
  return (

    <div className="table">
      { loading && <p>loading...</p> }
      { messageError && <p>ERROR...</p> }
      { planetsRender && (
        <table>
          <thead>
            <tr>
              { tbHeaders.map((header, index) => (
                <th key={ index }>{ header }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { planetsRender.map((planet, index) => (
              <tr key={ index }>
                { Object.values(planet).map((value, indexPlanet) => (
                  <td
                    data-testid={ planetsNames
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
