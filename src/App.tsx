import { useEffect, useState } from 'react';
import { FetchAPI } from './api';
import { PlanetsType } from './types';
import Table from './components/Table/Table';
import Filters from './components/Filter/Filter';
import GlobalContext from './components/Context/GlobalContext';

function App() {
  // Estado para armazenar os planetas após a filtragem
  const [filterPlanets, setFilterPlanets] = useState<PlanetsType[]>([]);

  // Estado para armazenar todos os planetas da API
  const [planets, setPlanets] = useState<PlanetsType[]>([]);

  // Estado para controlar o carregamento dos dados da API
  const [loading, setLoading] = useState<boolean>(false);

  // Estado para armazenar mensagens de erro, se houverem
  const [messageError, setMessageError] = useState<string | null>(null);

  // useEffect é usado para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        // Indicar que o carregamento está em andamento
        setLoading(true);

        // Chamar a função FetchAPI que busca os dados da API
        const result = await FetchAPI();

        // Atualizar o estado "planets" com os dados obtidos
        setPlanets(result);
      } catch (err: any) {
        // Se houver um erro, armazenar a mensagem de erro no estado "error"
        setMessageError(err.message);
      } finally {
        // Indicar que o carregamento terminou, independentemente do resultado
        setLoading(false);
      }
    };
    // Chamar a função de busca quando o componente é montado
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
