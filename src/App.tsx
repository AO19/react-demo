import { createContext, useEffect, useState } from 'react';
import { Game, Logs } from './components';

export const LogContext = createContext<{
  logs: string[];
  addLog: (value: string) => void;
}>({
  logs: [],
  addLog: () => {},
});

export function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (value: string) => {
    setLogs((logs) => [...logs, value]);
  };

  useEffect(() => {
    const alertUser = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', alertUser);

    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      <div className='app'>
        <Game />
        <Logs />
      </div>
    </LogContext.Provider>
  );
}
