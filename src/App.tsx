import { createContext, useState } from 'react';
import { Game, Logs } from './components';

export type LogContextType = {
  addLog: (value: string) => void;
  logs: string[];
};
export const LogContext = createContext<LogContextType>({
  logs: [],
  addLog: () => {},
});

export function App() {
  const [logs, setLogs] = useState<string[]>([]);
  function addLog(value: string) {
    setLogs((logs = []) => [...logs, value]);
  }

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      <div className='app'>
        <Game />
        <Logs />
      </div>
    </LogContext.Provider>
  );
}
