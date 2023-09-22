import { createContext } from 'react';
import { GlobalType } from '../../types';

const GlobalContext = createContext({} as GlobalType);

export default GlobalContext;
