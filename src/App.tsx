import { useEffect, useState } from 'react';
import { FetchAPI } from './api';
import { PlanetsType } from './types';
import Table from './components/Table/Table';
import Filters from './components/Filter/Filter';
import GlobalContext from './components/Context/GlobalContext';
import './App.css';

function App() {
  const [filterPlanets, setFilterPlanets] = useState<PlanetsType[]>([]);
  const [planets, setPlanets] = useState<PlanetsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);

        const result = await FetchAPI();

        setPlanets(result);
      } catch (err: any) {
        setMessageError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <GlobalContext.Provider
      value={ { planets,
        loading,
        messageError,
        filterPlanets,
        setFilterPlanets,
      } }
    >
      <div className="App">
        <Filters />
        <Table />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
