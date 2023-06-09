import { useContext } from 'react';
import { LogContext } from '../App';

export function Logs() {
  const { logs } = useContext(LogContext);

  return (
    <ol>
      {logs.map((log, index) => (
        <li key={index}>{log}</li>
      ))}
    </ol>
  );
}
